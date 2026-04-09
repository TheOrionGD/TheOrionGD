import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Colors & Branding ---
    const colorRed = new THREE.Color(0xfc3a45);
    const colorOrangeRed = new THREE.Color(0xf2674a);
    const colorWhite = new THREE.Color(0xffffff);

    // --- Master Group for Parallax ---
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // --- 1. Nexus Core ---
    const coreGroup = new THREE.Group();
    
    // Outer Wireframe Polyhedron
    const coreOuterGeo = new THREE.IcosahedronGeometry(3, 1);
    const coreOuterMat = new THREE.MeshBasicMaterial({
      color: colorRed,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const coreOuter = new THREE.Mesh(coreOuterGeo, coreOuterMat);
    coreGroup.add(coreOuter);

    // Inner Glowing Core
    const coreInnerGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const coreInnerMat = new THREE.MeshPhongMaterial({
      color: colorOrangeRed,
      emissive: colorOrangeRed,
      emissiveIntensity: 2,
      transparent: true,
      opacity: 0.7,
      flatShading: true
    });
    const coreInner = new THREE.Mesh(coreInnerGeo, coreInnerMat);
    coreGroup.add(coreInner);
    
    worldGroup.add(coreGroup);

    // --- 2. Orbital Paths ---
    const orbitsGroup = new THREE.Group();
    const ringCount = 5;
    const particlesPerRing = 40;
    const ringSystems: { ring: THREE.Line, particles: THREE.Points, radius: number, speed: number, axis: THREE.Vector3 }[] = [];

    for (let i = 0; i < ringCount; i++) {
      const radius = 6 + i * 2.5;
      const speed = (0.002 + Math.random() * 0.005) * (Math.random() > 0.5 ? 1 : -1);
      
      const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.8, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(100);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({ 
        color: i % 2 === 0 ? colorRed : colorOrangeRed, 
        transparent: true, 
        opacity: 0.15,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Line(ringGeo, ringMat);
      
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;

      const partGeo = new THREE.BufferGeometry();
      const partPositions = new Float32Array(particlesPerRing * 3);
      for(let p=0; p < particlesPerRing; p++) {
        partPositions[p*3] = 0;
        partPositions[p*3+1] = 0;
        partPositions[p*3+2] = 0;
      }
      partGeo.setAttribute('position', new THREE.BufferAttribute(partPositions, 3));
      
      const partMat = new THREE.PointsMaterial({
        size: 0.08,
        color: i % 2 === 0 ? colorRed : colorOrangeRed,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });
      const particles = new THREE.Points(partGeo, partMat);
      
      orbitsGroup.add(ring);
      ring.add(particles);

      ringSystems.push({
        ring,
        particles,
        radius,
        speed,
        axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize()
      });
    }
    worldGroup.add(orbitsGroup);

    // --- 3. Starfield ---
    const starCount = 1500;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 100;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.03,
      color: colorWhite,
      transparent: true,
      opacity: 0.3
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const coreLight = new THREE.PointLight(colorRed, 15, 40);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // --- Interactivity ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let proximity = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      proximity = Math.sqrt(targetX * targetX + targetY * targetY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      
      worldGroup.rotation.y = mouseX * 0.1;
      worldGroup.rotation.x = -mouseY * 0.1;

      // Pulse animation based on proximity
      const basePulse = Math.sin(time * 2);
      const proximityPulse = proximity * 0.5;
      const coreScale = 1 + (basePulse * 0.1) + proximityPulse;
      coreInner.scale.setScalar(coreScale);

      // Material color change based on mouse
      const colorMix = (Math.sin(time) + 1) / 2;
      coreInnerMat.color.lerpColors(colorOrangeRed, colorRed, Math.min(proximity, 1));
      coreInnerMat.emissive.lerpColors(colorOrangeRed, colorRed, colorMix * proximity);
      coreInnerMat.emissiveIntensity = 2 + (Math.sin(time * 5) * 0.5) + (proximity * 2);

      coreOuter.rotation.y += 0.005 + (proximity * 0.02);
      coreOuter.rotation.z += 0.003;

      ringSystems.forEach((sys) => {
        const positions = sys.particles.geometry.attributes.position.array as Float32Array;
        const radiusX = sys.radius;
        const radiusY = sys.radius * 0.8;
        
        for (let p = 0; p < particlesPerRing; p++) {
          const offset = (p / particlesPerRing) * Math.PI * 2;
          const angle = time * sys.speed * 20 + offset;
          positions[p * 3] = Math.cos(angle) * radiusX;
          positions[p * 3 + 1] = Math.sin(angle) * radiusY;
          positions[p * 3 + 2] = Math.sin(angle * 2) * 0.5;
        }
        sys.particles.geometry.attributes.position.needsUpdate = true;
        sys.ring.rotation.z += sys.speed * (1 + proximity);
      });

      stars.rotation.y += 0.0002;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      coreOuterGeo.dispose();
      coreOuterMat.dispose();
      coreInnerGeo.dispose();
      coreInnerMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      ringSystems.forEach(sys => {
        sys.ring.geometry.dispose();
        (sys.ring.material as THREE.Material).dispose();
        sys.particles.geometry.dispose();
        (sys.particles.material as THREE.Material).dispose();
      });
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-60 dark:opacity-40" 
      style={{ filter: 'contrast(1.2) brightness(1.1) saturate(1.2)' }}
    />
  );
};

export default Background3D;
import { useEffect } from 'react';

/**
 * Hook to manage dynamic meta tags and system-adaptive theme colors.
 * Handles the <meta name="theme-color"> tag for mobile browser integration.
 */
export const useThemeManager = () => {
  useEffect(() => {
    // 1. Initial Meta Tag Setup
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.setAttribute('name', 'theme-color');
      document.head.appendChild(metaTheme);
    }

    // 2. Theme Colors from index.css theme
    const darkColor = '#1C2128'; // --color-background-deep
    const secondaryDark = '#2D3333'; // --color-background

    // 3. System Theme Detection
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateThemeColor = () => {
      // Since the site is predominantly dark, we use the deep background color
      // for the tab color to ensure a seamless integration with mobile browser UI.
      const isDark = mediaQuery.matches;
      
      // We can also check if the site ever implements a light mode.
      // For now, we follow the site's dark theme but can adapt if needed.
      metaTheme?.setAttribute('content', isDark ? darkColor : secondaryDark);
      
      // Update color-scheme property
      document.documentElement.style.setProperty('color-scheme', isDark ? 'dark' : 'dark light');
    };

    // 4. Listen for system changes
    mediaQuery.addEventListener('change', updateThemeColor);
    
    // Initial call
    updateThemeColor();

    // 5. Dynamic Page Metadata (Example: Update on specific events or routes)
    const updateTitle = () => {
      // We could add logic here to prefix/suffix titles dynamically
      // For example, adding a status indicator during long-running tasks
    };

    updateTitle();

    return () => {
      mediaQuery.removeEventListener('change', updateThemeColor);
    };
  }, []);
};

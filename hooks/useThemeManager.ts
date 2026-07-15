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
    const themeBgColor = '#EDEDED'; // --color-bg-primary (Light Gray)

    const updateThemeColor = () => {
      metaTheme?.setAttribute('content', themeBgColor);

      // Update color-scheme property
      document.documentElement.style.setProperty('color-scheme', 'light');
    };

    // Initial call
    updateThemeColor();

    // 5. Dynamic Page Metadata (Example: Update on specific events or routes)
    const updateTitle = () => {
      // We could add logic here to prefix/suffix titles dynamically
      // For example, adding a status indicator during long-running tasks
    };

    updateTitle();
  }, []);
};

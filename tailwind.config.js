/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "outline-variant": "#c2c6d4",
        "secondary": "#006a62",
        "surface-container-high": "#e6e8ea",
        "outline": "#727783",
        "on-tertiary-container": "#ffcfb9",
        "background": "#f7f9fb",
        "surface-bright": "#f7f9fb",
        "tertiary": "#793100",
        "error-container": "#ffdad6",
        "on-primary-fixed-variant": "#00468c",
        "surface-container-lowest": "#ffffff",
        "surface-container-highest": "#e0e3e5",
        "surface-dim": "#d8dadc",
        "on-secondary-fixed": "#00201d",
        "secondary-fixed": "#7cf6e7",
        "surface": "#f7f9fb",
        "on-surface-variant": "#424752",
        "surface-container-low": "#f2f4f6",
        "surface-container": "#eceef0",
        "primary-fixed-dim": "#a9c7ff",
        "on-primary": "#ffffff",
        "primary-fixed": "#d6e3ff",
        "on-tertiary": "#ffffff",
        "inverse-surface": "#2d3133",
        "secondary-container": "#79f4e5",
        "primary-container": "#005eb8",
        "on-background": "#191c1e",
        "on-tertiary-fixed-variant": "#793100",
        "tertiary-fixed-dim": "#ffb691",
        "on-secondary-fixed-variant": "#005049",
        "secondary-fixed-dim": "#5ddacb",
        "on-secondary": "#ffffff",
        "error": "#ba1a1a",
        "surface-tint": "#005db6",
        "on-primary-fixed": "#001b3d",
        "on-primary-container": "#c8daff",
        "on-error-container": "#93000a",
        "inverse-primary": "#a9c7ff",
        "on-surface": "#191c1e",
        "tertiary-container": "#9f4300",
        "on-tertiary-fixed": "#341100",
        "inverse-on-surface": "#eff1f3",
        "primary": "#00478d",
        "tertiary-fixed": "#ffdbcb",
        "on-secondary-container": "#006f66",
        "surface-variant": "#e0e3e5",
        "on-error": "#ffffff"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "xl": "32px",
        "margin": "24px",
        "lg": "24px",
        "gutter": "20px",
        "base": "4px",
        "sm": "8px",
        "md": "16px",
        "xs": "4px"
      },
      fontFamily: {
        "label-md": ["Inter"],
        "headline-md": ["Inter"],
        "headline-lg": ["Inter"],
        "headline-xl": ["Inter"],
        "body-sm": ["Inter"],
        "body-md": ["Inter"],
        "data-mono": ["monospace"],
        "body-lg": ["Inter"]
      },
      fontSize: {
        "label-md": ["13px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "headline-md": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
        "headline-lg": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
        "headline-xl": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "body-sm": ["12px", {"lineHeight": "18px", "fontWeight": "400"}],
        "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
        "data-mono": ["14px", {"lineHeight": "20px", "fontWeight": "500"}],
        "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}]
      }
    }
  },
  plugins: []
}

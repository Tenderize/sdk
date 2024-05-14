export const defaultTheme = {
  spacing: "16px", //Todo: add spacing in app according to design needs
  fonts: {
    name: "'Lato', sans-serif",
    familyUrl:
      "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap",
  },
  colors: {
    lightMode: {
      border: "#eee",
      background: "#ffffff",
      midnight: "#303030",
      white: "#ffffff",
      primary: {
        DEFAULT: "#fd3f0f",
        accent: "#ffffff",
        foreground: "#3d3d3d",
      },
      secondary: {
        DEFAULT: "#d1d5db",
        foreground: "#9ca3af",
        accent: "#ffffff",
      },
      success: {
        DEFAULT: "#f0fdf4",
        foreground: "#166534",
      },
      card: {
        DEFAULT: "#f4f4f5",
      },
      disabled: {
        DEFAULT: "#f3f4f6",
        foreground: "#9ca3af",
      },
      panel: {
        DEFAULT: "#fff7ed",
        foreground: "#FED7CB",
      },
      badge: {
        error: "#ffe4e6",
        errorForeground: "#f87171",
        info: "#fed7aa",
        infoForeground: "#ea580c",
      },
    },
    // Todo: Dark mode colors need to work on this
    darkMode: {
      border: "#eee",
      background: "#ffffff",
      midnight: "#303030",
      primary: {
        DEFAULT: "#fd3f0f",
        accent: "#ffffff",
        foreground: "#3d3d3d",
      },
      secondary: {
        DEFAULT: "#d1d5db",
        foreground: "#9ca3af",
        accent: "#ffffff",
      },
      success: {
        DEFAULT: "#f0fdf4",
        foreground: "#166534",
      },
      card: {
        DEFAULT: "#f4f4f5",
      },
      disabled: {
        DEFAULT: "#f3f4f6",
        foreground: "#9ca3af",
      },
      panel: {
        DEFAULT: "#fff7ed",
        foreground: "#FED7CB",
      },
      badge: {
        error: "#ffe4e6",
        errorForeground: "#f87171",
        info: "#fed7aa",
        infoForeground: "#ea580c",
      },
    },
  },
};

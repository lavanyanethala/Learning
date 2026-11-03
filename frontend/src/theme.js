import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#2E5E99", // Royal Ocean Blue (Unified Button & Active Accent)
        light: "#7BA4D0",
        dark: "#1D406E",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#7BA4D0", // Steel Cyan/Blue Accent
        light: "#E7F0FA",
        dark: "#2E5E99",
        contrastText: "#0D2440",
      },
      background: {
        default: mode === "dark" ? "#0D2440" : "#E7F0FA", // Deep Midnight Navy / Ice Sky Pale Blue
        paper: mode === "dark" ? "#132F52" : "#FFFFFF",   // Midnight Navy Elevated Card / Pure White
      },
      text: {
        primary: mode === "dark" ? "#E7F0FA" : "#0D2440", // High contrast ice-blue on dark / Deep navy on light
        secondary: mode === "dark" ? "#8EAECF" : "#4A688C", // Steel Navy Muted
      },
      divider: mode === "dark" ? "rgba(123, 164, 208, 0.18)" : "rgba(46, 94, 153, 0.14)",
      success: {
        main: "#10B981",
        light: "#34D399",
        dark: "#059669",
      },
      warning: {
        main: "#F59E0B",
        light: "#FBBF24",
        dark: "#D97706",
      },
      error: {
        main: "#F43F5E",
        light: "#FB7185",
        dark: "#E11D48",
      },
    },
    typography: {
      fontFamily: [
        '"Plus Jakarta Sans"',
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
      h1: {
        fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
        fontWeight: 800,
        letterSpacing: "-0.038em",
        lineHeight: 1.12,
      },
      h2: {
        fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
        fontWeight: 800,
        letterSpacing: "-0.032em",
        lineHeight: 1.18,
      },
      h3: {
        fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
        fontWeight: 750,
        letterSpacing: "-0.028em",
        lineHeight: 1.22,
      },
      h4: {
        fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
        fontWeight: 750,
        letterSpacing: "-0.024em",
        lineHeight: 1.28,
      },
      h5: {
        fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.32,
      },
      h6: {
        fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
        fontWeight: 700,
        letterSpacing: "-0.015em",
        lineHeight: 1.38,
      },
      subtitle1: {
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontWeight: 650,
        letterSpacing: "-0.012em",
        lineHeight: 1.5,
      },
      subtitle2: {
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontWeight: 650,
        letterSpacing: "0.005em",
        lineHeight: 1.45,
      },
      body1: {
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        letterSpacing: "-0.012em",
        lineHeight: 1.6,
      },
      body2: {
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        letterSpacing: "-0.008em",
        lineHeight: 1.55,
      },
      button: {
        fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
        textTransform: "none",
        fontWeight: 700,
        letterSpacing: "0.01em",
      },
      caption: {
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        letterSpacing: "0.012em",
        lineHeight: 1.4,
      },
      overline: {
        fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
        letterSpacing: "0.09em",
        fontWeight: 800,
        textTransform: "uppercase",
      },
    },
    shape: {
      borderRadius: 18,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "8px 18px",
            boxShadow: "none",
            transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
            "&:hover": {
              transform: "translateY(-1.5px)",
              boxShadow: "0 6px 18px rgba(46, 94, 153, 0.28)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          },
          containedPrimary: {
            backgroundColor: "#2E5E99",
            color: "#ffffff",
            boxShadow: "0 4px 14px rgba(46, 94, 153, 0.32)",
            "&:hover": {
              backgroundColor: "#1D406E",
              boxShadow: "0 6px 20px rgba(46, 94, 153, 0.42)",
            },
          },
          outlinedPrimary: {
            borderColor: "#2E5E99",
            color: "#2E5E99",
            "&:hover": {
              borderColor: "#1D406E",
              backgroundColor: "rgba(46, 94, 153, 0.08)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            backgroundColor: mode === "dark" ? "#132F52" : "#FFFFFF",
            border:
              mode === "dark"
                ? "1px solid rgba(123, 164, 208, 0.18)"
                : "1px solid rgba(46, 94, 153, 0.14)",
            boxShadow:
              mode === "dark"
                ? "0 8px 30px -4px rgba(5, 14, 26, 0.7)"
                : "0 4px 20px -2px rgba(46, 94, 153, 0.06), 0 2px 6px -1px rgba(46, 94, 153, 0.03)",
            transition:
              "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease",
            "&:hover": {
              borderColor:
                mode === "dark"
                  ? "rgba(123, 164, 208, 0.5)"
                  : "rgba(46, 94, 153, 0.4)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: 20,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
            fontWeight: 700,
            borderRadius: 9999,
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "scale(1.02)",
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
            fontWeight: 700,
            textTransform: "none",
            letterSpacing: "0.01em",
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
            fontWeight: 800,
            letterSpacing: "-0.02em",
          },
        },
      },
    },
  });

import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px", 
        disabledOpacity: 0.45, 
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "0.9375rem",
          large: "1.125rem",
        },
        lineHeight: {
          tiny: "1rem", 
          small: "1.25rem", 
          medium: "1.5rem", 
          large: "1.75rem", 
        },
        radius: {
          small: "4px", 
          medium: "6px", 
          large: "8px", 
        },
        borderWidth: {
          small: "1px", 
          medium: "1px", 
          large: "2px", 
        },
      },
      themes: {
        light: {
          colors: {
            background: {
              DEFAULT: "#0f172a"
            },
            content1: {
              DEFAULT: "#1e293b",
              foreground: "#f8fafc"
            },
            content2: {
              DEFAULT: "#334155",
              foreground: "#f8fafc"
            },
            content3: {
              DEFAULT: "#475569",
              foreground: "#f8fafc"
            },
            content4: {
              DEFAULT: "#64748b",
              foreground: "#f8fafc"
            },
            divider: {
              DEFAULT: "rgba(148, 163, 184, 0.2)"
            },
            focus: {
              DEFAULT: "#38bdf8"
            },
            foreground: {
              DEFAULT: "#f8fafc",
              50: "#f8fafc",
              100: "#f1f5f9",
              200: "#e2e8f0",
              300: "#cbd5e1",
              400: "#94a3b8",
              500: "#64748b",
              600: "#475569",
              700: "#334155",
              800: "#1e293b",
              900: "#0f172a"
            },
            primary: {
              50: "#f0f9ff",
              100: "#e0f2fe",
              200: "#bae6fd",
              300: "#7dd3fc",
              400: "#38bdf8",
              500: "#0ea5e9",
              600: "#0284c7",
              700: "#0369a1",
              800: "#075985",
              900: "#0c4a6e",
              DEFAULT: "#0ea5e9",
              foreground: "#ffffff"
            },
            success: {
              50: "#f0fdf4",
              100: "#dcfce7",
              200: "#bbf7d0",
              300: "#86efac",
              400: "#4ade80",
              500: "#22c55e",
              600: "#16a34a",
              700: "#15803d",
              800: "#166534",
              900: "#14532d",
              DEFAULT: "#22c55e",
              foreground: "#ffffff"
            },
            danger: {
              50: "#fef2f2",
              100: "#fee2e2",
              200: "#fecaca",
              300: "#fca5a5",
              400: "#f87171",
              500: "#ef4444",
              600: "#dc2626",
              700: "#b91c1c",
              800: "#991b1b",
              900: "#7f1d1d",
              DEFAULT: "#ef4444",
              foreground: "#ffffff"
            },
            warning: {
              50: "#fffbeb",
              100: "#fef3c7",
              200: "#fde68a",
              300: "#fcd34d",
              400: "#fbbf24",
              500: "#f59e0b",
              600: "#d97706",
              700: "#b45309",
              800: "#92400e",
              900: "#78350f",
              DEFAULT: "#f59e0b",
              foreground: "#ffffff"
            }
          }
        },
        dark: {
          colors: {
            background: {
              DEFAULT: "#0f172a"
            },
            content1: {
              DEFAULT: "#1e293b",
              foreground: "#f8fafc"
            },
            content2: {
              DEFAULT: "#334155",
              foreground: "#f8fafc"
            },
            content3: {
              DEFAULT: "#475569",
              foreground: "#f8fafc"
            },
            content4: {
              DEFAULT: "#64748b",
              foreground: "#f8fafc"
            },
            divider: {
              DEFAULT: "rgba(148, 163, 184, 0.2)"
            },
            focus: {
              DEFAULT: "#38bdf8"
            },
            foreground: {
              DEFAULT: "#f8fafc",
              50: "#0f172a",
              100: "#1e293b",
              200: "#334155",
              300: "#475569",
              400: "#64748b",
              500: "#94a3b8",
              600: "#cbd5e1",
              700: "#e2e8f0",
              800: "#f1f5f9",
              900: "#f8fafc"
            },
            primary: {
              50: "#0c4a6e",
              100: "#075985",
              200: "#0369a1",
              300: "#0284c7",
              400: "#0ea5e9",
              500: "#38bdf8",
              600: "#7dd3fc",
              700: "#bae6fd",
              800: "#e0f2fe",
              900: "#f0f9ff",
              DEFAULT: "#38bdf8",
              foreground: "#0f172a"
            },
            success: {
              50: "#14532d",
              100: "#166534",
              200: "#15803d",
              300: "#16a34a",
              400: "#22c55e",
              500: "#4ade80",
              600: "#86efac",
              700: "#bbf7d0",
              800: "#dcfce7",
              900: "#f0fdf4",
              DEFAULT: "#22c55e",
              foreground: "#ffffff"
            },
            danger: {
              50: "#7f1d1d",
              100: "#991b1b",
              200: "#b91c1c",
              300: "#dc2626",
              400: "#ef4444",
              500: "#f87171",
              600: "#fca5a5",
              700: "#fecaca",
              800: "#fee2e2",
              900: "#fef2f2",
              DEFAULT: "#ef4444",
              foreground: "#ffffff"
            },
            warning: {
              50: "#78350f",
              100: "#92400e",
              200: "#b45309",
              300: "#d97706",
              400: "#f59e0b",
              500: "#fbbf24",
              600: "#fcd34d",
              700: "#fde68a",
              800: "#fef3c7",
              900: "#fffbeb",
              DEFAULT: "#f59e0b",
              foreground: "#ffffff"
            }
          }
        }
      }
    })
  ]
}

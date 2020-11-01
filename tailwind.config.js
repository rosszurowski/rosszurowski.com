module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./layouts/**/*.html", "./assets/**/*.{js,jsx,ts,tsx}"],
  },
  theme: {
    fontFamily: {
      sans: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      mono: [
        "SFMono-Regular",
        "Consolas",
        "Liberation Mono",
        "Menlo",
        "monospace",
      ],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#fafafa",
      black: "#141414",
      gray: "#777777",
      lightGray: "#f2f2f2",
      purple: "#926ee8",
      purpleFaded: "rgba(146, 110, 232, 0.7)",
      purpleVeryFaded: "rgba(146, 110, 232, 0.35)",
      pink: "#ffb7b3",
    },
  },
  variants: {},
};

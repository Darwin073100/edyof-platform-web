const config = {
  content: [
    "./src/presentation/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/presentation/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        magic: {
          primary: "#b8d43f",
          secondary: "#5ea7e9",
          warning: "#f2ee4c",
        },
      },
    },
  },
  plugins: [],
};

export default config;

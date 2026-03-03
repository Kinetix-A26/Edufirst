import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#9156FF",
                "primary-light": "#E9DDFF",
                "edu-bg": "#F8FAFC",
                "edu-text": "#0F172A",
                "edu-text-dark": "#0F172A",
                "edu-primary": "#9156FF",
                "edu-primary-light": "#E9DDFF",
                "edu-card": "#FFFFFF",
                "edu-soft": "#F1F5F9",
                "edu-text-main": "#0F172A",
                "edu-border": "#E2E8F0",
                "edu-emerald": "#10B981",
                "muted-text": "#64748B",
            },
            borderRadius: {
                edu: "14px",
                "edu-xl": "14px",
            },
            boxShadow: {
                soft: "0 2px 8px rgba(15, 23, 42, 0.06)",
            },
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                edufirst: {
                    primary: "#9156FF",
                    "base-100": "#F8FAFC",
                },
            },
        ],
    },
};

export default config;

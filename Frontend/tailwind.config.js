/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1af2b5",
          
          "secondary": "#70bfcc",
                   
          "accent": "#38c910",
                   
          "neutral": "#191D2E",
                   
          "base-100": "#263740",
                   
          "info": "#3B65CE",
                   
          "success": "#24BC7F",
                   
          "warning": "#F28C18",
                   
          "error": "#FA1930",
        },
      },
    ],
  },
  theme: {
    extend: {

      fontFamily : {
        
        aldrich: ["Aldrich"]

      }
    },
  },
  plugins: [require("daisyui")],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        pixelify: ['"Pixelify Sans"', 'serif'],
        honk: ['"Honk"', 'display'],
        silkscreen: ['"Silkscreen"', 'display'],
        pressstart2p: ['"Press Start 2P"'],
        jacquardaBastarda: ['"Jacquarda Bastarda 9"'],
        micro5: ['"Micro 5"'],
        rockSalt: ['"Rock Salt"'],
        kranky: ['"Kranky"'],
      },
      colors: {
        winGreen: "#008081",
        winDarkGreen: "#286061",
        winGray: "#c0c0c0",
        winBlue: "#0F30B7",
        winPurple: "#8E0384",
        winRed: "#8E0101",
        bgColor: "#6F9CEB",
        bgColor2: "#E09F7D",
        bgColor3: "#FF7F51",
        dark: "#202223",
      }
    },
  },
  plugins: [],
}


/**
 *

colors:

#008081 - бирюзовый
#c0c0c0 - серый
#0F30B7 - синий
#ffffff - белый

*/
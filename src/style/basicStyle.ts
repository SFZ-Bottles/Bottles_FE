const MEDIA = {
  mobile: "414px",
  tablet: "820px",
  laptop: "1440px",
};

const COLOR = {
  main: "#37C3FF",
  sub: "#1ECDFF",
  hover: "#00AEF8",
  focus: "#85DAFF",
  common: {
    white: "#FFF",
    black: "#000",
    gray: {
      100: "#EEE", // shape 용도
      200: "#777", // text 용도
      300: "#AAA", // button 용도
      400: "#CCC", // select 용도
    },
  },
  success: "#1B842C",
  error: "#F44336",
};

const FONT_SIZE = {
  tiny: "1.4rem",
  small: "1.8rem",
  medium: "2.0rem",
  large: "2.4rem",
  big: "3.2rem",
  huge: "4.8rem",
};

const FONT_WEIGHT = {
  light: 500,
  regular: 600,
  bold: 800,
};

const BORDER_WEIGHT = {
  light: "1px",
  regular: "2px",
  bold: "3px",
  none: "none",
};

const basicCSS = {
  MEDIA,
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  BORDER_WEIGHT,
};

export default basicCSS;

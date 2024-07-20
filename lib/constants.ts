function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export const NAV_THEME = {
  light: {
    background: hslToHex(147, 41, 98), // background
    border: hslToHex(147, 10, 93), // border
    card: hslToHex(147, 41, 97), // card
    notification: hslToHex(0, 88, 30), // destructive
    primary: hslToHex(147, 72, 55), // primary
    text: hslToHex(147, 74, 4), // foreground
    secondary: hslToHex(267, 72, 55),
    accent: hslToHex(27, 72, 55),
  },
  dark: {
    background: hslToHex(147, 59, 0), // background
    border: hslToHex(147, 10, 10), // border
    card: hslToHex(0, 0, 1), // card
    notification: hslToHex(0, 88, 59), // destructive
    primary: hslToHex(147, 72, 85), // primary
    text: hslToHex(147, 26, 98), // foreground
    secondary: hslToHex(267, 72, 85),
    accent: hslToHex(27, 72, 85),
  },
};

export const STORAGE_AUTH_KEY = "auth_token_storage_key";

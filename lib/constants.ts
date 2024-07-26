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
    background: hslToHex(0, 0, 100), // background
    border: hslToHex(20, 5.9, 90), // border
    card: hslToHex(0, 0, 100), // card
    notification: hslToHex(0, 84.2, 60.2), // destructive
    primary: hslToHex(47.9, 95.8, 53.1), // primary
    text: hslToHex(20, 14.3, 4.1), // foreground
    secondary: hslToHex(60, 4.8, 95.9), // secondary
    accent: hslToHex(60, 4.8, 95.9), // accent
  },
  dark: {
    background: hslToHex(20, 14.3, 4.1), // background
    border: hslToHex(12, 6.5, 15.1), // border
    card: hslToHex(20, 14.3, 4.1), // card
    notification: hslToHex(0, 62.8, 30.6), // destructive
    primary: hslToHex(47.9, 95.8, 53.1), // primary
    text: hslToHex(60, 9.1, 97.8), // foreground
    secondary: hslToHex(12, 6.5, 15.1), // secondary
    accent: hslToHex(12, 6.5, 15.1), // accent
  },
};

export const STORAGE_AUTH_KEY = "auth_token_storage_key";

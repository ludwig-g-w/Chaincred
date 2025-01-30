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
    background: hslToHex(0, 0, 100), // White background
    border: hslToHex(220, 13, 91), // Light gray-blue border
    card: hslToHex(0, 0, 100), // White cards
    notification: hslToHex(0, 84, 60), // Red for errors/destructive
    primary: hslToHex(221, 83, 53), // Coinbase blue (#1652F0)
    text: hslToHex(224, 71, 4), // Dark navy text
    secondary: hslToHex(221, 83, 90), // Light blue secondary
    accent: hslToHex(221, 83, 40), // Darker blue accent
  },
  dark: {
    background: hslToHex(224, 71, 4), // Dark navy background
    border: hslToHex(224, 71, 15), // Medium navy border
    card: hslToHex(224, 71, 6), // Slightly darker navy cards
    notification: hslToHex(0, 84, 50), // Brighter red for dark mode
    primary: hslToHex(221, 83, 60), // Bright Coinbase blue
    text: hslToHex(210, 17, 98), // Off-white text
    secondary: hslToHex(221, 83, 20), // Dark blue secondary
    accent: hslToHex(221, 83, 50), // Medium blue accent
  },
};

export const STORAGE_AUTH_KEY = "auth_token_storage_key";

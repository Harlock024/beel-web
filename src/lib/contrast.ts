function getRelativeLuminance(hexColor: string): number {
  const r = parseInt(hexColor.slice(1, 3), 16) / 255;
  const g = parseInt(hexColor.slice(3, 5), 16) / 255;
  const b = parseInt(hexColor.slice(5, 7), 16) / 255;

  const sRGB = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * sRGB(r) + 0.7152 * sRGB(g) + 0.0722 * sRGB(b);
}

export function getContrastTextColor(bgColor: string): string {
  const bgLuminance = getRelativeLuminance(bgColor);

  const whiteLuminance = getRelativeLuminance("#FFFFFF");
  const contrastWithWhite =
    (Math.max(whiteLuminance, bgLuminance) + 0.05) /
    (Math.min(whiteLuminance, bgLuminance) + 0.05);

  return contrastWithWhite >= 4.5 ? "#FFFFFF" : "#000000";
}

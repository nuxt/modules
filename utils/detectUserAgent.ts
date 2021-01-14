export function detectMobile(): boolean {
  const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ];

  return toMatch.some((toMatchItem: RegExp) => {
      return navigator.userAgent.match(toMatchItem);
  });
}
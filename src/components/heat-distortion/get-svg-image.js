// @flow

const getSVGCode = (width: number, height: number) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <g fill="#f79e98">
      <rect x="25%" y="15%" width="60%" height="120" transform="rotate(-20)" />
      <circle cx="50%" cy="43%" r="140" />
      <rect x="150" y="700" width="55%" height="80" transform="rotate(8 15 700)" />
    </g>
  </svg>
`;

const fallback = (
  width: number,
  height: number,
): Promise<HTMLImageElement> => Promise.resolve(new Image());

const getSVGImage = (() => {
  if (typeof global.window === 'undefined') {
    return fallback;
  }

  const w = global.window.URL || global.window.webkitURL || global.window;

  if (!w) {
    return fallback;
  }

  return (
    width: number,
    height: number,
  ): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const normalizedWidth = width / window.devicePixelRatio;
      const normalizedHeight = height / window.devicePixelRatio;

      const data = getSVGCode(normalizedWidth, normalizedHeight)
      const img = new Image();

      img.addEventListener('load', () => {
        resolve(img);
      });

      img.addEventListener('error', () => {
        reject();
      });

      img.crossOrigin = 'anonymous';
      img.src = `data:image/svg+xml;base64,${btoa(data)}`;
    });
})();

export default getSVGImage;

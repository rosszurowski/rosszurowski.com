// @flow

const getSVGCode = (html: string, width: number, height: number) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml">
        ${html}
      </div>
    </foreignObject>
  </svg>
`;

const fallback = (
  html: string,
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
    html: string,
    width: number,
    height: number,
  ): Promise<HTMLImageElement> =>
    new Promise(resolve => {
      const normalizedWidth = width / window.devicePixelRatio;
      const normalizedHeight = height / window.devicePixelRatio;

      const data = getSVGCode(html, normalizedWidth, normalizedHeight);
      const img = new Image();

      img.onload = () => {
        resolve(img);
      };

      img.crossOrigin = 'anonymous';
      img.src = `data:image/svg+xml;charset=utf-8,${data}`;
    });
})();

export default getSVGImage;

// @flow

// const getSVGCode = (html: string, width: number, height: number) => `
//   <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 100 100">
//     <g fill="#ced4da" fill-rule="evenodd">
//       <path d="m61 107h198v175h-198z"/>
//       <path d="m86 349h236v201h-236z"/>
//       </g>
//   </svg>
// `;
// <div style="background-color: #f79e98; width: 500px; height: 150px; transform: rotate(${randomInt(
//   -90,
//   -20,
// )}deg)"></div>
// <div style="background-color: #f79e98; width: 210px; height: 200px; transform: rotate(${randomInt(
//   -50,
//   -20,
// )}deg)"></div>
// <div style="background-color: #f79e98; width: 320px; height: 80px; transform: rotate(${randomInt(
//   -90,
//   90,
// )}deg)"></div>

const getSVGCode = (width: number, height: number) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <g fill="#f79e98">
      <rect x="25%" y="15%" width="60%" height="120" transform="rotate(-20)" />
      <circle cx="50%" cy="43%" r="200" width="33%" height="200" />
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

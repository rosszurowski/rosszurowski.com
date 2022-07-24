type ImageGetter = (
  svg: string,
  width: number,
  height: number
) => Promise<HTMLImageElement>

const getImage: ImageGetter = (() => {
  if (typeof window === "undefined") {
    return () => Promise.resolve(new Image())
  }

  return (
    svg: string,
    width: number,
    height: number
  ): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const normalizedWidth = width / window.devicePixelRatio
      const normalizedHeight = height / window.devicePixelRatio

      const data = `<svg xmlns="http://www.w3.org/2000/svg" width="${normalizedWidth}" height="${normalizedHeight}">${svg}</svg>`
      const img = new Image()

      img.addEventListener("load", () => {
        resolve(img)
      })

      img.addEventListener("error", () => {
        reject()
      })

      img.crossOrigin = "anonymous"
      img.src = `data:image/svg+xml;base64,${window.btoa(data)}`
    })
})()

export default getImage

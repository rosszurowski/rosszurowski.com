import { ImageResponse } from "next/og"
import fs from "node:fs/promises"

type Props = {
  title?: string
}

export async function generateImage(props: Props) {
  return new ImageResponse(<OgImage {...props} />, {
    width: 1200,
    height: 630,
    fonts: await loadFonts(),
  })
}

async function loadFonts(): Promise<
  Array<{
    name: string
    data: Buffer | ArrayBuffer
    weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
    style: "normal" | "italic"
  }>
> {
  const interSemibold = await fs.readFile("./src/assets/Inter-SemiBold.ttf")
  return [
    {
      name: "Inter",
      data: interSemibold,
      weight: 600,
      style: "normal",
    },
  ]
}

function OgImage({ title }: Props) {
  if (!title) {
    return (
      <div tw="bg-[#141414] w-full h-full flex p-24 flex-col flex-nowrap">
        <div tw="flex w-full h-full items-center content-center justify-center pr-4">
          <svg
            width="129"
            height="60"
            viewBox="0 0 200 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M75 93.7493L0 25L25 0L75 50L125 0L200 68.75L175 93.7493L125 43.75L75 93.7493Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    )
  }
  return (
    <div tw="bg-[#141414] w-full h-full flex p-24 flex-col flex-nowrap">
      <div tw="flex">
        <svg
          width="86"
          height="40"
          viewBox="0 0 200 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M75 93.7493L0 25L25 0L75 50L125 0L200 68.75L175 93.7493L125 43.75L75 93.7493Z"
            fill="white"
          />
        </svg>
      </div>
      <div
        tw="text-white text-[5.25rem] font-semibold leading-[1.125] mt-auto"
        style={{
          fontFamily: "Inter",
          letterSpacing: "-0.025em",
          whiteSpace: "pre-wrap",
        }}
      >
        {title}
      </div>
    </div>
  )
}

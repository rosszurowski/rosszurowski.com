import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

// Make sure the font exists in the specified path:
const interSemibold = fetch(
  new URL("src/assets/Inter-SemiBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const fontData = await interSemibold
    const title = searchParams.get("title")?.slice(0, 100)

    return new ImageResponse(
      title ? (
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
      ) : (
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
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            weight: 600,
            style: "normal",
          },
        ],
      }
    )
  } catch (e: any) {
    console.error(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

import Link from "next/link"

export default function Squiggle() {
  return (
    <Link href="/">
      <a>
        <svg
          viewBox="0 0 34 10"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
        >
          <path
            d="M13.739 0L7.253 6.34 1.538.753 0 2.326l7.253 7.088 6.486-6.336 6.486 6.336 6.496-6.338 5.731 5.588 1.536-1.573L26.72.003l-6.496 6.336z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      </a>
    </Link>
  )
}

export type IconName = keyof typeof icons

type Props = {
  name: IconName
  className?: string
  size?: number | string
}

export default function Icon(props: Props) {
  const { name, className, size = 24 } = props
  const path = icons[name]

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      {path}
    </svg>
  )
}

const icons = {
  "arrow-right": (
    <path
      d="M.216 11.359v2.819h18.401L10.24 22.87l2.114 1.918 11.276-11.941L12.314.788l-2.153 1.88 8.339 8.691z"
      fill="currentColor"
      fillRule="evenodd"
    />
  ),
  cycle: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </g>
  ),
  play: (
    <g
      fill="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </g>
  ),
  pause: (
    <g fill="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.83333 3C5.3731 3 5 3.44772 5 4V20C5 20.5523 5.3731 21 5.83333 21H9.16667C9.6269 21 10 20.5523 10 20V4C10 3.44772 9.6269 3 9.16667 3H5.83333ZM14.8333 3C14.3731 3 14 3.44772 14 4V20C14 20.5523 14.3731 21 14.8333 21H18.1667C18.6269 21 19 20.5523 19 20V4C19 3.44772 18.6269 3 18.1667 3H14.8333Z" />
    </g>
  ),
  "dead-folder": (
    <g fill="currentColor" fillRule="evenodd">
      <path d="m1.5 1.5h7.5v1.5h-7.5z" />
      <path d="m4.5 9h1.5v1.5h-1.5z" />
      <path d="m7.5 9h1.5v1.5h-1.5z" />
      <path d="m6 10.5h1.5v1.5h-1.5z" />
      <path d="m4.5 12h1.5v1.5h-1.5z" />
      <path d="m7.5 12h1.5v1.5h-1.5z" />
      <path d="m15 12h1.5v1.5h-1.5z" />
      <path d="m16.5 10.5h1.5v1.5h-1.5z" />
      <path d="m18 12h1.5v1.5h-1.5z" />
      <path d="m18 9h1.5v1.5h-1.5z" />
      <path d="m15 9h1.5v1.5h-1.5z" />
      <path d="m16.5 3h1.5v1.5h-1.5z" />
      <path d="m4.5 16.5h1.5v1.5h-1.5z" />
      <path d="m6 16.5h1.5v1.5h-1.5z" />
      <path d="m7.5 15h1.5v1.5h-1.5z" />
      <path d="m9 15h1.5v1.5h-1.5z" />
      <path d="m10.5 15h1.5v1.5h-1.5z" />
      <path d="m12 15h1.5v1.5h-1.5z" />
      <path d="m13.5 16.5h1.5v1.5h-1.5z" />
      <path d="m15 16.5h1.5v1.5h-1.5z" />
      <path d="m16.5 18h1.5v1.5h-1.5z" />
      <path d="m18 18h1.5v1.5h-1.5z" />
      <path d="m0 3h1.5v19.5h-1.5z" />
      <path d="m1.5 21h21v1.5h-21z" />
      <path d="m22.5 6h1.5v16.5h-1.5z" />
      <path d="m9 3h1.5v3h-1.5z" />
      <path d="m10.5 4.5h12v1.5h-12z" />
      <path d="m10.5 1.5h6v1.5h-6z" />
    </g>
  ),
}

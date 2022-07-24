type Props = {
  name: keyof typeof icons
  className?: string
  width?: number
  height?: number
}

export default function Icon(props: Props) {
  const { name, className, width = 24, height = 24 } = props
  const path = icons[name]

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
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

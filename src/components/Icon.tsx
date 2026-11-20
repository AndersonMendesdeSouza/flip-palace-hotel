import type { ReactNode } from 'react'

const paths = {
  bed: (
    <>
      <path d="M3 18v3m18-3v3M3 18h18v-7H3v7Zm2-7V5h14v6M5 8h6v3m2 0V8h6" />
    </>
  ),
  wifi: (
    <>
      <path d="M2 8.5a16 16 0 0 1 20 0M5.5 12a11 11 0 0 1 13 0M9 15.5a5.5 5.5 0 0 1 6 0" />
      <circle cx="12" cy="19" r=".8" />
    </>
  ),
  car: (
    <>
      <path d="m4 10 2-6h12l2 6M3 18V11l2-1h14l2 1v7H3Zm2 0v3m14-3v3M3 14h18M6 12.5h2m8 0h2" />
    </>
  ),
  snow: (
    <>
      <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 3l3 3 3-3M9 21l3-3 3 3M3 10l4-1-1-4m15 9-4 1 1 4M3 14l4 1-1 4m15-9-4-1 1-4" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm13 1h2a3 3 0 0 1 0 6h-2M3 22h16M8 2v3m5-3v3" />
    </>
  ),
  bell: (
    <>
      <path d="M4 17h16l-2-3V9a6 6 0 0 0-12 0v5l-2 3Zm5 3a3 3 0 0 0 6 0M12 1v2" />
    </>
  ),
  utensils: (
    <>
      <path d="M4 2v6a3 3 0 0 0 6 0V2M7 2v20M16 13h4V2c-4 0-5 5-4 11Zm4 0v9" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 22v-3a8 8 0 0 1 16 0v3H4Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M2 21v-3a7 7 0 0 1 14 0v3H2ZM16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 4 5v2h-3" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: <path d="m8 3 3 5-3 2a16 16 0 0 0 6 6l2-3 5 3-1 4c-1 4-10-1-14-5S-3 2 4 2l4 1Z" />,
  whatsapp: (
    <>
      <path d="M20.5 11.5a9 9 0 0 1-13.3 8L2 21l1.5-5.1a9 9 0 1 1 17-4.4Z" />
      <path d="m8 7 1.5 3-1 1c1 2 2 3 4 4l1-1 3 1.5c-1 4-5 2-8-1S4 8 8 7Z" />
    </>
  ),
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  left: <path d="m15 5-7 7 7 7" />,
  right: <path d="m9 5 7 7-7 7" />,
  check: <path d="m5 12 4 4L19 6" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="17" rx="2" />
      <path d="M7 2v6m10-6v6M3 11h18m-14 4h2m3 0h2m-7 4h2" />
    </>
  ),
  tv: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="1" />
      <path d="M12 17v4m-5 0h10" />
    </>
  ),
  fridge: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="1" />
      <path d="M5 8h14M8 4v2m0 5v4" />
    </>
  ),
  size: <path d="M3 9V3h6m6 0h6v6M3 15v6h6m6 0h6v-6M3 3l6 6m6 6 6 6M21 3l-6 6M9 15l-6 6" />,
  shower: (
    <>
      <path d="M5 9a7 7 0 0 1 14 0H5Zm7-7V1m-6 12v2m6-2v2m6-2v2M8 18v2m8-2v2m-4 1v2" />
    </>
  ),
  desk: (
    <>
      <path d="M3 9h18M5 9V3h14v6M4 9v12m16-12v12M4 15h16M7 18h3m4 0h3" />
    </>
  ),
  hanger: <path d="M10 6a2 2 0 1 1 3 2l-1 1v3L2 19v2h20v-2l-10-7" />,
  curtain: (
    <>
      <path d="M3 3h18v19H3V3Zm9 0c0 9-2 13-9 15m9-15c0 9 2 13 9 15M7 17l1 5m9-5-1 5" />
    </>
  ),
  plug: (
    <>
      <path d="M8 2v5m8-5v5M5 7h14v5a7 7 0 0 1-14 0V7Zm7 12v4M9 11v3m6-3v3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  expand: <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />,
  leaf: (
    <>
      <path d="M20 3C8 1 1 9 5 16s17 2 15-13ZM4 21 16 8" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof paths

export default function Icon({
  name,
  size = 24,
  className = '',
}: {
  name: IconName
  size?: number
  className?: string
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

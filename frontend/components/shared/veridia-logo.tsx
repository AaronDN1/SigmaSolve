import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function VeridiaLogo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("h-10 w-10", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="veridia-leaf-fill" x1="14" y1="10" x2="50" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7CC493" />
          <stop offset="0.48" stopColor="#3C9B5F" />
          <stop offset="1" stopColor="#1C6F45" />
        </linearGradient>
      </defs>
      <path
        d="M49.8 12.6C38.8 13.6 24 21.3 18.6 33.4c-3.7 8.3-1.8 17.2 7.2 19.9 9.1 2.8 19-3 23.6-11.1 5.4-9.4 5.6-20 6-27.2.1-1.6-1-2.6-2.6-2.4Z"
        fill="url(#veridia-leaf-fill)"
      />
      <path
        d="M22 44.2c5.4-9.5 13.4-18 24.4-24.4"
        stroke="rgba(245,255,248,0.92)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M30.2 32.8c3 1.5 5.8 3.8 7.9 6.5"
        stroke="rgba(245,255,248,0.82)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M36.2 27.7c1.6.7 3.3 1.9 4.8 3.4"
        stroke="rgba(245,255,248,0.78)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

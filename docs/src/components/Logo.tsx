export const MobileLogo = ({
  className = '',
  size = 32,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-primary ${className}`}
    >
      <rect x="2" y="2" width="28" height="28" rx="8" fill="currentColor" />
      <path
        d="M10 20L16 12L22 20"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function Crescent({ size = 30, className = "" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <path d="M22 4.5A12.5 12.5 0 1 0 22 27.5 10 10 0 0 1 22 4.5z" fill="currentColor" />
      <path d="M24.5 11l1.1 2.4 2.6.3-1.9 1.8.5 2.6-2.3-1.3-2.3 1.3.5-2.6-1.9-1.8 2.6-.3z" fill="currentColor" />
    </svg>
  );
}

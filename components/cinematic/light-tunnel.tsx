export function LightTunnel({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`light-tunnel ${className}`.trim()}
    />
  )
}

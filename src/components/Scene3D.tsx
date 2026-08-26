function Cube({ className }: { className: string }) {
  return (
    <span className={`cube-3d ${className}`} aria-hidden="true">
      <span className="cube-face cube-front" />
      <span className="cube-face cube-back" />
      <span className="cube-face cube-right" />
      <span className="cube-face cube-left" />
      <span className="cube-face cube-top" />
      <span className="cube-face cube-bottom" />
    </span>
  )
}

export function Scene3D() {
  return (
    <div className="scene-3d pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <Cube className="cube-a" />
      <Cube className="cube-b" />
      <Cube className="cube-c" />
      <Cube className="cube-d" />
    </div>
  )
}

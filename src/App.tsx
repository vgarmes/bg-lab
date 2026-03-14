import { useState } from 'react'
import './App.css'

function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`
}

function App() {
  const [gridEnabled, setGridEnabled] = useState(true)
  const [gridSize, setGridSize] = useState(45)
  const [lineColor, setLineColor] = useState('#888888')
  const [lineOpacity, setLineOpacity] = useState(30)
  const [gradientAngle, setGradientAngle] = useState(-20)
  const [gradientStop, setGradientStop] = useState(50)

  const line = hexToRgba(lineColor, lineOpacity)

  const bgStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: -1,
    pointerEvents: 'none',
    background: gridEnabled
      ? `linear-gradient(90deg, ${line} 1px, transparent 1px ${gridSize}px) 50% 50% / ${gridSize}px ${gridSize}px,
         linear-gradient(${line} 1px, transparent 1px ${gridSize}px) 50% 50% / ${gridSize}px ${gridSize}px`
      : 'none',
    WebkitMask: `linear-gradient(${gradientAngle}deg, transparent ${gradientStop}%, white)`,
    mask: `linear-gradient(${gradientAngle}deg, transparent ${gradientStop}%, white)`,
  }

  return (
    <>
      <div style={bgStyle} aria-hidden="true" />
      <div className="controls-panel">
        <p className="controls-title">bg-lab</p>

        <section className="controls-section">
          <div className="section-header">
            <h4>Grid</h4>
            <label className="toggle">
              <input
                type="checkbox"
                checked={gridEnabled}
                onChange={e => setGridEnabled(e.target.checked)}
              />
              {gridEnabled ? 'on' : 'off'}
            </label>
          </div>
          <div className={gridEnabled ? undefined : 'controls-disabled'}>
            <label className="control-row">
              <span>Size</span>
              <input
                type="range"
                min={10}
                max={100}
                value={gridSize}
                onChange={e => setGridSize(Number(e.target.value))}
              />
              <span className="value">{gridSize}px</span>
            </label>
            <label className="control-row">
              <span>Color</span>
              <input
                type="color"
                value={lineColor}
                onChange={e => setLineColor(e.target.value)}
              />
              <span />
            </label>
            <label className="control-row">
              <span>Opacity</span>
              <input
                type="range"
                min={0}
                max={100}
                value={lineOpacity}
                onChange={e => setLineOpacity(Number(e.target.value))}
              />
              <span className="value">{lineOpacity}%</span>
            </label>
          </div>
        </section>

        <section className="controls-section">
          <h4>Gradient Mask</h4>
          <label className="control-row">
            <span>Angle</span>
            <input
              type="range"
              min={-180}
              max={180}
              value={gradientAngle}
              onChange={e => setGradientAngle(Number(e.target.value))}
            />
            <span className="value">{gradientAngle}°</span>
          </label>
          <label className="control-row">
            <span>Stop</span>
            <input
              type="range"
              min={0}
              max={100}
              value={gradientStop}
              onChange={e => setGradientStop(Number(e.target.value))}
            />
            <span className="value">{gradientStop}%</span>
          </label>
        </section>
      </div>
    </>
  )
}

export default App

import { tickerItems } from '../data/content.js'

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track ticker-track--static">
        {tickerItems.map((item, i) => (
          <span className="t-item" key={i}>
            <span className="t-dot">·</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

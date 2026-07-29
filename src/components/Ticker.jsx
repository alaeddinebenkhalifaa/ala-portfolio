import { tickerItems } from '../data/content.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Ticker() {
  const { lang } = useLanguage()
  const items = tickerItems[lang]

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track ticker-track--static">
        {items.map((item, i) => (
          <span className="t-item" key={i}>
            <span className="t-dot">·</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

import { createContext, useContext, useEffect, useState } from 'react'
import { ui } from './ui.js'

const LanguageContext = createContext(null)

function lookup(dict, path) {
  let node = dict
  for (const key of path.split('.')) {
    node = node?.[key]
    if (node === undefined) return undefined
  }
  return node
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') || 'en' } catch { return 'en' }
  })

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    try { localStorage.setItem('lang', lang) } catch {}

    const meta = ui[lang].meta
    if (meta) {
      document.title = meta.title
      const descTag = document.querySelector('meta[name="description"]')
      if (descTag) descTag.setAttribute('content', meta.description)
    }
  }, [lang])

  const toggleLanguage = () => setLang(l => (l === 'en' ? 'fr' : 'en'))

  const t = (path) => lookup(ui[lang], path) ?? lookup(ui.en, path) ?? path

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

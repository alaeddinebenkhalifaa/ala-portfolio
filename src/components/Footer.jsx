import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <span>Ala Eddine Ben Khalifa · {new Date().getFullYear()}</span>
      <span>{t('footer.school')}</span>
    </footer>
  )
}

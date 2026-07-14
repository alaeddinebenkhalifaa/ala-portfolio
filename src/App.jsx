import { useState }      from 'react'
import { useTheme }      from './hooks/useTheme.js'
import PageBackground   from './components/PageBackground.jsx'
import Cursor           from './components/Cursor.jsx'
import Header           from './components/Header.jsx'
import Hero             from './components/Hero.jsx'
import Ticker           from './components/Ticker.jsx'
import Projects         from './components/Projects.jsx'
import Skills           from './components/Skills.jsx'
import About            from './components/About.jsx'
import Content          from './components/Content.jsx'
import Certifications   from './components/Certifications.jsx'
import Contact          from './components/Contact.jsx'
import Footer           from './components/Footer.jsx'
import ScrollToTop      from './components/ScrollToTop.jsx'
import MusicPlayer     from './components/MusicPlayer.jsx'
import WelcomeCard     from './components/WelcomeCard.jsx'

export default function App() {
  const { theme, toggle } = useTheme()
  const [playerOpen, setPlayerOpen] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [welcomed, setWelcomed] = useState(false)

  return (
    <>
      <PageBackground theme={theme} interactive />
      <div id="grain" aria-hidden="true" />
      <Cursor />
      <Header
        theme={theme}
        onToggleTheme={toggle}
        playerOpen={playerOpen}
        onTogglePlayer={() => setPlayerOpen(o => !o)}
        musicPlaying={musicPlaying}
      />
      <main>
        <Hero />
        <Ticker />
        <Projects />
        <Skills />
        <About />
        <Content />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <MusicPlayer open={playerOpen} onClose={() => setPlayerOpen(false)} onPlayingChange={setMusicPlaying} />
      {!welcomed && <WelcomeCard onDismiss={() => setWelcomed(true)} />}
    </>
  )
}

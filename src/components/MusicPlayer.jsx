import { useState, useEffect, useRef } from 'react'
import {
  Play, Pause, SkipForward, SkipBack,
  Heart, Repeat, Shuffle, Volume2, VolumeX,
  List, X, Music2, Maximize2, Minimize2,
} from 'lucide-react'

// ── Playlist ─────────────────────────────────────────────────────────────────
// Add your own tracks here. Put audio files in /public/music/ and set src accordingly.
const TRACKS = [
  {
    id: '1',
    title: 'Where Is My Mind',
    artist: 'Lo-Fi',
    artwork: '/music/covers/where is my mind (Lo-Fi).jpg',
    src: '/music/where is my mind (Lo-Fi).mp3',
  },
]

function fmt(s) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec < 10 ? '0' : ''}${sec}`
}

export default function MusicPlayer({ open, onClose, onPlayingChange }) {
  const [pos, setPos] = useState(() => ({
    x: Math.max(20, window.innerWidth - 360),
    y: Math.max(20, window.innerHeight - 540),
  }))
  const [trackIdx, setTrackIdx]   = useState(0)
  const [isPlaying, setIsPlayingRaw] = useState(false)
  const setIsPlaying = (v) => {
    const next = typeof v === 'function' ? v(isPlayingRef.current) : v
    setIsPlayingRaw(next)
    onPlayingChange?.(next)
  }
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration]   = useState(0)
  const [volume, setVolume]       = useState(0.75)
  const [muted, setMuted]         = useState(false)
  const [liked, setLiked]         = useState({})
  const [shuffle, setShuffle]     = useState(false)
  const [repeat, setRepeat]       = useState('off')  // 'off' | 'all' | 'one'
  const [showQueue, setShowQueue] = useState(false)
  const [eqBars, setEqBars]       = useState(Array(10).fill(0))
  const [playerFs, setPlayerFs]   = useState(false)

  const audioRef    = useRef(null)
  const dragRef     = useRef({ active: false })
  const progressRef = useRef(null)
  const windowRef   = useRef(null)
  // refs so audio event listeners always see current state
  const repeatRef   = useRef(repeat)
  const shuffleRef  = useRef(shuffle)
  const trackIdxRef = useRef(trackIdx)
  const isPlayingRef = useRef(isPlaying)

  useEffect(() => { repeatRef.current   = repeat    }, [repeat])
  useEffect(() => { shuffleRef.current  = shuffle   }, [shuffle])
  useEffect(() => { trackIdxRef.current = trackIdx  }, [trackIdx])
  useEffect(() => { isPlayingRef.current = isPlaying }, [isPlaying])

  const track = TRACKS[trackIdx]

  /* ── Audio setup ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio
    audio.volume = volume

    const onTime = () => setCurrentTime(audio.currentTime)
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnd  = () => {
      // use refs so we always see latest state values
      if (repeatRef.current === 'one') {
        audio.currentTime = 0
        audio.play().catch(() => {})
        return
      }
      // goNext via functional updater
      setTrackIdx(i => {
        if (shuffleRef.current) return Math.floor(Math.random() * TRACKS.length)
        const n = (i + 1) % TRACKS.length
        if (n === 0 && repeatRef.current === 'off') {
          setIsPlaying(false)
          return i
        }
        return n
      })
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  /* ── Load track + autoplay ───────────────────────────────────────────────── */
  const autoplayPending = useRef(true)   // first load should always try to play

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    setCurrentTime(0)
    setDuration(0)

    if (!track.src) { audio.src = ''; return }

    const shouldPlay = isPlayingRef.current || autoplayPending.current

    if (shouldPlay) {
      const tryPlay = () => {
        audio.play().then(() => {
          setIsPlaying(true)
          autoplayPending.current = false
        }).catch(() => {
          if (autoplayPending.current) {
            // Browser blocked autoplay — start on first user gesture
            const EVENTS = ['click', 'keydown', 'mousedown', 'wheel', 'touchstart']
            const start = () => {
              audio.play().then(() => {
                setIsPlaying(true)
                autoplayPending.current = false
              }).catch(() => {})
              EVENTS.forEach(ev => document.removeEventListener(ev, start))
            }
            EVENTS.forEach(ev =>
              document.addEventListener(ev, start, { once: false, passive: true })
            )
          }
        })
      }
      // Add canplay listener BEFORE load() to avoid race condition
      audio.addEventListener('canplay', tryPlay, { once: true })
      audio.src = track.src
      audio.load()
      return () => audio.removeEventListener('canplay', tryPlay)
    } else {
      audio.src = track.src
      audio.load()
    }
  }, [trackIdx])

  /* ── Sync volume / mute ──────────────────────────────────────────────────── */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    audio.muted  = muted
  }, [volume, muted])

  /* ── Equalizer animation ─────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isPlaying) { setEqBars(Array(10).fill(0)); return }
    const id = setInterval(() => {
      setEqBars(b => b.map(() => Math.random()))
    }, 120)
    return () => clearInterval(id)
  }, [isPlaying])

  /* ── Drag ────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const onMove = (e) => {
      const d = dragRef.current
      if (!d.active) return
      setPos({
        x: Math.max(0, Math.min(window.innerWidth  - 340, d.ox + e.clientX - d.sx)),
        y: Math.max(0, Math.min(window.innerHeight - 80,  d.oy + e.clientY - d.sy)),
      })
    }
    const onUp = () => { dragRef.current.active = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [])

  /* ── Handlers ────────────────────────────────────────────────────────────── */
  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      if (track.src) audio.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const goPrev = () => setTrackIdx(i => shuffle
    ? Math.floor(Math.random() * TRACKS.length)
    : (i - 1 + TRACKS.length) % TRACKS.length
  )

  const goNext = () => setTrackIdx(i => {
    if (shuffle) return Math.floor(Math.random() * TRACKS.length)
    const n = (i + 1) % TRACKS.length
    if (n === 0 && repeat === 'off') { setIsPlaying(false); return i }
    return n
  })

  const seekTo = (e) => {
    if (!progressRef.current) return
    const rect = progressRef.current.getBoundingClientRect()
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const t    = pct * (duration || 1)
    setCurrentTime(t)
    if (audioRef.current) audioRef.current.currentTime = t
  }

  const onTitleDown = (e) => {
    dragRef.current = { active: true, sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y }
  }

  if (!open) return null

  const dur = duration || 0
  const pct = dur ? (currentTime / dur) * 100 : 0
  const cycleRepeat = () => setRepeat(r => r === 'off' ? 'all' : r === 'all' ? 'one' : 'off')

  return (
    <div
      className={`mp-window${playerFs ? ' mp-window--fs' : ''}`}
      style={playerFs ? undefined : { left: pos.x, top: pos.y }}
      ref={windowRef}
    >

      {/* ── Title bar (drag handle) ── */}
      <div className="mp-titlebar" onMouseDown={playerFs ? undefined : onTitleDown}>
        <Music2 size={12} />
        <span>Music Player</span>
        <button
          className="mp-close"
          onClick={() => setPlayerFs(f => !f)}
          aria-label={playerFs ? 'Exit fullscreen' : 'Fullscreen'}
        >
          {playerFs ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
        </button>
        <button className="mp-close" onClick={onClose} aria-label="Close player">
          <X size={12} />
        </button>
      </div>

      {/* ── Artwork ── */}
      <div className="mp-artwork">
        {track.artwork
          ? <img src={track.artwork} alt={track.title} />
          : (
            <div className="mp-artwork-placeholder">
              <Music2 size={44} />
              <div className="mp-eq" aria-hidden="true">
                {eqBars.map((h, i) => (
                  <div key={i} className="mp-eq-bar" style={{ '--h': h }} />
                ))}
              </div>
            </div>
          )
        }
      </div>

      {/* ── Track info ── */}
      <div className="mp-info">
        <div>
          <div className="mp-title">{track.title}</div>
          <div className="mp-artist">{track.artist}</div>
        </div>
        <button
          className={`mp-like${liked[track.id] ? ' active' : ''}`}
          onClick={() => setLiked(l => ({ ...l, [track.id]: !l[track.id] }))}
          aria-label="Like"
        >
          <Heart size={15} fill={liked[track.id] ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* ── Progress ── */}
      <div className="mp-progress-wrap">
        <div className="mp-progress" ref={progressRef} onClick={seekTo}>
          <div className="mp-progress-fill" style={{ width: `${pct}%` }} />
          <div className="mp-progress-thumb" style={{ left: `${pct}%` }} />
        </div>
        <div className="mp-times">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(dur)}</span>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="mp-controls">
        <button className={`mp-btn${shuffle ? ' active' : ''}`} onClick={() => setShuffle(s => !s)} title="Shuffle">
          <Shuffle size={14} />
        </button>
        <button className="mp-btn" onClick={goPrev} title="Previous">
          <SkipBack size={18} />
        </button>
        <button className="mp-btn mp-play" onClick={toggle}>
          {isPlaying
            ? <Pause size={18} fill="currentColor" />
            : <Play  size={18} fill="currentColor" style={{ marginLeft: 2 }} />
          }
        </button>
        <button className="mp-btn" onClick={goNext} title="Next">
          <SkipForward size={18} />
        </button>
        <button className={`mp-btn mp-repeat${repeat !== 'off' ? ' active' : ''}`} onClick={cycleRepeat} title={`Repeat: ${repeat}`}>
          <Repeat size={14} />
          {repeat === 'one' && <span className="mp-repeat-badge">1</span>}
        </button>
      </div>

      {/* ── Volume ── */}
      <div className="mp-volume-row">
        <button className="mp-btn" onClick={() => setMuted(m => !m)}>
          {muted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
        <input
          className="mp-volume-slider"
          type="range" min={0} max={1} step={0.01}
          value={muted ? 0 : volume}
          onChange={e => { setVolume(+e.target.value); setMuted(false) }}
          aria-label="Volume"
        />
        <span className="mp-vol-pct">{Math.round((muted ? 0 : volume) * 100)}%</span>
      </div>

      {/* ── Queue toggle ── */}
      <button className="mp-queue-toggle" onClick={() => setShowQueue(q => !q)}>
        <List size={12} />
        <span>Queue ({TRACKS.length})</span>
      </button>

      {/* ── Queue ── */}
      {showQueue && (
        <div className="mp-queue">
          {TRACKS.map((t, i) => (
            <div
              key={t.id}
              className={`mp-queue-item${i === trackIdx ? ' active' : ''}`}
              onClick={() => { setTrackIdx(i); setCurrentTime(0) }}
            >
              <div className="mp-queue-art">
                {t.artwork ? <img src={t.artwork} alt={t.title} /> : <Music2 size={12} />}
              </div>
              <div className="mp-queue-meta">
                <div className="mp-queue-title">{t.title}</div>
                <div className="mp-queue-artist">{t.artist}</div>
              </div>
              {i === trackIdx && <div className="mp-queue-dot" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

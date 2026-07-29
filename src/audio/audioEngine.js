// Shared Web Audio graph: routes the music player's <audio> element through a
// lowpass filter (for the "drowning" effect) and synthesizes short UI sounds.
let ctx = null
let filterNode = null
let gainNode = null
let connectedEl = null

const NORMAL_FREQ = 20000
const DROWNED_FREQ = 500
const NORMAL_GAIN = 1
const DROWNED_GAIN = 0.65
const RAMP = 0.06 // seconds — setTargetAtTime time-constant, ~3x this to feel fully settled

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    unlockOnGesture(ctx)
  }
  return ctx
}

// Browsers keep a freshly-created AudioContext suspended until a genuine user
// gesture. Without this, the music element still reports itself as "playing"
// (currentTime advances, isPlaying flips true) but produces no sound at all,
// since its output is routed entirely through this (suspended) graph.
function unlockOnGesture(c) {
  const EVENTS = ['click', 'keydown', 'touchstart', 'pointerdown']
  const unlock = () => {
    if (c.state === 'suspended') c.resume()
    EVENTS.forEach(ev => document.removeEventListener(ev, unlock))
  }
  EVENTS.forEach(ev => document.addEventListener(ev, unlock, { passive: true }))
}

// Route the given <audio> element through a lowpass filter so its output can
// be "drowned" later. Safe to call multiple times — only wires up once per element.
export function connectMusicElement(audioEl) {
  if (!audioEl || connectedEl === audioEl) return
  const c = getCtx()
  const source = c.createMediaElementSource(audioEl)
  filterNode = c.createBiquadFilter()
  filterNode.type = 'lowpass'
  filterNode.frequency.value = NORMAL_FREQ
  filterNode.Q.value = 1.8

  gainNode = c.createGain()
  gainNode.gain.value = NORMAL_GAIN

  source.connect(filterNode)
  filterNode.connect(gainNode)
  gainNode.connect(c.destination)
  connectedEl = audioEl
}

// Muffle (true) or restore (false) the background music, like it's underwater.
export function setDrowned(on) {
  if (!filterNode || !gainNode) return
  const c = getCtx()
  const now = c.currentTime
  filterNode.frequency.cancelScheduledValues(now)
  filterNode.frequency.setTargetAtTime(on ? DROWNED_FREQ : NORMAL_FREQ, now, RAMP)
  gainNode.gain.cancelScheduledValues(now)
  gainNode.gain.setTargetAtTime(on ? DROWNED_GAIN : NORMAL_GAIN, now, RAMP)
}

// A short percussive "pop" for cards/modals opening.
export function playPop() {
  const c = getCtx()
  if (c.state === 'suspended') c.resume()
  const now = c.currentTime

  const osc = c.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(560, now)
  osc.frequency.exponentialRampToValueAtTime(190, now + 0.13)

  const env = c.createGain()
  env.gain.setValueAtTime(0.0001, now)
  env.gain.exponentialRampToValueAtTime(0.5, now + 0.008)
  env.gain.exponentialRampToValueAtTime(0.0001, now + 0.19)

  osc.connect(env)
  env.connect(c.destination)
  osc.start(now)
  osc.stop(now + 0.2)
}

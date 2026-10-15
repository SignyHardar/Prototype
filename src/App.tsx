import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import inspectionPhoto from './assets/inspection-photo.png'
import assetPhoto from './assets/asset-cat-621b.jpg'
import machineScan from './assets/machine-scan.png'
import trackunitGo from './assets/trackunit-go.png'
import nearbyExcavator from './assets/nearby-excavator.jpg'
import nearbyDoosan from './assets/nearby-doosan.jpg'

type Screen = 'home' | 'qr' | 'asset' | 'scanner' | 'generating' | 'report' | 'voice' | 'confirmed' | 'thankyou'

const BLUE = '#2563EB'

function StatusBar({ dark = false }: { dark?: boolean }) {
  const color = dark ? 'white' : '#111'

  return (
    <div className="flex items-center justify-between px-7 pt-3.5 pb-1" style={{ color }}>
      <span className="text-[15px] font-semibold tracking-tight">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="3" width="3" height="9" rx="0.5" fill={color} opacity="0.4" />
          <rect x="4.5" y="2" width="3" height="10" rx="0.5" fill={color} opacity="0.6" />
          <rect x="9" y="0" width="3" height="12" rx="0.5" fill={color} />
          <path d="M14 4.5a3 3 0 0 1 0 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <rect x="0.6" y="0.6" width="13" height="9.8" rx="2" stroke={color} strokeWidth="1.2" />
          <rect x="1.8" y="1.8" width="9.2" height="7.4" rx="1.1" fill={color} />
          <path d="M15 3.4v4.2a1.2 1.2 0 0 0 0-4.2z" fill={color} opacity="0.45" />
        </svg>
      </div>
    </div>
  )
}

function SafariChrome({ url = 'report.trackunit.com' }: { url?: string }) {
  return (
    <div className="bg-[#f2f2f7] shrink-0">
      <StatusBar />
      <div className="px-4 pb-2">
        <div className="h-11 rounded-xl bg-white/90 border border-black/5 flex items-center px-3 gap-2">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="shrink-0 text-neutral-400">
            <rect x="2.2" y="6" width="7.6" height="6.4" rx="1.4" stroke="currentColor" strokeWidth="1.3" />
            <path d="M4 6V4.4a2 2 0 0 1 4 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <span className="flex-1 text-[15px] text-neutral-800 truncate">{url}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-neutral-400">
            <path d="M1.5 7A5.5 5.5 0 1 0 7 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M7 1.5H3.5V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function SmartAppBanner({
  onGet,
  onDismiss,
  reason = 'Continue this report in the app',
}: {
  onGet: () => void
  onDismiss: () => void
  reason?: string
}) {
  return (
    <div className="shrink-0 bg-[#f2f2f7] border-b border-black/10 px-2.5 py-2.5 flex items-center gap-2.5">
      <button
        type="button"
        onClick={onDismiss}
        className="w-7 h-11 flex items-center justify-center text-neutral-400"
        aria-label="Dismiss app banner"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 1l8 8M9 1 1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <img
        src={trackunitGo}
        alt="Trackunit GO"
        className="w-12 h-12 rounded-[11px] shadow-sm shrink-0"
      />
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-neutral-900 leading-tight truncate">Trackunit GO</p>
        <p className="text-[11px] text-neutral-500 leading-tight mt-0.5">{reason}</p>
        <p className="text-[11px] text-neutral-400 leading-tight">4.8 ★ · Productivity</p>
      </div>
      <button
        type="button"
        onClick={onGet}
        className="shrink-0 min-h-8 min-w-12 px-2 text-[#007AFF] text-[17px] font-semibold"
      >
        GET
      </button>
    </div>
  )
}

function WebShell({
  children,
  url,
  showBanner,
  onGetApp,
  onDismissBanner,
  bannerReason,
}: {
  children: ReactNode
  url?: string
  showBanner: boolean
  onGetApp: () => void
  onDismissBanner: () => void
  bannerReason?: string
}) {
  return (
    <div className="flex flex-col h-full bg-[#f2f2f7]">
      <SafariChrome url={url} />
      {showBanner && <SmartAppBanner onGet={onGetApp} onDismiss={onDismissBanner} reason={bannerReason} />}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">{children}</div>
    </div>
  )
}

const identifierPlate = { x: 388, y: 62, w: 81, h: 146 }

function HomeIcon({
  label,
  color,
  children,
  onClick,
}: {
  label: string
  color: string
  children: ReactNode
  onClick?: () => void
}) {
  const icon = (
    <span
      className="w-[60px] h-[60px] rounded-[14px] flex items-center justify-center text-white shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
      style={{ background: color }}
    >
      {children}
    </span>
  )

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 w-[68px] ${onClick ? 'active:scale-90 transition-transform' : ''}`}
      aria-label={label}
    >
      {icon}
      <span className="text-[11px] font-medium text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]">{label}</span>
    </button>
  )
}

function CameraGlyph() {
  return (
    <svg width="32" height="26" viewBox="0 0 32 26" fill="none" aria-hidden>
      <rect x="1.5" y="5" width="29" height="19" rx="4" fill="#1c1c1e" />
      <circle cx="16" cy="14.5" r="5.2" fill="#8ec8ff" />
      <circle cx="16" cy="14.5" r="3" fill="#1c1c1e" />
      <circle cx="16" cy="14.5" r="1.3" fill="#dbeafe" />
      <rect x="11" y="2" width="8" height="4" rx="1.4" fill="#1c1c1e" />
    </svg>
  )
}

function HomeScreen({ onCamera }: { onCamera: () => void }) {
  return (
    <div
      className="relative flex flex-col h-full overflow-hidden text-white"
      style={{
        background:
          'radial-gradient(120% 80% at 80% 10%, #ffb086 0%, transparent 46%), radial-gradient(90% 70% at 10% 20%, #6aa7ff 0%, transparent 50%), linear-gradient(165deg, #3d6dff 0%, #6a4dff 48%, #ef7d62 100%)',
      }}
    >
      <StatusBar dark />

      <div className="flex-1 px-5 pt-8">
        <div className="grid grid-cols-4 justify-items-center gap-y-5">
          <HomeIcon label="FaceTime" color="#34c759">
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
              <rect x="1" y="2" width="17" height="16" rx="4" fill="white" />
              <path d="M19 7.5 26 4v12l-7-3.5v-5z" fill="white" />
            </svg>
          </HomeIcon>
          <HomeIcon label="Calendar" color="#ffffff">
            <span className="text-[#ff3b30] text-[22px] font-semibold leading-none mt-1">6</span>
          </HomeIcon>
          <HomeIcon label="Photos" color="linear-gradient(135deg,#ffd60a,#ff375f 55%,#5e5ce6)">
            <svg width="26" height="22" viewBox="0 0 26 22" fill="none">
              <circle cx="8" cy="9" r="3" fill="white" />
              <path d="M2 18l6.2-6.2a1 1 0 0 1 1.4 0L14 16l2.2-2.2a1 1 0 0 1 1.4 0L24 18v1.2A1.8 1.8 0 0 1 22.2 21H3.8A1.8 1.8 0 0 1 2 19.2V18z" fill="white" />
            </svg>
          </HomeIcon>
          <HomeIcon label="Camera" color="#d1d1d6" onClick={onCamera}>
            <CameraGlyph />
          </HomeIcon>
          <HomeIcon label="Maps" color="#34c759">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 1.5 19 5v12l-8 3.5L3 17V5l8-3.5z" fill="white" />
            </svg>
          </HomeIcon>
          <HomeIcon label="Clock" color="#1c1c1e">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <circle cx="13" cy="13" r="9" stroke="white" strokeWidth="2" />
              <path d="M13 7.5V13l3.5 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </HomeIcon>
          <HomeIcon label="Weather" color="#64d2ff">
            <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
              <circle cx="9" cy="8" r="4" fill="#ffd60a" />
              <path d="M8 16h11a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.4 1.6A3.5 3.5 0 0 0 8 16z" fill="white" />
            </svg>
          </HomeIcon>
          <HomeIcon label="Notes" color="#ffd60a">
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
              <rect x="2" y="1" width="16" height="22" rx="2" fill="white" />
              <path d="M5 7h10M5 11h10M5 15h7" stroke="#ffd60a" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </HomeIcon>
          <HomeIcon label="Settings" color="#8e8e93">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <circle cx="13" cy="13" r="3.2" stroke="white" strokeWidth="1.8" />
              <path d="M13 3.2v2.2M13 20.6v2.2M3.2 13h2.2M20.6 13h2.2M6.1 6.1l1.6 1.6M18.3 18.3l1.6 1.6M19.9 6.1l-1.6 1.6M7.7 18.3l-1.6 1.6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </HomeIcon>
          <HomeIcon label="Health" color="#ffffff">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 19s-7-4.2-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.8-7 9-7 9z" fill="#ff2d55" />
            </svg>
          </HomeIcon>
          <HomeIcon label="Wallet" color="#1c1c1e">
            <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
              <rect x="1.5" y="3" width="23" height="15" rx="3" stroke="white" strokeWidth="1.7" />
              <path d="M1.5 7.5h23" stroke="white" strokeWidth="1.7" />
              <circle cx="19" cy="12.5" r="1.3" fill="white" />
            </svg>
          </HomeIcon>
          <HomeIcon label="Mail" color="#0a84ff">
            <svg width="26" height="18" viewBox="0 0 26 18" fill="none">
              <rect x="1.5" y="1.5" width="23" height="15" rx="2.5" stroke="white" strokeWidth="1.7" />
              <path d="M2 3.2 13 10l11-6.8" stroke="white" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
          </HomeIcon>
        </div>
      </div>

      <div className="flex justify-center gap-2 pb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/35" />
      </div>

      <div className="mx-3 mb-7 rounded-[32px] bg-white/25 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <span className="w-[60px] h-[60px] rounded-[14px] bg-[#34c759] flex items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M7 4.5h3.2l1.2 2.4h6.2A2.4 2.4 0 0 1 20 9.3v8.8a2.4 2.4 0 0 1-2.4 2.4H8.4A2.4 2.4 0 0 1 6 18.1V6.9A2.4 2.4 0 0 1 8.4 4.5H7z" stroke="white" strokeWidth="1.8" />
            <path d="M10 13.5h6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
        <span className="w-[60px] h-[60px] rounded-[14px] bg-white flex items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="8" stroke="#1c1c1e" strokeWidth="1.6" />
            <path d="M5.5 13h15M13 5.2c2 2.2 3 5 3 7.8s-1 5.6-3 7.8c-2-2.2-3-5-3-7.8s1-5.6 3-7.8z" stroke="#1c1c1e" strokeWidth="1.4" />
          </svg>
        </span>
        <span className="w-[60px] h-[60px] rounded-[14px] bg-[#34c759] flex items-center justify-center">
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none">
            <path d="M4 3.5h16v11.2a2 2 0 0 1-2 2H9.2L4 20.5V3.5z" fill="white" />
          </svg>
        </span>
        <button
          type="button"
          onClick={onCamera}
          className="w-[60px] h-[60px] rounded-[14px] bg-[#d1d1d6] flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Camera"
        >
          <CameraGlyph />
        </button>
      </div>
    </div>
  )
}

function QrScanScreen({ onFound }: { onFound: () => void }) {
  const [locked, setLocked] = useState(false)
  const finished = useRef(false)
  const listenTimer = useRef<number | null>(null)
  const photoRef = useRef<HTMLImageElement>(null)
  const [frame, setFrame] = useState({ left: 0, top: 0, width: 0, height: 0 })

  const stopReading = () => {
    if (listenTimer.current) window.clearTimeout(listenTimer.current)
    listenTimer.current = null
  }

  const lockCode = () => {
    if (finished.current) return
    finished.current = true
    stopReading()
    setLocked(true)
    onFound()
  }

  const placeFrame = () => {
    const img = photoRef.current
    const parent = img?.parentElement
    if (!img?.naturalWidth || !parent) return
    const cw = parent.clientWidth
    const ch = parent.clientHeight
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const ox = (cw - img.naturalWidth * scale) * 1
    const oy = (ch - img.naturalHeight * scale) * 0.18
    setFrame({
      left: ox + identifierPlate.x * scale,
      top: oy + identifierPlate.y * scale,
      width: identifierPlate.w * scale,
      height: identifierPlate.h * scale,
    })
  }

  useLayoutEffect(() => {
    placeFrame()
    window.addEventListener('resize', placeFrame)
    return () => window.removeEventListener('resize', placeFrame)
  }, [])

  useEffect(() => {
    listenTimer.current = window.setTimeout(lockCode, 2600)
    return () => stopReading()
  }, [])

  return (
    <div className="relative flex flex-col h-full bg-black text-white">
      <StatusBar dark />

      <div className="flex items-center justify-between px-6 py-2">
        <button type="button" className="w-8 h-8 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2.2v2.3M9 13.5v2.3M2.2 9h2.3M13.5 9h2.3" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="9" cy="9" r="3.4" stroke="white" strokeWidth="1.6" />
            <path d="M12.6 3.4h2v2" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" className="w-8 h-8 flex items-center justify-center text-white/80">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 7l6-6 6 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="w-8 h-8 flex items-center justify-center">
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <circle cx="10" cy="8" r="5.5" stroke="white" strokeWidth="1.5" />
            <circle cx="10" cy="8" r="2" stroke="white" strokeWidth="1.4" />
            <path d="M16.5 3.2l.9-1.4" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <img
          ref={photoRef}
          src={machineScan}
          alt=""
          onLoad={placeFrame}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '100% 18%' }}
        />

        <div className="absolute pointer-events-none" style={frame}>
          <div className="absolute -inset-1.5">
            <div className="absolute top-0 left-0 w-5 h-5 border-t-[3px] border-l-[3px] border-amber-400" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-[3px] border-r-[3px] border-amber-400" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[3px] border-l-[3px] border-amber-400" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[3px] border-r-[3px] border-amber-400" />
            {!locked && <div className="qr-scan-line" />}
            {locked && <div className="absolute inset-0 border-[3px] border-amber-400" />}
          </div>
        </div>
      </div>

      <div className="pb-10 pt-2">
        <div className="flex items-center justify-center gap-4 mb-7 text-[11px] font-medium tracking-[0.08em]">
          {['CINEMATIC', 'VIDEO', 'PHOTO', 'PORTRAIT', 'PANO'].map((mode) => (
            <span key={mode} className={mode === 'PHOTO' ? 'text-amber-400' : 'text-white/40'}>
              {mode}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between px-10">
          <button type="button" className="w-8 h-8 rounded-md overflow-hidden bg-white/15" aria-label="Last photo">
            <img src={inspectionPhoto} alt="" className="w-full h-full object-cover" />
          </button>
          <button
            type="button"
            onClick={lockCode}
            className="w-[72px] h-[72px] rounded-full border-[3px] border-white flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Scan code"
          >
            <div className="w-[60px] h-[60px] rounded-full bg-white" />
          </button>
          <button type="button" className="w-8 h-8 flex items-center justify-center" aria-label="Flip camera">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M4 8.5A7 7 0 0 1 18 7M18 13.5A7 7 0 0 1 4 15"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path d="M16.5 4.5V8h3.5M5.5 17.5V14H2" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function AssetScreen({
  onTakePhoto,
  onWrongMachine,
}: {
  onTakePhoto: () => void
  onWrongMachine: () => void
}) {
  return (
    <div className="flex flex-col flex-1 min-h-0 h-full bg-white">
      <div className="px-5 pt-3.5 pb-3">
        <h1 className="text-[17px] font-semibold text-neutral-900 leading-none">Report an issue</h1>
      </div>
      <img
        src={assetPhoto}
        alt="CAT 621B on site"
        className="w-full h-auto block bg-neutral-100"
      />
      <div className="px-5 pt-2.5">
        <p className="text-[18px] font-semibold text-neutral-900 leading-none">HB 15432-243</p>
        <p className="text-[14px] text-slate-500 leading-snug mt-1">Volvo EW160E · North construction zone, Sector B</p>
      </div>
      <div className="flex-1 flex items-center px-5 pb-6">
        <p className="w-full rounded-2xl border border-blue-100 bg-blue-50/70 px-5 py-3.5 text-center text-[15px] font-medium text-neutral-800 leading-snug">
          Take a photo of the problem to start the report.
        </p>
      </div>

      <div className="px-5 pb-8 pt-3 space-y-2.5 bg-white">
        <PrimaryButton onClick={onTakePhoto}>Take a photo of the issue</PrimaryButton>
        <button
          type="button"
          onClick={onWrongMachine}
          className="w-full min-h-11 bg-transparent border-0 text-[15px] font-medium underline underline-offset-2"
          style={{ color: BLUE }}
        >
          Not the right machine
        </button>
      </div>
    </div>
  )
}

function ScannerScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1 min-h-0 h-full bg-black">
      <div className="flex-1 relative overflow-hidden">
        <img
          src={inspectionPhoto}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[220px] h-[220px]">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400 animate-corner" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400 animate-corner" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400 animate-corner" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400 animate-corner" />

            <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="bg-amber-400 text-black text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide whitespace-nowrap">
                HB 15432-243
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 flex justify-center pt-4 pb-8">
        <button
          type="button"
          onClick={onNext}
          className="w-[72px] h-[72px] rounded-full border-[3px] border-white flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Take photo"
        >
          <div className="w-[60px] h-[60px] rounded-full bg-white" />
        </button>
      </div>
    </div>
  )
}

interface IssueData {
  title: string
  whatWasFound: string
  issueLocation: string
  severity: 'Critical' | 'Moderate' | 'Low'
  machineStatus: string
  recommendation: string
}

const originalIssue: IssueData = {
  title: 'Cracked wheel rim',
  whatWasFound:
    'A visible crack was detected on the wheel rim near the tire bead. Surface corrosion and wear are also visible around the damaged area.',
  issueLocation: 'Front-left wheel',
  severity: 'Critical',
  machineStatus: 'Do not operate',
  recommendation:
    'The damaged rim may compromise the wheel assembly and should be inspected before the machine is used again.',
}

const correctedIssue: IssueData = {
  ...originalIssue,
  issueLocation: 'Rear-left wheel',
}

function SeverityDot({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Critical: '#EF4444',
    Moderate: '#F59E0B',
    Low: '#22C55E',
  }

  return (
    <span
      className="inline-block w-2.5 h-2.5 rounded-full mr-2 align-middle"
      style={{ background: colors[level] ?? '#6B7280' }}
    />
  )
}

function OutlineButton({
  children,
  onClick,
}: {
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full min-h-12 flex items-center justify-center gap-2 rounded-full border border-neutral-200 text-[15px] font-medium text-neutral-800 bg-white active:bg-neutral-50 transition-colors"
    >
      {children}
    </button>
  )
}

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      className={`w-full min-h-12 rounded-full text-[15px] font-semibold text-white transition-all ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'active:scale-[0.98]'
      }`}
      style={{ background: BLUE }}
    >
      {children}
    </button>
  )
}

function GeneratingScreen({ onDone }: { onDone: () => void }) {
  const steps = ['Reading the photo…', 'Finding the damage…', 'Writing the report…']
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStep(1), 900),
      window.setTimeout(() => setStep(2), 1800),
      window.setTimeout(onDone, 2800),
    ]
    return () => timers.forEach((id) => window.clearTimeout(id))
    // Generate once when this screen mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col h-full bg-white items-center justify-center px-8 text-center">
      <div className="relative w-[180px] rounded-2xl overflow-hidden bg-neutral-100 shadow-sm">
        <img src={inspectionPhoto} alt="" className="w-full h-auto block" />
        <div className="absolute inset-0 bg-blue-500/5" />
        <div className="report-scan-line" />
      </div>
      <p className="mt-6 text-[17px] font-semibold text-neutral-900">{steps[step]}</p>
      <p className="mt-2 text-[13px] text-neutral-400">Looking at what you captured</p>
    </div>
  )
}

function useTypedText(text: string, active: boolean, speed = 22) {
  const [value, setValue] = useState(active ? '' : text)

  useEffect(() => {
    if (!active) {
      setValue(text)
      return
    }
    setValue('')
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setValue(text.slice(0, i))
      if (i >= text.length) window.clearInterval(id)
    }, speed)
    return () => window.clearInterval(id)
  }, [text, active, speed])

  return value
}

function ReportScreen({
  issue,
  onVoice,
  onEdit,
  onConfirm,
  corrected,
  animate,
}: {
  issue: IssueData
  onVoice: () => void
  onEdit: () => void
  onConfirm: () => void
  corrected: boolean
  animate?: boolean
}) {
  const [stage, setStage] = useState(animate ? 0 : 6)
  const title = useTypedText(issue.title, Boolean(animate && stage >= 0), 36)
  const found = useTypedText(issue.whatWasFound, Boolean(animate && stage >= 1), 10)

  useEffect(() => {
    if (!animate) return
    const timers = [1, 2, 3, 4, 5, 6].map((next, index) =>
      window.setTimeout(() => setStage(next), 700 + index * 420),
    )
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [animate])

  const show = (min: number) => !animate || stage >= min
  const typingTitle = animate && title.length < issue.title.length
  const typingFound = animate && stage >= 1 && found.length < issue.whatWasFound.length

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto px-5">
        <h1 className={`text-[22px] font-bold text-neutral-900 leading-tight pt-4 pb-3 ${typingTitle ? 'typing-caret' : ''}`}>
          {title || '\u00a0'}
        </h1>

        {show(1) && (
          <div className={animate ? 'reveal-in' : ''}>
            <p className="text-[15px] font-medium text-slate-500 mb-1">What was found</p>
            <p className={`text-[15px] text-neutral-800 leading-relaxed pb-4 ${typingFound ? 'typing-caret' : ''}`}>
              {found}
            </p>
          </div>
        )}

        {show(2) && (
          <div className={`py-3.5 ${corrected ? '-mx-5 px-5 bg-blue-50/80' : ''} ${animate ? 'reveal-in' : ''}`}>
            <p className="text-[15px] font-medium text-slate-500 mb-1">Issue location</p>
            <p className="text-[15px] text-neutral-900">{issue.issueLocation}</p>
          </div>
        )}
        {show(3) && (
          <div className={`py-3.5 ${animate ? 'reveal-in' : ''}`}>
            <p className="text-[15px] font-medium text-slate-500 mb-1">Severity</p>
            <p className="text-[15px] text-neutral-900 flex items-center">
              <SeverityDot level={issue.severity} />
              {issue.severity}
            </p>
          </div>
        )}
        {show(4) && (
          <div className={`py-3.5 ${animate ? 'reveal-in' : ''}`}>
            <p className="text-[15px] font-medium text-slate-500 mb-1">Machine status</p>
            <p className="text-[15px] text-neutral-900">{issue.machineStatus}</p>
          </div>
        )}

        {show(5) && (
          <p className={`text-[15px] text-neutral-800 leading-relaxed py-3.5 ${animate ? 'reveal-in' : ''}`}>
            {issue.recommendation}
          </p>
        )}

        <div className={`py-3.5 ${animate ? 'reveal-in' : ''}`}>
          <p className="text-[15px] font-medium text-slate-500 mb-1">Photo</p>
          <p className="text-[15px] text-neutral-900 mb-2">Original inspection photo</p>
          <div className="w-full max-w-[220px] bg-neutral-100 rounded-xl overflow-hidden">
            <img
              src={inspectionPhoto}
              alt="Cracked wheel rim inspection"
              className="w-full h-auto block"
            />
          </div>
        </div>

        {show(6) && (
          <p className={`text-[15px] text-neutral-500 py-3 ${animate ? 'reveal-in' : ''}`}>
            Does everything look correct?
          </p>
        )}
      </div>

      {show(6) && (
        <div className={`px-5 pb-8 pt-2 space-y-2.5 bg-white ${animate ? 'reveal-in' : ''}`}>
          <OutlineButton onClick={onVoice}>
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <rect x="5" y="1" width="4" height="8" rx="2" stroke="#111" strokeWidth="1.4" />
              <path d="M2 8a5 5 0 0 0 10 0" stroke="#111" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M7 13v2M4.5 15h5" stroke="#111" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Add correction by voice
          </OutlineButton>
          <OutlineButton onClick={onEdit}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 10.8L10.2 2.6l2.2 2.2L4.2 13H2v-2.2z" stroke="#111" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
            Edit details
          </OutlineButton>
          <PrimaryButton onClick={onConfirm}>Confirm & report issue</PrimaryButton>
        </div>
      )}
    </div>
  )
}

function MicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="6" y="1.5" width="4" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 8a4.5 4.5 0 0 0 9 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function VoiceScreen({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [recording, setRecording] = useState(true)
  const [transcribed, setTranscribed] = useState(false)
  const listenTimer = useRef<number | null>(null)

  const stopListening = () => {
    if (listenTimer.current) window.clearTimeout(listenTimer.current)
    listenTimer.current = null
    setRecording(false)
    onClose()
  }

  const startListening = () => {
    setTranscribed(false)
    setRecording(true)
    if (listenTimer.current) window.clearTimeout(listenTimer.current)
    listenTimer.current = window.setTimeout(() => {
      setRecording(false)
      setTranscribed(true)
    }, 3200)
  }

  useEffect(() => {
    startListening()
    return () => {
      if (listenTimer.current) window.clearTimeout(listenTimer.current)
    }
    // Start listening as soon as this screen opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative flex flex-col h-full overflow-hidden bg-[#f7f7f8]">
      <div className="voice-floor-glow" />

      <div className="flex items-center px-5 py-2">
        {recording ? (
          <button
            type="button"
            onClick={stopListening}
            className="flex items-center gap-1 text-[17px] text-neutral-400"
          >
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M8.5 1.5 1.5 8l7 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 -ml-2 flex items-center justify-center text-neutral-400"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-8 text-center">
        {recording ? (
          <div className="relative flex items-center justify-center w-full h-[360px]">
            <div className="voice-ring voice-ring-3" />
            <div className="voice-ring voice-ring-2" />
            <div className="voice-ring voice-ring-1" />
            <p className="absolute top-[72px] text-[11px] font-medium tracking-[0.22em] text-neutral-300">
              LISTENING
            </p>
            <button
              type="button"
              onClick={startListening}
              className="relative z-10 w-[92px] h-[92px] rounded-full bg-white flex items-center justify-center text-neutral-400 voice-mic-button"
              aria-label="Listening"
            >
              <MicIcon />
            </button>
          </div>
        ) : (
          <div className="relative w-full max-w-[320px] min-h-[380px] flex flex-col items-center justify-center">
            <div className="voice-aurora" />
            {transcribed ? (
              <p className="relative z-10 text-[26px] font-semibold text-neutral-900 leading-[1.2] tracking-tight max-w-[280px]">
                “It&apos;s actually the rear-left wheel, not the front-left.”
              </p>
            ) : (
              <>
                <h2 className="relative z-10 text-[32px] font-semibold text-neutral-900 tracking-tight leading-none">
                  Correct with voice
                </h2>
                <p className="relative z-10 mt-4 text-[15px] text-neutral-500 leading-relaxed max-w-[240px]">
                  Say what needs to change. We&apos;ll update the issue details for you.
                </p>
              </>
            )}
            <button
              type="button"
              onClick={startListening}
              className="relative z-10 mt-7 min-h-11 px-5 rounded-full text-white text-[15px] font-medium inline-flex items-center gap-2 active:scale-[0.98] transition-transform"
              style={{ background: BLUE }}
            >
              <MicIcon />
              {transcribed ? 'Listen again' : 'Continue'}
            </button>
          </div>
        )}
      </div>

      {!recording && (
        <button
          type="button"
          onClick={transcribed ? onSubmit : undefined}
          className={`absolute right-6 bottom-28 min-h-11 px-5 rounded-full text-[15px] font-medium transition-colors z-20 ${
            transcribed ? 'text-white active:scale-[0.98]' : 'bg-neutral-200/90 text-neutral-400'
          }`}
          style={transcribed ? { background: BLUE } : undefined}
        >
          Done
        </button>
      )}
    </div>
  )
}

function EditSheet({
  issue,
  onClose,
  onSave,
}: {
  issue: IssueData
  onClose: () => void
  onSave: (next: IssueData) => void
}) {
  const [draft, setDraft] = useState(issue)

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-black/30 animate-fade">
      <button type="button" className="flex-1" onClick={onClose} aria-label="Dismiss" />
      <div className="bg-white rounded-t-3xl px-5 pt-4 pb-8 animate-slide-up">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[17px] font-semibold">Edit details</h2>
          <button type="button" onClick={onClose} className="text-[15px] font-medium" style={{ color: BLUE }}>
            Close
          </button>
        </div>

        <label className="block mb-4">
          <span className="text-[13px] text-neutral-400">Issue location</span>
          <input
            value={draft.issueLocation}
            onChange={(e) => setDraft({ ...draft, issueLocation: e.target.value })}
            className="mt-1 w-full min-h-12 rounded-xl border border-neutral-200 px-3 text-[15px] outline-none focus:border-blue-500"
          />
        </label>

        <fieldset className="mb-4">
          <legend className="text-[13px] text-neutral-400 mb-2">Severity</legend>
          <div className="flex gap-2">
            {(['Critical', 'Moderate', 'Low'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDraft({ ...draft, severity: level })}
                className={`flex-1 min-h-11 rounded-full text-[13px] font-medium border ${
                  draft.severity === level ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-neutral-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block mb-6">
          <span className="text-[13px] text-neutral-400">Machine status</span>
          <input
            value={draft.machineStatus}
            onChange={(e) => setDraft({ ...draft, machineStatus: e.target.value })}
            className="mt-1 w-full min-h-12 rounded-xl border border-neutral-200 px-3 text-[15px] outline-none focus:border-blue-500"
          />
        </label>

        <PrimaryButton onClick={() => onSave(draft)}>Save</PrimaryButton>
      </div>
    </div>
  )
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <span className="text-[13px] text-neutral-400 shrink-0">{label}</span>
      <span className="text-[14px] font-normal text-neutral-700 text-right">{value}</span>
    </div>
  )
}

function ThankYouScreen({ issue, onDone }: { issue: IssueData; onDone: () => void }) {
  const assets = [
    {
      name: 'Excavator 220E',
      category: 'Wacker Neuson / DT1833',
      img: nearbyExcavator,
    },
    {
      name: 'Excavator DX225',
      category: 'Doosan / DX225LC',
      img: nearbyDoosan,
    },
  ]

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full bg-[#f2f2f7]">
      <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-4 pt-4">
        <div className="flex flex-col items-center text-center pt-1 pb-5">
          <div className="w-11 h-11 rounded-full bg-[#E8F8EE] flex items-center justify-center mb-3">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <path d="M6 14.5 11.5 20 22 8.5" stroke="#22C55E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[13px] font-medium text-slate-400 mb-0.5">Report sent</p>
          <h1 className="text-[24px] font-medium text-neutral-900 tracking-tight">Thank you</h1>
        </div>

        <div className="bg-white rounded-t-2xl px-4 pt-4 pb-3">
          <div className="flex items-baseline justify-between gap-3 pb-3">
            <div className="min-w-0">
              <p className="text-[16px] font-medium text-neutral-900">HB 15432-243</p>
              <p className="text-[13px] text-neutral-400 leading-snug">Volvo EW160E · North construction zone, Sector B</p>
            </div>
            <p className="text-[12px] text-neutral-400 shrink-0">9:41</p>
          </div>
          <div className="border-t border-dashed border-neutral-200 pt-2">
            <ReceiptRow label="Issue" value={issue.title} />
            <ReceiptRow label="Location" value={issue.issueLocation} />
            <ReceiptRow label="Severity" value={issue.severity} />
            <ReceiptRow label="Status" value={issue.machineStatus} />
            <ReceiptRow label="Notified" value="John Doe" />
          </div>
          <div className="border-t border-dashed border-neutral-200 mt-2 pt-4 text-center">
            <p className="text-[15px] font-medium text-neutral-800">Do not operate this machine</p>
            <p className="mt-1.5 text-[13px] text-neutral-500 flex items-center justify-center">
              <SeverityDot level="Critical" />
              Critical
            </p>
          </div>
        </div>
        <div
          className="h-3 mb-6"
          style={{
            background: 'radial-gradient(circle at 8px 0, transparent 8px, white 8.5px) left top / 16px 12px repeat-x',
          }}
        />

        <p className="text-[15px] font-normal text-neutral-500 mb-3">
          Nearby alternatives
        </p>
        <div className="space-y-2.5">
          {assets.map((asset) => (
            <button
              key={asset.name}
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2.5 bg-white rounded-2xl"
            >
              <div className="w-[52px] h-[52px] rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                <img src={asset.img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-[16px] font-semibold text-neutral-900 truncate">{asset.name}</p>
                <p className="text-[13px] text-neutral-500 truncate">{asset.category}</p>
              </div>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="text-neutral-300 shrink-0 mr-1">
                <path d="M1 1.5 6.5 7 1 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        <p className="text-[13px] font-medium text-neutral-400 mt-6 mb-3">Share this issue</p>
        <div className="flex items-start gap-5">
          <button type="button" className="flex flex-col items-center gap-1.5 w-14">
            <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-neutral-800">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="14.5" cy="5" r="2.4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="5.5" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="14.5" cy="15" r="2.4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7.6 9l4.3-3M7.6 11l4.3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-[11px] text-neutral-500">Contact</span>
          </button>
          <button type="button" className="flex flex-col items-center gap-1.5 w-14">
            <span className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2.4A7.6 7.6 0 0 0 3.5 13.3L2.6 17l3.8-.9A7.6 7.6 0 1 0 10 2.4z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.4 8.2c.2-.4.3-.4.6-.4h.4c.1 0 .3 0 .4.3l.6 1.5c.1.2 0 .3-.1.5l-.4.4c-.1.1-.1.3 0 .4.3.5.8 1 1.3 1.3.2.1.3.1.4 0l.5-.4c.1-.1.3-.1.4 0l1.3.7c.2.1.3.2.3.4v.4c0 .3 0 .4-.4.6A3.8 3.8 0 0 1 9 12.4a5 5 0 0 1-1.6-4.2z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="text-[11px] text-neutral-500">WhatsApp</span>
          </button>
        </div>
      </div>

      <div className="px-5 pb-8 pt-3">
        <PrimaryButton onClick={onDone}>Done</PrimaryButton>
      </div>
    </div>
  )
}

function AppStoreSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-black/30 animate-fade">
      <button type="button" className="flex-1" onClick={onClose} aria-label="Dismiss" />
      <div className="bg-white rounded-t-3xl px-5 pt-4 pb-8 animate-slide-up">
        <div className="flex items-center gap-3 mb-5">
          <img src={trackunitGo} alt="Trackunit GO" className="w-14 h-14 rounded-2xl shadow-sm" />
          <div>
            <p className="text-[17px] font-semibold">Trackunit GO</p>
            <p className="text-[13px] text-neutral-400">Report issues from the field</p>
          </div>
        </div>
        <PrimaryButton onClick={onClose}>Open in App Store</PrimaryButton>
      </div>
    </div>
  )
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f2f7] p-6">
      <div
        className="relative bg-white overflow-hidden flex flex-col"
        style={{
          width: 390,
          height: 844,
          borderRadius: 52,
          boxShadow: '0 0 0 11px #1c1c1e, 0 0 0 13px #3a3a3c, 0 28px 70px rgba(0,0,0,0.28)',
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-black"
          style={{ width: 126, height: 34, borderRadius: '0 0 20px 20px' }}
        />
        <div className="flex-1 overflow-hidden flex flex-col relative">{children}</div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black/80 rounded-full z-50" />
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(() =>
    window.location.hash === '#report' ? 'report' : 'home',
  )
  const [issue, setIssue] = useState<IssueData>(originalIssue)
  const [corrected, setCorrected] = useState(false)
  const [editing, setEditing] = useState(false)
  const [showStore, setShowStore] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)

  const applyCorrection = () => {
    setIssue((current) => ({ ...current, issueLocation: correctedIssue.issueLocation }))
    setCorrected(true)
    setScreen('confirmed')
  }

  const reset = () => {
    setIssue(originalIssue)
    setCorrected(false)
    setEditing(false)
    setShowStore(false)
    setScreen('home')
  }

  const web = (children: ReactNode, showBanner = true, url = 'report.trackunit.com/issue/hb-15432') => (
    <WebShell
      url={url}
      showBanner={showBanner && !bannerDismissed}
      onGetApp={() => setShowStore(true)}
      onDismissBanner={() => setBannerDismissed(true)}
    >
      {children}
    </WebShell>
  )

  const report = (animate = false) => (
    <ReportScreen
      issue={issue}
      corrected={corrected}
      animate={animate}
      onVoice={() => setScreen('voice')}
      onEdit={() => setEditing(true)}
      onConfirm={() => setScreen('thankyou')}
    />
  )

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen onCamera={() => setScreen('qr')} />
      case 'qr':
        return <QrScanScreen onFound={() => setScreen('asset')} />
      case 'asset':
        return web(
          <AssetScreen
            onTakePhoto={() => setScreen('scanner')}
            onWrongMachine={() => setScreen('qr')}
          />,
          true,
          'report.trackunit.com/asset/hb-15432',
        )
      case 'scanner':
        return web(<ScannerScreen onNext={() => setScreen('generating')} />)
      case 'generating':
        return web(<GeneratingScreen onDone={() => setScreen('report')} />)
      case 'report':
        return web(report(true))
      case 'confirmed':
        return web(report(false))
      case 'voice':
        return web(
          <VoiceScreen onClose={() => setScreen(corrected ? 'confirmed' : 'report')} onSubmit={applyCorrection} />,
          false,
        )
      case 'thankyou':
        return web(<ThankYouScreen issue={issue} onDone={reset} />)
    }
  }

  return (
    <PhoneFrame>
      {renderScreen()}
      {editing && (
        <EditSheet
          issue={issue}
          onClose={() => setEditing(false)}
          onSave={(next) => {
            setIssue(next)
            setCorrected(next.issueLocation !== originalIssue.issueLocation)
            setEditing(false)
          }}
        />
      )}
      {showStore && <AppStoreSheet onClose={() => setShowStore(false)} />}
    </PhoneFrame>
  )
}

import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalStore } from '../store/globalStore'
import { saveUserProfile, isProfileComplete, loadUserProfile } from '../services/localStorageService'

async function sendWhatsAppOtp(phone, otp) {
  const res = await fetch('https://medenggwhol-backend.onrender.com/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: `91${phone}`, otp }),
  })
  const text = await res.text()
  console.log('Response:', text)
  let data
  try { data = JSON.parse(text) } catch { throw new Error('Bad response from server') }
  if (!data.success) throw new Error(data.error || 'WhatsApp failed')
  return data
}

export default function LoginScreen() {
  const nav = useNavigate()
  const { setUserData } = useGlobalStore()

  const [mobile,      setMobile]      = useState('')
  const [errorMsg,    setErrorMsg]    = useState('')
  const [isLoading,   setIsLoading]   = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [otpSent,     setOtpSent]     = useState(false)
  const [otpBoxes,    setOtpBoxes]    = useState(['','','','','',''])
  const [resendTimer, setResendTimer] = useState(0)

  const correctOtp = useRef('')
  const otpRefs    = useRef([])
  const timerRef   = useRef(null)

  function validate() {
    if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      setErrorMsg('Enter a valid 10-digit Indian mobile number')
      return false
    }
    setErrorMsg('')
    return true
  }

  async function onVerified() {
    if (isProfileComplete()) {
      const { userData: saved } = loadUserProfile()
      if (saved) setUserData(saved)
      nav('/categories', { replace: true })
    } else {
      const p = { mobile: mobile.trim(), isLoggedIn: true, isProfileComplete: false }
      setUserData(p)
      saveUserProfile(p)
      nav('/profile', { replace: true })
    }
  }

  async function sendOtp() {
    if (!validate()) return
    setIsLoading(true)
    setErrorMsg('')

    const otp = String(Math.floor(100000 + Math.random() * 900000))
    correctOtp.current = otp

    try {
      await sendWhatsAppOtp(mobile.trim(), otp)
      setOtpSent(true)
      setOtpBoxes(['','','','','',''])
      setIsLoading(false)
      startTimer()
      setTimeout(() => otpRefs.current[0]?.focus(), 400)
    } catch (err) {
      console.error('Send failed:', err)
      setIsLoading(false)
      setErrorMsg('Failed: ' + err.message)
    }
  }

  function handleBoxChange(i, val) {
    if (!/^\d*$/.test(val)) return
    const next = [...otpBoxes]
    next[i] = val.slice(-1)
    setOtpBoxes(next)
    if (val && i < 5) otpRefs.current[i + 1]?.focus()
    if (next.every(d => d !== '') && next.join('').length === 6) verifyOtp(next.join(''))
  }

  function handleBoxKey(i, e) {
    if (e.key === 'Backspace' && !otpBoxes[i] && i > 0) otpRefs.current[i - 1]?.focus()
  }

  async function verifyOtp(code = otpBoxes.join('')) {
    if (code.length !== 6) { setErrorMsg('Enter the complete 6-digit OTP'); return }
    setIsVerifying(true)
    setErrorMsg('')
    await new Promise(r => setTimeout(r, 600))
    if (code === correctOtp.current) {
      clearInterval(timerRef.current)
      correctOtp.current = ''
      setIsVerifying(false)
      await onVerified()
    } else {
      setIsVerifying(false)
      setErrorMsg('Wrong OTP. Please try again.')
      setOtpBoxes(['','','','','',''])
      setTimeout(() => otpRefs.current[0]?.focus(), 100)
    }
  }

  function startTimer() {
    setResendTimer(30)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setResendTimer(t => { if (t <= 1) { clearInterval(timerRef.current); return 0 } return t - 1 })
    }, 1000)
  }

  async function handleResend() {
    setOtpBoxes(['','','','','',''])
    setErrorMsg('')
    setOtpSent(false)
    clearInterval(timerRef.current)
    setResendTimer(0)
    correctOtp.current = ''
    await sendOtp()
  }

  function handleBack() {
    setOtpSent(false)
    setOtpBoxes(['','','','','',''])
    setErrorMsg('')
    clearInterval(timerRef.current)
    setResendTimer(0)
    correctOtp.current = ''
  }

  return (
      <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'linear-gradient(160deg,#0A1628 0%,#0D2137 50%,#0A3D4A 100%)', fontFamily:"'Plus Jakarta Sans','Segoe UI',sans-serif", position:'relative', overflow:'hidden' }}>
        <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes msgIn   { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        input::placeholder { color: #9CA3AF; }
      `}</style>

        <div style={{position:'absolute',width:350,height:350,borderRadius:'50%',top:-80,right:-80,pointerEvents:'none',background:'radial-gradient(circle,rgba(0,188,212,0.12) 0%,transparent 70%)'}}/>
        <div style={{position:'absolute',width:250,height:250,borderRadius:'50%',bottom:'30%',left:-60,pointerEvents:'none',background:'radial-gradient(circle,rgba(41,121,255,0.12) 0%,transparent 70%)'}}/>
        <div style={{position:'absolute',inset:0,pointerEvents:'none',backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.03) 1px,transparent 1px)',backgroundSize:'28px 28px'}}/>

        <div style={{padding:'48px 24px 32px',display:'flex',flexDirection:'column',alignItems:'center',position:'relative',zIndex:1}}>
          <div style={{width:80,height:80,borderRadius:'50%',background:'linear-gradient(135deg,rgba(0,188,212,0.2),rgba(41,121,255,0.2))',border:'1.5px solid rgba(0,188,212,0.4)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:20}}>
            <span className="material-icons" style={{fontSize:38,color:'#00BCD4'}}>health_and_safety</span>
          </div>
          <h1 style={{fontSize:28,fontWeight:800,margin:'0 0 6px',background:'linear-gradient(90deg,#00BCD4,#2979FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>HealMedEngg</h1>
          <p style={{color:'rgba(255,255,255,0.45)',fontSize:13,letterSpacing:0.5}}>YOUR HEALTH · OUR PRIORITY</p>
        </div>

        <div style={{flex:1,background:'#fff',borderRadius:'28px 28px 0 0',padding:'32px 24px 60px',position:'relative',zIndex:1,overflowY:'auto',animation:'slideUp 0.5s 0.2s ease both'}}>

          {!otpSent && (
              <>
                <h2 style={{fontSize:22,fontWeight:800,color:'#0A1628',margin:'0 0 4px'}}>Welcome back 👋</h2>
                <p style={{fontSize:14,color:'#6B7280',margin:'0 0 28px'}}>Sign in with your mobile number</p>

                <label style={{fontSize:13,fontWeight:700,color:'#374151',marginBottom:8,display:'block'}}>Mobile Number</label>
                <div style={{display:'flex',alignItems:'center',background:'#F8FAFF',border:'1.5px solid #E5E9F5',borderRadius:14,overflow:'hidden',marginBottom:6}}>
                  <div style={{padding:'14px 14px 14px 16px',display:'flex',alignItems:'center',gap:6,borderRight:'1.5px solid #E5E9F5',background:'#F0F4FF',flexShrink:0}}>
                    <span className="material-icons" style={{fontSize:16,color:'#2979FF'}}>phone_android</span>
                    <span style={{fontSize:13,fontWeight:700,color:'#2979FF'}}>+91</span>
                  </div>
                  <input type="tel" inputMode="numeric" maxLength={10} value={mobile}
                         onChange={e => setMobile(e.target.value.replace(/\D/g,''))}
                         onKeyDown={e => e.key==='Enter' && sendOtp()}
                         placeholder="10-digit mobile number"
                         style={{flex:1,padding:'14px 16px',fontSize:15,background:'transparent',border:'none',outline:'none',color:'#0A1628'}}
                  />
                </div>
                <p style={{fontSize:12,color:'#9CA3AF',marginBottom:20}}>OTP will be sent to your WhatsApp</p>

                {errorMsg ? (
                    <div style={{display:'flex',alignItems:'center',gap:8,background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:10,padding:'10px 14px',marginBottom:16,animation:'msgIn 0.25s ease'}}>
                      <span className="material-icons" style={{fontSize:16,color:'#DC2626',flexShrink:0}}>error_outline</span>
                      <p style={{fontSize:13,color:'#DC2626',margin:0,fontWeight:500}}>{errorMsg}</p>
                    </div>
                ) : null}

                <button onClick={sendOtp} disabled={isLoading} style={{width:'100%',padding:'15px 20px',borderRadius:14,border:'none',background:isLoading?'linear-gradient(135deg,#93C5FD,#67E8F9)':'linear-gradient(135deg,#2979FF,#0097A7)',cursor:isLoading?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,color:'#fff',fontSize:15,fontWeight:700,boxShadow:'0 4px 20px rgba(41,121,255,0.35)',marginBottom:12}}>
                  {isLoading
                      ? <><div style={{width:20,height:20,borderRadius:'50%',border:'2.5px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',animation:'spin 0.8s linear infinite'}}/><span>Sending to WhatsApp...</span></>
                      : <><span className="material-icons" style={{fontSize:18}}>send</span>Send OTP via WhatsApp</>
                  }
                </button>

                <button onClick={() => nav('/categories',{replace:true})} style={{width:'100%',padding:'13px 20px',borderRadius:14,background:'transparent',border:'1.5px solid #E5E9F5',cursor:'pointer',color:'#6B7280',fontSize:14,fontWeight:600,marginBottom:24}}>
                  Skip for now
                </button>

                <div style={{background:'#EFF6FF',borderRadius:12,padding:'12px 16px',display:'flex',gap:10,alignItems:'center'}}>
                  <span className="material-icons" style={{fontSize:16,color:'#2563EB'}}>lock</span>
                  <p style={{fontSize:12,color:'#1D4ED8',margin:0}}>OTP via <strong>WhatsApp</strong> · Your number is never shared</p>
                </div>
              </>
          )}

          {otpSent && (
              <>
                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24}}>
                  <button onClick={handleBack} style={{width:36,height:36,borderRadius:'50%',background:'#F0F4FF',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <span className="material-icons" style={{fontSize:18,color:'#2979FF'}}>arrow_back</span>
                  </button>
                  <div>
                    <h2 style={{fontSize:20,fontWeight:800,color:'#0A1628',margin:0}}>Enter OTP</h2>
                    <p style={{fontSize:13,color:'#6B7280',margin:'2px 0 0'}}>Sent to WhatsApp +91 {mobile}</p>
                  </div>
                </div>

                <div style={{background:'#F0FDF4',border:'1.5px solid #86EFAC',borderRadius:12,padding:'14px 16px',display:'flex',gap:12,alignItems:'center',marginBottom:28}}>
                  <span className="material-icons" style={{fontSize:24,color:'#16A34A',flexShrink:0}}>chat</span>
                  <div>
                    <p style={{fontSize:13,color:'#166534',margin:0,fontWeight:700}}>OTP sent to your WhatsApp ✅</p>
                    <p style={{fontSize:12,color:'#16A34A',margin:'3px 0 0'}}>Check WhatsApp on +91 {mobile}</p>
                  </div>
                </div>

                <div style={{display:'flex',gap:10,justifyContent:'center',marginBottom:24}}>
                  {otpBoxes.map((d, i) => (
                      <input key={i} ref={el => otpRefs.current[i] = el}
                             type="tel" inputMode="numeric" maxLength={1} value={d}
                             onChange={e => handleBoxChange(i, e.target.value)}
                             onKeyDown={e => handleBoxKey(i, e)}
                             style={{width:46,height:54,borderRadius:12,textAlign:'center',fontSize:22,fontWeight:800,border:`2px solid ${d?'#2979FF':'#E5E9F5'}`,background:d?'#EEF3FF':'#F8FAFF',color:'#0A1628',outline:'none',transition:'border-color 0.15s ease, background 0.15s ease'}}
                      />
                  ))}
                </div>

                {errorMsg ? (
                    <div style={{display:'flex',alignItems:'center',gap:8,background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:10,padding:'10px 14px',marginBottom:16,animation:'msgIn 0.25s ease'}}>
                      <span className="material-icons" style={{fontSize:16,color:'#DC2626',flexShrink:0}}>error_outline</span>
                      <p style={{fontSize:13,color:'#DC2626',margin:0,fontWeight:500}}>{errorMsg}</p>
                    </div>
                ) : null}

                <button onClick={() => verifyOtp()} disabled={isVerifying} style={{width:'100%',padding:'15px 20px',borderRadius:14,border:'none',background:isVerifying?'linear-gradient(135deg,#93C5FD,#67E8F9)':'linear-gradient(135deg,#2979FF,#0097A7)',cursor:isVerifying?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,color:'#fff',fontSize:15,fontWeight:700,boxShadow:'0 4px 20px rgba(41,121,255,0.35)',marginBottom:16}}>
                  {isVerifying
                      ? <><div style={{width:20,height:20,borderRadius:'50%',border:'2.5px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',animation:'spin 0.8s linear infinite'}}/><span>Verifying...</span></>
                      : <><span className="material-icons" style={{fontSize:18}}>check_circle_outline</span>Verify &amp; Continue</>
                  }
                </button>

                <div style={{textAlign:'center'}}>
                  {resendTimer > 0
                      ? <p style={{fontSize:13,color:'#9CA3AF',margin:0}}>Resend in <strong style={{color:'#374151'}}>{resendTimer}s</strong></p>
                      : <button onClick={handleResend} style={{fontSize:13,fontWeight:700,color:'#2979FF',background:'none',border:'none',cursor:'pointer',padding:0}}>Resend OTP</button>
                  }
                </div>
              </>
          )}
        </div>
      </div>
  )
}
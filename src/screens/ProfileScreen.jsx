import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalStore } from '../store/globalStore'
import { saveUserProfile } from '../services/localStorageService'

const GENDERS = ['Male', 'Female', 'Other']

function NativeInput({ label, placeholder, value, onChange, type = 'text', icon }) {
  const [focused, setFocused] = useState(false)
  return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', letterSpacing: 0.4 }}>
          {label.toUpperCase()}
        </label>
        <div style={{
          display: 'flex', alignItems: 'center',
          background: focused ? '#F0F5FF' : '#F8FAFF',
          border: `1.5px solid ${focused ? '#2979FF' : '#E5E9F5'}`,
          borderRadius: 12, overflow: 'hidden',
          transition: 'all 0.15s ease',
          boxShadow: focused ? '0 0 0 3px rgba(41,121,255,0.1)' : 'none',
        }}>
          <div style={{
            padding: '13px 12px 13px 14px',
            display: 'flex', alignItems: 'center',
          }}>
          <span className="material-icons" style={{ fontSize: 18, color: focused ? '#2979FF' : '#9CA3AF' }}>
            {icon}
          </span>
          </div>
          <input
              type={type}
              value={value}
              onChange={e => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={placeholder}
              style={{
                flex: 1, padding: '13px 14px 13px 0',
                fontSize: 14, color: '#0A1628',
                background: 'transparent', border: 'none', outline: 'none',
              }}
          />
        </div>
      </div>
  )
}

function NativeSelect({ label, value, onChange, options }) {
  return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', letterSpacing: 0.4 }}>
          {label.toUpperCase()}
        </label>
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{
              padding: '13px 14px', fontSize: 14, color: '#0A1628',
              background: '#F8FAFF', border: '1.5px solid #E5E9F5',
              borderRadius: 12, outline: 'none', cursor: 'pointer',
              appearance: 'none', WebkitAppearance: 'none',
            }}
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
  )
}

export default function ProfileScreen() {
  const nav = useNavigate()
  const { userData, setUserData } = useGlobalStore()
  const [name,      setName]      = useState(userData.name   || '')
  const [email,     setEmail]     = useState(userData.email  || '')
  const [age,       setAge]       = useState(userData.age    || '')
  const [gender,    setGender]    = useState(userData.gender || 'Male')
  const [isLoading, setIsLoading] = useState(false)
  const [errors,    setErrors]    = useState({})
  const [saved,     setSaved]     = useState(false)

  function validate() {
    const e = {}
    if (!name.trim())  e.name  = 'Full name is required'
    if (!email.trim()) e.email = 'Email is required'
    else if (!/^[^@]+@[^@]+\.[^@]+/.test(email.trim())) e.email = 'Enter a valid email address'
    if (!age.trim())   e.age   = 'Age is required'
    else if (Number(age) < 1 || Number(age) > 120) e.age = 'Enter a valid age'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function save() {
    if (!validate()) return
    setIsLoading(true)
    const updated = {
      ...userData,
      name: name.trim(), email: email.trim(),
      age: age.trim(), gender, isProfileComplete: true,
    }
    setUserData(updated)
    saveUserProfile(updated)
    setSaved(true)
    await new Promise(r => setTimeout(r, 600))
    setIsLoading(false)
    nav('/categories', { replace: true })
  }

  if (saved) return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg,#0A1628,#0D2137,#0A3D4A)',
        fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif",
      }}>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(0,230,118,0.2)',
            border: '2px solid #00E676', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px' }}>
            <span className="material-icons" style={{ fontSize: 36, color: '#00E676' }}>check</span>
          </div>
          <p style={{ fontSize: 18, fontWeight: 700 }}>Profile Saved!</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>Taking you to home...</p>
        </div>
      </div>
  )

  return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(160deg,#0A1628 0%,#0D2137 45%,#0A3D4A 100%)',
        fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif",
        position: 'relative', overflowX: 'hidden', overflowY: 'auto',
      }}>
        <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin    { to { transform: rotate(360deg) } }
        .p-card { animation: slideUp 0.5s 0.1s ease both; }
        select option { color: #0A1628; }
      `}</style>

        {/* Background blobs */}
        <div style={{ position:'absolute', width:280, height:280, borderRadius:'50%', top:-60, right:-60,
          background:'radial-gradient(circle,rgba(0,188,212,0.13) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:200, height:200, borderRadius:'50%', bottom:'25%', left:-60,
          background:'radial-gradient(circle,rgba(41,121,255,0.1) 0%,transparent 70%)', pointerEvents:'none' }} />

        {/* ── Dark Header ── */}
        <div style={{ padding: '48px 24px 32px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', position: 'relative', zIndex: 1 }}>

          {/* Avatar ring */}
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg,rgba(0,188,212,0.2),rgba(41,121,255,0.2))',
              border: '2px solid rgba(0,188,212,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-icons" style={{ fontSize: 38, color: '#00BCD4' }}>person_outline</span>
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24,
              borderRadius: '50%', background: 'linear-gradient(135deg,#2979FF,#0097A7)',
              border: '2px solid #0A1628',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-icons" style={{ fontSize: 13, color: '#fff' }}>edit</span>
            </div>
          </div>

          <h1 style={{ fontSize: 21, fontWeight: 800, color: '#fff', margin: '0 0 5px' }}>
            Complete Your Profile
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', margin: 0 }}>
            This info is auto-filled when booking appointments
          </p>

          {/* Step bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 22 }}>
            {['Verified ✓', 'Profile', 'Explore'].map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: i < 2 ? 'linear-gradient(135deg,#2979FF,#0097A7)' : 'rgba(255,255,255,0.1)',
                      border: i < 2 ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {i === 0
                          ? <span className="material-icons" style={{ fontSize: 14, color: '#fff' }}>check</span>
                          : <span style={{ fontSize: 11, fontWeight: 800, color: i === 1 ? '#fff' : 'rgba(255,255,255,0.35)' }}>{i + 1}</span>
                      }
                    </div>
                    <span style={{ fontSize: 10, fontWeight: i === 1 ? 700 : 400, whiteSpace: 'nowrap',
                      color: i < 2 ? '#fff' : 'rgba(255,255,255,0.3)' }}>{s}</span>
                  </div>
                  {i < 2 && <div style={{ width: 36, height: 2, background: i === 0 ? '#2979FF' : 'rgba(255,255,255,0.15)',
                    margin: '0 6px', marginBottom: 18 }} />}
                </div>
            ))}
          </div>
        </div>

        {/* ── White Form Card ── */}
        <div className="p-card" style={{
          flex: 1, background: '#fff', borderRadius: '28px 28px 0 0', padding: '28px 22px 80px', overflowY: 'auto',
        }}>
          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
            <div style={{ width: 4, height: 22, borderRadius: 2,
              background: 'linear-gradient(180deg,#2979FF,#00BCD4)' }} />
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0A1628', margin: 0 }}>
              Personal Information
            </h3>
          </div>

          <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Full Name */}
            <div>
              <NativeInput label="Full Name" placeholder="Enter your full name"
                           value={name} onChange={setName} icon="person" />
              {errors.name && <ErrMsg msg={errors.name} />}
            </div>

            {/* Email */}
            <div>
              <NativeInput label="Email Address" placeholder="you@example.com"
                           type="email" value={email} onChange={setEmail} icon="email" />
              {errors.email && <ErrMsg msg={errors.email} />}
            </div>

            {/* Age + Gender row */}
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <NativeInput label="Age" placeholder="e.g. 25"
                             type="tel" value={age}
                             onChange={v => setAge(v.replace(/\D/g, '').slice(0, 3))}
                             icon="cake" />
                {errors.age && <ErrMsg msg={errors.age} />}
              </div>
              <div style={{ flex: 1 }}>
                <NativeSelect label="Gender" value={gender}
                              onChange={setGender} options={GENDERS} />
              </div>
            </div>

            {/* Verified mobile chip */}
            <div style={{ background: '#EFF6FF', borderRadius: 12,
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#DBEAFE',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-icons" style={{ fontSize: 17, color: '#2563EB' }}>phone_android</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 10, color: '#6B7280', margin: '0 0 1px', fontWeight: 700, letterSpacing: 0.5 }}>
                  VERIFIED MOBILE
                </p>
                <p style={{ fontSize: 14, color: '#1D4ED8', fontWeight: 700, margin: 0 }}>
                  +91 {userData.mobile || '—'}
                </p>
              </div>
              <span className="material-icons" style={{ fontSize: 20, color: '#16A34A' }}>verified</span>
            </div>

            {/* Error summary */}
            {Object.keys(errors).length > 0 && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA',
                  borderRadius: 12, padding: '11px 14px',
                  display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="material-icons" style={{ fontSize: 17, color: '#DC2626' }}>error_outline</span>
                  <p style={{ fontSize: 13, color: '#DC2626', margin: 0, fontWeight: 600 }}>
                    Please fill in all highlighted fields
                  </p>
                </div>
            )}

            {/* ── BIG SAVE BUTTON ── */}
            <button
                type="button"
                onClick={save}
                disabled={isLoading}
                style={{
                  width: '100%', padding: '17px', borderRadius: 14,
                  background: isLoading
                      ? 'linear-gradient(135deg,#93C5FD,#67E8F9)'
                      : 'linear-gradient(135deg,#2979FF 0%,#0097A7 100%)',
                  border: 'none',
                  cursor: isLoading ? 'default' : 'pointer',
                  color: '#fff', fontSize: 16, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  boxShadow: '0 6px 28px rgba(41,121,255,0.4)',
                  letterSpacing: 0.3,
                  marginTop: 8,
                  transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {isLoading ? (
                  <div style={{ width: 22, height: 22, borderRadius: '50%',
                    border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff',
                    animation: 'spin 0.7s linear infinite' }} />
              ) : (
                  <>
                    <span className="material-icons" style={{ fontSize: 20 }}>arrow_forward</span>
                    Save &amp; Continue
                  </>
              )}
            </button>

            <p style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', margin: 0 }}>
              Fill all fields above · tap the blue button to continue
            </p>
          </div>
        </div>
      </div>
  )
}

function ErrMsg({ msg }) {
  return (
      <p style={{ fontSize: 12, color: '#DC2626', margin: '5px 0 0',
        display: 'flex', alignItems: 'center', gap: 4 }}>
        <span className="material-icons" style={{ fontSize: 13 }}>error_outline</span>
        {msg}
      </p>
  )
}
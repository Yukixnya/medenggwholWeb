import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalStore } from '../store/globalStore'
import AppBar from '../components/AppBar'
import { img } from '../utils/theme'

const PALETTES = [
  { bg:'#E3F2FD', accent:'#1565C0', light:'#BBDEFB', text:'#0D47A1' },
  { bg:'#E8F5E9', accent:'#2E7D32', light:'#C8E6C9', text:'#1B5E20' },
  { bg:'#FCE4EC', accent:'#AD1457', light:'#F8BBD0', text:'#880E4F' },
  { bg:'#FFF3E0', accent:'#E65100', light:'#FFE0B2', text:'#BF360C' },
  { bg:'#F3E5F5', accent:'#6A1B9A', light:'#E1BEE7', text:'#4A148C' },
  { bg:'#E0F7FA', accent:'#00695C', light:'#B2EBF2', text:'#004D40' },
  { bg:'#FFF8E1', accent:'#F57F17', light:'#FFECB3', text:'#E65100' },
  { bg:'#EDE7F6', accent:'#4527A0', light:'#D1C4E9', text:'#311B92' },
]

export default function SubCategoryScreen() {
  const nav = useNavigate()
  const { healthCategories, userData, setUserData } = useGlobalStore()
  const cat = healthCategories.find(c => c.id === userData.selectedCategoryId)
  const subcategories = cat?.subcategories || []

  function handleSelect(sub) {
    setUserData({ selectedSubCategoryId: sub.id, selectedSubCategoryName: sub.name })
    nav('/patient-input')
  }

  return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        background: '#EEF2FF',
        fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif",
        width: '100%', boxSizing: 'border-box',
      }}>
        <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .sub-item {
          transition: transform 0.15s ease, box-shadow 0.15s ease !important;
          width: 100%; box-sizing: border-box;
        }
        .sub-item:hover { transform: translateX(5px) !important; box-shadow: 0 8px 32px rgba(10,22,40,0.13) !important; }
        .sub-item:active { transform: scale(0.99) !important; }

        /* Two columns on wider screens */
        .sub-grid { display:flex; flex-direction:column; gap:12px; }
        @media(min-width:640px) {
          .sub-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }
        }
        @media(min-width:1024px) {
          .sub-grid { grid-template-columns:repeat(3,1fr); gap:16px; }
        }
      `}</style>

        <AppBar title={userData.selectedCategoryName || 'Select Issue'} />

        {/* ── BANNER ── */}
        <div style={{
          background: 'linear-gradient(135deg,#091525 0%,#1255B8 55%,#0088A3 100%)',
          width: '100%', boxSizing: 'border-box',
          padding: '0 20px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position:'absolute',top:-40,right:-40,width:160,height:160,borderRadius:'50%',background:'rgba(255,255,255,0.05)',pointerEvents:'none' }} />
          <div style={{ position:'absolute',bottom:-20,left:'35%',width:120,height:120,borderRadius:'50%',background:'rgba(0,151,167,0.09)',pointerEvents:'none' }} />

          <div style={{ position:'relative', zIndex:1 }}>
            {/* Progress dots */}
            <div style={{ display:'flex', alignItems:'center', gap:5, padding:'18px 0 0' }}>
              {[0,1,2].map(i => (
                  <div key={i} style={{
                    height:4, borderRadius:2,
                    width: i===1 ? 24 : 12,
                    background: i===0 ? '#0097A7' : i===1 ? '#2979FF' : 'rgba(255,255,255,0.2)',
                  }} />
              ))}
              <span style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.45)', marginLeft:6, letterSpacing:0.8 }}>STEP 2 OF 3</span>
            </div>

            <h2 style={{ color:'#fff', fontSize:20, fontWeight:800, margin:'10px 0 4px' }}>
              Select Your Concern
            </h2>
            <p style={{ color:'rgba(255,255,255,0.48)', fontSize:13, margin:0 }}>
              Choose what best describes your situation
            </p>

            {/* Count */}
            <div style={{
              display:'inline-flex', alignItems:'center', gap:6,
              margin:'12px 0 18px',
              background:'rgba(255,255,255,0.10)', borderRadius:20,
              padding:'5px 14px', border:'1px solid rgba(255,255,255,0.14)',
            }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#4FC3F7' }} />
              <span style={{ fontSize:11, color:'rgba(255,255,255,0.68)', fontWeight:600 }}>
              {subcategories.length} options available
            </span>
            </div>
          </div>

          <div style={{ height:20, background:'#EEF2FF', borderRadius:'18px 18px 0 0' }} />
        </div>

        {/* ── LIST ── */}
        <div style={{ flex:1, overflowY:'auto', padding:'16px 20px 40px', width:'100%', boxSizing:'border-box' }}>
          <div className="sub-grid">
            {subcategories.map((sub, i) => (
                <SubCard
                    key={sub.id}
                    sub={sub}
                    palette={PALETTES[i % PALETTES.length]}
                    delay={i * 0.05}
                    onClick={() => handleSelect(sub)}
                />
            ))}
          </div>
        </div>
      </div>
  )
}

function SubCard({ sub, palette: p, delay, onClick }) {
  const [imgErr, setImgErr] = useState(false)
  const imgSrc = img(sub.image)

  return (
      <button
          className="sub-item"
          onClick={onClick}
          style={{
            animationDelay: `${delay}s`,
            animation: 'fadeUp 0.4s ease both',
            background: '#fff',
            borderRadius: 18,
            border: `1.5px solid ${p.accent}22`,
            padding: 0, overflow: 'hidden', cursor: 'pointer', textAlign: 'left',
            display: 'flex', alignItems: 'stretch',
            boxShadow: '0 4px 18px rgba(10,22,40,0.08)',
          }}
      >
        {/* Left color strip */}
        <div style={{
          width: 5, flexShrink: 0,
          background: `linear-gradient(180deg,${p.accent},${p.bg})`,
        }} />

        {/* Image */}
        <div style={{
          width: 100, flexShrink: 0, position: 'relative', overflow: 'hidden',
          background: `linear-gradient(145deg,${p.light},${p.bg})`,
          minHeight: 90,
        }}>
          {(imgSrc && !imgErr)
              ? <img
                  src={imgSrc} alt={sub.name}
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  onError={() => setImgErr(true)}
              />
              : <div style={{ width:'100%', height:'100%', minHeight:90, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span className="material-icons" style={{ fontSize:36, color:p.accent, opacity:0.45 }}>medical_services</span>
              </div>
          }
        </div>

        {/* Content */}
        <div style={{ flex:1, padding:'14px 14px', display:'flex', flexDirection:'column', justifyContent:'center', gap:5 }}>
          <p style={{ fontSize:14, fontWeight:800, color:'#0A1628', margin:0, lineHeight:1.3 }}>{sub.name}</p>
          <p style={{ fontSize:12, color:'#9CA3AF', margin:0 }}>Tap to get personalised help</p>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:4,
            background:p.bg, padding:'3px 9px', borderRadius:7,
            width:'fit-content', border:`1px solid ${p.accent}30`,
            marginTop:2,
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <span style={{ fontSize:10, fontWeight:700, color:p.accent, letterSpacing:0.4 }}>VIEW RECOMMENDATIONS</span>
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display:'flex', alignItems:'center', paddingRight:14 }}>
          <div style={{
            width:30, height:30, borderRadius:'50%', background:p.bg,
            display:'flex', alignItems:'center', justifyContent:'center',
            border:`1px solid ${p.accent}30`,
            flexShrink:0,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </button>
  )
}
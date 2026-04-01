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
    const cat          = healthCategories?.find(c => c.id === userData?.selectedCategoryId)
    const subcategories = cat?.subcategories || []

    function handleSelect(sub) {
        setUserData({ ...userData, selectedSubCategoryId: sub.id, selectedSubCategoryName: sub.name })
        nav('/patient-input')
    }

    return (
        <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#F0F4FF', fontFamily:"'Plus Jakarta Sans','Segoe UI',sans-serif" }}>
            <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

        .sub-inner { max-width:1400px; margin:0 auto; width:100%; box-sizing:border-box; }
        .sub-banner-pad { padding: 0 20px; }
        @media(min-width:640px)  { .sub-banner-pad { padding: 0 40px; } }
        @media(min-width:1024px) { .sub-banner-pad { padding: 0 64px; } }
        .sub-content-pad { padding: 20px 20px 48px; }
        @media(min-width:640px)  { .sub-content-pad { padding: 24px 40px 56px; } }
        @media(min-width:1024px) { .sub-content-pad { padding: 28px 64px 64px; } }

        /* Responsive grid */
        .sub-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media(min-width:540px)  { .sub-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
        @media(min-width:1024px) { .sub-grid { grid-template-columns: repeat(3, 1fr); gap: 18px; } }
        @media(min-width:1280px) { .sub-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }

        .sub-card { transition: transform 0.15s ease, box-shadow 0.15s ease !important; cursor:pointer; }
        .sub-card:hover { transform: translateY(-4px) !important; box-shadow: 0 12px 36px rgba(10,22,40,0.14) !important; }
        .sub-card:active { transform: scale(0.98) !important; }
      `}</style>

            <AppBar title={userData?.selectedCategoryName || 'Select Issue'} />

            {/* Banner */}
            <div style={{ background:'linear-gradient(135deg,#091525 0%,#1255B8 55%,#0088A3 100%)', width:'100%', boxSizing:'border-box', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:-50, right:-50, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,0.05)', pointerEvents:'none' }} />
                <div style={{ position:'absolute', bottom:-40, left:'15%', width:140, height:140, borderRadius:'50%', background:'rgba(0,188,212,0.07)', pointerEvents:'none' }} />

                <div className="sub-inner sub-banner-pad">
                    <div style={{ position:'relative', zIndex:1 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:5, paddingTop:22 }}>
                            {[0,1,2].map(i => (
                                <div key={i} style={{ height:4, borderRadius:2, width: i === 1 ? 28 : 14, background: i === 0 ? '#0097A7' : i === 1 ? '#2979FF' : 'rgba(255,255,255,0.2)' }} />
                            ))}
                            <span style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.45)', marginLeft:6, letterSpacing:0.8 }}>STEP 2 OF 3</span>
                        </div>
                        <h2 style={{ color:'#fff', fontSize:24, fontWeight:800, margin:'12px 0 5px' }}>Select Your Concern</h2>
                        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14, margin:0 }}>Choose what best describes your situation</p>
                        <div style={{ display:'inline-flex', alignItems:'center', gap:6, margin:'14px 0 20px', background:'rgba(255,255,255,0.10)', borderRadius:20, padding:'6px 16px', border:'1px solid rgba(255,255,255,0.14)' }}>
                            <div style={{ width:7, height:7, borderRadius:'50%', background:'#4FC3F7' }} />
                            <span style={{ fontSize:12, color:'rgba(255,255,255,0.7)', fontWeight:600 }}>{subcategories.length} options available</span>
                        </div>
                    </div>
                </div>
                <div style={{ height:22, background:'#F0F4FF', borderRadius:'20px 20px 0 0' }} />
            </div>

            {/* Grid */}
            <div style={{ flex:1, overflowY:'auto' }}>
                <div className="sub-inner sub-content-pad" style={{ boxSizing:'border-box' }}>
                    <div className="sub-grid">
                        {subcategories.map((sub, i) => (
                            <SubCard key={sub.id} sub={sub} palette={PALETTES[i % PALETTES.length]} delay={i * 0.05} onClick={() => handleSelect(sub)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function SubCard({ sub, palette: p, delay, onClick }) {
    const [imgErr, setImgErr] = useState(false)
    const imgSrc = typeof img === 'function' ? img(sub.image) : null

    return (
        <button className="sub-card" onClick={onClick}
                style={{ animationDelay:`${delay}s`, animation:'fadeUp 0.4s ease both', background:'#fff', borderRadius:20, border:`1.5px solid ${p.accent}22`, padding:0, overflow:'hidden', textAlign:'left', display:'flex', flexDirection:'column', boxShadow:'0 4px 18px rgba(10,22,40,0.08)', width:'100%' }}>

            {/* Image section — taller, full width */}
            <div style={{ width:'100%', height:160, position:'relative', overflow:'hidden', background:`linear-gradient(145deg,${p.light},${p.bg})`, flexShrink:0 }}>
                {(imgSrc && !imgErr)
                    ? <img src={imgSrc} alt={sub.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.4s ease' }} onError={() => setImgErr(true)} />
                    : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <span className="material-icons" style={{ fontSize:64, color:p.accent, opacity:0.3 }}>medical_services</span>
                    </div>
                }
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,transparent 50%,rgba(10,22,40,0.3) 100%)' }} />
            </div>

            {/* Text section */}
            <div style={{ padding:'16px', display:'flex', flexDirection:'column', gap:6, flex:1 }}>
                <p style={{ fontSize:15, fontWeight:800, color:'#0A1628', margin:0, lineHeight:1.3 }}>{sub.name}</p>
                <p style={{ fontSize:12, color:'#9CA3AF', margin:0 }}>Tap to get personalised help</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:8 }}>
                    <div style={{ display:'inline-flex', alignItems:'center', gap:5, background:p.bg, padding:'4px 10px', borderRadius:8, border:`1px solid ${p.accent}25` }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        <span style={{ fontSize:10, fontWeight:700, color:p.accent, letterSpacing:0.4 }}>VIEW RECOMMENDATIONS</span>
                    </div>
                    <div style={{ width:28, height:28, borderRadius:'50%', background:p.bg, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${p.accent}30` }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                </div>
            </div>
        </button>
    )
}
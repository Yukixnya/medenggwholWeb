import { useNavigate } from 'react-router-dom'
import { AppColors } from '../utils/theme'

export default function AppBar({ title, showBack = true, onBack = null, rightEl = null }) {
  const nav = useNavigate()

  return (
    <div className="w-full bg-white sticky top-0 z-50"
         style={{ borderBottom: `1px solid ${AppColors.divider}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
        {showBack && (
          <button
            onClick={onBack || (() => nav(-1))}
            className="mr-4 w-9 h-9 rounded-full flex items-center justify-center hover:bg-primaryLight transition-colors active:scale-95"
          >
            <span className="material-icons text-textDark" style={{ fontSize: 22 }}>arrow_back</span>
          </button>
        )}
        <span className="flex-1 text-lg font-bold text-textDark">{title}</span>
        {rightEl && <div>{rightEl}</div>}
      </div>
    </div>
  )
}

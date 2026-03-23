import { AppColors } from '../utils/theme'

export default function CustomCheckbox({ text, isSelected, onTap }) {
  return (
    <button onClick={onTap}
      className="w-full flex items-center gap-3 px-4 py-[14px] rounded-[14px] text-left transition-all duration-200"
      style={{
        background: isSelected ? AppColors.primaryLight : '#fff',
        border: `${isSelected?1.8:1}px solid ${isSelected?AppColors.primary:AppColors.divider}`,
        boxShadow: '0 3px 8px rgba(0,0,0,0.05)',
      }}>
      <span className="flex-shrink-0 w-[22px] h-[22px] rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background:isSelected?AppColors.primary:'#fff', border:`1.5px solid ${isSelected?AppColors.primary:AppColors.divider}` }}>
        {isSelected && <span className="material-icons text-white" style={{fontSize:14}}>check</span>}
      </span>
      <span className="text-sm flex-1" style={{ color:isSelected?AppColors.primary:AppColors.textDark, fontWeight:isSelected?600:400 }}>
        {text}
      </span>
    </button>
  )
}

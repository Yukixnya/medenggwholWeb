import { useState } from 'react'
import { AppColors } from '../utils/theme'

export function CustomInput({ label, hint='', value, onChange, type='text', prefixIcon=null, maxLength, disabled=false }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm font-semibold text-textDark">{label}</span>}
      <div className="flex items-center bg-white rounded-xl overflow-hidden transition-all"
           style={{ border:`${focused?'1.5px':'1px'} solid ${focused?AppColors.primary:AppColors.divider}` }}>
        {prefixIcon && (
          <span className="material-icons px-3 text-[20px]" style={{color:AppColors.primary}}>{prefixIcon}</span>
        )}
        <input
          type={type} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={hint} maxLength={maxLength} disabled={disabled}
          className="flex-1 py-[14px] pr-3 text-sm text-textDark bg-transparent outline-none placeholder-textGrey"
          style={{ paddingLeft: prefixIcon ? 0 : 16 }}
        />
      </div>
    </div>
  )
}

export function CustomDropdown({ label, value, onChange, options=[] }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm font-semibold text-textDark">{label}</span>}
      <div className="bg-white rounded-xl px-4" style={{border:`1px solid ${AppColors.divider}`}}>
        <select value={value} onChange={e => onChange(e.target.value)}
                className="w-full py-[13px] text-sm text-textDark bg-transparent outline-none">
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  )
}

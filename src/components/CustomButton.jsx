export default function CustomButton({
  label, onTap, variant = 'primary', isLoading = false,
  leadingIcon = null, width = '100%', height = 52, disabled = false,
}) {
  const styleMap = {
    primary: { background:'linear-gradient(90deg,#2979FF,#00BCD4)', boxShadow:'0 4px 14px rgba(41,121,255,0.35)', color:'#fff', border:'none' },
    outline: { background:'transparent', color:'#2979FF', border:'1.5px solid #2979FF' },
    danger:  { background:'#E53935', color:'#fff', border:'none' },
    text:    { background:'transparent', color:'#2979FF', border:'none' },
  }
  const off = isLoading || disabled
  return (
    <button
      onClick={!off ? onTap : undefined}
      disabled={off}
      className={`flex items-center justify-center gap-2 font-bold text-[15px] rounded-[14px] transition-all duration-150 select-none ${off ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer active:scale-[0.97]'}`}
      style={{ width, height, ...styleMap[variant] }}
    >
      {isLoading
        ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        : <>
            {leadingIcon && <span className="material-icons" style={{fontSize:20}}>{leadingIcon}</span>}
            {label}
          </>
      }
    </button>
  )
}

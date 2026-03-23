export const AppColors = {
  primary:      '#2979FF',
  primaryLight: '#E3EEFF',
  primaryDark:  '#1565C0',
  secondary:    '#00BCD4',
  background:   '#F5F7FA',
  surface:      '#FFFFFF',
  textDark:     '#1A1A2E',
  textGrey:     '#8A94A6',
  divider:      '#E8ECF0',
  error:        '#E53935',
  success:      '#43A047',
}

export const sectionColors = [
  '#E3EEFF','#E8F5E9','#FFF3E0','#FCE4EC','#EDE7F6','#E0F7FA',
]

export function getSectionColor(str = '') {
  let h = 0
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h)
  return sectionColors[Math.abs(h) % sectionColors.length]
}

export function hexToRgba(hex = '#000', a = 1) {
  const h = hex.replace('#', '')
  return `rgba(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)},${a})`
}

export function img(flutterPath) {
  if (!flutterPath) return null
  const file = flutterPath.split('/').pop()
  return `/images/${file}`
}

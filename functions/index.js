const express = require('express')
const fetch = require('node-fetch')
const app = express()

app.use(express.json())
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).send('')
  next()
})

app.post('/send-otp', async (req, res) => {
  const { phone, otp } = req.body
  try {
    const waRes = await fetch('https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authkey: process.env.MSG91_KEY },
      body: JSON.stringify({
        integrated_number: '919004975395',
        content_type: 'template',
        payload: {
          messaging_product: 'whatsapp',
          type: 'template',
          template: {
            name: 'medenggwhol',
            language: { code: 'en', policy: 'deterministic' },
            namespace: 'c54a7743_afaa_45db_a93c_5b839dbea4ec',
            to_and_components: [{ to: [phone], components: { body_1: { type: 'text', value: otp }, button_1: { subtype: 'url', type: 'text', value: otp } } }],
          },
        },
      }),
    })
    if (waRes.ok) return res.json({ success: true })
    return res.json({ success: false, error: 'WhatsApp failed' })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
})

app.listen(process.env.PORT || 3000)

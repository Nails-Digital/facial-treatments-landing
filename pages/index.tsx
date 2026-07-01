import Head from 'next/head'
import { useState } from 'react'
import fs from 'fs'
import path from 'path'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', main_concern: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const concernsMap: { [key: string]: string } = {
    'acne': 'אקנה ופצעי בגרות',
    'scars': 'צלקות אקנה',
    'pigmentation': 'פיגמנטציה וכתמים',
    'aging': 'קמטוטים והצערת העור',
    'texture': 'גוון וטקסטורה לא אחידים',
    'other': 'אחר'
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const scrollToForm = () => {
    const formSection = document.getElementById('contact')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const submitData = {
        ...formData,
        main_concern: concernsMap[formData.main_concern] || formData.main_concern
      }
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setSubmitted(true)
      alert('תודה! אחזור אלייך בקרוב.')
      setFormData({ name: '', phone: '', email: '', main_concern: '' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בשמירת הפרטים')
      alert('שגיאה בשליחת הטופס. אנא נסי שוב.')
    } finally {
      setLoading(false)
    }
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const event = e as React.FormEvent<HTMLFormElement>
    handleSubmit(event as React.FormEvent)
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>טיפולי פנים מקצועיים | מיכאל ארז כהן</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html {
            width: 100%;
            overflow-x: hidden;
            max-width: 100vw;
          }
          body {
            font-family: 'Heebo', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #faf8f5;
            color: #1a1714;
            line-height: 1.6;
            direction: rtl;
            text-align: right;
            width: 100%;
            max-width: 100vw;
            overflow-x: hidden !important;
          }
          a { text-decoration: none; color: inherit; }
          button { cursor: pointer; border: none; font-family: inherit; transition: all 0.25s ease; }
          input, textarea, select { font-family: inherit; width: 100%; max-width: 100%; }
          ::placeholder { color: #b0a89e; }
          img { max-width: 100%; height: auto; display: block; }
          section { width: 100%; max-width: 100vw; overflow-x: hidden; }
          div { max-width: 100%; }
          table { width: 100%; table-layout: auto; }

          @media (max-width: 1200px) {
            div[style*="gridTemplateColumns: repeat(3"] {
              grid-template-columns: 1fr 1fr !important;
            }
          }

          @media (max-width: 768px) {
            body { font-size: 14px; }
            h1 { font-size: 32px !important; line-height: 1.2 !important; }
            h2 { font-size: 26px !important; }
            h3 { font-size: 16px !important; }
            p { font-size: 13px !important; }
            section { padding: 40px 16px !important; width: 100% !important; }
            div[style*="maxWidth"] { max-width: 100% !important; padding: 0 !important; width: 100% !important; }
            div[style*="display: grid"] { gap: 12px !important; width: 100% !important; }
            div[style*="gridTemplateColumns: repeat(3"] {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
            div[style*="padding: 40px 30px"] {
              padding: 20px 16px !important;
            }
            button { padding: 14px 20px !important; font-size: 14px !important; width: 100%; }
          }

          @media (max-width: 480px) {
            h1 { font-size: 22px !important; }
            h2 { font-size: 18px !important; }
            h3 { font-size: 14px !important; }
            p { font-size: 12px !important; }
            section { padding: 24px 12px !important; width: 100% !important; }
            button { padding: 12px 16px !important; font-size: 13px !important; }
            div[style*="maxWidth"] { padding: 0 6px !important; width: 100% !important; }
          }

          @media (max-width: 360px) {
            h1 { font-size: 18px !important; }
            h2 { font-size: 16px !important; }
            section { padding: 16px 8px !important; }
            button { padding: 10px 12px !important; font-size: 12px !important; }
          }
        `}</style>
      </Head>

      <div dangerouslySetInnerHTML={{__html: `
<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<section id="contact" data-screen-label="form" style="padding:88px 24px; background:#111; border-top:2px solid #111;">
  <div style="max-width:600px; margin:0 auto;">
    <h2 style="font-size:44px; font-weight:900; margin-bottom:14px; text-align:center; color:#fff; letter-spacing:-0.5px;">
      בואי נתחיל
    </h2>
    <p style="color:#b0a898; text-align:center; margin-bottom:52px; font-size:16px; font-weight:400;">
      השאירי פרטים ואחזור אלייך בתוך 24 שעות לתיאום ייעוץ ללא עלות.
    </p>
  </div>
</section>
</body>
</html>
      `}} />

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '88px 24px', background: '#111' }}>
        {submitted && <div style={{ padding: '16px', background: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }}>✅ תודה! אחזור אלייך בקרוב.</div>}
        {error && <div style={{ padding: '16px', background: '#ffeaea', color: '#d63031', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>שם מלא</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '14px 16px', border: '2px solid #3a3830', borderRadius: '4px', fontSize: '15px', background: '#1e1c19', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>מספר טלפון</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '14px 16px', border: '2px solid #3a3830', borderRadius: '4px', fontSize: '15px', background: '#1e1c19', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>אימייל</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '14px 16px', border: '2px solid #3a3830', borderRadius: '4px', fontSize: '15px', background: '#1e1c19', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: '#fff' }}>מה הכי מטריד אותך בעור?</label>
            <select name="main_concern" value={formData.main_concern} onChange={handleChange} required style={{ width: '100%', padding: '14px 16px', border: '2px solid #3a3830', borderRadius: '4px', fontSize: '15px', background: '#1e1c19', color: '#fff' }}>
              <option value="">בחרי...</option>
              <option value="acne">אקנה ופצעי בגרות</option>
              <option value="scars">צלקות אקנה</option>
              <option value="pigmentation">פיגמנטציה וכתמים</option>
              <option value="aging">קמטוטים והצערת העור</option>
              <option value="texture">גוון וטקסטורה לא אחידים</option>
              <option value="other">אחר</option>
            </select>
          </div>
          <button type="submit" disabled={loading} style={{ padding: '16px', background: '#fff', color: '#111', borderRadius: '4px', fontSize: '16px', fontWeight: '800', marginTop: '10px', letterSpacing: '0.3px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'שוקל...' : 'לתיאום ייעוץ ללא עלות'}
          </button>
          <p style={{ fontSize: '12px', color: '#6a6258', textAlign: 'center', fontWeight: '400' }}>
            אחזור אלייך בתוך 24 שעות. הפרטים שלך נשמרים בדיסקרטיות מלאה.
          </p>
        </form>
      </div>
    </>
  )
}

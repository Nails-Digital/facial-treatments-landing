import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', concerns: [] as string[] })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        concerns: checked
          ? [...prev.concerns, value]
          : prev.concerns.filter(c => c !== value)
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setSubmitted(true)
      setFormData({ name: '', phone: '', email: '', concerns: [] })
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בשמירת הפרטים')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>FIXER - טיפולי פנים</title>
        <meta name="description" content="עור חלק, צעיר ויפה עם טכנולוגיית FIXER" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', minHeight: '100vh', background: '#f9f8f7' }}>
        {/* Header */}
        <header style={{ padding: '32px 24px', borderBottom: '1px solid #e8e8e8', background: '#fff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px' }}>FIXER</div>
            <nav style={{ display: 'flex', gap: '32px', fontSize: '14px' }}>
              <a href="#how-it-works" style={{ textDecoration: 'none', color: '#2c2c2c', cursor: 'pointer' }}>כיצד זה פועל</a>
              <a href="#who-fits" style={{ textDecoration: 'none', color: '#2c2c2c', cursor: 'pointer' }}>למי מתאים</a>
              <a href="#contact" style={{ textDecoration: 'none', color: '#2c2c2c', cursor: 'pointer' }}>צור קשר</a>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section style={{ padding: '80px 24px', background: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '24px', lineHeight: '1.2' }}>
              עור חלק, צעיר ויפה
            </h1>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '48px', lineHeight: '1.7' }}>
              מכשיר FIXER משלב טכנולוגיית גלי רדיו חלקיים עם מיקרו-מחטים לתיקון נזקים בעור הפנים והגוף, ללא הזרקות או ניתוחים.
            </p>
            <div style={{ height: '300px', background: '#e8e8e8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', marginBottom: '48px', fontSize: '14px' }}>
              [תמונת המכשיר FIXER]
            </div>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} style={{ padding: '16px 48px', background: '#2c2c2c', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}>
              בואו נתחיל
            </button>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" style={{ padding: '80px 24px', background: '#f9f8f7' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '48px', textAlign: 'center' }}>כיצד פועל הטיפול</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px' }}>
              <div style={{ background: '#fff', padding: '32px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>הטכנולוגיה</h3>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
                  ידית הטיפול מעבירה זרם חשמלי מדויק לרקמת העור באזור הטיפול בעזרת 36 מיקרו-אלקטרודות. הזרם החשמלי עובר בצורה מבוקרת דרך השכבות החיצוניות והתחתונות של העור, מתקן ומחדש את העור, בונה מחדש קולגן ואלסטין.
                </p>
              </div>

              <div style={{ background: '#fff', padding: '32px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>התוצאות</h3>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
                  עור חלק וגמיש יותר. תהליכי התחדשות וארגון מחדש חזקים של תאי עור מבפנים החוצה, המתרחשים באופן טבעי, ללא הכנסת חומרים חיצוניים.
                </p>
              </div>
            </div>

            <div style={{ background: '#fff', padding: '32px', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>מספר הטיפולים</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.8', marginBottom: '16px' }}>
                הטיפול מתבצע בסדרה של כ-6 מפגשים, במרווחים של חודש אחד זה מזה. המינימום הנדרש הוא 3 טיפולים. לאחר הטיפול הראשון כבר תוכלו להבחין בשינוי, ובתום הסדרה - התוצאה הסופית תהיה גלויה.
              </p>
            </div>
          </div>
        </section>

        {/* Who it fits */}
        <section id="who-fits" style={{ padding: '80px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '48px', textAlign: 'center' }}>למי מתאים הטיפול</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {['צלקות אקנה', 'צלקות לאחר ניתוח', 'נקבוביות מוגדלות', 'קמטים וקמטים עדינים', 'קמטי צוואר וקמטי עיניים', 'עור עייף ורפוי', 'סימני מתיחה בבטן ובגוף', 'עור רפוי סביב הטבור'].map((item, i) => (
                <div key={i} style={{ padding: '20px', borderLeft: '3px solid #2c2c2c', fontSize: '14px' }}>{item}</div>
              ))}
            </div>

            <p style={{ textAlign: 'center', marginTop: '48px', fontSize: '16px', color: '#666' }}>
              <strong>הטיפול מתאים לנשים וגברים כאחד.</strong>
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section id="contact" style={{ padding: '80px 24px', background: '#f9f8f7' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '48px', textAlign: 'center' }}>בואו נתחיל</h2>

            {submitted && <div style={{ padding: '16px', background: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }}>✅ הפרטים שלך נשמרו בהצלחה!</div>}
            {error && <div style={{ padding: '16px', background: '#ffeaea', color: '#d63031', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>שם *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontFamily: 'inherit' }} />
              </div>

              {/* Phone */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>טלפון *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontFamily: 'inherit' }} />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>אימייל</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontFamily: 'inherit' }} />
              </div>

              {/* Concerns */}
              <fieldset style={{ border: 'none', padding: '0' }}>
                <legend style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', display: 'block' }}>מה אתם מחפשים לטפל בו?</legend>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { value: 'acne-scars', label: 'צלקות אקנה' },
                    { value: 'surgical-scars', label: 'צלקות לאחר ניתוח' },
                    { value: 'enlarged-pores', label: 'נקבוביות מוגדלות' },
                    { value: 'wrinkles', label: 'קמטים' },
                    { value: 'sagging', label: 'עור עייף ורפוי' },
                    { value: 'stretch-marks', label: 'סימני מתיחה' }
                  ].map(concern => (
                    <label key={concern.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="checkbox" name="concerns" value={concern.value} checked={formData.concerns.includes(concern.value)} onChange={handleChange} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                      <span style={{ fontSize: '14px' }}>{concern.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Submit */}
              <button type="submit" disabled={loading} style={{ padding: '16px', background: '#2c2c2c', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '12px', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'שוקל...' : 'המשך'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}

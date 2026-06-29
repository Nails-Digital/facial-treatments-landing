import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', main_concern: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

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
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setSubmitted(true)
      setFormData({ name: '', phone: '', email: '', main_concern: '' })
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
        <title>טיפולי פנים מקצועיים | מיכאל ארז</title>
        <meta name="description" content="טיפולי פנים מקצועיים לאקנה, פיגמנטציה והצערת העור" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: 100%; height: 100%; }
          body {
            font-family: 'Heebo', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #faf8f5;
            color: #1a1714;
            line-height: 1.6;
            direction: rtl;
            text-align: right;
          }
          a { text-decoration: none; color: inherit; }
          button { cursor: pointer; border: none; font-family: inherit; transition: all 0.25s ease; }
          input, textarea, select { font-family: inherit; }
          ::placeholder { color: #b0a89e; }
        `}</style>
      </Head>

      <div>
        {/* HERO */}
        <section style={{ padding: '88px 24px 80px', background: '#fff', textAlign: 'center', borderBottom: '2px solid #111' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{ fontSize: '13px', letterSpacing: '3px', color: '#111', marginBottom: '24px', fontWeight: '700', textTransform: 'uppercase' }}>
              קוסמטיקאית פארא-רפואית · מיכאל ארז
            </p>
            <h1 style={{ fontSize: '56px', fontWeight: '900', lineHeight: '1.15', marginBottom: '22px', color: '#111', letterSpacing: '-1px' }}>
              העור שלך מספר סיפור.<br />בואי נכתוב אותו מחדש.
            </h1>
            <p style={{ fontSize: '20px', color: '#3a3530', marginBottom: '14px', lineHeight: '1.75', fontWeight: '500' }}>
              טיפולי פנים מקצועיים לאקנה, פיגמנטציה והצערת העור
            </p>
            <p style={{ fontSize: '16px', color: '#5c5550', marginBottom: '52px', maxWidth: '660px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.85' }}>
              ליווי אישי שמתחיל באבחון מדויק ובונה תוכנית טיפול שמתאימה בדיוק לך. בלי הבטחות מוגזמות, רק תוצאות אמיתיות שנשארות.
            </p>
            <button onClick={scrollToForm} style={{ padding: '18px 52px', background: '#111', color: '#fff', borderRadius: '4px', fontSize: '16px', fontWeight: '700', display: 'inline-block', marginBottom: '40px', letterSpacing: '0.5px' }}>
              לתיאום ייעוץ ללא עלות
            </button>
          </div>
        </section>

        {/* SPECIALTIES */}
        <section style={{ padding: '88px 24px', background: '#faf8f5' }}>
          <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '44px', fontWeight: '900', marginBottom: '14px', textAlign: 'center', color: '#111', letterSpacing: '-0.5px' }}>
              שלושה תחומי התמחות
            </h2>
            <p style={{ fontSize: '17px', color: '#5c5550', textAlign: 'center', marginBottom: '56px', fontWeight: '500' }}>
              כל עור הוא עולם. אני מתמחה בשלושת האתגרים הנפוצים ביותר.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
              {[
                { title: 'אקנה ופצעי בגרות', desc: 'אקנה אקטיבית, פצעונים חוזרים, צלקות ופיגמנטציה שנשארות אחריהם. טיפול שמרגיע את הדלקת, מאזן את העור ומחזיר לו חלקות.' },
                { title: 'פיגמנטציה וכתמים', desc: 'כתמי שמש, כתמי הריון (מלזמה), גוון עור לא אחיד. הבהרה הדרגתית ובטוחה שמחזירה לעור גוון אחיד וזוהר טבעי.' },
                { title: 'הצערת העור', desc: 'קמטוטים, רפיון, אובדן נפח וזוהר. טיפולים שמעוררים את העור לייצור קולגן מחדש ומחזירים לו מראה מוצק וצעיר.' }
              ].map((item, i) => (
                <div key={i} style={{ background: '#fff', padding: '36px 28px', borderRadius: '4px', border: '2px solid #111', borderTop: '4px solid #111' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px', color: '#111' }}>{item.title}</h3>
                  <p style={{ color: '#4a4540', fontSize: '15px', lineHeight: '1.85', fontWeight: '400' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEVICES SECTION */}
        <section style={{ padding: '88px 24px', background: '#111', borderTop: '2px solid #111' }}>
          <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
            <p style={{ fontSize: '13px', letterSpacing: '3px', color: '#c9b89a', marginBottom: '20px', fontWeight: '700', textAlign: 'center', textTransform: 'uppercase' }}>
              הטכנולוגיה שמאחורי התוצאות
            </p>
            <h2 style={{ fontSize: '44px', fontWeight: '900', marginBottom: '14px', textAlign: 'center', color: '#fff', letterSpacing: '-0.5px' }}>
              מכשירים מקצועיים מהשורה הראשונה
            </h2>
            <p style={{ fontSize: '17px', color: '#c0b8b0', textAlign: 'center', marginBottom: '64px', fontWeight: '400', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
              הפרוטוקולים שלי מבוססים על שלושה מכשירים מתקדמים שנבחרו בקפידה לתת תוצאות ניתנות למדידה — ללא כאב, ללא זמן החלמה.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
              {[
                {
                  tag: 'RF · אלקטרופורציה · יונטופורזה',
                  title: 'אפולו דואט',
                  desc: 'מכשיר RF רב-קוטבי דור-4 המשלב אלקטרופורציה ויונטופורזה בו-זמנית. מחמם את הדרמיס לטמפרטורה מבוקרת לגירוי ייצור קולגן, ובמקביל פותח ערוצי מיקרו להחדרת חומרים פעילים לעומק.',
                  features: ['הצערת עור ומיצוק', 'טיפול באקנה ורוזציאה', 'הבהרת פיגמנטציה', 'שיפור ספיגת חומרים פעילים']
                },
                {
                  tag: 'אקספוליאציה · ויברציות · LED',
                  title: 'לה פונטן',
                  desc: 'המכשיר הראשון בעולם המשלב שלוש טכנולוגיות משלימות: מאקרו-אקספוליאציה בתנודות, עיסוי במיקרו-ויברציות וטיפול LED (633nm). מגביר ייצור אלסטין בכ-20% ומחליק את מרקם העור.',
                  features: ['החלקת קמטוטים ושיפור מרקם', 'הידוק עור ומיצוק פנים', 'צמצום נקבוביות וטיפול בצלקות', 'אחדות גוון ובהירות עור']
                },
                {
                  tag: 'פלזמה קרה · ללא כאב · ללא החלמה',
                  title: 'פלטון פלזמה קרה',
                  desc: 'מכשיר פלזמה אטמוספרית קרה הפועל בטמפרטורה של 35–40°C. הוא ממיר חמצן וחנקן מהאוויר לפלזמה לא תרמית — הורג חיידקי אקנה, מפחית דלקות, ומגרה התחדשות תאי עור חדשה.',
                  features: ['אקנה, אטופיק דרמטיטיס, רוזציאה', 'עיקור והרגעת עור מודלק', 'גירוי ייצור קולגן ואלסטין', 'הבהרת כתמי פיגמנטציה']
                }
              ].map((device, i) => (
                <div key={i} style={{ background: '#1e1c19', padding: '40px 30px', borderRadius: '4px', border: '2px solid #3a3830', borderTop: '4px solid #c9b89a', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <p style={{ fontSize: '12px', letterSpacing: '2px', color: '#c9b89a', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase' }}>{device.tag}</p>
                    <h3 style={{ fontSize: '26px', fontWeight: '900', color: '#fff', letterSpacing: '-0.3px' }}>{device.title}</h3>
                  </div>
                  <p style={{ color: '#b0a898', fontSize: '15px', lineHeight: '1.85' }}>{device.desc}</p>
                  <div style={{ borderTop: '1px solid #3a3830', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {device.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ minWidth: '6px', height: '6px', borderRadius: '50%', background: '#c9b89a' }}></div>
                        <span style={{ color: '#d0c8be', fontSize: '14px', fontWeight: '500' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FORM */}
        <section id="contact" style={{ padding: '88px 24px', background: '#111', borderTop: '2px solid #111' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '44px', fontWeight: '900', marginBottom: '14px', textAlign: 'center', color: '#fff', letterSpacing: '-0.5px' }}>
              בואי נתחיל
            </h2>
            <p style={{ color: '#b0a898', textAlign: 'center', marginBottom: '52px', fontSize: '16px', fontWeight: '400' }}>
              השאירי פרטים ואחזור אלייך בתוך 24 שעות לתיאום ייעוץ ללא עלות.
            </p>

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
        </section>
      </div>
    </>
  )
}

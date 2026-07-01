import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const concernsMap: { [key: string]: string } = {
    'acne': 'אקנה ופצעי בגרות',
    'scars': 'צלקות אקנה',
    'pigmentation': 'פיגמנטציה וכתמים',
    'aging': 'קמטוטים והצערת העור',
    'texture': 'גוון וטקסטורה לא אחידים',
    'other': 'אחר'
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formElement = e.target as HTMLFormElement
    const formData = new FormData(formElement)

    try {
      const submitData = {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        main_concern: concernsMap[formData.get('main_concern') as string] || formData.get('main_concern')
      }

      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      if (!res.ok) throw new Error('Form submission failed')

      setSubmitted(true)
      formElement.reset()
      alert('תודה! אחזור אלייך בקרוב.')
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      alert('שגיאה בשליחת הטופס. אנא נסי שוב.')
    } finally {
      setLoading(false)
    }
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
          html { width: 100%; overflow-x: hidden; max-width: 100vw; }
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

          @media (max-width: 768px) {
            h1 { font-size: 32px !important; }
            h2 { font-size: 26px !important; }
            section { padding: 40px 16px !important; }
            div[style*="gridTemplateColumns: repeat(3"] { grid-template-columns: 1fr !important; }
          }

          @media (max-width: 480px) {
            h1 { font-size: 22px !important; }
            h2 { font-size: 18px !important; }
            section { padding: 24px 12px !important; }
          }
        `}</style>
      </Head>

      <div style={{ minHeight: '100vh' }}>
        {/* HERO */}
        <section style={{ padding: '88px 24px 80px', background: '#fff', textAlign: 'center', borderBottom: '2px solid #111' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{ fontSize: '13px', letterSpacing: '3px', color: '#111', marginBottom: '24px', fontWeight: '700', textTransform: 'uppercase' }}>מיכאל ארז כהן קוסמטיקאית</p>
            <h1 style={{ fontSize: '56px', fontWeight: '900', lineHeight: '1.15', marginBottom: '22px', color: '#111', letterSpacing: '-1px' }}>
              העור שלך מספר סיפור.<br />בואי נכתוב אותו מחדש.
            </h1>
            <p style={{ fontSize: '20px', color: '#3a3530', marginBottom: '14px', lineHeight: '1.75', fontWeight: '500' }}>
              טיפולי פנים מקצועיים לאקנה, פיגמנטציה והצערת העור
            </p>
            <p style={{ fontSize: '16px', color: '#5c5550', marginBottom: '52px', maxWidth: '660px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.85' }}>
              ליווי אישי שמתחיל באבחון מדויק ובונה תוכנית טיפול שמתאימה בדיוק לך. בלי הבטחות מוגזמות, רק תוצאות אמיתיות שנשארות.
            </p>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '18px 52px', background: '#111', color: '#fff', borderRadius: '4px', fontSize: '16px', fontWeight: '700', display: 'inline-block', marginBottom: '40px', letterSpacing: '0.5px', cursor: 'pointer' }}>
              לתיאום ייעוץ ללא עלות
            </button>
          </div>
        </section>

        {/* SPECIALTIES */}
        <section style={{ padding: '88px 24px', background: '#faf8f5' }}>
          <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '44px', fontWeight: '900', marginBottom: '14px', textAlign: 'center', color: '#111', letterSpacing: '-0.5px' }}>שלושה תחומי התמחות</h2>
            <p style={{ fontSize: '17px', color: '#5c5550', textAlign: 'center', marginBottom: '56px', fontWeight: '500' }}>כל עור הוא עולם. אני מתמחה בשלושת האתגרים הנפוצים ביותר.</p>
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

        {/* FORM SECTION */}
        <section id="contact" style={{ padding: '88px 24px', background: '#111', borderTop: '2px solid #111' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '44px', fontWeight: '900', marginBottom: '14px', textAlign: 'center', color: '#fff', letterSpacing: '-0.5px' }}>בואי נתחיל</h2>
            <p style={{ color: '#b0a898', textAlign: 'center', marginBottom: '52px', fontSize: '16px', fontWeight: '400' }}>השאירי פרטים ואחזור אלייך בתוך 24 שעות לתיאום ייעוץ ללא עלות.</p>

            {submitted && <div style={{ padding: '16px', background: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }}>✅ תודה! אחזור אלייך בקרוב.</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>שם מלא</label>
                <input type="text" name="name" required style={{ width: '100%', padding: '14px 16px', border: '2px solid #3a3830', borderRadius: '4px', fontSize: '15px', background: '#1e1c19', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>מספר טלפון</label>
                <input type="tel" name="phone" required style={{ width: '100%', padding: '14px 16px', border: '2px solid #3a3830', borderRadius: '4px', fontSize: '15px', background: '#1e1c19', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>אימייל</label>
                <input type="email" name="email" required style={{ width: '100%', padding: '14px 16px', border: '2px solid #3a3830', borderRadius: '4px', fontSize: '15px', background: '#1e1c19', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: '#fff' }}>מה הכי מטריד אותך בעור?</label>
                <select name="main_concern" required style={{ width: '100%', padding: '14px 16px', border: '2px solid #3a3830', borderRadius: '4px', fontSize: '15px', background: '#1e1c19', color: '#fff' }}>
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
              <p style={{ fontSize: '12px', color: '#6a6258', textAlign: 'center', fontWeight: '400' }}>אחזור אלייך בתוך 24 שעות. הפרטים שלך נשמרים בדיסקרטיות מלאה.</p>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}

import Head from 'next/head'
import { useState } from 'react'

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

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>טיפולי פנים מקצועיים | מיכאל ארז כהן</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
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
            div[style*="maxWidth"] { max-width: 100% !important; padding: 0 8px !important; width: 100% !important; }
            div[style*="display: grid"] { gap: 12px !important; width: 100% !important; }
            div[style*="gridTemplateColumns: repeat(3"] {
              grid-template-columns: 1fr !important;
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

      <div>
        {/* HERO */}
        <section style={{ padding: '88px 24px 80px', background: '#fff', textAlign: 'center', borderBottom: '2px solid #111' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{ fontSize: '13px', letterSpacing: '3px', color: '#111', marginBottom: '24px', fontWeight: '700', textTransform: 'uppercase' }}>קוסמטיקאית פארא-רפואית · מיכאל ארז כהן</p>
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
            <img src="/images/clinic-room.jpg" style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '4px', border: '2px solid #111', display: 'block' }} alt="הקליניקה" />
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
              <div style={{ background: '#fff', padding: '36px 28px', borderRadius: '4px', border: '2px solid #111', borderTop: '4px solid #111' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px', color: '#111' }}>אקנה ופצעי בגרות</h3>
                <p style={{ color: '#4a4540', fontSize: '15px', lineHeight: '1.85', fontWeight: '400' }}>
                  אקנה אקטיבית, פצעונים חוזרים, צלקות ופיגמנטציה שנשארות אחריהם. טיפול שמרגיע את הדלקת, מאזן את העור ומחזיר לו חלקות.
                </p>
              </div>
              <div style={{ background: '#fff', padding: '36px 28px', borderRadius: '4px', border: '2px solid #111', borderTop: '4px solid #111' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px', color: '#111' }}>פיגמנטציה וכתמים</h3>
                <p style={{ color: '#4a4540', fontSize: '15px', lineHeight: '1.85', fontWeight: '400' }}>
                  כתמי שמש, כתמי הריון (מלזמה), גוון עור לא אחיד. הבהרה הדרגתית ובטוחה שמחזירה לעור גוון אחיד וזוהר טבעי.
                </p>
              </div>
              <div style={{ background: '#fff', padding: '36px 28px', borderRadius: '4px', border: '2px solid #111', borderTop: '4px solid #111' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px', color: '#111' }}>הצערת העור</h3>
                <p style={{ color: '#4a4540', fontSize: '15px', lineHeight: '1.85', fontWeight: '400' }}>
                  קמטוטים, רפיון, אובדן נפח וזוהר. טיפולים שמעוררים את העור לייצור קולגן מחדש ומחזירים לו מראה מוצק וצעיר.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section style={{ padding: '88px 24px', background: '#fff', borderTop: '2px solid #111' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '44px', fontWeight: '900', marginBottom: '52px', textAlign: 'center', color: '#111', letterSpacing: '-0.5px' }}>
              את לא לבד בזה
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '28px' }}>
              <div style={{ background: '#faf8f5', padding: '32px', borderRadius: '4px', border: '2px solid #111', borderRight: '4px solid #111' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px', color: '#111' }}>ניסית כבר הכל</h3>
                <p style={{ color: '#4a4540', fontSize: '15px', lineHeight: '1.85' }}>
                  קרמים יקרים, מסכות מהאינטרנט, המלצות מחברות. כל פעם תקווה חדשה, וכל פעם אכזבה. העור ממשיך להראות בדיוק אותו דבר, ולפעמים אפילו גרוע יותר.
                </p>
              </div>
              <div style={{ background: '#faf8f5', padding: '32px', borderRadius: '4px', border: '2px solid #111', borderRight: '4px solid #111' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px', color: '#111' }}>זה משפיע על הביטחון</h3>
                <p style={{ color: '#4a4540', fontSize: '15px', lineHeight: '1.85' }}>
                  להתאפר כדי לכסות. להימנע מתמונות. להרגיש לא נוח כשמסתכלים עלייך מקרוב. כשהעור לא במיטבו, זה נוגע בהרבה יותר מהמראה.
                </p>
              </div>
            </div>
            <div style={{ background: '#faf8f5', padding: '32px', borderRadius: '4px', border: '2px solid #111', borderRight: '4px solid #111' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px', color: '#111' }}>הבעיה היא לא את. הבעיה היא חוסר אבחון</h3>
              <p style={{ color: '#4a4540', fontSize: '15px', lineHeight: '1.85' }}>
                רוב המוצרים נכשלים כי הם לא מתאימים לעור הספציפי שלך. עור שמן צריך גישה אחרת מעור יבש, פיגמנטציה דורשת טיפול שונה מאקנה. כשמתחילים מאבחון נכון, הכל משתנה.
              </p>
            </div>
          </div>
        </section>

        {/* APPROACH SECTION */}
        <section style={{ padding: '88px 24px', background: '#faf8f5', borderTop: '2px solid #111' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '44px', fontWeight: '900', marginBottom: '14px', textAlign: 'center', color: '#111', letterSpacing: '-0.5px' }}>
              איך עובד אצלי הטיפול
            </h2>
            <p style={{ fontSize: '17px', color: '#5c5550', textAlign: 'center', marginBottom: '56px', fontWeight: '500' }}>
              גישה מסודרת, צעד אחר צעד, שמביאה לתוצאות שמחזיקות לאורך זמן.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {[
                { num: '1', title: 'אבחון עומק', desc: 'מתחילים בשיחה ובבדיקה מקרוב של העור. מבינים את ההיסטוריה, ההרגלים, ומה באמת קורה מתחת לפני השטח.' },
                { num: '2', title: 'תוכנית אישית', desc: 'בונים יחד תוכנית טיפולים מותאמת, עם לוח זמנים ברור והסבר על כל שלב. בלי הפתעות, בלי לחץ.' },
                { num: '3', title: 'טיפול וליווי', desc: 'הטיפולים עצמם, יחד עם המלצות לשגרת טיפוח ביתית. אני כאן בשבילך גם בין המפגשים, לכל שאלה.' },
                { num: '4', title: 'שימור התוצאות', desc: 'אחרי שמגיעים ליעד, בונים תוכנית תחזוקה שתשמור על העור במיטבו לאורך זמן.' }
              ].map((item) => (
                <div key={item.num} style={{ background: '#fff', padding: '28px 32px', borderRadius: '4px', border: '2px solid #111', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '48px', height: '48px', background: '#111', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '800' }}>{item.num}</div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px', color: '#111' }}>{item.title}</h3>
                    <p style={{ color: '#4a4540', fontSize: '15px', lineHeight: '1.85' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEVICES SECTION */}
        <section style={{ padding: '88px 24px', background: '#111', borderTop: '2px solid #111' }}>
          <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
            <p style={{ fontSize: '13px', letterSpacing: '3px', color: '#c9b89a', marginBottom: '20px', fontWeight: '700', textAlign: 'center', textTransform: 'uppercase' }}>הטכנולוגיה שמאחורי התוצאות</p>
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

            <p style={{ textAlign: 'center', color: '#6a6258', fontSize: '13px', marginTop: '40px', fontStyle: 'italic' }}>
              כל פרוטוקול טיפול נבנה מאפס לפי סוג העור, מצבו וצרכיו הספציפיים — לעיתים שילוב של יותר ממכשיר אחד.
            </p>
          </div>
        </section>

        {/* BEFORE/AFTER */}
        <section style={{ padding: '88px 24px', background: '#fff', borderTop: '2px solid #111' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '44px', fontWeight: '900', marginBottom: '52px', textAlign: 'center', color: '#111', letterSpacing: '-0.5px' }}>חוויה שמדברת בעד עצמה</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
              <div style={{ textAlign: 'center' }}>
                <img src="/images/before-after.jpg" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '4px', border: '2px solid #111', marginBottom: '14px', display: 'block' }} alt="לפני ואחרי" />
                <p style={{ color: '#5c5550', fontSize: '14px', fontWeight: '600' }}>מיטת הטיפולים</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <img src="/images/devices-equipment.jpg" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '4px', border: '2px solid #111', marginBottom: '14px', display: 'block' }} alt="המכשירים" />
                <p style={{ color: '#5c5550', fontSize: '14px', fontWeight: '600' }}>הציוד המקצועי</p>
              </div>
            </div>
            <p style={{ textAlign: 'center', color: '#8a8078', fontSize: '13px', marginTop: '28px' }}>
              התוצאות משתנות מאדם לאדם בהתאם לסוג העור, הגיל והמצב הבריאותי.
            </p>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ padding: '88px 24px', background: '#faf8f5', borderTop: '2px solid #111' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '44px', fontWeight: '900', marginBottom: '52px', textAlign: 'center', color: '#111', letterSpacing: '-0.5px' }}>
              מה מספרות הלקוחות שלי
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              {[
                { text: '"סבלתי מאקנה כבר שנים והרגשתי שניסיתי כל דבר אפשרי. הפעם הראשונה שמישהי באמת ישבה איתי, הבינה את העור שלי ובנתה תוכנית. תוך כמה חודשים הפנים שלי השתנו לגמרי. סוף סוף אני יוצאת מהבית בלי איפור."', name: 'מיכל, אור יהודה' },
                { text: '"אחרי ההריון נשארו לי כתמים כהים בכל הפנים והייתי בייאוש. קיבלתי יחס חם, סבלני ומקצועי, וכל שלב הוסבר לי בדיוק. הכתמים התבהרו בהדרגה והגוון התאחד. אני ממליצה לכל אחת שמתלבטת."', name: 'שירה, יהוד' },
                { text: '"בגיל 52 חשבתי שכבר אין מה לעשות עם העור שלי. טעיתי. הטיפולים החזירו לפנים שלי מראה רענן ומוצק שלא הכרתי שנים. אנשים שואלים אותי מה שיניתי. זו ההמלצה הכי טובה שיש."', name: 'רונית, קרית אונו' }
              ].map((item, i) => (
                <div key={i} style={{ background: '#fff', padding: '32px', borderRadius: '4px', border: '2px solid #111', borderRight: '4px solid #111' }}>
                  <p style={{ color: '#3a3530', fontSize: '15px', lineHeight: '1.9', marginBottom: '18px', fontWeight: '400' }}>
                    {item.text}
                  </p>
                  <p style={{ fontWeight: '700', fontSize: '14px', color: '#111' }}>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO IT FITS */}
        <section style={{ padding: '88px 24px', background: '#fff', borderTop: '2px solid #111' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '44px', fontWeight: '900', marginBottom: '52px', textAlign: 'center', color: '#111', letterSpacing: '-0.5px' }}>
              הטיפול מתאים לך אם
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '14px', marginBottom: '40px' }}>
              {[
                'את מתמודדת עם אקנה אקטיבית או צלקות',
                'יש לך כתמי שמש או כתמי הריון',
                'את מרגישה שהעור איבד מהמוצקות והזוהר',
                'גוון העור שלך לא אחיד',
                'ניסית מוצרים רבים בלי תוצאה',
                'את רוצה ליווי מקצועי ולא עוד קרם'
              ].map((item, i) => (
                <div key={i} style={{ background: '#faf8f5', padding: '20px 24px', borderRadius: '4px', border: '2px solid #111', borderRight: '3px solid #111', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ minWidth: '8px', height: '8px', background: '#111', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '15px', fontWeight: '500', color: '#1a1714' }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#faf8f5', padding: '28px 32px', borderRadius: '4px', border: '2px solid #111', textAlign: 'center' }}>
              <p style={{ color: '#3a3530', fontSize: '15px', fontWeight: '500', lineHeight: '1.8' }}>
                <strong style={{ color: '#111' }}>הטיפול מתאים לכל גיל ולכל סוג עור.</strong> הגישה תמיד מותאמת אישית למצב הספציפי שלך.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '88px 24px', background: '#faf8f5', borderTop: '2px solid #111' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '44px', fontWeight: '900', marginBottom: '52px', textAlign: 'center', color: '#111', letterSpacing: '-0.5px' }}>
              שאלות נפוצות
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {[
                { q: 'כמה טיפולים אצטרך?', a: 'זה תלוי במצב העור ובמטרה. בדרך כלל מדובר בסדרה של מספר מפגשים, במרווחים קבועים. בייעוץ הראשון נבנה יחד תוכנית מדויקת ונדע בדיוק למה לצפות.' },
                { q: 'מתי אראה תוצאות?', a: 'כבר אחרי הטיפולים הראשונים העור נראה רענן ובהיר יותר. השינוי המשמעותי מגיע עם המשך הסדרה. עור הוא תהליך, והתוצאות נבנות בהדרגה ונשארות.' },
                { q: 'הטיפול כואב?', a: 'הטיפולים עדינים ונוחים. רוב הלקוחות מתארות אותם כחוויה מרגיעה. אם יש רגישות, אני מתאימה את עוצמת הטיפול בהתאם.' },
                { q: 'אפשר לחזור לשגרה אחרי הטיפול?', a: 'כן, בדרך כלל מיד. יתכן שתהיה אדמומיות קלה לכמה שעות, וזו תגובה טבעית. אתן לך הנחיות ברורות לטיפוח בימים שאחרי.' },
                { q: 'כמה זה עולה?', a: 'המחיר תלוי בסוג הטיפול ובתוכנית שנבנה יחד. בייעוץ ללא עלות נדבר בפתיחות גם על העלות ועל אפשרויות התשלום, כדי שתוכלי להחליט בנוחות.' },
                { q: 'העור שלי רגיש מאוד. זה בשבילי?', a: 'בהחלט. אני עובדת עם כל סוגי העור, כולל עור רגיש מאוד. הכל מתחיל באבחון, וכל טיפול מותאם בעדינות לרמת הרגישות שלך.' }
              ].map((item, i) => (
                <div key={i} style={{ background: '#fff', padding: '28px 32px', borderRadius: '4px', border: '2px solid #111' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px', color: '#111' }}>{item.q}</h3>
                  <p style={{ color: '#4a4540', fontSize: '15px', lineHeight: '1.85' }}>{item.a}</p>
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

        {/* DISCLAIMER */}
        <section style={{ padding: '48px 24px', background: '#1a1714', borderTop: '1px solid #2a2520' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', fontSize: '13px', color: '#6a6258', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '10px' }}>
              <strong style={{ color: '#8a8078' }}>הבהרה:</strong> הטיפולים המוצעים הם טיפולי קוסמטיקה לשיפור מראה ומצב העור. התוצאות משתנות מאדם לאדם בהתאם לגיל, סוג העור, מצב בריאותי וגורמים נוספים, ואינן מובטחות. המידע בדף זה אינו מהווה אבחון או ייעוץ רפואי ואינו תחליף להתייעצות עם רופא עור. במצבים רפואיים מסוימים, בהריון או ברגישויות ידועות, יש להיוועץ ברופא לפני תחילת הטיפול.
            </p>
            <p>© {new Date().getFullYear()} כל הזכויות שמורות · מיכאל ארז כהן קוסמטיקאית פארא-רפואית</p>
          </div>
        </section>
      </div>
    </>
  )
}

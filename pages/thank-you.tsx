import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const LEAD_SUBMITTED_KEY = 'michaelLeadSubmitted'
const WHATSAPP_URL = `https://wa.me/972547225585?text=${encodeURIComponent(
  'היי מיכאל, השארתי עכשיו פרטים באתר ורציתי ליצור קשר.'
)}`

export default function ThankYou() {
  useEffect(() => {
    if (window.sessionStorage.getItem(LEAD_SUBMITTED_KEY) !== '1') return

    let attempts = 0

    const trackLead = () => {
      attempts += 1

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead')
        window.sessionStorage.removeItem(LEAD_SUBMITTED_KEY)
        return true
      }

      return attempts >= 20
    }

    if (trackLead()) return

    const timer = window.setInterval(() => {
      if (trackLead()) window.clearInterval(timer)
    }, 250)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <Head>
        <title>תודה | מיכאל ארז כהן</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="thank-you" dir="rtl">
        <section className="card">
          <div className="check" aria-hidden="true">✓</div>
          <p className="eyebrow">הפרטים התקבלו</p>
          <h1>תודה שפנית אליי</h1>
          <p className="message">
            אחזור אלייך בהקדם כדי להכיר אותך ולבדוק יחד איזה טיפול מתאים לך.
          </p>
          <div className="actions">
            <a
              href={WHATSAPP_URL}
              className="whatsapp-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              שליחת הודעה בוואטסאפ
            </a>
            <Link href="/" className="back-link">חזרה לאתר</Link>
          </div>
          <p className="signature">מיכאל ארז כהן</p>
        </section>
      </main>

      <style jsx>{`
        .thank-you {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
          background: #faf8f5;
          color: #1a1714;
          font-family: 'Heebo', -apple-system, BlinkMacSystemFont, sans-serif;
          text-align: center;
        }

        .card {
          width: min(100%, 620px);
          padding: 64px 40px;
          background: #fff;
          border: 1px solid #e8e0d7;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(62, 49, 37, 0.08);
        }

        .check {
          width: 72px;
          height: 72px;
          display: grid;
          place-items: center;
          margin: 0 auto 28px;
          border-radius: 50%;
          background: #e9dfd4;
          color: #493a2e;
          font-size: 38px;
          font-weight: 700;
        }

        .eyebrow {
          margin: 0 0 12px;
          color: #846f5d;
          font-size: 16px;
          font-weight: 700;
        }

        h1 {
          margin: 0;
          font-size: clamp(34px, 7vw, 54px);
          line-height: 1.15;
        }

        .message {
          max-width: 470px;
          margin: 24px auto 36px;
          color: #665b52;
          font-size: 19px;
          line-height: 1.7;
        }

        .actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        :global(.whatsapp-link),
        :global(.back-link) {
          display: inline-block;
          padding: 14px 32px;
          border-radius: 999px;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
        }

        :global(.whatsapp-link) {
          background: #168b50;
        }

        :global(.back-link) {
          background: #2f2924;
        }

        .signature {
          margin: 34px 0 0;
          color: #846f5d;
          font-size: 15px;
        }

        @media (max-width: 520px) {
          .card {
            padding: 48px 24px;
          }

          .message {
            font-size: 17px;
          }
        }
      `}</style>
    </>
  )
}

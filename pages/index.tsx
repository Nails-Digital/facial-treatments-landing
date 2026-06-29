import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
      setFormData({ name: '', phone: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בשמירת הפרטים')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>טיפולי פנים - דף נחיתה</title>
        <meta name="description" content="דף נחיתה לטיפולי פנים" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container">
        <section className="hero">
          <h1>טיפולי פנים מהיום</h1>
          <p>אנחנו מציעים את הטיפולים הטובים ביותר לעור שלך</p>
        </section>

        <section className="form-section">
          <h2>השאר לנו את הפרטים שלך</h2>
          <p>אנחנו נחזור אליך בקרוב</p>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">שם מלא *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="שמך"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">טלפון *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="05X-XXX-XXXX"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">אימייל</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">הודעה</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="אמור לנו עוד משהו..."
                rows={3}
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {submitted && <div className="success-message">✅ הפרטים שלך נשמרו בהצלחה!</div>}

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'שומר...' : 'שלח פרטים'}
            </button>
          </form>
        </section>
      </main>
    </>
  )
}

import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Load Google Forms script if needed
    const script = document.createElement('script')
    script.src = 'https://docs.google.com/forms/d/e/1FAIpQLSc3Jz1z2z3z4z5z6z7z8z9z0z/formResponse'
    // Replace with actual form ID
  }, [])

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
          
          {/* Google Form Embed */}
          <div className="form-container">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSc3Jz1z2z3z4z5z6z7z8z9z0z/viewform?embedded=true"
              width="640"
              height="900"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="טופס - טיפולי פנים"
            >
              טעינה...
            </iframe>
          </div>
        </section>
      </main>
    </>
  )
}

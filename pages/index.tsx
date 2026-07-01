import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import { useState } from 'react'

interface Props {
  htmlContent: string
}

export default function Home({ htmlContent }: Props) {
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const concernsMap: { [key: string]: string } = {
    'acne': 'אקנה ופצעי בגרות',
    'scars': 'צלקות אקנה',
    'pigmentation': 'פיגמנטציה וכתמים',
    'aging': 'קמטוטים והצערת העור',
    'texture': 'גוון וטקסטורה לא אחידים',
    'other': 'אחר'
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setFormError('')

    const formElement = e.currentTarget
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

      alert('תודה! אחזור אלייך בקרוב.')
      formElement.reset()
    } catch (err) {
      setFormError('שגיאה בשליחת הטופס. אנא נסי שוב.')
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
            div[style*="gridTemplateColumns: repeat(2"] { grid-template-columns: 1fr !important; }
          }

          @media (max-width: 480px) {
            h1 { font-size: 22px !important; }
            h2 { font-size: 18px !important; }
            section { padding: 24px 12px !important; }
          }
        `}</style>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />

      {/* Form overlay */}
      <style>{`
        form {
          all: initial;
          display: flex;
          flex-direction: column;
          gap: 20px;
          font-family: 'Heebo', sans-serif;
        }
        form input, form select {
          font-family: 'Heebo', sans-serif;
          padding: 14px 16px;
          border: 2px solid #3a3830;
          border-radius: 4px;
          background: #1e1c19;
          color: #fff;
          font-size: 15px;
        }
        form input:focus, form select:focus {
          outline: none;
          border-color: #c9b89a;
        }
        form button {
          padding: 16px;
          background: #fff;
          color: #111;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: 'Heebo', sans-serif;
        }
        form button:hover:not(:disabled) {
          opacity: 0.8;
        }
        form button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>

      <script dangerouslySetInnerHTML={{__html: `
        // Form submission handler
        document.addEventListener('DOMContentLoaded', function() {
          const forms = document.querySelectorAll('form');
          forms.forEach(form => {
            form.onsubmit = null;
            form.addEventListener('submit', async (e) => {
              e.preventDefault();
              e.stopPropagation();

              const formData = new FormData(form);

              const concernsMap = {
                'acne': 'אקנה ופצעי בגרות',
                'scars': 'צלקות אקנה',
                'pigmentation': 'פיגמנטציה וכתמים',
                'aging': 'קמטוטים והצערת העור',
                'texture': 'גוון וטקסטורה לא אחידים',
                'other': 'אחר'
              };

              const mainConcern = formData.get('main_concern');
              const submitData = {
                name: formData.get('name') || '',
                phone: formData.get('phone') || '',
                email: formData.get('email') || '',
                main_concern: concernsMap[mainConcern] || mainConcern
              };

              try {
                const res = await fetch('/api/submit-form', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(submitData)
                });

                const data = await res.json();

                if (res.ok) {
                  alert('תודה! אחזור אלייך בקרוב.');
                  form.reset();
                } else {
                  alert('שגיאה: ' + (data.error || 'אנא נסי שוב'));
                }
              } catch (err) {
                console.error('Form error:', err);
                alert('שגיאה בשליחת הטופס. אנא נסי שוב.');
              }
            });
          });
        });
      `}} />
    </>
  )
}

export async function getStaticProps() {
  const htmlPath = path.join(process.cwd(), 'public', 'design-full.html')
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8')

  return {
    props: { htmlContent },
    revalidate: 3600
  }
}

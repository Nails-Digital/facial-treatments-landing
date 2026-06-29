import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'

const SPREADSHEET_ID = '1n_u63XJNghBt5bXAx_rujb7Ikl-4IwcqzP8uUIO0Ijc'
const SHEET_NAME = 'גיליון1'

async function getAuth() {
  let keyFile

  if (process.env.GOOGLE_CREDENTIALS) {
    try {
      keyFile = JSON.parse(process.env.GOOGLE_CREDENTIALS)
    } catch (e) {
      console.error('Failed to parse GOOGLE_CREDENTIALS from env')
      throw e
    }
  } else {
    const keyPath = path.join(process.cwd(), 'nails-digital-clients.json')
    try {
      keyFile = JSON.parse(fs.readFileSync(keyPath, 'utf8'))
    } catch (e) {
      throw new Error('Missing credentials: set GOOGLE_CREDENTIALS env var or add nails-digital-clients.json')
    }
  }

  return new google.auth.GoogleAuth({
    credentials: keyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, phone, email, message } = req.body

    if (!name || !phone) {
      return res.status(400).json({ error: 'שם וטלפון נדרשים' })
    }

    const auth = await getAuth()
    const sheets = google.sheets({ version: 'v4', auth })

    const now = new Date()
    const dateStr = now.toLocaleDateString('he-IL')
    const timeStr = now.toLocaleTimeString('he-IL')

    const values = [
      [name, phone, email || '', message || '', dateStr, timeStr]
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:F`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    })

    return res.status(200).json({
      success: true,
      message: 'הפרטים שלך נשמרו בהצלחה!'
    })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({
      error: 'שגיאה בשמירת הפרטים',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

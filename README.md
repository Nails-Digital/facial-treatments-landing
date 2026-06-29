# דף נחיתה - טיפולי פנים

דף נחיתה לטיפולי פנים עם טופס מעוצב המשדר נתונים **ישירות לגוגל שיטס** דרך Google Sheets API.

## ✨ תכונות

- ✅ טופס מעוצב ומגיב
- ✅ שיתוף נתונים ישיר לגוגל שיטס (ללא צד ג')
- ✅ RTL עברית מלאה
- ✅ מותאם למובייל
- ✅ בדיקה אוטומטית של שדות
- ✅ הודעות הצלחה/שגיאה

## הגדרה

### 1. Google Cloud Service Account

קובץ ה-JSON (`nails-digital-clients.json`) מכיל את ה-credentials - הוא כבר בפרוייקט! ✅

**⚠️ חשוב:** הקובץ ב-.gitignore ולא יעלה ל-GitHub

### 2. תוכן הטופס

הטופס כולל:
- **שם מלא*** (נדרש)
- **טלפון*** (נדרש)
- **אימייל** (אופציונלי)
- **הודעה** (אופציונלי)

כל הנתונים נשמרים בטבלה עם תאריך וזמן.

### 3. התקנה מקומית

```bash
npm install
npm run dev
```

הפרוייקט יפתח ב-http://localhost:3000

### 4. דיפלוי בוורסל

כשאתה דוחף ל-GitHub:

1. פתח https://vercel.com
2. בחר את הריפו `facial-treatments-landing`
3. לחץ "Deploy"
4. וורסל יבנה ויתקין אוטומטית

**חשוב:** אתה צריך להוסיף את קובץ ה-JSON ל-Vercel secrets:
- ל-Vercel dashboard של הפרוייקט
- הוסף Environment Variable: `GOOGLE_CREDENTIALS`
- צלוף את תוכן הקובץ JSON

או העלה את קובץ ה-JSON בדרך אחרת שתכיל את ה-credentials.

## מבנה הפרוייקט

```
├── pages/
│   ├── index.tsx (דף הנחיתה + טופס)
│   ├── _app.tsx
│   └── api/
│       └── submit-form.ts (API endpoint)
├── styles/
│   └── globals.css (עיצוב RTL)
├── nails-digital-clients.json (credentials - ב-.gitignore)
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## API Endpoint

**POST** `/api/submit-form`

```json
{
  "name": "שם מלא",
  "phone": "05X-XXX-XXXX",
  "email": "email@example.com",
  "message": "הודעה"
}
```

## הערות

- הדף מוגדר ב-RTL (מימין לשמאל) לעברית
- כל הנתונים נשמרים בגוגל שיטס אוטומטית
- אין צורך בתשלומים או שירותי צד ג' כי בנינו טופס משלנו
- ה-.gitignore מגן על ה-credentials

---

**עמוד זה הוקם עם Next.js, Google Sheets API וווורסל** 🚀

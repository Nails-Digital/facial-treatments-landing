# דף נחיתה - טיפולי פנים

דף נחיתה לטיפולי פנים עם טופס שמעביר נתונים לגוגל שיטס.

## הגדרה

### 1. גוגל פורמס (חשוב!)

כדי שהטופס יעבוד, צריך:

1. ניצור Google Form חדש (https://forms.google.com)
2. נחבר את הטופס לגוגל שיטס של הלקוחות
3. ניקח את ה-Form ID מה-URL
4. נעדכן את ה-iframe src ב-`pages/index.tsx`

**דוגמא URL:** 
```
https://docs.google.com/forms/d/e/1FAIpQLSc3Jz1z2z3z4z5z6z7z8z9z0z/viewform?embedded=true
```

### 2. התקנה מקומית

```bash
npm install
npm run dev
```

הפרוייקט יפתח ב-http://localhost:3000

### 3. דיפלוי בוורסל

1. חיבור הריפו לוורסל
2. וורסל יבנה ויתקין אוטומטית
3. הדומיין יהיה זמין באופן מיידי

## מבנה הפרוייקט

```
├── pages/
│   ├── index.tsx (דף הנחיתה)
│   └── _app.tsx
├── styles/
│   └── globals.css (עיצוב עברי RTL)
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## עדכון הטופס

כדי לעדכן את ה-Google Form embed:

1. פתח `pages/index.tsx`
2. עדכן את ה-iframe `src` עם ה-URL של הטופס החדש
3. תמיד הוסף `?embedded=true` לסוף ה-URL

## הערות

- הדף מוגדר ב-RTL (מימין לשמאל) לעברית
- כל הנתונים שמשאירים לקוחות עוברים ישירות לגוגל שיטס דרך הטופס
- הדיזיין מותאם למובייל וחשמלי

---

**עמוד זה הוקם עם Next.js וווורסל** ✨

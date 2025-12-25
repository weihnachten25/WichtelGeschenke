# 🍺 Bier Reminder

Ein Weihnachtsgeschenk für Elias, Madlen und Denny - Eine Web-Anwendung, die automatisch per Email an das Trinken von Bier erinnert.

![Bier Reminder](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 🎨 **Modernes Design** mit animiertem Bier-Hintergrund (Schaum & Kohlensäure)
- 📧 **Automatische Email-Erinnerungen** über Supabase Edge Functions
- 🎯 **Einfache Bedienung** - Einfach Anzahl der Biere und Email eingeben
- 📱 **Responsive Design** - Funktioniert auf allen Geräten
- 🎭 **Toast-Benachrichtigungen**
- ♿ **Accessibility** - Barrierefreie Bedienung

## 🚀 Live Demo

Die Anwendung ist auf GitHub Pages verfügbar (falls Nutzername noch weihnachten25 ist): [Live Demo](https://weihnachten25.github.io/WichtelGeschenke/)

## 📋 Funktionsweise

1. Nutzer gibt die Anzahl der Biere ein, die er trinken möchte
2. Nutzer gibt seine Email-Adresse ein
3. Nach dem Klick auf "START" wird der Reminder-Prozess gestartet
4. Die erste Benachrichtigung kommt sofort
5. Weitere Benachrichtigungen werden automatisch per Email versendet

## 🛠️ Technologie-Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Backend**: Supabase Edge Functions
- **Hosting**: GitHub Pages
- **Styling**: Custom CSS mit modernen Animationen

## 📁 Projektstruktur

```
WichtelGeschenke/
├── index.html          # Haupt-HTML-Datei
├── styles.css          # Alle Styles und Animationen
├── script.js           # JavaScript-Logik (modular aufgebaut)
└── README.md           # Diese Datei
```

## 🎨 Design-Features

- **Bier-Hintergrund**: Animierter Hintergrund mit:
  - Realistischem Bier-Farbverlauf (golden)
  - Animiertem Schaum oben
  - Aufsteigenden Kohlensäure-Blasen
- **Orange-Rot Farbschema**: Warme, einladende Farben
- **Smooth Animations**: Sanfte Übergänge und Animationen
- **Glassmorphism**: Moderne Glaseffekte

## 🔧 Installation & Setup (eigene Backend Implementation benötigt)

### Lokale Entwicklung

1. Repository klonen:
```bash
git clone https://github.com/weihnachten25/WichtelGeschenke.git
cd WichtelGeschenke
```

2. Einfach `index.html` in einem Browser öffnen oder einen lokalen Server starten:
```bash
# Mit Python
python -m http.server 8000

# Mit Node.js (http-server)
npx http-server

# Mit PHP
php -S localhost:8000
```

3. Im Browser öffnen: `http://localhost:8000`

### GitHub Pages Deployment

1. Repository auf GitHub hochladen
2. In den Repository-Einstellungen zu "Pages" gehen
3. Branch auswählen (meist `main` oder `master`)
4. Ordner auswählen (`/root`)
5. Speichern - Die Seite ist unter `https://your-username.github.io/WichtelGeschenke/` verfügbar

## ⚙️ Konfiguration

Die API-URL muss in `script.js` angepasst werden und es wird eine eigene (Supabase) Backend Struktur benötigt mit Datenbank und Cron Job:

```javascript
const CONFIG = {
  API_URL: 'https://your-project.supabase.co/functions/v1/schedule_reminders',
  // ... weitere Konfiguration
};
```


## 📝 Code-Struktur

Der Code ist modular aufgebaut:

- **ToastManager**: Verwaltet Toast-Benachrichtigungen
- **FormValidator**: Validiert Formular-Eingaben
- **UIStateManager**: Verwaltet UI-Zustände (Loading, etc.)
- **ApiService**: Handhabt API-Kommunikation
- **FormHandler**: Verarbeitet Formular-Submissions

## 🎯 Browser-Unterstützung

- ✅ Chrome (neueste Version)
- ✅ Firefox (neueste Version)
- ✅ Safari (neueste Version)
- ✅ Edge (neueste Version)
- ✅ Mobile Browser (iOS Safari, Chrome Mobile)

## 📄 Lizenz

Dieses Projekt ist ein privates Weihnachtsgeschenk. Alle Rechte vorbehalten.

## 👤 Autor

Ken Schettler, erstellt als Weihnachtsgeschenk

## 🙏 Danksagungen

- Supabase für das Backend
- GitHub Pages für das Hosting

---

**Prost! 🍺**


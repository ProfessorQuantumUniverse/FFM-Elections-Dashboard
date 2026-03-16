# Frankfurt am Main - Wahlergebnisse 2026

![Dashboard Screenshot](docs/screenshot.png)

Eine umfassende, interaktive Datenanalyse-Website für die Kommunalwahlen in Frankfurt am Main 2026.

## 🗳️ Übersicht

Dieses Dashboard bietet eine tiefgreifende Analyse der Wahlergebnisse der Kommunalwahlen in Frankfurt am Main vom 15. März 2026:

- **Stadtverordnetenwahl** - Wahl zur Stadtverordnetenversammlung
- **Ortsbeiratswahlen** - Wahlen in allen 16 Ortsbezirken  
- **Ausländerbeiratswahl** - Wahl des Ausländerbeirats

## ✨ Features

### Übersicht
- Kennzahlen-Dashboard mit Wahlbeteiligung, Wählerzahlen
- Parteiergebnisse als Balken- und Kreisdiagramme
- Übersicht aller Wahlen mit Auszählungsstand

### Stadtverordnetenwahl
- Detaillierte Ergebnisse nach Parteien
- Analyse nach Ortsbezirken und Wahlbezirken
- Vergleich Trend vs. Endergebnis
- Panaschier-Analyse

### Ortsbeiratswahlen
- Individuelle Analyse für alle 16 Ortsbezirke
- Vergleich der Wahlbeteiligung
- Parteienergebnisse pro Bezirk

### Ausländerbeiratswahl
- Ergebnisse aller 26 Listen
- Kennzahlen und Verteilung

### Interaktive Karte
- Visualisierung nach Wahlbeteiligung
- Stärkste Partei pro Bezirk
- Parteienstärke geografisch dargestellt

### Vergleiche
- Wahlen untereinander vergleichen
- Bezirke gegenüberstellen
- Parteistärke über alle Bezirke

### Kandidatenanalyse
- Stimmen pro Listenplatz
- Anteil an Gesamtstimmen

### Tiefenanalyse
- Panaschieren-Analyse
- Wahlbeteiligung-Statistiken
- Korrelationen (Beteiligung vs. Parteistärke)
- Abstimmungsmuster

## 🛠️ Technologie

- **HTML5/CSS3** - Responsive Layout
- **JavaScript (ES6+)** - Interaktive Funktionalität
- **Chart.js** - Diagramme und Visualisierungen
- **Leaflet** - Interaktive Karten
- **Font Awesome** - Icons

## 📊 Datenquelle

Die Wahldaten stammen vom offiziellen Open Data Portal des Wahlamts Frankfurt am Main:

- API-Basis: `https://votemanager-ffm.ekom21cdn.de/2026-03-15/06412000/praesentation/`
- Format: CSV (UTF-8, Semikolon-getrennt)
- [OpenData Dokumentation](OpenDataDocumentation.txt)

## 🚀 Deployment

Die Website wird automatisch auf GitHub Pages deployed:

1. Push zu `main` Branch
2. GitHub Actions Workflow wird ausgelöst
3. Website ist unter `https://[username].github.io/FFM-Elections-Dashboard/` verfügbar

### Lokale Entwicklung

```bash
# Repository klonen
git clone https://github.com/ProfessorQuantumUniverse/FFM-Elections-Dashboard.git
cd FFM-Elections-Dashboard

# Lokalen Server starten
python3 -m http.server 8080
# oder
npx serve .

# Browser öffnen
open http://localhost:8080
```

## 📁 Projektstruktur

```
FFM-Elections-Dashboard/
├── index.html              # Hauptseite
├── css/
│   └── style.css          # Stylesheet
├── js/
│   ├── config.js          # Konfiguration & Parteidaten
│   ├── data-loader.js     # API-Datenabfrage
│   ├── sample-data.js     # Fallback-Daten
│   ├── charts.js          # Chart.js Wrapper
│   ├── map.js             # Leaflet Karte
│   └── app.js             # Hauptanwendung
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Pages Deployment
├── OpenDataDocumentation.txt
└── README.md
```

## 📋 Datenschema

### Wahldaten-Felder (CSV)

| Feld | Beschreibung |
|------|--------------|
| `datum` | Wahldatum |
| `wahl` | Name der Wahl |
| `ags` | Amtlicher Gemeindeschlüssel |
| `gebiet-nr` | Gebietsnummer |
| `gebiet-name` | Gebietsname |
| `A` | Wahlberechtigte gesamt |
| `B` | Wähler/innen |
| `B1` | Wähler mit Wahlschein |
| `C` | Ungültige Stimmzettel |
| `D` | Gültige Stimmen |
| `D1...Dn` | Stimmen pro Partei |
| `unveraendert_n` | Unveränderte Stimmzettel |
| `veraendert_n` | Veränderte Stimmzettel |
| `panasch_n` | Panaschierte Stimmzettel |

## 🔐 Hinweise

- Die Daten werden live vom Wahlamt-Server abgerufen
- Bei Nichtverfügbarkeit werden Beispieldaten angezeigt
- Alle Angaben ohne Gewähr

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE)

---

Erstellt für die Kommunalwahlen Frankfurt am Main 2026 🏛️

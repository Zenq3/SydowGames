# Redevix Login System

Dieses Projekt stellt das aus dem Screenshot bekannte Redevix Login-Interface für FiveM inklusive eines einfachen Backends bereit.

## Inhalte
- **Frontend:** Pixelgenaues Layout des Login- und Informationspanels gemäß Vorlage.
- **Backend:** Express-Server mit Dummy-Userdaten zur Validierung von Logins.

## Nutzung
1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. Entwicklungserver starten:
   ```bash
   npm run dev
   ```
3. Browser öffnen und `http://localhost:3000` aufrufen.

Die Zugangsdaten befinden sich in `data/users.json` und können beliebig angepasst werden.

### Assets anpassen
- Logo im linken Panel über das Element `.logo-slot` platzieren.
- Hintergrundbilder für beide Panels können über CSS-Variablen gesetzt werden:
  ```css
  :root {
      --login-background-image: url('pfad/zum/linken-bild.png');
      --info-background-image: url('pfad/zum/rechten-bild.png');
  }
  ```

Viel Erfolg beim Einsatz auf eurem Server!

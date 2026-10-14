# Taxi Taş Hagen – fertige Website-Vorschau

Enthalten ist die aktuelle Version mit kräftigen gelben, roten und grünen Kontaktbuttons, mobiler Kontaktleiste, echten Unterseiten und WhatsApp-Fahrtanfrage.

## Schnellstart auf GitHub Pages

1. ZIP lokal entpacken.
2. Den gesamten entpackten INHALT in das GitHub-Repository hochladen. Die Datei `index.html` muss direkt im Hauptverzeichnis liegen, daneben `assets`, `fahrten`, `fahrt-anfragen` usw. Die ZIP selbst nicht als Website hochladen.
3. Unter Settings → Pages → Build and deployment als Source „Deploy from a branch“ auswählen.
4. Branch `main` (oder den tatsächlich verwendeten Branch) und Ordner `/(root)` auswählen, dann Save.
5. Die von GitHub angezeigte Website-Adresse öffnen, sobald die Bereitstellung abgeschlossen ist.

Kein npm, kein Build und keine Installation notwendig. Die enthaltene `.nojekyll` schaltet Jekyll aus. Falls der Finder diese Datei beim Upload nicht mitnimmt, im Repository eine leere Datei namens `.nojekyll` anlegen.

## Eigene Domain / Subdomain

1. Unter Settings → Pages → Custom domain die gewünschte Domain ohne `https://` eintragen und speichern. Bei Veröffentlichung aus einem Branch legt GitHub die passende `CNAME`-Datei an.
2. DNS-Einträge beim Domainanbieter passend zur Domain einrichten. Für eine Subdomain einen CNAME auf `DEIN-GITHUB-NAME.github.io` setzen, ohne Repositorynamen und ohne `https://`. Für eine Hauptdomain die aktuell von GitHub dokumentierten A-/ALIAS-/ANAME-Einträge verwenden.
3. Nach erfolgreicher DNS-Prüfung und Zertifikatsbereitstellung „Enforce HTTPS“ aktivieren, sobald verfügbar.

Die Domain ist noch nicht bekannt; deshalb enthält dieses Paket keine vorgegebene `CNAME`-Datei. Interne Pfade sind relativ und funktionieren auch unter einer GitHub-Projektadresse. Die vorherige private Vorschau-Adresse wurde aus den Seitenmetadaten entfernt.

## Funktion und Inhalte

- Startseite, Fahrten, Sonderfahrten, Über uns, Fahrtanfrage, Kontakt, Impressum-Entwurf, Datenschutz-Entwurf und Fehlerseite.
- Telefon: +49 1525 1617901.
- WhatsApp-Zielnummer: 4915251617901. Das Konto muss vom Inhaber bestätigt werden.
- WhatsApp öffnet eine vorbereitete Nachricht. Besucher senden selbst; es wird nichts automatisch verschickt oder gebucht.
- Google Maps öffnet die eingegebene Strecke. Kein Taxipreisrechner.
- Die mobile Kontaktleiste wird beim Tippen und im geöffneten Menü ausgeblendet. Auf der Fahrtanfrageseite entfällt sie.
- `noindex` und `robots.txt` sind für die Kundenvorschau beibehalten. Sie verhindern keinen Zugriff und ersetzen keinen Passwortschutz.
- Die vollständige Anschrift, finalen Anbieter- und Datenschutzhinweise sowie die tatsächlich angebotenen Sonderleistungen sind für den regulären Unternehmensauftritt noch abzustimmen.
- Keine eigene Datenbank, keine eingebauten Analyse- oder Werbeskripte. GitHub Pages ist statisches Hosting.

## Bearbeitung

Texte stehen direkt in den jeweiligen HTML-Dateien. Das Grunddesign steht in `assets/style.css`, die Kontaktfarben und mobilen Anpassungen in `assets/mobile-refinements.css`. Das Formularverhalten steht in `assets/app.js` und `assets/booking.mjs`. Bilder liegen in `assets`.

## Prüfung

Interne Links, lokale Bilddateien, JavaScript-Syntax und die ZIP-Integrität wurden geprüft. Kontraste und Formularlogik wurden bereits bei der Website-Erstellung geprüft. Eine echte Geräte-/Browserprüfung auf iPhone und Android steht weiterhin aus.

## Offizielle GitHub-Anleitungen

- Veröffentlichung: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Custom Domain und DNS: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

Diese Datei ist die Einrichtungshilfe für den Website-Ersteller, kein Inhalt der Kundenseiten.

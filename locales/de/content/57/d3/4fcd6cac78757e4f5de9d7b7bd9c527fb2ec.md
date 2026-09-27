# Eine Lösung zum Mentoring auswählen

[video:vimeo/595885125]()

Die erste Entscheidung, die du als Mentor treffen musst, ist, welche Lösung du mentoren möchtest.

## Mit der Warteschlange arbeiten

Eine Liste aller Lösungen, die zum Mentoring eingereicht wurden, findest du in der [Mentoring-Warteschlange](/mentoring/queue).
Die Benutzeroberfläche sollte ungefähr so aussehen:

![Mentoring-Warteschlange](https://exercism-static.s3.eu-west-1.amazonaws.com/docs/mentor_queue.png)

Oben im Warteschlangen-Bereich findest du ein Textfeld, mit dem du nach dem Namen der lernenden Person filtern kannst.
Rechts davon kannst du die Anfragen sortieren: älteste zuerst, neueste zuerst, nach dem Namen der lernenden Person oder nach dem Namen der Übung.
Auf der rechten Seite der Oberfläche kannst du nach Sprache oder Übungsnamen filtern.
Du kannst außerdem festlegen, dass nur Übungen angezeigt werden, die du selbst gelöst hast. Das ist oft sinnvoll, denn es fällt dir schwer, gutes Feedback zu geben, wenn du dich nicht selbst mit der Lösung der Übung herumgeschlagen hast.
Die Liste der Übungen mit offenen Mentoring-Anfragen kannst du nutzen, um die Liste der Anfragen weiter zu filtern.
Wähle dazu den Namen der Übung aus (er ist im Screenshot oben unten rechts zu sehen).

Die Haupttabelle zeigt die Übung, die lernende Person und wann sie Mentoring angefragt hat.
Wenn du mit der Maus über eine Zeile fährst, bekommst du mehr Details über die Person.
Du siehst ihren Namen, ihren Ort und ihre Reputation (ein Hinweis darauf, ob die Person selbst Mitwirkende oder Mentor ist) sowie die Anzahl ihrer bisherigen Mentorings.
Außerdem siehst du eine kurze Beschreibung, die sie geschrieben hat, um zu erklären, was sie sich vom Track erhofft.
Sobald du anfängst, Leute zu mentoren, siehst du außerdem, ob du sie schon einmal gementort hast und ob du sie als Favorit markiert hast.

Die Beschreibung im Tooltip ist ein erster Hinweis darauf, ob diese lernende Person zu dir passt.
Passt dein Fachwissen zu ihren Wissenslücken?
Wenn sie sagt, sie möchte gut in funktionaler Programmierung werden: Kannst du dabei helfen?
Wenn sie neu in der Sprache ist und die Grundlagen lernen möchte, kannst du wahrscheinlich helfen, sobald du **irgendwelche** echte Erfahrung hast. Wenn sie aber seit Jahren in dieser Sprache programmiert und Expertenniveau erreichen will, musst du die Sprache selbst ziemlich gut beherrschen.

Sobald du eine Lösung gefunden hast, die gut zu dir als Mentor zu passen scheint, können wir den nächsten Schritt gehen und uns den Code ansehen.
Klick also auf diese Lösung und öffne die Benutzeroberfläche für Mentoring-Diskussionen!

## Die Benutzeroberfläche für Mentoring-Diskussionen

In dieser Phase siehst du dir die Lösung von jemand anderem an, hast dich aber noch nicht dazu verpflichtet, sie zu mentoren.
Du hast zuerst die Gelegenheit, den Code zu lesen und weitere Informationen zu sammeln, bevor du beginnst.

**Wenn du diese Benutzeroberfläche noch nicht kennst, wirkt sie mit all den Informationen vielleicht etwas überwältigend, aber keine Sorge: Sie wird dir schnell vertraut vorkommen.**

### Der Code der lernenden Person

Auf der linken Seite des Bildschirms siehst du den Code der lernenden Person.
Die Benutzeroberfläche sieht ungefähr so aus:

<img src="https://raw.githubusercontent.com/exercism/docs/main/.imgs/mentor-discussion-area.png" height="100">

1. Der größte Teil der linken Seite zeigt den Code der lernenden Person.
   Standardmäßig siehst du ihre neueste Iteration.
   Wenn sie mehrere Iterationen eingereicht hat, kannst du mit den Zahlen in den Kreisen unten links oder mit den Buttons `Previous` und `Next` unten rechts in diesem Bereich zwischen ihnen wechseln.
   Wenn sie nur eine Iteration eingereicht hat, siehst du diese Symbole nicht.

2. Oben im Code kannst du über die Tabs zwischen dem Code der lernenden Person, den Anweisungen und den Tests wechseln.
   Das ist praktisch, um dir ins Gedächtnis zu rufen, was in dieser Übung von der lernenden Person verlangt wird.

3. Außerdem siehst du oben rechts in diesem linken Bereich eine Anzeige, ob die Tests bestanden oder fehlgeschlagen sind, sowie Buttons, um den Code herunterzuladen oder in die Zwischenablage zu kopieren.
   Wenn sie fehlgeschlagen sind, öffnet ein Klick auf diese Anzeige ein Dialogfenster mit den genauen Details des Testlaufs, sodass du siehst, was schiefgelaufen ist.

Auf der rechten Seite des Bildschirms befindet sich ein Bereich mit der Mentoring-Interaktion. Oben in diesem Bereich siehst du drei Tabs.
Der Tab „**Diskussion**“ enthält die Informationen über die Person (Benutzername, Name, Reputation, persönliche Beschreibung).
Darunter steht ein Kommentar der Person dazu, was sie aus dieser konkreten Lösung lernen möchte.
(Bei manchen älteren Lösungen fehlt er möglicherweise).
Das ist ein wichtiger Hinweis darauf, ob diese Lösung zu dir passt.
Kannst du ihre Frage beantworten?
Kannst du ihre Erwartungen an diese Übung erfüllen?

Der zweite Tab ist dein „**Notizblock**“.
Darin kannst du Code schreiben, auf den du in deinem Kommentar verweisen kannst.
Das kann helfen, den Code zu erkennen, auf den es bei dieser Übung ankommt.
So können deine Erklärungen einfacher und klarer werden.
Notizen hier sind nur für dich sichtbar, und du siehst sie jedes Mal, wenn du die Lösung der jeweiligen Übung mentorst.

Der dritte Tab heißt „**Anleitung**“.
Wenn du darauf klickst, siehst du einige Informationen, die für dich nützlich sein könnten:

- **Die Beispiellösung** Versuche, die lernende Person zu dieser Lösung hinzuführen.
  Sie ist das beste Ziel, das sie an dieser Stelle im Track erreichen kann.
  Vielleicht stellst du fest, dass dein Ansatz deutlich von der Beispiellösung abweicht.
  Das kann daran liegen, dass du mit fortgeschritteneren Techniken vertraut bist als die lernende Person.
  Denk daran, dass die lernende Person nur mit den Konzepten vertraut sein kann, die sie auf dem Lernpfad bis zu der Übung kennengelernt hat, an der sie gerade arbeitet.
  Berücksichtige das, wenn du Feedback gibst, und überfordere die lernende Person nicht mit Wissen, auf das sie noch nicht vorbereitet ist.
- **Mentor-Notizen:** Das sind von der Community geschriebene Notizen, die anderen Mentoren zeigen, wie man eine Übung am besten mentort.
  Wir freuen uns sehr, wenn du deine Erfahrung zu diesen Notizen beisteuerst.
- **Automatisches Feedback:** Das ist Feedback, von dem unsere Analyzer meinen, dass es für dich nützlich sein könnte, es einer lernenden Person zu geben.
  Darauf gehen wir später noch genauer ein.
- **Deine Lösung:** Ein Link zurück zu deiner eigenen Lösung, den du als Referenz dafür nutzen kannst, wie du die Übung gelöst hast.

## Mit dem Mentoring starten

Wenn du den Code gelesen, die Anleitung geprüft hast und das Gefühl hast, dass du helfen kannst, dann leg los!
Klick auf den Button „Mentoring starten“ und du wirst aufgefordert, dein Feedback zu schreiben.

Lies als Nächstes [Wie du gutes Feedback gibst](/docs/mentoring/how-to-give-great-feedback)!

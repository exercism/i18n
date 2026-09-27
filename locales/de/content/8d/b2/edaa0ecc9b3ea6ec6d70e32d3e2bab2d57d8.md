**Wichtig: Diese Informationen sind inzwischen veraltet. Die aktuellen Details findest du in unserem [neueren Blogbeitrag](https://exercism.org/blog/contribution-guidelines-nov-2023).**

---

_TL;DR; Wir nehmen uns ein paar Monate Zeit, um unser Freiwilligenmodell neu zu gestalten und unseren wichtigsten Freiwilligen eine Pause von der Arbeit des Reviewens von Community-Beiträgen zu geben.
Wenn du Exercism nur zum Lernen oder Mentoren nutzt, musst du hier nichts wissen (aber lies gern weiter, wenn es dich interessiert!).
Wenn du Maintainer eines Tracks bist, zu Exercism beitragen möchtest oder einen Bug bzw. ein Problem melden willst, dann ist das hier Pflichtlektüre 🙂_

---

In den letzten 6 Monaten haben wir viel Zeit damit verbracht, die Zukunft von Exercism zu erkunden und uns vorzustellen, wie es wäre, wenn jeder Sprach-Track so gut wie möglich wäre.
Wir sind unglaublich stolz auf das, was wir bisher aufgebaut haben.
Die 85.000 Testimonials, die abgegeben wurden, zeugen von der großartigen Arbeit, die unsere Community beim Aufbau unserer Sprach-Tracks und beim Mentoring so vieler Lernender durch sie geleistet hat.
Und vor allem glauben wir, dass wir gerade erst an der Oberfläche dessen kratzen, was möglich ist.
Wir haben große Ideen, Hoffnungen und Begeisterung für alles, was Exercism sein kann.
Doch um das zu erreichen, müssen wir zunächst einige grundlegende Probleme lösen, die unter der Oberfläche schwelen.

An erster Stelle steht die Notwendigkeit, die Herausforderung zu lösen, unsere Freiwilligen-Community auf gesunde, nachhaltige Weise zu skalieren.
Exercism wurde auf den Schultern Hunderter engagierter Freiwilliger aufgebaut, aber ein großer Teil von ihnen fühlt sich inzwischen ausgebrannt, und viele sind deshalb gegangen.
Dafür gibt es unzählige Gründe: manche hängen direkt mit Exercism zusammen, manche mit dem Zeitdruck des Lebens und manche mit dem Hintergrund all dessen, was gerade in der Welt passiert.
Aber es ist uns sehr klar geworden, dass wir eine bessere Art und Weise entwerfen und entwickeln müssen, unsere Plattform gemeinsam aufzubauen.

Wir haben Exercism bisher mit einem Open-Source-Software-Modell (OSS) aufgebaut, bei dem Maintainer Beiträge aus der breiteren Community reviewen.
Das hat uns viele Probleme bereitet und sowohl Maintainer als auch Beitragende frustriert.
Wenn du Details möchtest, gehe ich weiter unten genauer darauf ein, aber der TL;DR; ist, dass unsere wichtigsten Freiwilligen ihre Zeit jetzt damit verbringen, als reagierende Gatekeeper statt als innovative Gestalter zu agieren.
Das macht ihnen viel weniger Spaß, und es bedeutet, dass Exercism die Magie verliert, die diese Menschen früher auf die Plattform gebracht haben.

Um das zu beheben, müssen wir zwei Dinge tun:
1. Wir müssen ein neues Freiwilligensystem entwerfen, das besser zu Exercism passt als das traditionelle OSS-Modell.
  Wir haben bisher ein gutes Stück Energie darauf verwendet, und es ist uns nicht gelungen.
  Deshalb nehmen wir uns in den nächsten Monaten etwas Zeit, um das gemeinsam mit unseren Freiwilligen richtig zu gestalten.
2. Wir werden die breiteren Community-Beiträge für die nächsten Monate weitgehend pausieren, damit sich unsere wichtigsten Freiwilligen darauf konzentrieren können, die Tracks so aufzubauen und weiterzuentwickeln, wie sie es möchten (oder eine Auszeit zu nehmen, wenn sie einfach mal durchatmen möchten!)

Ich hoffe, dass wir Exercism zu einem großartigen Ort für Freiwilligenarbeit machen und seine Zukunft sichern können, wenn wir einen Schritt zurücktreten und das wirklich gut gestalten, zusammen mit Fundraising, um unser Bildungsteam zu erweitern.
In der Zwischenzeit sollten diese Änderungen dazu führen, dass sich die Tracks stärker verbessern und wachsen können als im letzten Jahr und dass unsere Maintainer nicht mehr ausbrennen, sondern sich bei der Arbeit an Exercism glücklicher, energiegeladener und verbundener fühlen.

## Konkrete Veränderungen

Es gibt drei konkrete Veränderungen, die wir umsetzen.

### Nutze das Forum, nicht GitHub Issues

Wir werden GitHub komplett dafür freigeben, dass unsere Maintainer an den Issues arbeiten, die sie bearbeiten möchten.
Wir werden eine Vielzahl von Issues schließen, die wir zuvor für die Community angelegt haben (und ein Tag hinzufügen, damit sie in Zukunft bei Bedarf leicht wieder geöffnet werden können), während wir in der Mehrheit der Repositories keine neuen unaufgeforderten Issues oder PRs mehr zulassen.
Wenn du etwas besprechen oder melden möchtest, nutze bitte das [Forum](https://forum.exercism.org).
Wenn du ein unaufgefordertes Issue oder einen PR öffnest, wird er automatisch geschlossen und du wirst auf das Forum verwiesen.

### Breitere Community-Beiträge pausieren

Tracks werden in drei Kategorien eingeteilt:
- Bei der Mehrheit der Tracks mit aktiven Maintainern werden die Community-Beiträge pausiert, damit die Maintainer autonom arbeiten oder eine Pause machen können.
  (Maintainer dieser Tracks können beantragen, die verpflichtende eine Review-Anforderung zu entfernen.
  Sprich dafür bitte Erik auf Slack an.)
- Einige Tracks mit aktiven Maintainern, die Community-Beiträge wirklich weiterhin annehmen möchten, bleiben offen (wenn du Maintainer bist und lieber in diesen Modus gehen möchtest statt in (1), melde dich bitte bei Jonathan Middleton auf Slack, um das zu besprechen).
- Bei Tracks ohne aktive Maintainer wird die Track-Entwicklung in diesem Zeitraum im Wesentlichen pausiert.

In allen Fällen werden Erik und ich weiterhin PRs an Tooling-Repos prüfen, bevor sie gemergt werden.

Die eine Ausnahme ist, dass wir weiterhin PRs für Lösungsansätze und Artikel annehmen und eine organisationsweite optimistische Merge-Policy einführen, die darauf abzielt, eine Grundlage an Lösungsansätzen in ganz Exercism aufzubauen und schrittweise Verbesserungen zu ermöglichen, nach folgenden Regeln:
1. Wenn der Code die Übung löst und syntaktisch und semantisch idiomatisch ist (d. h., er sieht aus wie `$LANG`-Code), sollte er gemergt werden.
  Wenn nicht, sollte ihn der PR-Autor korrigieren.
2. Wenn ein Maintainer Änderungen am Inhalt vornehmen möchte (z. B. um die Ratschläge zu verbessern, etwas anzupassen, bessere/alternative/idiomatischere Ansätze hervorzuheben), dann sollte das in einem Folge-PR geschehen.

### Ein neues Freiwilligensystem entwerfen

Wir werden ein Community Board zusammenstellen, um gemeinsam einen nachhaltigen, gesunden Rahmen für Freiwilligenarbeit zu entwerfen, der Exercisms Potenzial entfesselt.
Wenn du dich der Zukunft von Exercism verpflichtet fühlst und Teil dieses Prozesses sein möchtest, melde dich bitte bei [Jonathan](mailto:jonathan@exercism.org).

Wir werden diese Maßnahmen in den nächsten Monaten umsetzen.
Wir werden während des gesamten Zeitraums alles überdenken und planen, bis Juni 2023 einige neue Entscheidungen zu treffen.
Wenn du Gedanken dazu hast, starte bitte ein Thema im [Forum](https://forum.exercism.org)!

## Nachtrag: Warum unser OSS-Modell kaputt ist

Unser bisheriges Modell baute auf dem OSS-Modell auf.
Es beruhte auf Freiwilligen, die zu Exercism kamen, großartige Arbeit beim Aufbau von Tracks leisteten und dann Maintainer-Rechte erhielten, mit denen sie dann Beiträge aus unserer breiteren Nutzerbasis annehmen konnten, um die Tracks zu verbessern.

Während das auf dem Papier großartig klingt, hat es einige erhebliche Probleme.
An vorderster Stelle steht, dass die Menschen, die Exercism am meisten Magie verleihen, am Ende keine Zeit mehr zum Programmieren oder Gestalten von Exercism haben, weil ihre Zeit damit draufgeht, auf Community-Beiträge zu reagieren.
Das ist fast nie der Grund, warum die Maintainer ursprünglich zu Exercism gekommen sind, und es ist keine Arbeit, die ihnen Freude macht.
Es ist ein bisschen so, als würde jemand, der gern entwickelt, zum Teamleiter „befördert“, wo er Menschen managt statt zu programmieren.
Im Moment mag es wie eine schöne Beförderung wirken, aber oft stellt sich heraus, dass Menschen das Managen längst nicht so sehr genießen wie das Programmieren.

Es beruht außerdem auf der Annahme, dass die Summe der Beiträge aus der breiteren Community größer ist als der individuelle Beitrag, den ein bestimmter Maintainer sonst leisten könnte.
Aber bei Exercism ist das fast nie der Fall.
Exercism ist komplex, und Bildung ist schwierig, und zusammen machen sie das Beitragen zu Exercism zu einer komplexen und schwierigen Aufgabe.
Es gibt jede Menge zu lernen und zu verstehen, sowohl darüber, wie Exercism technisch funktioniert, als auch über seinen Bildungsansatz, und das bedeutet, dass die meisten ersten Beiträge von Menschen stammen, die sich gerade erst zurechtfinden.
Das heißt, ihre ersten Beiträge sind relativ klein, aber auch, dass sie fast immer viel Arbeit beim Reviewen und Anpassen erfordern.
Das ist zeitaufwendige Arbeit für Maintainer.
Tatsächlich bedeutet die insgesamt für das Review aufgewendete Zeit (sowie der nötige Kontextwechsel), dass der Maintainer im Allgemeinen mehr Aufwand in das Reviewen des PRs steckt, als wenn er ihn selbst erstellt hätte.
Natürlich gibt es einige Ausnahmen, aber in 99 % der Fälle stimmt das.
Und häufig ist das für den Maintainer sogar noch schmerzhafter, weil das Problem, das der PR löst, nicht weit oben auf seiner Prioritätenliste stand, sodass die Dinge, von denen er weiß, dass sie wirklich wesentlich sind, dadurch nicht erledigt werden.

Schließlich beruht das OSS-Modell darauf, dass Beitragende klein anfangen und irgendwann sachkundig und regelmäßig genug sind, um Maintainer zu werden.
In OSS-Projekten wie Softwarebibliotheken funktioniert das relativ gut (z. B. verwendet jemand eine Bibliothek in der Produktion und fügt ihr immer wieder Verbesserungen hinzu, bis er irgendwann genauso viel Wissen hat wie der ursprüngliche Autor).
Bei Exercism ist das jedoch einfach nicht passiert.
Obwohl wir in den letzten 12 Monaten PRs von Tausenden von Beitragenden gemergt haben, sind nur eine Handvoll danach zu regelmäßigen Beitragenden geworden und noch weniger zu Maintainern.
Auch das liegt vor allem an der Komplexität von Exercism, aber auch daran, dass es keine abgeschlossene Software ist, in der dieses Modell traditionell funktioniert.

All das ist für Maintainer unglaublich demoralisierend und für Exercism schädlich.

Tracks sind ins Stocken geraten, und unsere Kernfreiwilligen, die Leidenschaft fürs Bauen hatten, haben diese Leidenschaft weitgehend verloren, als ihre Aufgabe darin bestand, die Arbeit anderer zu reviewen, konkurrierende Prioritäten auszuhandeln und unerwartete Anfragen zu bearbeiten.
Während des Aufbaus von v3 konnten Maintainer relativ autonom arbeiten, da ihre Arbeit weitgehend im Hintergrund stattfand, was zu einer enormen Produktivität führte und dazu, dass die Mehrheit wirklich gern beitrug.
Seit dem Start von v3, obwohl viele Freiwillige genauso viel Zeit in Exercism stecken, ist es eine viel weniger angenehme und produktive Zeit gewesen, vor allem weil so viel Energie in die Reaktion auf Beiträge oder Issues anderer geflossen ist.
Unsere Freiwilligen verbringen ihre Zeit jetzt als reagierende Gatekeeper statt als Innovatoren, und das macht viel weniger Spaß.

Das sind die Herausforderungen, die wir lösen müssen, und sie sind hart.
Wir müssen einen Weg finden, wie Menschen, die Hunderte von Stunden in den Aufbau von Exercisms Sprach-Tracks stecken möchten, das auch tun können und es lieben.
Wir müssen einen Weg finden, wie Bugfixes und kleine Beiträge in unsere Codebasis gelangen, ohne die Aufmerksamkeit dieser wichtigen Freiwilligen zu beanspruchen.
Und wir müssen einen Weg finden, neue Freiwillige für Exercism zu begeistern und sie zu unterstützen, wenn sie sich für laufende Beiträge entscheiden.
Wir müssen das Gatekeeping insgesamt reduzieren und gleichzeitig respektieren, dass diejenigen, die so viel Mühe in Tracks gesteckt haben, starke und sehr wohlüberlegte Meinungen haben.
Wir müssen es unterhaltsam machen, das ganze Freiwilligen-Setup zu verwalten und zu leiten.
Und wir müssen noch eine ganze Reihe weiterer Dinge lösen.
Es wird Zeit brauchen und eine Herausforderung sein, aber wenn wir es schaffen, wird es großartig.

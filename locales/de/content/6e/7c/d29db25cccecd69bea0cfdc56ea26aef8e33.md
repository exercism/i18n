# Tipps fürs Mentoring

## Mentoring-Notizen

Eine der größten Erleichterungen beim Mentoring kann eine Datei sein, in der du für jede Übung, die du betreust, Notizen sammelst.
Vielleicht stellst du fest, dass viele Lösungen von denselben Anregungen profitieren. Wenn du Notizen führst, musst du dieselben Anregungen nicht jedes Mal aus dem Gedächtnis neu aufschreiben.
Und wenn die Anregungen an einer Stelle stehen, kannst du sie mit der Zeit immer weiter verfeinern, damit sie klarer werden.

Wenn du nicht weißt, wie du mit deinen Notizen anfangen sollst, findest du vielleicht unter [exercism/website-copy/tracks][website-copy] eine `mentoring.md`-Datei für die Übung deines Tracks.
Falls sie existiert, enthält sie vielleicht Beispiele für sinnvolle Lösungen sowie häufige Anregungen und Gesprächspunkte, die eine weitere Diskussion anregen.
Falls sie nicht existiert, kannst du später zurückgehen und eine anlegen, nachdem du deine eigene Notizdatei für diese Übung erstellt hast.

Außerdem: Auch wenn du jetzt nur eine Sprache betreust, kommen vielleicht später weitere dazu.
Es kann helfen, deine Mentoring-Notizen sowohl nach Track als auch nach Übungsnamen zu ordnen, denn verschiedene Tracks brauchen für dieselbe Übung wahrscheinlich unterschiedliche Anregungen.

Mentoring-Notizen sind praktisch, egal ob du die Übung oft oder selten betreust.
Betreust du die Übung oft, sparst du dir viel Tipparbeit, weil du einfach aus deinen Notizen kopieren und einfügen kannst.
Betreust du die Übung selten, erinnern sie dich an Anregungen, die du in den Wochen oder Monaten seit dem letzten Mal vergessen hast.

Es ist völlig in Ordnung, wenn die Mentoring-Notizen von Mentor zu Mentor unterschiedlich sind.
Hier ist eine Möglichkeit, sie zu strukturieren, aber es ist nicht die _einzige_ Möglichkeit.

Gratuliere dem Mentee dazu, dass er die Tests bestanden hat (falls er sie bestanden hat).

Wenn die Übung schon ein paar Tage in der Warteschlange liegt, kannst du das vielleicht mit etwas wie dem Folgenden ansprechen:

>Entschuldige, dass es eine Weile gedauert hat, bis sich jemand bei dir gemeldet hat.
>Zurzeit gibt es zu wenige aktive JavaScript-Mentoren für `Resistor Color Duo`.

Zähle auf, was dir an der Lösung des Mentees gefällt.
Zum Beispiel:

- Mir gefällt, dass diese Lösung knapp und gut lesbar ist.

- Mir gefällt die Verwendung von `indexOf`.

- Mir gefällt, dass hier der Ansatz `(first * 10) + second` verwendet wird, um das Umwandeln von Zahl zu String und zurück zu Zahl zu vermeiden.

- Mir gefällt, dass hier keine Schleife/Iteration verwendet wird.

- Mir gefällt der destrukturierte Parameter.

Als Nächstes kommen vielleicht deine häufigen Anregungen.

~~~~exercism/note
Es kann sehr hilfreich für den Mentee sein, wenn du für jedes neue Sprachfeature, das du vorstellst, einen Link angibst.
Zum Beispiel:

>Für diese Übung ist es nicht nötig, aber vielleicht möchtest du die Funktion in eine [Arrow-Funktion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) umwandeln.
~~~~

Auch wenn wir die Lösung nicht verraten wollen: Manchmal lernt ein Mentee am besten anhand eines Beispiels.
Ein Code-Schnipsel in einem eingeklappten Details-Bereich kann dieses Beispiel liefern, und der Mentee kann selbst entscheiden, ob er ihn aufklappt oder nicht.
Zum Beispiel:

&lt;details&gt;&lt;summary&gt;Spoiler-Beispiel&lt;/summary&gt;

&lt;pre&gt;

export const decodedValue = ([firstColor, secondColor]) =>
  COLORS.indexOf(firstColor) * 10 + COLORS.indexOf(secondColor)

&lt;/pre&gt;

&lt;/details&gt;

Gegen Ende der Notizen kannst du einen Link zu einer veröffentlichten Lösung einfügen, die die Anregungen vollständig umsetzt.

Ganz unten in deinen Notizen kannst du ausführlichere Erklärungen unterbringen, nach denen Mentees manchmal fragen.
Diese Erklärungen kommen nicht oft vor, aber es ist trotzdem gut, sie aufzuschreiben, wenn du sie zum ersten Mal verwendest. So musst du sie beim nächsten Mal, das Wochen oder Monate später sein kann, nicht von Grund auf neu formulieren.
Zum Beispiel fragt ein Mentee manchmal, wie der Multiplikations-Ansatz bei Resistor Color Duo funktionieren würde, wenn Schwarz die erste Farbe für eine führende Null wäre:

>Schwarz als erste Farbe ist ein guter Punkt, den wir uns ansehen sollten.
>Die Widerstandsfarbe soll den Widerstandswert in Ohm angeben,
>und eine führende Null würde bei einem Widerstand mit mehreren Ringen nicht verwendet.
>Schwarz wäre also nicht die erste Farbe.
>Außerdem entfernen `parseInt` oder `Number` die führende Null ebenfalls.

Eine optionale Kategorie von Daten für deine Mentoring-Notizen ist eine Aufzeichnung von Benchmarks für verschiedene Lösungen oder Ansätze.

## Benchmarking

Ein häufiges Anliegen von Mentees ist, wie performant ihre Lösung ist.
Das gilt besonders für „niedrigere“ Sprachen wie C, C++, Go und Rust.
Neben der Frage, wie idiomatisch ihr Code ist, beschäftigt Mentees anderer Sprachen oft auch die Effizienz ihres Codes.

~~~~exercism/note
Benchmarking ist nichts, was von einem Mentor _erwartet_ wird.
Allerdings sind Mentees oft besonders beeindruckt davon, wie ein Benchmark ihrer Lösung im Vergleich zu anderen Ansätzen abschneidet.
~~~~

Go ist ein besonders freundlicher Track für Benchmarks, da Benchmarks oft in der Testdatei enthalten sind.
Bei anderen Sprachen musst du vielleicht etwas recherchieren, um herauszufinden, welche Methode für dich am besten funktioniert.
Wenn du zum Beispiel nur den Online-Editor verwendest, suchst du nach einer Möglichkeit, Benchmarks online auszuführen.
Zum Beispiel ist [JSBench.me][jsbench-me] ein Online-Benchmark-Tool für JavaScript.

Wenn du Code lokal ausführst, kannst du dir Benchmark-Software herunterladen und auf deinem Rechner ausführen.
Zum Beispiel kann Rust [Criterion][criterion] verwenden oder [cargo bench][cargo-bench] mit [Benchmark-Tests][rust-benchmark-tests].

Es gibt mindestens ein paar Möglichkeiten, Benchmarks nachzuhalten.
Eine Möglichkeit ist eine fortlaufende Liste aller Benchmarks, die du durchführst. Das kann aber unübersichtlich werden, wenn die Liste lang wird.
Eine andere Möglichkeit ist eine Liste mit repräsentativen Benchmarks für verschiedene Ansätze.
Mentees möchten oft den Code für die schnelleren Ansätze sehen. Wenn ein schnellerer Ansatz veröffentlicht ist, ist ein Link dorthin wahrscheinlich sehr willkommen.

~~~~exercism/caution
Wenn du einen Link zu einer Lösung angibst, für die du einen Benchmark durchgeführt hast, achte darauf, dass du auf die veröffentlichte Lösung verlinkst und nicht auf die Mentoring-Sitzung.
Nicht alle betreuten Lösungen werden veröffentlicht.
~~~~

## Mentoring-Notizen, die nicht übungsspezifisch sind

Es kann sein, dass du zu bestimmten Sprachfeatures bei mehr als einer Übung etwas sagst.
Wenn du eine Anregung von einer Datei in eine andere kopieren und einfügen willst, überlege vielleicht, sie stattdessen in eine eigene Datei zu packen.
Auch hier gilt: Eine Anregung an einer Stelle zu halten, erleichtert es, sie mit der Zeit zu verfeinern.
Außerdem ist sie leichter zu finden, wenn du sie für eine Übung verwendest, bei der du sie noch nie gebraucht hast.
Statt dich daran zu erinnern, in welcher Übung du die Anregung schon einmal gebracht hast, kannst du direkt in die eigene Datei der Anregung gehen.

## Wenn ein Mentee eine Frage hat

Mentees werden ermutigt, anzugeben, was sie sich von der Mentoring-Sitzung erhoffen.
Oft formulieren sie das als Frage.
Wenn du die Antwort auf die Frage nicht kennst und dich nicht dafür interessierst, ist es in Ordnung, die Mentoring-Anfrage einem anderen Mentor zu überlassen.

Wenn du die Antwort nicht kennst, sie aber herausfinden möchtest, ist es vielleicht am besten, die Mentoring-Anfrage erst anzunehmen, wenn du die Antwort kennst.
Wenn die Mentoring-Anfrage bis dahin weg ist, hast du zumindest etwas gelernt und den Mentee nicht warten lassen.

Eine Ausnahme davon kann sein, wenn die Mentoring-Anfrage schon mehrere Tage oder länger in der Warteschlange liegt.
In dieser Situation kannst du die Mentoring-Anfrage annehmen, das an Feedback geben, was du kannst, und dem Mentee sagen, dass du dich zu seiner Frage bei ihm meldest.
Natürlich ist es wichtig, das dann auch zu tun, entweder um dem Mentee die Antwort mitzuteilen oder um ihm zu sagen, dass du sie nicht gefunden hast.
Wenn du die Antwort nicht finden konntest, kann es für den Mentee hilfreich sein, zu beschreiben, wie du versucht hast, sie zu finden.
Der Mentee antwortet vielleicht mit anderen Wegen, die Antwort zu finden.
Vielleicht findet ihr beiden die Antwort gemeinsam.

Wenn du alle dir bekannten Wege ausgeschöpft hast, um die Antwort zu finden, kannst du dem Mentee vorschlagen, die Diskussion zu beenden und seine Anfrage erneut einzureichen, in der Hoffnung, dass ein anderer Mentor die Antwort liefern kann.
Wenn er möchte, kann der Mentee in der beendeten Diskussion schreiben und dir die Antwort mitteilen, sobald er sie kennt.
Und genauso kannst du, wenn du die Antwort später erfährst, zur beendeten Diskussion zurückkehren und es den Mentee wissen lassen.

Wenn du die Antwort kennst und darauf eingehen möchtest, ist ein guter Ort dafür zwischen dem, was dir an der Lösung des Lernenden gefällt, und deinen Vorschlägen für andere Ansätze.

### Fehlschlagender Code

Code kann fehlschlagen, weil er nicht alle Tests besteht oder weil er nicht kompiliert bzw. den Interpreter nicht zufriedenstellt.

Verschiedene Mentoren haben unterschiedliche Neigungen und/oder Geduld im Umgang mit fehlschlagendem Code. Das hängt auch ein wenig davon ab, wie er präsentiert wird, denn fehlschlagender Code wird nicht immer gleich präsentiert.

Manchmal sagt ein Mentee, er habe einen anderen Ansatz ausprobiert und er habe nicht funktioniert, und fragt, warum.
Der Code wird vielleicht gar nicht mitgeliefert oder in einem praktisch unlesbaren Kommentar statt in einer Iteration gepostet.

Eine im Web-Editor getestete Lösung kann nur dann für eine Mentoring-Anfrage eingereicht werden, wenn sie alle Tests bestanden hat.
Einer der Gründe dafür ist, dass sich der Mentor darauf konzentrieren kann, Verbesserungen oder andere Ansätze für den bestehenden funktionierenden Code vorzuschlagen.
_Debuggen_ ist nicht unbedingt etwas, das ein Mentor tun möchte oder tun soll.
Eine fehlschlagende Lösung, die über die Kommandozeile eingereicht wird, kann jedoch für eine Mentoring-Anfrage eingereicht werden, wobei der Lernende um Hilfe bei der Lösung bittet.

Wenn der fehlschlagende Code nicht mitgeliefert wurde und der beschriebene fehlschlagende Ansatz nicht gut klingt, reicht es vielleicht zu sagen, dass statt des fehlschlagenden Ansatzes ein anderer Ansatz infrage kommt, der weder der fehlgeschlagene noch der ist, den sie verwendet haben und der bestanden hat.
Oder es reicht vielleicht zu erklären, warum der verwendete Ansatz besser ist als der fehlgeschlagene, ohne auf die Details einzugehen, welcher Bug im fehlgeschlagenen Ansatz steckte.

Ein häufiges Beispiel ist, dass Mentees Probleme mit Robot Name haben.
Entweder laufen die Tests in ein Timeout oder sie erzeugen nicht genug Namen, und sie möchten wissen, wie sie das beheben können.
Wenn du die Neigung und die Geduld dazu hast, kannst du ihren Code analysieren und Vorschläge machen, wie das Problem zu lösen ist.
Oder du erklärst, dass das Prüfen zufällig erzeugter Namen zu mehr Kollisionen führt, je mehr Namen erzeugt werden, und schlägst vor, die Namen stattdessen der Reihe nach zu erzeugen und dann zu mischen.

Wenn der fehlschlagende Code in einen praktisch unlesbaren Kommentar eingefügt wurde, gib vielleicht das Feedback, das du zur bestandenen Lösung geben kannst, und schlage vor, den Code aus dem Kommentar als weitere Iteration einzureichen.
Du kannst dem Mentee auch vorschlagen, die Fehler der fehlschlagenden Iteration zu prüfen, um einen Hinweis darauf zu bekommen, wo das Problem liegt.

Wenn der Code in einer fehlschlagenden Iteration ist, kann es helfen, den Mentee darauf hinzuweisen, die Fehler des Testlaufs zu prüfen.
Manche Sprachen brauchen etwas mehr Anleitung, wie man Fehler oder Testergebnisse liest, als andere.
Es kann helfen, einen oder mehrere Teile der Fehlermeldungen zu zitieren und dem Lernenden zu erklären, was gemeint ist.

Letztendlich ist es nicht die Aufgabe des Mentors, den fehlschlagenden Code des Mentees zu reparieren. Wenn der Mentor möchte, kann er dem Mentee aber Wege vorschlagen, wie er ihn selbst repariert.

## Umgang mit dem Warteschlangen-Kontinuum

Es kann sein, dass du dich als Mentor für einen Track anmeldest, aber nie eine Übung in seiner Warteschlange zum Mentoring siehst.
Du denkst vielleicht, dass etwas nicht stimmt, aber dafür gibt es mindestens ein paar Gründe.
Ein Grund ist, dass derzeit vielleicht niemand Mentoring für den Track anfragt.
Manchmal hat ein Track Phasen der Inaktivität.
Ein anderer Grund ist, dass andere Mentoren die Anfragen annehmen, bevor du sie siehst.
Das passiert wahrscheinlich bei einem beliebten Track mit vielen aktiven Mentoren.

Wenn viele Anfragen in der Warteschlange sind, gibt es ein paar Möglichkeiten, sie zu bearbeiten.
Du kannst von der ältesten zur neuesten arbeiten, damit die, die am längsten gewartet haben, zuerst drankommen.
Oder du entscheidest dich, von der neuesten zur ältesten zu arbeiten, besonders wenn die ältesten schon lange warten.
So müssen Leute, die kürzlich aktiv waren, nicht warten, bis der Rückstand abgearbeitet ist.

Wenn es mehrere Anfragen zur selben Übung gibt, kannst du sie in Stapeln derselben Übung abarbeiten, um den Fokus zu behalten, statt von Übung A zu Übung B und zurück zu Übung A zu springen.

Vielleicht liegt eine Anfrage für eine Übung, an der du nicht interessiert bist, schon seit Tagen oder Wochen da.
Du kannst sie liegen lassen in der Hoffnung, dass ein anderer Mentor sie annimmt, oder sie ist Anlass, die Übung selbst einmal auszuprobieren.
Eine Sache, die hilfreich sein kann, ist ein Blick auf die eingereichte Lösung.
Sie verwendet vielleicht einen Ansatz, an den du nicht gedacht hättest, und dieser Ansatz macht die Übung für dich vielleicht attraktiver.
Aber wenn du dir den Code ansiehst und die Übung trotzdem nicht lösen möchtest, ist das kein Problem.
Nur weil du dir eine Mentoring-Anfrage ansiehst, musst du nicht auf die Schaltfläche „Start mentoring“ klicken.

[website-copy]: https://github.com/exercism/website-copy/tree/main/tracks
[jsbench-me]: https://jsbench.me/
[criterion]: https://crates.io/crates/criterion
[cargo-bench]: https://doc.rust-lang.org/cargo/commands/cargo-bench.html
[rust-benchmark-tests]: https://doc.rust-lang.org/unstable-book/library-features/test.html

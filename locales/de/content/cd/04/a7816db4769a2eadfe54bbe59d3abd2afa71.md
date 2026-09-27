**Spoiler-Warnung: Dieser Artikel enthält Spoiler für die Übung Grains im Allgemeinen und speziell für die Übung Grains im Bash-Track. Wenn du sie noch nicht selbst gelöst hast und keine Lösungen sehen möchtest, komm wieder, sobald du fertig bist!**

Es ist dein erster Tag in einer neuen Firma. Du hast den ganzen Papierkram erledigt, das Team kennengelernt, und jetzt ist endlich der Moment gekommen, in dem du dich hinsetzen und anfangen kannst, den Code zu lesen, an dem du arbeiten wirst. Du liest dich durch die verschiedenen Funktionen, Klassen und Module, und während du liest, fängst du an, verwirrt die Augen zusammenzukneifen und auf den Bildschirm zu starren. Du liest weiter, und ein einzelnes Wort entkommt deinem Mund, kaum gesprochen, fast nur gehaucht: „Waaaaaaaaaas...“[^1] Je weiter du kommst, desto häufiger passiert das, und du wirst immer verwirrter und sogar ein wenig wütend.

> Was geht hier bloß in diesem Code vor?

Sobald mehr als eine Person an einem Stück Code arbeitet, steigt der Aufwand an Sorgfalt und Bewusstheit, der nötig ist, um die Sache handhabbar zu halten, *enorm*. Es ist nicht mehr so, dass das Konzept in deinem Kopf lebt und der Code es nur zum Laufen bringen muss. Jetzt muss das Konzept *im Code selbst* leben, wo alle, die mitarbeiten, es sehen und bei Bedarf ändern können.

*Wie* du etwas umsetzt, sagt dem Endnutzer wenig, aber es sollte *Bände* sprechen für jeden Ingenieur, der irgendwann mit deinem Entwurf in Berührung kommt. Oft gibt es viele Wege, dieselbe Funktionalität zu erreichen, und es kann scheinen, als wäre jede der Optionen ausreichend, um die Aufgabe zu erledigen. Ich bin aber der Meinung, dass jede einzelne Entscheidung, die du triffst, einen Grund haben sollte (auch wenn es eine kleine Entscheidung mit einem kleinen Grund ist), und dieser Grund sollte ein Ziel oder eine Anforderung vermitteln.

Die Idee, dass Implementierungsdetails den Lesenden helfen sollten, Denkprozess, Ziele und Prioritäten zu erkennen, nennt man **Design Intent**. Wie du deine Variablen benennst, welche Parameter deine Funktion entgegennimmt und wie Dinge abstrahiert werden, all das sind Stellen, an denen sich das Design Intent ausdrücken lässt, ob gut oder schlecht.

Ich bin fest davon überzeugt, dass Design Intent eines der wichtigsten Dinge ist, die man beim Umsetzen eines technischen Entwurfs bedenken sollte. Es ist eines der Dinge, die Software Engineering vom Programmieren unterscheiden.

 > Software Engineering ist das, was mit dem Programmieren passiert, wenn du Zeit und andere Programmierer hinzufügst.
 >
 > – [Russ Cox](https://research.swtch.com/vgo-eng)

## Design Intent ist disziplinübergreifend

Ich arbeite als Maschinenbauingenieur und konstruiere [Spritzgussformen](https://youtu.be/WHwTHarf8Ck?t=51), meistens für Medizinprodukte. Wenn meine Konstruktionen fertig sind, gehen sie direkt aus der Tür in die Werkstatt, wo die Teile gefertigt und zusammengebaut werden. Da die Leute in der Werkstatt nicht wissen, was mir beim Erstellen der jeweiligen Konstruktion durch den Kopf ging, muss ich einen Weg finden, meine Absicht durch den Entwurf selbst zu *zeigen*.

Oft sind bestimmte Merkmale besonders kritisch. Entweder hat der Kunde gesagt, dass dort besonders enge Toleranzen nötig sind, oder die Art, wie die Form zusammengebaut wird, erfordert aus irgendeinem Grund extreme Genauigkeit. Um den Kollegen in der Werkstatt zu helfen, die Teile so zu fertigen, dass die Genauigkeit an den wichtigen Stellen Priorität bekommt, muss ich Stellen vorsehen, die gezielt quadratisch sind oder sich auf eine bestimmte Weise leicht in einen Schraubstock einspannen lassen. So liefert der für sie einfachste Weg das beste Ergebnis für mich.

Es gibt auch Stellen, an denen die Maße nicht so kritisch sind. Wenn ich zum Beispiel ein Loch vorsehe, das nur für eine Entlüftung da ist, mache ich es schön in einer gängigen Größe wie 6 mm.

Wenn sie dieses Loch bearbeiten und dann messen, was dabei herausgekommen ist, und sie sehen eine Zahl wie 5,99 mm, dann denken sie: „OK, das sollte wahrscheinlich 6 mm sein, also bin ich nah dran“, und sie müssen nicht einmal die Maße im CAD oder in der Spezifikationszeichnung nachprüfen. Wenn ich stattdessen etwas Ungewöhnliches daraus mache, etwa 5,87 mm, schauen sie es an und haben diese erste Reaktion:

1. Oh je, habe ich viel zu klein gefräst? Sollte es 6 mm sein?
2. (Sie schauen im CAD nach und sehen, dass ihr Loch in Ordnung ist und nur eine ungewöhnliche Größe hat.)
3. Hmmm. Bestimmt hat dieses Loch aus einem Grund eine ungewöhnliche Größe. Vielleicht ist es wirklich wichtig, oder der Kunde hat hier ein spezielles Loch verlangt. Ich muss mit Ryan reden und herausfinden, was an diesem Loch so wichtig ist.
4. (KNALL! Sie legen das Stück Aluminium sanft auf meinen Schreibtisch.)
5. (Sie finden heraus, dass an diesem Loch nichts wichtig ist, ich habe einfach eine seltsame Größe gewählt, und die ganze zusätzliche Arbeit und Sorge war umsonst.)
6. Junge, dieser Ryan, der ist vielleicht ein übler Kerl. (Grummel, Schimpfwort, Grummel)

All das passiert, weil jede Entscheidung in meinem Entwurf den anderen, die ihn ansehen und damit arbeiten, etwas mitteilt, ob ich das will oder nicht. Sie *müssen* etwas darin erkennen, denn es ist die einzige Information, die sie haben! Deshalb ist es viel besser, wenn ich mir die Zeit nehmen kann, *bedeutungsvolle*, **absichtsvolle** Informationen in meinen Entwurf zu legen.

## Grains: eine Einführung

Sprechen wir nun darüber, wie sich Design Intent im Code vermitteln lässt, und zwar an einem Beispiel aus einer der Exercism-Übungen. Vor Kurzem habe ich mit einem Lernenden an seiner Lösung für die *Grains*-Übung im Bash-Track gearbeitet. *Grains* ist eine Übung zum [Weizen-Schachbrett-Problem](https://en.wikipedia.org/wiki/Wheat_and_chessboard_problem). Kurz gesagt: Auf das erste Feld eines Schachbretts wird ein Weizenkorn gelegt. Auf das nächste Feld kommen zwei Körner. Auf das übernächste vier. Und so weiter, wobei jedes Feld doppelt so viele Körner hat wie das vorherige. Die Lernenden sollen einen Weg finden, sowohl den Wert auf jedem einzelnen Feld als auch die Gesamtzahl der Körner auf dem ganzen Brett zu berechnen.

Dieser Lernende hatte eine ziemlich clevere Idee, um die Gesamtsumme zu berechnen.

```bash
bc <<< 'ibase=16;FFFFFFFFFFFFFFFF'
```

`bc` ist ein Kommandozeilenrechner. Du kannst ihm Rechenausdrücke als Zeichenketten übergeben, und es wertet sie aus, auch für sehr große Ganzzahlen und Gleitkommazahlen. Es gibt andere Wege, in Bash ohne `bc` zu rechnen, aber der Einfachheit halber schauen wir uns an, wie sich Absicht vermitteln lässt, oder auch nicht, wenn man `bc` benutzt.

Diese Lösung funktioniert, weil sich in der ganzen Übung alles um Zweierpotenzen dreht. Und wo es Zweierpotenzen gibt, da gibt es Binärzahlen, und wo es Binärzahlen gibt, da gibt es Hexadezimalzahlen[^2]!

Das ist eine clevere Lösung, aber was sagt uns der Code? Dass Hexadezimalzahlen hier wichtig sind? Dass das Problem im Kern um die 16 kreist? Wenn man die Aufgabenstellung noch einmal liest, ist ziemlich klar, dass beides nicht stimmt. Der Lernende und ich haben Ideen gesammelt, wie man die Absicht klarer vermitteln kann. Hier sind ein paar davon:

### Erste Option: Binär

Da sich hier eine Menge Dinge verdoppelt (und damit eine Menge Zweierpotenzen im Spiel sind), schauen wir uns an, was im Binärsystem passiert, ob das weiterhilft.

---

Auf dem ersten Feld liegt 1 Korn. Binär wäre das ebenfalls `0b1` (wobei `0b` nur bedeutet „das ist eine Binärzahl“, die eigentliche Zahl ist `1`).

Auf dem zweiten Feld liegen 2 Körner. Binär: `0b10`. Die Summe bisher ist 3 (oder `0b11`).

Auf dem dritten Feld liegen 4 (`0b100`) Körner. Summe bisher: 7 (`0b111`).

Auf dem vierten Feld liegen 8 Körner (`0b1000`). Summe bisher: 15 (`0b1111`).

---

Erkennst du das Muster?

Jedes Feld steht für eine weitere Binärstelle, und wenn man alle zusammenzählt, ergibt das einfach eine Reihe von Einsen.

In der Lösung des Lernenden könnten wir die F durch 64 Einsen ersetzen (eine für jedes Feld)!

```bash
bc <<< "ibase=2;1111111111111111111111111111111111111111111111111111111111111111"
```

Das ist absichtsvoller, weil es besser zu dem passt, was uns die Aufgabe vorgibt. Aber wir sprechen nicht Robotisch. Eine lange, praktisch unzählbare Reihe von Einsen ist vielleicht keine Verbesserung.

### Zweite Option: die Brute-Force-Berechnung

OK, vielleicht lassen wir die nicht-dezimalen Zahlensysteme also ganz bleiben. Warum bringen wir den Code nicht dazu, so auszusehen, wie wir die Körner auf einem Schachbrett von Hand zusammenzählen würden, indem wir die Körner auf jedem Feld zählen?

```bash
total=0
current_grains=1
for square in {1..64}; do
  total=$( bc <<< "$total + $current_grains" )
  current_grains=$( bc <<< "$current_grains * 2" )
done
echo "$total"
```

Das ist viel lesbarer und verständlicher. Der Code zeigt klar, dass die Anzahl der Felder auf dem Schachbrett eine treibende Rolle spielt, ebenso wie die Verdopplung bei jedem Feld. Ich finde das besser als die ursprüngliche Lösung.

Aber.

Es ist langsam. Schleifen, Addieren und immer wieder ein externes Kommando aufrufen? Das summiert sich zu einer eher langsamen Laufzeit. Ist das nun ein großes Problem? Nein. Wenn du das in Bash skriptest, hast du dich wahrscheinlich schon damit abgefunden, dass du keine Geschwindigkeitsvorgaben hast. Aber könnte es besser sein? Ja.

### Dritte Option: direkte Berechnung

Wie addieren wir das alles also, ohne zu iterieren?

Betrachten wir eine *kleinere* Version desselben Problems: ein Schachbrett mit 5 Feldern[^3].

Die fünf Felder hätten die folgenden Anzahlen von Körnern:

```txt
---------------------
| 1 | 2 | 4 | 8 |16 |
---------------------
```

Und die Summe wäre hier: 1 + 2 + 4 + 8 + 16 = 31. Hm. 31 sagt mir noch nichts Offensichtliches. Gehen wir etwas größer.

OK, wie wäre es dann mit einem Schachbrett mit 6 Feldern? Diesmal zeige ich unter jedem Feld die laufende Summe, damit wir besser addieren können.

```txt
-------------------------
| 1 | 2 | 4 | 8 |16 |32 |
|   | 3 | 7 |15 |31 |63 |
-------------------------
```

Und die Summe: 1 + 2 + 4 + 8 + 16 + 32 = 63. Hmm... Langsam sehe ich einen Schimmer eines Musters, aber wir machen noch eines, um sicherzugehen.

7 Felder:

```txt
-----------------------------
| 1 | 2 | 4 | 8 |16 |32 |64 |
|   | 3 | 7 |15 |31 |63 |127|
-----------------------------
```

1 + 2 + 4 + 8 + 16 + 32 + 64 = 127. Siehst du es? Klingelt etwas bei den Werten 31, 63, 127?

Sie sind *fast* Zweierpotenzen. Genauer gesagt sind sie *eins weniger* als die *nächste* Zweierpotenz.

Noch ein Beispiel, damit es sich einprägt. Stell dir ein Schachbrett mit 12 Feldern vor. Das ist eine Eins, elfmal verdoppelt (in der Mathe-Branche 2^11): 2048. Verdopple das noch einmal, und du erhältst 4096 (2^12). Wenn wir das Muster also richtig erkannt haben, wäre die laufende Summe *eins weniger* als 4096, also 4095. Und wenn wir zusammenzählen, kommt genau das heraus: 1 + 2 + 4 + 8 + 16 + 32 + 64 + 128 + 256 + 512 + 1024 + 2048 = 4095.

> Anders ausgedrückt: Um die Summe für alle `n` Felder zu finden, gehst du eine Zweierpotenz höher und ziehst vom Ergebnis 1 ab.

Die Anzahl der Körner auf Feld 64 ist 2^63 (nullbasierte Zählung, erinnerst du dich?). Alsoooo, wenn wir die Gesamtzahl der Körner auf allen Feldern bis *einschließlich* Feld 64 berechnen wollen, müssen wir 2^64 berechnen und 1 abziehen.

Peng!

In Bash sieht das so aus:

```bash
bc <<< "2^64 - 1"
```

Das ergibt Sinn, wenn man sich ansieht, was im Binärsystem passiert. Wie lautete im Binärsystem die Summe aller 64 Felder?

```txt
0b1111...  # 64 ones
```

Wie viele Körner liegen auf dem theoretischen 65. Feld?

```txt
0b10000... # 1 and 64 zeros
```

Wie kommt man von einer Eins und 64 Nullen auf 64 Einsen? Man zieht 1 ab.

Und welchen zusätzlichen Vorteil bringt uns das? Nun haben wir einen schönen, lesbaren Ausdruck für die Summe. Er iteriert nicht, die Leistung ist also gut. Und er enthält die Zahl 64, die Anzahl der Felder auf einem Schachbrett, ein gutes Beispiel für gut signalisiertes **Design Intent**. Wenn sich die Welt in 1000 Jahren aus irgendeinem Grund auf ein 7x7-Schachbrett einigt, wird dieser künftige Ingenieur (vermutlich mit Bash 6.1) das Skript prüfen, erkennen, was du vorhattest, und die 64 in eine 49 ändern. Alles gut!

## Bleibt absichtsvoll, meine Freunde

Wenn man eine Implementierung ausarbeitet, ist es leicht, Dinge hinzuwerfen und sich an der ersten funktionierenden Lösung festzuhalten. Das ist in Ordnung, solange du das Problem erkundest. Aber sobald du die kritischen Bestandteile vollständig verstehst, und wenn du die Zeit hast, die Dinge gründlich zu polieren, dann sorge dafür, dass jeder Algorithmus, jeder Variablenname und sogar deine Leerzeichen ein Bild des Problems zeichnen: die kritischen Anforderungen und die Art, wie alle Teile zusammenpassen.

[^1]: Siehe auch [Thom Holwerdas Comic.](https://www.osnews.com/story/19266/wtfsm/)
[^2]: Wenn du beim Zählen im Binär- und Hexadezimalsystem etwas eingerostet bist, empfiehlt @kytrinyx das Buch [How to Count](https://www.amazon.com/Count-Programming-Mere-Mortals-Book-ebook/dp/B005DPIKPE). Und als schamlose Eigenwerbung: Ich habe kürzlich [auch ein paar Blogbeiträge über Binär- und Hexadezimalzahlen geschrieben.](https://www.assertnotmagic.com/2018/09/10/binary-hexadecimal-part-1/)
[^3]: Ich weiß nicht, wie das funktionieren sollte. Vielleicht könnten wir einfach Bauern im Ritterturnier gegeneinander antreten lassen.

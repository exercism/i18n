## Einleitung
Hallo zusammen! Ich hoffe, euch geht es allen gut.

Es waren wirklich aufregende Wochen bei Exercism, mit dem Start von Exercism Premium und Exercism Insiders. Wir hatten außerdem ein paar tolle Community-Calls und haben viele Verbesserungen an der Website ausgerollt, weitere kommen bald. Es gibt gerade viel, worauf man sich freuen kann, aber nichts ist aufregender als unser Eintritt in Monat 6 von #12in23! Der Sommer der S-Expressions, oder netter abgekürzt: der Summer of Sexps.

Wie immer ist der weise Meister der Programmierwelt mit dabei: Erik.

Dieses Mal geht es also um fünf Sprachen: Clojure, Common Lisp, Emacs Lisp, Racket und Scheme. Jede davon ist ein Dialekt von Lisp. Deshalb schauen wir in diesem Video nicht so sehr auf die einzelnen Sprachen, sondern ein bisschen mehr auf Lisp selbst und darauf, was es einzigartig macht. Zum Schluss gehen wir die Sprachen noch kurz durch.

Aber vorher noch etwas Organisatorisches! Um das Badge für den Summer of Sexps zu bekommen, musst du im Juni fünf beliebige Übungen in einer dieser Sprachen lösen.

## Die Badges

Es gibt außerdem das ganzjährige 12in23-Badge. Dafür musst du fünf unserer vorgestellten Übungen in der Sprache lösen. Wenn du das hier nach Juni schaust, kannst du diesen Teil jederzeit im Laufe des Jahres erledigen, du hast also nichts verpasst. Weil viele Leute noch nie mit einem Lisp gearbeitet haben, haben wir versucht, relativ einfache Übungen auszuwählen, die dir einen ersten Eindruck davon geben, wie eine Lisp-Sprache aussieht.
- **Leap:** mit booleschen Bedingungen und Wahrheitswerten arbeiten (und optional mit lexikalischem Gültigkeitsbereich)
- **Two-Fer:** einen String formatieren und mit einem optionalen Parameter arbeiten
- **Difference of Squares:** benutzerdefinierte Funktionen aufrufen und in Präfixnotation rechnen
- **Robot Name:** mit Zufall, Atoms und strukturierten Daten arbeiten
- **Matching Brackets:** Rekursion verwenden, um einen String zu validieren

Diese Übungen und die der vorherigen Monate findest du alle auf der #12in23-Seite.

## Überblick

Also, Lisp-basierte Sprachen. Ich denke, wir sollten damit anfangen, ein wenig über Lisp zu verstehen. Beginnen wir mit einer kleinen Einführung in Lisp allgemein.

### Lisp
- Das Erste, was auffällt: Lisp ist eine der ältesten Sprachen.
- Sie wurde 1958 von John McCarthy am MIT entwickelt, damals füllten Computer noch ganze Räume von oben bis unten 🙂
- Der Name Lisp steht für LISt Processing (oder LISt Processor) und zeigt, wie wichtig die Listen-Datenstruktur ist.
- Sie wurde für die KI-Forschung entworfen.
- Lisp basierte auf dem Lambda-Kalkül, das Alonzo Church erfunden hat, einem formalen System, um Berechnungen in der Mathematik zu beschreiben (vereinfacht).

- Sie ist aus verschiedenen Gründen eine unglaublich einflussreiche Sprache:
- Sie ist die zweitälteste höhere Programmiersprache, die noch verbreitet im Einsatz ist (nach Fortran)
- Sie war die erste höhere funktionale Programmiersprache und führte viele der Merkmale ein, die wir heute mit funktionaler Programmierung verbinden.
- Beachte, dass Lisp trotzdem imperative Programmierung unterstützte
- Sie war die allererste Sprache mit einem Garbage Collector, wodurch man sich nicht mehr selbst um die Speicherverwaltung kümmern musste
- Ihre vergleichsweise geringe Syntax und die relativ einfache Semantik machen sie ideal für Bildungszwecke.
- Deshalb wird Lisp (genauer gesagt einer seiner Dialekte) oft eingesetzt, um Programmieren zu unterrichten
- Sie hat eine große Zahl an Sprachdialekten hervorgebracht (und tut das bis heute!), und wir schauen uns die an, die Exercism unterstützt.
- Mit anderen Worten: Im Stammbaum der Programmiersprachen gibt es einen eigenen Zweig für Lisp-artige Sprachen (genauso wie es einen Zweig für C-artige Sprachen gibt).

Als ich kürzlich mit Simon Peyton Jones gesprochen habe, einem der Schöpfer von Haskell, ging es um den Unterschied zwischen Sprachen, die auf Turing-Maschinen aufbauen, und solchen, die auf dem Lambda-Kalkül aufbauen. Wenn du mehr darüber wissen willst, lohnt es sich, sich das Interview anzusehen.

### Klammern

In Lisps gibt es viele runde Klammern, aber das ist nicht unbedingt schlecht (genauso wie viele geschweifte Klammern in C-artigen Sprachen nicht unbedingt schlecht sind).
Lisps basieren auf etwas, das S-Expressions heißt.
Eine S-Expression (kurz für symbolischer Ausdruck, abgekürzt sexpr oder sexp, daher der Name der Challenge dieses Monats) ist ein Ausdruck, um Daten darzustellen. Sie wurden für die ursprüngliche Lisp-Sprache erfunden und dort populär gemacht.
Eine S-Expression kann eine von zwei Formen haben:

- Ein Atom (z. B. ‘x’). Stell sie dir als nicht verschachtelte „Werte“ oder als Blätter im Baum vor
- Ein Ausdruck x . y, wobei x und y S-Expressions sind. Stell sie dir als Paare vor, wobei y das nächste Element in der Liste ist (falls vorhanden), oder als Knoten in einem Baum. Beachte, dass das eine rekursive Definition ist, die auf der Blattebene endet. Normalerweise verwendet man für diese Art von S-Expression runde Klammern.


### S-Expressions
In Lisp werden S-Expressions verwendet, um sowohl Daten als auch Listen darzustellen.
Wenn du also eine Liste definierst, verwendest du runde Klammern.
Kombiniere das mit der Tatsache, dass:
die Liste die zentrale Datenstruktur von Lisp ist (daher der Name),
sie in manchen Lisps die einzige Datenstruktur ist,
und du hast am Ende sehr viele Klammern.
Um zu zeigen, wie zentral Listen sind: Wenn du in Lisp eine Funktion aufrufen willst, machst du das, indem du eine Liste erstellst.

Interessanterweise steht das erste Element der Liste (der Kopf) für die aufgerufene Funktion, und die übrigen Elemente (der Rest) werden als Argumente übergeben.
Das nennt man Präfixnotation (der Operator steht vor den Operanden). Das wirkt am Anfang etwas seltsam, ist aber tatsächlich sehr nützlich:
- Du kannst einen Operator auf mehrere Argumente anwenden, ohne ihn zu wiederholen (z. B. (+ 1 2 3))
- Die Operatorrangfolge wird explizit, weil du ohnehin eine neue S-Expression definieren musst, um einen anderen Operator aufzurufen

Interessanterweise werden Listen sogar verwendet, um den Quellcode darzustellen, aber darauf kommen wir später zurück.

Im Allgemeinen haben die meisten Lisps eine recht minimale Syntax und eine relativ einfache Semantik. Das macht sie relativ leicht zu lernen, und auch Code zu verstehen wird einfacher.
Diese minimale Syntax macht sie nicht weniger mächtig!
Kombiniert man diese beiden Dinge (minimale Syntax + einfache Semantik), sind Lisps ideal, um Compiler und Interpreter dafür zu schreiben.
Wenn du irgendwann deinen eigenen Compiler bauen willst, ist ein Lisp zu bauen eine gute Option!

### Coole Features von Lisp

Wie schon erwähnt, nutzen Lisps intern dieselben Datentypen und Datenstrukturen, um den Code darzustellen.
Diese Eigenschaft nennt man Homoikonizität (oder homoikonisch).
Anders gesagt: Eine Sprache ist homoikonisch, wenn sich ein darin geschriebenes Programm mit der Sprache selbst als Daten bearbeiten lässt, sodass sich die interne Darstellung des Programms allein aus dem Lesen des Programms ableiten lässt.
Diese Eigenschaft wird oft damit zusammengefasst, dass die Sprache Code wie Daten behandelt.

## Sprachen

### Scheme
- In den 1970er-Jahren von Guy Steele und Gerald Sussman am MIT AI Lab entwickelt.
- Begann als Versuch, Carl Hewitts Aktormodell mithilfe eines winzigen Lisp-Interpreters zu verstehen.
- Die Sprache selbst wurde in einer Reihe von AI Memos vorgestellt, die zusammen als Lambda Papers bekannt wurden.
- Erster Lisp-Dialekt mit lexikalischem Gültigkeitsbereich (Werte sind nur dort gültig, wo sie definiert werden) und eine der ersten Sprachen, die Continuations erster Klasse unterstützten.
- Offizieller IEEE-Standard und ein De-facto-Standard namens Revised Report on the Algorithmic Language Scheme (RnRS).
- Viele Implementierungen: ChezScheme, Guile (beide auf Exercism unterstützt), MIT/GNU Scheme und Racket
- Eine sehr minimale Sprache mit wenig Syntax, aber das war nicht beabsichtigt.
- Die Autoren wollten etwas Kompliziertes bauen, entwarfen am Ende aber etwas viel Einfacheres als geplant.
- Korrekte Endrekursion. Eine Iteration macht man idiomatisch per Rekursion.
- Scheme optimiert Endaufrufe, sodass sie keinen Stack-Speicher oder andere Ressourcen verbrauchen. Das bedeutet, dass Rekursion für beliebig große Daten oder beliebig lange Berechnungen verwendet werden kann
- Mächtige numerische Datentypen, darunter rationale und komplexe Zahlen
- Verzögerte Auswertung, ähnlich wie Promises.
- Mächtiges Makrosystem.
- Hygienische Makros verringern die Wahrscheinlichkeit unerwarteter Ergebnisse beim Definieren von Makros.

### Common Lisp
- Die Arbeit an Common Lisp begann 1981 nach einer Initiative des ARPA-Managers Bob Engelmore, einen einzigen gemeinschaftlichen Standard-Lisp-Dialekt zu entwickeln, weil die verschiedenen verwendeten Dialekte oft inkompatibel waren und Code und Wissen deshalb nicht teilbar waren
- Der erste Standard wurde 1984 veröffentlicht, der endgültige 1994 (sehr stabile Spezifikation)
- Da es ein Standard ist, gibt es verschiedene Implementierungen davon, etwa Steel Bank Common Lisp (die Standardimplementierung bei Exercism) und CLisp.
- Es gibt auch kommerzielle Implementierungen wie Allegro CL und LispWorks sowie ECL (Embeddable Common Lisp), das in C-Programme eingebettet werden kann, und ABCL, das auf der Java Virtual Machine läuft.
- Durch einen Standard definiert (ANSI INCITS 226-1994), sodass Code, der vor 30 Jahren geschrieben wurde, auch heute noch problemlos läuft
- Reiches und erweiterbares Typsystem
- Für die Entwicklung mit Image und REPL ausgelegt, daher sehr gut introspektierbar.

### Emacs Lisp
- 1985 entwickelt, um eine effiziente Sprache zum Erweitern eines Texteditors zu haben
- Dynamisch typisiert
- Etwa 80 % von Emacs sind in Emacs Lisp geschrieben (20 % in C aus Performancegründen)
- Etwas anders als andere Lisps:
- Nicht standardisiert, entwickelt sich langsam weiter
- Keine automatische Endaufruf-Eliminierung, Unterstützung über das Makro named-let (wandelt in eine while-Schleife um)
- Standardmäßig dynamischer Gültigkeitsbereich, für neuen Code wird lexikalischer Gültigkeitsbereich empfohlen
- Gute Dokumentation direkt im Editor
- Multiplattform (läuft überall, wo Emacs läuft)
- Lerne die Sprache, indem du den Code für Funktionen liest, die du täglich benutzt (Emacs-Kern + Pakete)
- Eine Teilmenge von Common Lisp ist über das cl-lib-Paket verfügbar. Emacs Lisp ist ziemlich minimalistisch, Common Lisp viel umfangreicher. Das cl-lib-Paket stellt eine Teilmenge von CL bereit.

### Racket
- Matthias Felleisen gründete PLT Inc., die im Januar 1995 beschloss, eine pädagogische Programmierumgebung auf Basis von Scheme zu entwickeln. Ursprünglich hieß sie PLT Scheme, später wurde sie in Racket umbenannt.
- Neben einer pädagogischen Programmierumgebung wurde sie als Plattform für das Entwerfen und Implementieren von Programmiersprachen konzipiert.
- Modernes LISP, Nachkomme von Scheme
- Unterstützt logische Programmierung!
- Einfache, ausdrucksstarke Syntax, die sowohl für Anfänger ideal als auch in den Händen von Profis mächtig ist
- Unterstützt viele Programmierparadigmen: funktionale Programmierung, objektorientierte Programmierung, Design by Contract, logische Programmierung, Metaprogrammierung
- Eine umfassende Standardbibliothek
- Wird mit DrRacket geliefert, einer vollständigen IDE, die für Lernen und Ausprobieren mit minimalem Aufwand entwickelt wurde
- Exzellente Dokumentation mit vielen Hintergrundinformationen und Beispielen

### Clojure
- Von Rich Hickey entwickelt mit dem Ziel, ein modernes LISP zu haben, das auf der JVM läuft und großartige Nebenläufigkeit bietet
- Ein LISP-Dialekt, aber auch etwas anders als andere LISPs: Er unterstützt keine implizite Endrekursion (keine Sorge, wenn du nicht weißt, was das ist) und hat mehr Datenstrukturen als nur Listen: Maps/Sets/Vectors. Diese Datenstrukturen haben alle ihre eigene Literal-Syntax.
- Sie sind außerdem alle unveränderlich, haben aber trotzdem großartige Performance mit O(log32 n) beim Nachschlagen, was „effektiv“ konstante Zeit ist
- Laufzeit-Polymorphismus über Multimethods und Protocols
- Gute JVM-Interoperabilität
- Clojure Spec, ein System zur Datenspezifikation (zur Laufzeit, nicht zur Compile-Zeit), mit dem du die Struktur von Daten definieren, Daten generieren, Property-based Testing machen und mehr kannst

## Anwendungsfälle

### Scheme
- Wird in der Lehre eingesetzt, um Informatik zu unterrichten (das einflussreiche Structure and Interpretation of Computer Programs verwendet Scheme).
- Wird in der KI eingesetzt. Wird als Skriptsprache verwendet, z. B. in GIMP (Grafikeditor), CAD-Werkzeugen (Computer Aided Design) und sogar in Filmen, etwa für die Verwaltungsskripte der Rendering-Engine von Final Fantasy: The Spirit Within

### Common Lisp
- Common Lisp wird an vielen Stellen eingesetzt, z. B. in der künstlichen Intelligenz und Forschung, aber auch in kommerziellen Anwendungen: NASA schrieb die Autopilot-Software der Raumsonde Deep Space One in Common Lisp, Viaweb wurde in Common Lisp geschrieben und später von Yahoo übernommen und in Yahoo Store! umbenannt, und auch die erste Version von Reddit

### Emacs Lisp
- Emacs Lisp wird in, nun ja, Emacs verwendet!
- Im Kern ist Emacs ein Interpreter für Emacs Lisp, einen Dialekt der Programmiersprache Lisp, ergänzt um Erweiterungen für die Textbearbeitung

### Racket
- Wird in der Lehre verwendet, da Racket mit Schwerpunkt auf der Unterstützung von Spracherstellung, -vereinfachung und -analyse entworfen wurde.
- Wird in der Forschung verwendet, weil seine erweiterbare Syntax und Semantik es für das Entwerfen und Prototyping neuer Sprachen und Sprachfeatures geeignet machen.
- Wird in Spielen verwendet, z. B. von John Carmack (bekannt durch Doom) in einer interaktiven Skriptumgebung für VR, und der Entwickler Naughty Dog nutzte es für Skripte (z. B. in Uncharted). Hacker News ist in Arc geschrieben, ebenfalls ein Lisp, das wiederum in Racket geschrieben ist.

### Clojure
- Clojure wird für viele verschiedene Dinge verwendet, unter anderem hat Docker 2022 Atomist übernommen, eine Plattform für Container-Sicherheit und Automatisierung, die in Clojure implementiert ist.
- Der weltweit größte Nutzer von Clojure ist Nubank, eine neue Bank, die es vor ein paar Jahren übernommen hat und heute das Kern-Team von Clojure beschäftigt.
- Es wird stark für schnelles Prototyping genutzt, da es dynamisch und sehr interaktiv ist.

## Aus Programmierersicht
Alle Sprachen unterstützen das funktionale, das imperative und das symbolische Paradigma.
Einige unterstützen außerdem OOP, allen voran Common Lisp.

Lisps sind größtenteils dynamische Sprachen, obwohl Racket statische Typisierung unterstützt.

Das heißt aber nicht, dass sie alle interpretiert werden. Es gibt eine Mischung aus: interpretiert (ohne Kompilierungsschritt), zu Bytecode kompiliert und dann interpretiert, und direkt zu Maschinencode kompiliert.

### Scheme
- Minimalistisch, mit klarer und einfacher Semantik und wenigen Arten, Ausdrücke zu bilden.
- Macht es leicht, die Sprache zu lernen und Code zu verstehen.
- Aus diesem Grund wird Scheme auch oft in einführenden Informatikkursen verwendet
- Continuations erster Klasse.
- Eine Continuation ist eine Darstellung des Zustands eines Programms.
- Continuations können verwendet werden, um Kontrollfluss zu modellieren (z. B. ein `return`-Konstrukt) oder Koroutinen (die Multitasking ermöglichen)

### Common Lisp
- Erweiterbares objektorientiertes System mit programmierbaren Methodenkombinationen (sowohl darin, wie Methoden von Unter- und Oberklassen kombiniert werden, als auch durch Before-, After- und Around-Methoden, mit denen sich Systeme erweitern lassen, ohne sie zu verändern)
- Programmierbares Condition-System (eine Obermenge von „Exceptions“), das die Erkennung von Bedingungen von der Wahl der Behandlung entkoppelt. Das Condition-System ist flexibler als Exception-Systeme: Statt einer Zweiteilung zwischen dem Code, der einen Fehler signalisiert, und dem Code, der ihn behandelt, verteilt das Condition-System die Zuständigkeiten auf drei Teile, nämlich das Signalisieren einer Bedingung, ihre Behandlung und den Neustart.
- Makros erlauben es, die Syntax der Sprache zu erweitern, nicht nur Boilerplate-Code zu erzeugen. So baut man eher eine Sprache, die zur Domäne passt, als umgekehrt.

### Emacs Lisp
- Großartige Editor-Unterstützung und -Integration
- Man kann damit Emacs anpassen, während er läuft („wie eine Hirnoperation an sich selbst“ :))
- Kann im Batch-Modus verwendet werden, in dem dir alle Textverarbeitungsfähigkeiten des Editors zur Verfügung stehen (etwa Buffer und Bewegungsbefehle)

### Racket
- Mächtiges Makrosystem. Syntaktischer Zucker wie Threading-Makros baut darauf auf. Makros sind außerdem hygienisch, was die Antwort auf eine einfache Frage ist: Ein Makro erzeugt Code, der an anderer Stelle eingefügt wird. Wenn dieser Code ausgewertet wird, wie bestimmen wir dann die Bindungen der darin enthaltenen Bezeichner? Hygienische Makros verringern die Wahrscheinlichkeit unerwarteter Ergebnisse beim Definieren von Makros.
- Sprachorientiert.
- Racket bringt die Werkzeuge mit, um deine eigene Programmiersprache oder DSL zu schreiben, aufbauend auf Rackets Makros.
- Mehrere eingebaute Sprachen, etwa Typed Racket (mit statisch geprüften Typannotationen), Datalog (eine Prolog-ähnliche Sprache), die von der DrRacket-IDE unterstützt wird, und Scribble, ein Werkzeug zum Erstellen von Prosadokumenten in HTML- oder PDF-Form
- Die REPL ist zentraler Teil des Entwicklungsworkflows, nicht nur zum Ausprobieren und Nachschlagen in der Doku

### Clojure
- Mächtiges Makrosystem.
- Syntaktischer Zucker wie Threading-Makros baut darauf auf
- Die REPL ist zentraler Teil des Entwicklungsworkflows, nicht nur zum Ausprobieren und Nachschlagen in der Doku

## Was du ausprobieren solltest

- Wenn du noch nie ein Lisp ausprobiert hast, sind Scheme und Racket großartige Optionen, da beide eine sehr minimale Syntax haben.
- Allerdings haben Common Lisp und Clojure beide einen Lernmodus, also sind sie wahrscheinlich am besten zum Lernen auf Exercism geeignet.
- Wenn du Emacs bereits benutzt, ist Emacs Lisp die naheliegende Wahl.
- Ähnlich ist Clojure die naheliegende Option, wenn du eine JVM-Sprache verwendest.
- Emacs Lisp (über Emacs), Clojure (über IntelliJ) und Racket (über DrRacket) haben alle exzellente IDE-Unterstützung.
- Für Common Lisp und Scheme gibt es natürlich auch gute IDEs.
- Wenn du ein wirklich voll ausgestattetes Lisp willst, sind Common Lisp, Clojure und Racket sehr umfangreich
- Wenn du ein etwas anderes Lisp willst: Clojure hat für ein Lisp eine ziemlich einzigartige Syntax.
- Wenn du dich für Makros und Metaprogrammierung interessierst, sind sie im Grunde alle gute Optionen! Aber wenn du neue Sprachen bauen willst, ist Racket besonders gut geeignet

Wenn du die Zeit hast, würde ich dir natürlich empfehlen, ein paar davon auszuprobieren!
Und hab keine Angst vor den Klammern! Ich weiß, ich hatte Angst davor, und habe deshalb das Lisp-Lernen ziemlich lange aufgeschoben.
Du wirst dich aber schnell an sie gewöhnen und sie vielleicht sogar schätzen lernen, so wie ich.
Tatsächlich liebe ich Lisp-Sprachen heute: die minimale Syntax, die einfache Semantik und trotzdem sehr ausdrucksstark.

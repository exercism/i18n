# Objektorientierter Oktober

## Einleitung

Hallo zusammen. Ich hoffe, euch geht es gut. Wir hatten einen arbeitsreichen September. Wir haben jede Menge neue Verbesserungen und Features auf der Seite veröffentlicht, vor allem rund um das Mentoring und die Abläufe darum herum. Dadurch bekommen wir jetzt doppelt so viele Mentor-Anfragen wie vor 4 Wochen um diese Zeit, was großartig ist. Wenn du deinen Code noch nie von einem Mentor hast überprüfen lassen, dann mach es unbedingt: Es ist eine fantastische Art zu lernen. Und wenn du anderen helfen möchtest: In den Warteschlangen warten jede Menge Anfragen darauf, dass du hilfst. Du kannst dich über den Link Mentoring im Menü Contribute als Mentor anmelden! Außerdem haben wir ein großes Datenbank-Update von MySQL 5.6 auf MySQL 8 gemacht, das ich aufgezeichnet habe und das im Insiders-Bereich verfügbar ist. Wenn du Insider bist und das noch nicht gesehen hast, schau es dir unbedingt an!

So, jetzt zu #12in23. Der September war ein interessanter Monat, in dem wir uns mit knappen, prägnanten Sprachen beschäftigt haben. Diesen Monat gehen wir den anderen Weg und schauen uns deutlich größere Kaliber an. Wir konzentrieren uns auf objektorientierte Sprachen, und zwar konkret auf C#, Crystal, Java, Pharo, Ruby und PowerShell. Über Pharo und Java haben wir schon gesprochen, im Mai bzw. August, deshalb gehen wir in diesem Video nicht noch einmal auf sie ein. Wenn dich die Einführungen in diese Sprachen interessieren, schau dir die Videos der früheren Monate an. In diesem Video geht es aber um C#, Crystal, Ruby und PowerShell, und wie immer erklärt uns Erik, was diese Sprachen interessant und einzigartig macht.

## Die Abzeichen

Wie immer kannst du das Abzeichen für den Objektorientierten Oktober verdienen, indem du 5 beliebige Übungen in diesen Sprachen löst. Außerdem gibt es das Jahresabzeichen, auf das, wie ich weiß, viele von euch hinarbeiten. Dafür haben wir 5 ausgewählte Übungen für dich, die sich alle gut auf eine objektorientierte Art lösen lassen. Das sind:

- **Binärer Suchbaum**: Zahlen in einen Binärbaum einfügen und darin suchen
- **Ringpuffer**: eine durchgängig verbundene Datenstruktur implementieren
- **Uhr**: eine Uhr implementieren, die Uhrzeiten ohne Datum verarbeitet
- **Matrix**: die Zeilen und Spalten einer als String dargestellten Matrix zurückgeben
- **Einfache Chiffre**: eine Substitutionschiffre implementieren

## Übersichten

### C#
- 2000 von Anders Hejlsberg bei Microsoft entwickelt
- Sprache und virtuelle Maschine haben offizielle Spezifikationen. Wurde 2002 ein offizieller ECMA-Standard und 2003 ein ISO-Standard
- Der Compiler, das .NET Framework (Standardbibliothek) und Visual Studio (Editor) waren anfangs alle Closed Source, doch Compiler und .NET Framework wurden 2014 als Open Source veröffentlicht
- Obwohl C# viel Syntax mit Java teilt (das ein paar Jahre zuvor erschienen war), war es keine Eins-zu-eins-Kopie von Java (z. B. Unterstützung für Eigenschaften, Werttypen und keine geprüften Ausnahmen)
- Wird zu Bytecode kompiliert, wobei seit .NET 7 auch die Kompilierung zu Maschinencode unterstützt wird (wird noch verbessert)
- Wird in Unmengen von Software eingesetzt, von Websites bis zu eingebetteten Systemen und von Apps (Xamarin) bis zu Spielen (Unity)

### Crystal
- Crystal wurde von Ary Borenszweig (der ein Konto auf Exercism hat), Juan Wajnerman und Brian Cardiff entwickelt (ursprünglich Joy genannt, aber 3 Tage später in Crystal umbenannt :))
- Sollte die Eleganz und Produktivität von Ruby haben, aber mit der Geschwindigkeit, Effizienz und Typsicherheit einer modernen kompilierten Sprache
- Open-Source-Sprache, entwickelt von der Organisation Manas
- Version 1.0 wurde 2021 veröffentlicht
- Wird mit LLVM zu Maschinencode kompiliert (wie Rust)
- Der Compiler wurde zunächst in Ruby geschrieben, später aber auf eine selbst gehostete Version umgestellt
- Wird vom Lkw-Hersteller Nikola, von Manas und anderen genutzt, meist für Websites, aber auch für Cloud-Dienste, Kommandozeilen-Anwendungen und Skripte

### PowerShell
- Von einem Team unter der Leitung von Jeffrey Snover bei Microsoft entwickelt und ursprünglich 2006 veröffentlicht
- Die Entwicklung wurde von Intel angestoßen, das seine KornShell-Skripte von Sun RISC auf eine andere Plattform verschieben wollte, um die Entwicklung seiner CPUs zu unterstützen. Am Ende wählte Intel eine andere Plattform, doch Microsoft arbeitete weiter an seiner neuen Shell: PowerShell, denn sie bot die Möglichkeit, die Windows-Systemadministration zu verbessern (die damals nicht besonders gut war und oft grafische Oberflächen erforderte)
- Die Syntax war von der KornShell inspiriert, aber auch von PHP, Perl und anderen
- Die erste Version lief nur auf dem .NET Framework, also nur unter Windows. PowerShell 6.0 (veröffentlicht 2018) lief aber auf .NET Core, das plattformübergreifend und Open Source ist
- Wird hauptsächlich für die Systemadministration verwendet, aber auch, um Kommandozeilen-Tools oder Wrapper um andere Tools bereitzustellen. Wir haben es massenhaft genutzt, um mit Exercism-Repos in großem Stil zu arbeiten

### Ruby
- Von Yukihiro Matsumoto (alias Matz) entwickelt und erstmals 1995 veröffentlicht
- Matz wollte mit einer richtigen objektorientierten Skriptsprache arbeiten, mochte die bestehenden Optionen (wie Perl und Python) aber nicht und baute deshalb eine neue Sprache: Ruby
- Matz beschreibt Ruby im Kern als einfache Lisp-Sprache, mit einem Objektsystem wie dem von Smalltalk, Blöcken inspiriert von Funktionen höherer Ordnung und einem praktischen Nutzen wie dem von Perl
- Wird normalerweise interpretiert, kann aber auch Just-in-Time zu Maschinencode kompiliert werden
- Neben dem offiziellen Interpreter gibt es alternative Implementierungen wie JRuby (läuft auf der JVM), Rubinius (nutzt LLVM) und YJIT, einen Just-in-Time-Compiler, der Teil des offiziellen Installationspakets ist
- Wird meist für Websites verwendet (mit Ruby on Rails), z. B. GitHub, Stripe, Shopify und viele mehr (darunter Exercism und das Exercism-Forum!). Ruby wird außerdem für Automatisierung genutzt

## Und wie unterscheiden sie sich aus Programmierersicht?

Sie sind alle objektorientierte Sprachen, obwohl sie das nicht alle auf dieselbe Weise umsetzen (z. B. nutzen Crystal und Ruby für den Aufruf von Methoden das Nachrichtenmodell von Smalltalk).

### C#
- Stark und statisch typisiert
- Unterstützt außerdem imperative und deklarative Paradigmen und wird immer funktionaler

### Crystal
- Stark und statisch typisiert (anders als Ruby)
- Unterstützt außerdem funktionale und imperative Programmierung

### PowerShell
- Stark typisiert
- Unterstützt außerdem imperative, funktionale und pipelinebasierte Programmierung.

### Ruby
- Dynamisch typisiert
- Unterstützt außerdem funktionale und imperative Programmierung

Trotzdem sind alle diese Sprachen in erster Linie objektorientierte Sprachen.

## Was diese Sprachen großartig macht

### C#
- Läuft (fast) überall, auch für Apps über Xamarin. Ursprünglich lief es nur unter Windows, woraus Mono entstand, eine freie und quelloffene Implementierung eines C#-Compilers und einer Laufzeitumgebung, die plattformübergreifend war. 2015 wurde .NET Core eingeführt, das vollständig plattformübergreifend und Open Source war.
- Allzweck: kann für nahezu jede Art von Arbeit eingesetzt werden, darunter Apps, Websites und Spiele
- Ausdrucksstark: Mit relativ wenig C#-Code kannst du viel erreichen. Besonders LINQ ist ein großer Produktivitätsschub und macht richtig Spaß
- Hervorragende Tool-Unterstützung, sowohl für IDEs als auch für andere Tools wie Build-Systeme. Visual Studio läuft nur unter Windows, JetBrains Rider und VS Code sind plattformübergreifend
- Die .NET Compiler Platform (oft Roslyn genannt) ist ein fantastischer Weg, C#-Code zu parsen, umzuwandeln und zu erzeugen (wir nutzen sie ausgiebig im C#-Test-Runner/Analyzer/Representer)
- Die Dokumentation ist umfangreich, detailliert und gut geschrieben
- Große Community: viele Ressourcen verfügbar, darunter Blogs, Foren und mehr

### Crystal
- Elegante und gut lesbare Syntax, wodurch Crystal-Code leicht zu lesen und zu schreiben ist
- Ausdrucksstark. Wie Ruby ist Crystal sehr ausdrucksstark: Mit wenig Code kannst du viel erreichen. Das liegt zum Teil an der hervorragenden und umfangreichen Standardbibliothek.
- Schnell. Statische Typisierung ermöglicht die Kompilierung zu effizientem Maschinencode mit LLVM, bei einfacher Speicherverwaltung durch einen Garbage Collector.
- Großartige objektorientierte Umsetzung. Alles ist ein Objekt, sogar Klassen und primitive Typen wie Zahlen und boolesche Werte
- Rundum ausgestattet: große Standardbibliothek, eingebauter Formatter, Template-Engine, Test-Framework und mehr
- Interop. Einfache Interoperabilität mit C-Bibliotheken
- Plattformübergreifend: läuft unter Linux, macOS und Windows, wobei Windows noch kein First-Class-Bürger ist

### PowerShell
- Mächtig: PowerShell ist ein mächtiges Tool für Administratoren. Es lässt sich gut mit vielen anderen Systemen integrieren, etwa dem Windows-Betriebssystem (Komponenten, Dienste und Einstellungen) und anderen Microsoft-Produkten wie Exchange, SharePoint, Azure usw. Es kann auch mit vielen anderen Technologien interagieren, etwa REST-APIs, Datenbanken, Webdiensten und mehr.
- Verfügbarkeit: PowerShell ist auf jedem modernen Windows vorinstalliert und lässt sich auf jedem System installieren, auf dem .NET läuft (dazu gehören macOS, Linux und viele Unix-Systeme)
- Sicherheit: PowerShell bietet Funktionen zum Absichern von Skripten und zum Einschränken ihrer Ausführung anhand signierter Skripte und Ausführungsrichtlinien. Das ist entscheidend, um die Sicherheit deiner Automatisierungsprozesse zu gewährleisten.
- GUI: Du kannst es mit anderen Frameworks wie Windows Forms oder Windows Presentation Foundation kombinieren, um grafische Oberflächen für deine PowerShell-Skripte zu entwerfen und zu bauen, damit sie benutzerfreundlicher werden.
- Pipeline: Ähnlich wie Bash auf Unix-Systemen erlaubt PowerShell, Cmdlets zu verketten, um komplexe Operationen und Aufgaben auszuführen, indem die Ausgabe eines Cmdlets als Eingabe an ein anderes übergeben wird

### Ruby
- Elegante und gut lesbare Syntax, wodurch Ruby-Code leicht zu lesen und zu schreiben ist
- Ausdrucksstark. Ruby ist eine sehr ausdrucksstarke Sprache: Mit wenig Code kannst du viel erreichen. Das liegt zum Teil an der hervorragenden und umfangreichen Standardbibliothek
- Riesiges Ökosystem mit einer gewaltigen Anzahl verfügbarer Bibliotheken (Gems)
- Großartige objektorientierte Umsetzung. Alles ist ein Objekt, sogar Klassen und primitive Typen wie Zahlen und boolesche Werte.
- Pragmatisch. Ruby und die meisten seiner Bibliotheken sind sehr pragmatisch und konzentrieren sich auf die Lösung echter Probleme.
- Interop. Einfache Interoperabilität mit C-Bibliotheken, was oft genutzt wird, wenn Leistung besonders wichtig ist. Ein Beispiel: Das Gem Nokogiri ermöglicht den Umgang mit XML mit hoher Performance, indem es C-Bibliotheken einbindet, die die schwere Arbeit erledigen.
- Es passiert viel Innovation. Stripe hat zum Beispiel Sorbet gebaut, einen Typechecker für Ruby, Shopify hat YJIT entwickelt, einen Just-In-Time-Compiler für Ruby (in Ruby 3.1+ enthalten), und an WASM-Unterstützung wird gearbeitet

## Herausragende Features

### C#
- Tolle Performance, besonders für eine verwaltete Sprache. Sowohl die Sprache als auch die Laufzeitumgebung haben jede Menge Features zur Leistungssteigerung, z. B. den Typ Span<T> und Zugriff auf CPU-Intrinsics (wie AVX-Instruktionen). Die CLR ist eine ausgereifte, stabile und sehr performante virtuelle Maschine, die ständig weiterentwickelt wird
- Riesiges Ökosystem mit einer gewaltigen Anzahl verfügbarer Bibliotheken. Diese Bibliotheken sind, wie C# selbst, ausgereift, stabil und funktionsreich
- Modern und in Entwicklung: Sprache und Laufzeitumgebung entwickeln sich weiter, mit sehr regelmäßigen Updates der Sprache, um sie moderner zu machen. Beispiele dafür sind:
- async/await für einfache Nebenläufigkeit
- span<T> für effiziente Speichernutzung
- Nullable reference types (behebt den Milliarden-Dollar-Fehler)
- Auch die Laufzeitumgebung wird regelmäßig aktualisiert, z. B. .NET AOT zum direkten Kompilieren in Maschinencode
- Weniger Alternativen als bei vielen anderen Sprachen/Ökosystemen. Für die meisten Zwecke reichen die Standardlösungen von Microsoft, oft inklusive IDE. Man könnte das auch als Nachteil sehen, aber es kann großartig sein, besonders wenn man mit einer Sprache anfängt

### Crystal
- Das Beste aus beiden Welten. Die Kombination aus globaler Typinferenz und Union-Typen lässt Crystal wie eine dynamisch typisierte Sprache wirken, bei der oft nur wenig an Typangaben nötig ist, die aber dennoch die Performance und die zusätzlichen Sicherheitsgarantien einer statisch typisierten Sprache bietet (einschließlich Nil-Prüfung zur Kompilierzeit)
- Metaprogrammierung. Statt Rubys dynamischer Metaprogrammierung zur Laufzeit hat Crystal Makros, die zur Kompilierzeit laufen. Makros arbeiten auf AST-Knoten und erzeugen Code. Sie sind recht einfach zu definieren und zu verwenden. Embedded Crystal (ECR) ist eine eingebaute Template-Engine, die Makros nutzt, um Crystal-Code in anderen Text einzubetten
- Tolle Nebenläufigkeit. Nebenläufigkeit ist einfach zu nutzen, mit einem Go-ähnlichen Nebenläufigkeitsmodell, das Fibers (leichtgewichtige Ausführungseinheiten) verwendet, die über Channels kommunizieren
- Produktiv und macht Spaß. Ruby ist bekanntlich auf Produktivität und die Zufriedenheit von Entwicklern ausgelegt, mit eleganter, lesbarer Syntax und großartiger Ergonomie. Da Crystals Syntax und Design Ruby sehr ähneln, gilt das auch für Crystal (Fun Fact: Ein guter Teil von Ruby-Code ist gültiger Crystal-Code).

### PowerShell

- Cmdlets: PowerShell verwendet Cmdlets (ausgesprochen „command-lets“) als Bausteine. Es sind kleine, aufgabenorientierte Befehle, die vorhandene Funktionalität umhüllen und eine einheitliche (z. B. Get-Help zum Anzeigen der Hilfe eines beliebigen Cmdlets), administrierfreundliche Schnittstelle für Systemadministratoren bieten. Es gibt Cmdlets für die verschiedensten „Backends“, etwa alle .NET-Klassen, Windows Management Instrumentation, Azure und viele mehr. Cmdlets können in jeder .NET-Sprache definiert werden und werden sehr deklarativ definiert, wobei Parameter, ihre Validierung, Anforderungen (required true/false), alternative (Switch-)Namen usw. einfach festgelegt werden können.
- Objektorientiert: Nahezu alles in PowerShell ist ein Objekt mit vielen verschiedenen Eigenschaften. Dateien, Prozesse, Registrierungsschlüssel und sogar einfache Datentypen wie String und Zahl werden als Objekte behandelt. Dieser Ansatz vereinfacht die Arbeit und die Interaktion mit verschiedenen Datentypen und Diensten. Wer schon mit .NET gearbeitet hat, wird das sehr vertraut finden
- Remote-Verwaltung: Es unterstützt die Fernverwaltung von Windows-Servern und -Systemen und sogar von Cloud-Ressourcen in Azure, AWS und GCP, was für die Verwaltung von Automatisierung und Deployments im großen Maßstab unerlässlich ist.
- Erweiterbar: Es hat ein großartiges eingebautes Modulsystem und erlaubt dir, eigene Cmdlets, Funktionen und Module zu erstellen sowie mit anderen Programmiersprachen und Bibliotheken zu arbeiten, um seine Fähigkeiten nach Bedarf zu erweitern.

### Ruby

- Produktiv und macht Spaß. Ruby ist bekanntlich auf Produktivität und Zufriedenheit von Entwicklern ausgelegt. Auch wenn das schwer zu messen ist, spricht die Begeisterung der Leute, die Ruby genutzt haben, für sich
- Metaprogrammierung. Ruby ist sehr dynamisch und erlaubt Metaprogrammierung zur Laufzeit. Ob du bestehende Klassen monkey-patchst oder Methoden dynamisch hinzufügst oder aufrufst: Ruby hat alles dabei
- Ruby on Rails ist ein fantastisches, voll ausgestattetes Framework zum Bauen von Websites. Von Haus aus enthält es Templating, Caching, ActiveRecord (eine Möglichkeit, über Objekte mit einer Datenbank zu interagieren), Migrationen, Scaffolding, WebSockets und vieles mehr.

## Welche solltest du wählen

- Wenn du mit objektorientierter Programmierung vertraut bist, aber eine andere Sicht darauf kennenlernen möchtest, probier Pharo aus
- Wenn du Java oder C# kennst, sie aber eine Weile nicht angefasst hast, gib ihnen noch eine Chance. Beide Sprachen haben sich stark weiterentwickelt, schau dir also einige dieser glänzenden neuen Features an!
- C# und Java (und in geringerem Maße Ruby) sind auch gute Optionen, wenn du eine Arbeit suchst, denn sie gehören zu den am häufigsten von Arbeitgebern gesuchten Sprachen
- Wenn du Ruby kennst, probier Crystal aus, um zu sehen, wie sich ein statisch typisiertes Ruby anfühlt und aussieht
- Wenn du dynamische Sprachen magst, aber auch großartige Performance willst, schau dir Crystal an
- Wenn du Bash oder Windows-Batchdateien kennst, probier PowerShell für eine andere, objektorientierte Herangehensweise an Shell-Skripting aus
- Wenn du generell auf Skriptsprachen stehst, sind Ruby, Crystal und PowerShell alle gute Optionen
- Pharo, Crystal und Ruby sind großartig, wenn du etwas Metaprogrammierung machen möchtest (C# bekommt auch einige Metaprogrammierungs-Features)
- Wenn du erleben willst, wie es ist, in einer Sprache zu programmieren, die nicht auf Textdateien basiert, probier Pharo und seine einzigartige, mächtige IDE aus
- Wenn du Websites baust, ist Ruby mit seinem Framework Ruby on Rails einen Versuch wert

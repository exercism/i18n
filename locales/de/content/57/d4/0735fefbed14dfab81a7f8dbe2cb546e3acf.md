# Rexx-Styleguide

Dieser Leitfaden beschreibt den Stil, der für die Test- und Beispieldateien der Übungen im Rexx-Track gedacht ist.

## Rexx-Standard

Der Code sollte dem Rexx Language Level 5.0 entsprechen.

Regina-Rexx-Erweiterungen und SAA-Standardfunktionen für den Zugriff auf externe Bibliotheken dürfen verwendet werden.

AREXX-Erweiterungen und CMS-Routinen zur Puffermanipulation sollten nicht verwendet werden.

## Plattform

Die Testumgebung zur Laufzeit basiert auf Linux. Deshalb dürfen in Aufrufen der `ADDRESS`-Anweisung nur Befehle verwendet werden, die in dieser Umgebung verfügbar sind. Diese sollten in den Codekommentaren deutlich hervorgehoben werden.

## Namen

### Anweisungen

Anweisungen (reservierte Wörter) sollten in **_Kleinschreibung_** wiedergegeben werden. Das Folgende entspricht also den Empfehlungen des Styleguides:

```rexx
do while input \= ''
  parse var input char +1 input
  say char
end
```

während keines der folgenden Beispiele konform ist und daher nicht empfohlen wird:

```rexx
/* *** Not recommended *** */
Do While input \= ''
  Parse Var input char +1 input
  Say char
End
```

und:

```rexx
/* *** Not recommended *** */
DO WHILE input \= ''
  PARSE VAR input char +1 input
  SAY char
END
```

### Eingebaute Funktionen (BIFs)

BIFs sollten in **_Großschreibung_** wiedergegeben werden, wie hier gezeigt:

```rexx
input = 'ABCDE'
say 'Length of input is' LENGTH(input)
say 'First letter of input is' SUBSTR(input, 1, 1)
```

### Labels (benutzerdefinierte Funktionen)

Label-Namen sollten in **_Pascal-Schreibweise_** stehen, wie hier gezeigt:

```rexx
greeting = MyFuncSayHello()
say greeting

exit 0

MyFuncSayHello : procedure
  hello = 'Hello there!'
return hello
```

### Variablen

Variablennamen sollten mit einem **_kleinen Buchstaben_** beginnen; einteilige Variablennamen sind daher durchgängig klein.

Mehrteilige Variablennamen dürfen entweder in **_Camel Case_** oder in **_Snake Case_** geschrieben werden.

Im Track gilt die Konvention, _Camel Case für die meisten Variablen_ zu verwenden und Snake Case den Testvariablen vorzubehalten. Variablen, die als Konstanten gedacht sind, dürfen optional auch in Großbuchstaben geschrieben werden.

```rexx
input = 'ABCDE'
i = 0

personName = 'Alice'
test_person_description = 'Brown hair, blue eyes'

TRUE = 1
PI_CONSTANT = 3.14159
```

## Literale

Strings dürfen entweder mit einfachen oder mit doppelten Anführungszeichen angegeben werden, **`'`** bzw. **`"`**. Die folgenden Beispiele sind äquivalent:

```rexx
say "Hello, world!"

say 'Hello, world!'
```

Jedes kann im anderen eingebettet werden, ohne dass ein Escape-Zeichen nötig ist:

```rexx
say "Please don't do that as it's wrong."

say 'He said, "Please sir, may I have more?".'
```

Sofern Strings keine eingebetteten Anführungszeichen enthalten und daher keine gemischten Anführungszeichen erfordern, sollten Strings vorzugsweise mit **_einfachen Anführungszeichen_** angegeben werden.

### Hexadezimale und binäre Strings

Binäre und hexadezimale Werte lassen sich darstellen, indem man einem String ein **`B`** bzw. ein **`X`** anhängt. Beispiele:

```rexx
hexvalue = "0A"X

binvalue = "00001010"B
```

Solche Werte sollten mit **_doppelten Anführungszeichen_** begrenzt werden.

Zusammen mit der vorherigen Empfehlung, einfache Anführungszeichen für gewöhnliche Strings zu verwenden, soll diese Konvention das Erkennen binärer und hexadezimaler Strings in einer Codebasis erleichtern.

### Zeilenumbruch-Terminator
In vielen UNIX- oder C-beeinflussten Sprachen wird das Literal **_`\n`_** als **_Zeilenumbruch_**-Terminator verwendet. Diese Verwendung ist weit verbreitet, und mehrere Übungen in diesem Track befassen sich mit der Verwendung und Bearbeitung von Strings mit diesem Terminator.

Rexx unterstützt diesen Terminator nicht, und es unterstützt auch **_`\`_** (oder ein anderes Zeichen) nicht als Escape-Zeichen.

Die Rexx-Entsprechung des Zeilenumbruch-Zeichens ist ein (plattformabhängiger) hexadezimaler Wert; auf UNIX-abgeleiteten Plattformen ist das:

**_`"0A"X`_**

Die Rexx-Entsprechung des folgenden Strings mit eingebetteten Zeilenumbrüchen (in der Bash-Shell):

```bash
printf "I have\nthree embedded\nnewlines.\n"
```

ist:

```rexx
say 'I have' || "0A"X || 'three embedded' || "0A"X || 'newlines.' || "0A"X
```

Übungen in diesem Track übersetzen **_`\n`_** nur dann in **_`"0A"X`_**, wenn es in einem String benötigt wird, der für die Ausgabe im Terminal gedacht ist. Andernfalls wird der String **_`\n`_** einfach als logischer Zeilenumbruch interpretiert.

## Weitere Stil-Empfehlungen

Die Einrückung darf zwei, drei oder vier Leerzeichen betragen, wobei eine Einrückung mit _zwei Zeichen_ und eine einheitliche Einrückung bevorzugt werden.

Die letzte **_return_**-Anweisung in einer Funktion sollte am Label-Namen ausgerichtet sein, wodurch das Ende der Funktion klar erkennbar ist, und sollte _immer_ einen Wert zurückgeben.

Der boolesche NOT-Operator lässt sich durch mehrere verschiedene Symbole darstellen. Das in diesem Track bevorzugte Symbol ist **`\`**. Um die Konsistenz mit dieser Verwendung zu wahren, sollte der relationale 'not equals'-Operator **`\=`** sein.

Die booleschen Werte **`false`** und **`true`** werden durch **`0`** bzw. **`1`** dargestellt. Vordefinierte Literale für diese Werte gibt es nicht.

Fehlerzustände werden über Rückgabewerte angezeigt, wobei entweder der leere String **`''`** oder **`-1`** einen Fehlerzustand angibt, je nach Kontext.

## Kanonisches Code-Stil-Beispiel
```rexx
TO DO EXAMPLE
```

## Aufbau der Testdatei

Eine Übung hat eine einzelne Testdatei im obersten Verzeichnis der Übung mit dem Namen: `<exercise>-check.rexx`

Nach dieser Konvention heißt die Testdatei für die Übung `acronym`: `acronym-check.rexx`

Die Testdatei jeder Übung ist auf eine lockere, aber festgelegte Weise aufgebaut, um Lernenden zu helfen, die Anforderungen der Übung zu verstehen, und um Mitwirkenden die Aufgabe zu erleichtern, Tests zu implementieren oder zu erweitern.

Das Folgende ist ein Ausschnitt aus der Testdatei für die Übung `acronym`:

```rexx
/* Unit Test Runner: t-rexx */
function = 'Abbreviate'
context('Checking the' function 'function')

/* Unit tests */
check('basic' function||'("Portable Network Graphics")',,
      function||'("Portable Network Graphics")',, 'to be', 'PNG')

check('lowercase words' function||'("Ruby on Rails")',,
      function||'("Ruby on Rails")',, 'to be', 'ROR')
```

Die Datei ist in zwei logische Abschnitte unterteilt, die jeweils durch eine Kommentarzeile gekennzeichnet sind.

Der erste Abschnitt weist der Variablen `function` den Namen der **_getesteten Funktion_** zu (hier die Funktion `Abbreviate`). Dieser Variablenname ist beschreibend, aber beliebig, und wird im Rest der Datei überall dort referenziert, wo der Name der getesteten Funktion benötigt wird.

In diesem Abschnitt steht außerdem ein Aufruf der Funktion `context`, deren Zweck offensichtlich ist.

Der nächste Abschnitt enthält die Unit-Tests. Jeder Aufruf der Funktion `check` ist ein einzelner Unit-Test. Erwartete Parameter:

```rexx
check(<test description>,
      <function invocation>,
      [<actual result variable>],
      <test comparator>,
      <expected result>)
```

**\<test description>** ist der String, der bei der Ausführung des Tests ausgegeben wird. Damit er möglichst aussagekräftig ist, empfiehlt es sich, einen String zu verwenden, der aus dem Namen der getesteten Funktion und den an sie übergebenen Argumenten besteht, wie im Beispiel.

**\<function invocation>** ist der eigentliche Funktionsaufruf, dessen Rückgabewert zur Testprüfung an `check` übergeben wird.

**\<actual result variable>** ist ein optionaler Parameter und, falls verwendet, der Name einer Variablen, die den für den Testvergleich verwendeten Wert enthält.

Der Grund dafür ist, dass man Ergebnisse prüfen kann, die _aus_ dem Rückgabewert der getesteten Funktion _abgeleitet_ sind, statt den Rückgabewert selbst. Ein naheliegendes Beispiel ist ein Rückgabewert, der ein mehrere kB großer String ist, wie hier gezeigt:

```rexx
expected_length = LENGTH(FUT(...))

check('...', FUT(...), expected_length, 'to be', 50)
```

Beachte, dass das Argument \<function invocation> trotzdem übergeben werden muss.

**\<test comparator>** ist ein String, der die Art des durchzuführenden Vergleichs beschreibt. In den meisten Fällen ist das der String 'to be', der einen Vergleich auf Gleichheit anfordert. Weitere Vergleichsoptionen findest du in der Dokumentation des Unit-Test-Frameworks.

**\<expected result>** ist, wenig überraschend, der Wert, mit dem das tatsächliche Ergebnis verglichen wird.

Variablen dürfen in der Testdatei frei deklariert werden (natürlich vor ihrer Verwendung) und als Argumente für `check` anstelle von Literalen verwendet werden.

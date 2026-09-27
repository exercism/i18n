# Einführung

Eine einzelne Anweisung kann wie eine unteilbare Aktion aussehen, obwohl sie nichts dergleichen ist. Betrachte das Addieren von fünf zu einem Wert im Speicher:

```x86asm
add qword [rel counter], 5
```

Im Hintergrund hat der Prozessor keine Möglichkeit, direkt zu einem Speicherwert zu addieren.
Er zerlegt diese eine Anweisung in drei kleinere Schritte, die **Mikrooperationen** heißen:

1. den aktuellen Wert aus dem Speicher **lesen**;
2. diesen Wert in einem Register **ändern**, indem du fünf addierst;
3. das Ergebnis **zurückschreiben**.

```x86asm
mov rax, qword [rel counter] ; 1. load the current value
add rax, 5                   ; 2. add five
mov qword [rel counter], rax ; 3. store the result back
```

Das ist ein verbreitetes Muster namens **Read-Modify-Write (RMW)**.

Beachte, dass das Lesen (oder Laden) und das Schreiben (oder Speichern) getrennte Ereignisse sind, sodass zwischen ihnen ein Zeitfenster liegt.
Normalerweise bemerken wir das nicht, weil auf einem einzelnen Kern garantiert jede Anweisung ihre Wirkung vollständig entfaltet, bevor die nächste an der Reihe ist.
Dieses Fenster ist daher unsichtbar, und `add` verhält sich wie eine einzige Einheit.

Moderne CPUs haben jedoch selten nur einen Kern, und Anwendungen laufen oft gleichzeitig auf vielen Kernen, ohne dass es eine feste Reihenfolge zwischen ihnen gibt.
Wenn mehrere Kerne im exakt selben Moment laufen, kann ein anderer Kern `counter` innerhalb dieses Fensters lesen oder schreiben, also nach dem Laden dieses Kerns und vor seinem Speichern.
Zwei Threads laden jeweils denselben alten Wert, addieren jeweils fünf und speichern jeweils ihr Ergebnis.
Es fanden zwei Additionen statt, aber der Wert hat sich nur um fünf erhöht.
Eine Aktualisierung ging unbemerkt verloren.

Das ist ein **Data Race**, und es ist ein häufiges Problem in multithreaded Code.

Nicht jeder Wert ist auf diese Weise gefährdet.
Jeder Thread hat seine eigenen Register und seinen eigenen Stack, daher gehört ein Wert in einem Register oder eine lokale Variable auf dem Stack eines Threads exklusiv diesem Thread und kann nicht in ein Data Race geraten.
Nur der Speicher, den die Threads gemeinsam nutzen, wie das obige `counter`, muss geschützt werden.

x86-64 bietet eine Reihe von Anweisungen, um dieses Problem zu lösen, indem sie eine Anweisung unteilbar machen.
Diese verhält sich dann nicht nur für den Kern, der sie ausführt, sondern auch für jeden anderen Kern wie eine einzige Einheit.
Eine Operation, die zusammenhält und die kein anderer Kern aufspalten kann, heißt **atomar**.

~~~~exercism/note
Es ist üblich, Anwendungen, die auf vielen Kernen laufen, als multithreaded zu bezeichnen.
Allerdings ist ein **Thread** nicht dasselbe wie ein Kern.
Zwei Threads können gleichzeitig auf demselben Kern laufen und sich dabei abwechseln, oder parallel auf verschiedenen Kernen.

Sich abwechselnde Threads können auch bei einem Read-Modify-Write bereits in ein Rennen geraten, wenn es in mehrere Anweisungen aufgeteilt ist, denn das Betriebssystem kann Threads zwischen zwei beliebigen Anweisungen umschalten.
Das Fenster innerhalb einer _einzelnen_ Anweisung wird jedoch nur von echtem parallelen Code sichtbar gemacht.
Da das Betriebssystem Threads nur zwischen Anweisungen umschaltet und niemals innerhalb einer Anweisung, ist eine einzelne Anweisung auf einem einzelnen Kern von Natur aus sicher.

Echte Atomarität über _mehrere_ Kerne hinweg bieten die folgenden Anweisungen.
~~~~

## Atomarer Austausch

Die Anweisung `xchg` vertauscht zwei Operanden.
Der Zieloperand wird gleich dem vorherigen Wert des Quelloperanden, während der Quelloperand gleich dem vorherigen Wert des Zieloperanden wird.
Man kann sie sich als zwei `mov`-Anweisungen vorstellen, die gleichzeitig stattfinden.

Wie üblich kann sie mit zwei Registeroperanden oder mit einem Speicheroperanden und einem Registeroperanden verwendet werden:

```x86asm
mov  eax, 1
xchg dword [rdi], eax ; [rdi] = 1, eax = the old value of [rdi]
mov ecx, 2
mov edx, 3
xchg edx, ecx         ; edx = 2, ecx = 3
```

Wenn sie mit einem Speicheroperanden verwendet wird, ist `xchg` _immer_ atomar.

~~~~exercism/caution
`xchg` ist automatisch atomar, wenn einer der Operanden eine Speicherstelle ist.
Das bedeutet außerdem, dass die Operation in dieser Situation deutlich langsamer ist.

Wenn du keine Atomarität brauchst, führe den Tausch stattdessen über ein freies Register mit einfachen `mov`-Anweisungen durch.
~~~~

## Das Lock-Präfix

Die gebräuchlichste Art, eine Anweisung in x86-64 atomar zu machen, ist das Hinzufügen des `lock`-Präfixes.
Es verschmilzt das Lesen, das Ändern und das Schreiben zu einem unteilbaren Schritt.
Das bedeutet, dass der Kern den Speicher während des gesamten Vorgangs exklusiv hält, sodass kein anderer Kern diese Stelle zwischendurch lesen oder schreiben kann.

```x86asm
lock add qword [rel counter], 5 ; the read, the modify, and the write are one step
```

`lock` funktioniert nur, wenn das Ziel im Speicher liegt, und nur bei Anweisungen, die diesen Speicher im Read-Modify-Write-Verfahren bearbeiten:

1. arithmetische Operationen wie `add`, `sub`, `inc`, `dec`, `neg`;
2. bitweise Operationen wie `and`, `or`, `xor`, `not`;
3. die Bitoperationen `bts`, `btr`, `btc`;
4. einige weitere spezielle Anweisungen wie `xadd` und `cmpxchg`, die weiter unten beschrieben werden.

~~~~exercism/caution
Eine Speicherstelle exklusiv zu halten und jeden anderen Kern auszusperren, ist nicht kostenlos.
Eine Operation mit `lock`-Präfix ist deutlich langsamer als ihre einfache Form, und noch langsamer, wenn mehrere Kerne um dieselbe Stelle konkurrieren.

Dieses Präfix solltest du nur für Speicher verwenden, von dem erwartet wird, dass ihn mehr als ein Thread verändert.
Vermeide es, wenn der Speicher nicht geteilt wird oder nur lesend genutzt wird.
~~~~

## Austausch und Addition

Ein einfaches `lock add` aktualisiert den Speicher, verwirft aber den alten Wert.
Oft ist der alte Wert genau das, was man braucht, zum Beispiel um jedem Thread eine eigene Ticketnummer zu geben.

Die Anweisung `xadd` (`x` steht für Exchange) gibt den vorherigen Wert zurück, während sie addiert.
Sie schreibt die Summe in das Ziel und lässt den ursprünglichen Zielwert im Quellregister.

```x86asm
mov  rax, 1
lock xadd qword [rdi], rax ; [rdi] = [rdi] + rax = [rdi] + 1
                           ; rax = the old value of [rdi]
```

Mit dem `lock`-Präfix ist das ein atomares **Fetch-and-Add**.
Wenn viele Threads denselben Zähler bearbeiten, liefert jeder Aufruf einen anderen alten Wert.

Wie bei `lock add` endet der Zähler beim exakten Wert der Anzahl der Aufrufe.
Anders als bei `lock add` wird jedoch auch jeder Zwischenwert zurückgegeben, einer an jeden Aufrufer.

## Vergleichen und Austauschen

`xadd` addiert und `xchg` überschreibt, aber keines von beiden kann den neuen Wert vom aktuellen Wert abhängig machen und ihn nur dann anwenden, wenn sich darunter nichts geändert hat.
Genau diese bedingte Aktualisierung bietet `cmpxchg`, das Vergleichen und Austauschen, und es ist das allgemeinste dieser Primitive.

`cmpxchg dest, src` verwendet `rax` als impliziten Akkumulator und vergleicht ihn mit `dest`:

- Wenn `dest == rax`, dann `dest = src` und `ZF = 1`.
- Wenn `dest != rax`, dann `rax = dest` und `ZF = 0`.

Beachte, dass `dest` nur dann aktualisiert wird, wenn es gleich dem erwarteten Wert ist, der zuvor in `rax` geladen wurde.
Diese Gleichheit stellt sicher, dass `dest` noch den Wert enthält, aus dem der neue Wert berechnet wurde, sodass eine Aktualisierung auf Basis eines veralteten Lesevorgangs niemals angewendet wird.
Damit ist `cmpxchg` der Baustein für eine atomare Aktualisierung, auch bekannt als **Compare-and-Swap (CAS)**:

```x86asm
    mov rax, qword [rdi]          ; rax = the value we expect to find
.retry:
    lea rcx, [rax + 10]           ; rcx = the new value we want to install
    lock cmpxchg qword [rdi], rcx ; if [rdi] still equals rax, store rcx and set ZF
                                  ; otherwise reload rax with the current value, clear ZF
    jnz  .retry                   ; ZF is cleared, so another thread won the race. Recompute and retry
```

Diese **Wiederholungsschleife** ist das Herzstück von Lock-Free-Aktualisierungen.
Das Fenster zwischen dem Lesen und dem Vergleichen-und-Austauschen ist genau der Moment, in dem ein anderer Thread eingreifen könnte, und `cmpxchg` fängt das ab, indem es sich weigert, einen aus einem veralteten Lesevorgang berechneten Wert zu speichern.

## Speicherreihenfolge

Bisher hat jede Operation nur eine einzige Speicherstelle berührt.
Wenn Threads über mehr als eine Speicherstelle zusammenarbeiten, taucht eine neue Frage auf: in welcher Reihenfolge die Schreibvorgänge eines Threads für einen anderen sichtbar werden.
Die Regeln, die diese Frage beantworten, sind die **Speicherreihenfolge** des Prozessors.

Das Konzept „Branchless Code“ hat die Idee eingeführt, dass ein moderner Kern Anweisungen nicht eine nach der anderen durchackert.
Er hält viele gleichzeitig in Bearbeitung und läuft voraus, wo er kann.
Das bedeutet, dass ein Schreibvorgang für die anderen Kerne später sichtbar werden kann, als es das Programm nahelegt, während die Anweisungen danach bereits vorausgeeilt sind.

x86-64 behält unter gewöhnlichen Lade- und Speicheroperationen eine **starke Speicherreihenfolge** bei, sodass auf jedem Kern gilt:

1. Ein Ladevorgang wird niemals hinter einen späteren Ladevorgang verschoben;
2. ein Speichervorgang wird niemals hinter einen späteren Speichervorgang verschoben;
3. ein Ladevorgang wird niemals hinter einen späteren Speichervorgang verschoben.

Die einzige mögliche Umordnung ist, dass ein Speichervorgang scheinbar nach einem späteren Ladevorgang von einer _anderen_ Adresse abgeschlossen wird.

Eine Anweisung mit `lock`-Präfix oder ein `xchg` mit einem Speicheroperanden ist eine vollständige Barriere: Nichts scheint sich in irgendeine Richtung über sie hinweg zu bewegen.
Deshalb reichen sie aus, um in den meisten Situationen die vollständige Reihenfolge sicherzustellen.

## Spinning und `pause`

Anweisungen, die ein Flag setzen und gleichzeitig seinen vorherigen Zustand zurückgeben, heißen **Test-and-Set**.
Sie können als Grundlage für einen **Spinlock** dienen, der sicherstellt, dass ein Kern exklusiven Zugriff auf einen Teil des Codes hat.

Das ist der Gesamtablauf, unter Verwendung der Anweisung `xchg` mit einem binären Flag:

1. Das Flag beginnt bei `0`.
2. Um die Sperre zu erwerben, vertauscht ein Kern den Wert im Flag mit `1`.
3. Ist der zurückgegebene Wert `1`, bedeutet das, dass die Sperre von einem anderen Kern _gehalten_ wird.
   Der aktuelle Kern wartet dann und versucht, die Sperre erneut zu erwerben.
4. Ist der zurückgegebene Wert `0`, war die Sperre frei.
   `xchg` hat sie nun auf `1` gesetzt, und andere Kerne warten, bis dieser Kern sie freigibt.
5. Sobald der aktuelle Kern seine Arbeit beendet hat, gibt er die Sperre frei, indem er das Flag auf `0` setzt.

```x86asm
acquire:
    mov  eax, 1
    xchg dword [rdi], eax ; try to take the lock; eax = its old value
    test eax, eax
    jnz  .held            ; old value was 1: someone else holds it
    ret                   ; old value was 0: the lock is ours
.held:
    pause                 ; wait before trying again
    jmp  acquire
```

Die Anweisung `pause` in der Warteschleife ändert nichts daran, was der Code berechnet.
Sie gibt dem Prozessor einen Hinweis, dass es sich um ein Spin-Wait handelt.
Die CPU kann dann den Energieverbrauch des wartenden Threads reduzieren und an einen Geschwister-Thread abgeben, der sich denselben Kern teilt.
Eine Spin-Schleife ohne `pause` ist immer noch korrekt, nur verschwenderisch.

Sobald der Thread seine Arbeit beendet hat, kann er die Sperre mit einem einfachen Speichervorgang von `0` über `mov` freigeben.
Mehr als ein `mov` ist nicht nötig, denn auf x86-64 werden Lade- und Speichervorgänge niemals hinter einen späteren Speichervorgang verschoben.
Von einem Speichervorgang, der die Zugriffe vor ihm nie überholt, sagt man, er habe **Release-Ordering**, und auf x86 bringt jeder einfache Speichervorgang dies mit sich.

~~~~exercism/note
Jede Anweisung, die eine Speicherstelle atomar testet und setzt, kann für einen Spinlock verwendet werden.
Zum Beispiel kann `lock bts` anstelle von `xchg` verwendet werden, um ein bestimmtes Bit zu setzen und dabei zu prüfen, ob es bereits gesetzt war.

Beachte, dass Flags wie das von `bts` geänderte `CF` Teil von `rflags` sind, eines Registers.
Das bedeutet, dass sie für jeden Thread exklusiv sind.
~~~~

# Best Practices

## Befolge offizielle Best Practices

Die offiziellen [Best Practices für Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) enthalten viele großartige Tipps, wie du deine Dockerfiles verbessern kannst.

## Performance

Du solltest in erster Linie auf Performance optimieren (besonders bei Test-Runnern).
So stellst du sicher, dass dein Tooling so schnell wie möglich läuft und nicht in einen Timeout gerät.

### Messen

Die Ausführungszeit regelmäßig zu messen ist eine großartige Möglichkeit, ein Gefühl für die Performance von Tooling zu bekommen.
Mach es dir zur Gewohnheit, die Ausführungszeit sowohl nach _als auch_ vor einer Änderung zu messen.
Auch wenn du dir „sicher“ bist, dass eine Änderung die Performance verbessert, solltest du trotzdem die Ausführungszeit messen.

#### Skripte

Erstelle nach Möglichkeit Skripte, die die Performance automatisch messen (auch _Benchmarking_ genannt).
Ein sehr hilfreiches Kommandozeilen-Tool ist [hyperfine](https://github.com/sharkdp/hyperfine), aber nutze gern, was für dein Tooling am sinnvollsten ist.

Neuere Track-Tooling-Repos haben Zugriff auf die folgenden beiden Skripte:

1. `./bin/benchmark.sh`: Benchmark des Track-Tooling-Codes ([Quellcode](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark.sh))
2. `./bin/benchmark-in-docker.sh`: Benchmark des Track-Tooling-Docker-Images ([Quellcode](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark-in-docker.sh))

```exercism/note
Wenn du an einem Track-Tooling-Repo ohne diese Dateien arbeitest, kannst du sie gern über die oben genannten Quellcode-Links in dein Repo kopieren.
```

```exercism/caution
Benchmarking-Skripte können helfen, die Performance des Toolings einzuschätzen.
Denk aber daran, dass die Performance auf den Produktionsservern von Exercism oft niedriger ist.
```

### Experimentiere mit verschiedenen Basis-Images

Probiere verschiedene Basis-Images aus (z. B. Alpine statt Ubuntu), um zu sehen, ob eines das andere (deutlich) übertrifft.
Wenn die Performance etwa gleich ist, nimm das kleinste Image.

### Probiere das interne Netzwerk aus

Prüfe, ob die Verwendung des `internal`-Netzwerks statt `none` die Performance verbessert.
Weitere Informationen findest du in der [Dokumentation zum Netzwerk](/docs/building/tooling/docker#network).

### Bevorzuge Build-Time-Befehle gegenüber Run-Time-Befehlen

Das Track-Tooling führt einen einmaligen, kurzlebigen Docker-Container aus, der die folgenden Schritte ausführt.

1. Ein Docker-Container wird erstellt.
2. Der Docker-Container wird mit den richtigen Argumenten ausgeführt.
3. Der Docker-Container wird zerstört.

Code, der in Schritt 2 läuft, läuft also bei _jedem einzelnen Tooling-Durchlauf_.
Deshalb ist es eine großartige Möglichkeit, die Performance zu verbessern, die Menge an Code zu reduzieren, die in Schritt 2 läuft.
Eine Möglichkeit dafür ist, Code von der _Run-Time_ zur _Build-Time_ zu verschieben.
Während Run-Time-Code bei jedem einzelnen Tooling-Durchlauf läuft, läuft Build-Time-Code nur einmal (beim Bauen des Docker-Images).

Build-Time-Code läuft einmal als Teil eines GitHub-Actions-Workflows.
Es ist also in Ordnung, wenn der Code, der zur Build-Time läuft, (relativ) langsam ist.

#### Beispiel: Bibliotheken vorab kompilieren

Beim Ausführen von Tests im Haskell-Test-Runner müssen einige Basisbibliotheken kompiliert werden.
Da jeder Testlauf in einem frischen Container stattfindet, bedeutet das, dass diese Kompilierung _bei jedem einzelnen Testlauf_ durchgeführt wurde!
Um das zu umgehen, enthält das [Dockerfile des Haskell-Test-Runners](https://github.com/exercism/haskell-test-runner/blob/5264c460054649fc672c3d5932c2f3cb082e2405/Dockerfile) die folgenden beiden Befehle:

```dockerfile
COPY pre-compiled/ .
RUN stack build --resolver lts-20.18 --no-terminal --test --no-run-tests
```

Zuerst wird das Verzeichnis `pre-compiled` in das Image kopiert.
Dieses Verzeichnis ist als Test-Übung eingerichtet und hängt von denselben Basisbibliotheken ab wie die eigentliche Übung.
Dann führen wir die Tests für dieses Verzeichnis aus, ähnlich wie Tests für eine echte Übung ausgeführt werden.
Durch das Ausführen der Tests wird die Basis kompiliert, aber der Unterschied ist, dass dies zur _Build-Time_ passiert.
Das resultierende Docker-Image hat dann seine Basisbibliotheken bereits kompiliert.
Das bedeutet, dass zur _Run-Time_ nicht kompiliert werden muss, was zu einer (viel) schnelleren Ausführung führt.

#### Beispiel: Binärdateien vorab kompilieren

Manche Sprachen erlauben es, Code ahead-of-time oder just-in-time zu kompilieren.
Das ist ein Kompromiss zwischen Build-Time und Run-Time, und auch hier bevorzugen wir aus Performancegründen die Ausführung zur Build-Time.

Das [Dockerfile des C#-Test-Runners](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) verwendet diesen Ansatz, bei dem der Test-Runner ahead-of-time (zur Build-Time) zu einer Binärdatei kompiliert wird, statt den Code just-in-time (zur Run-Time) zu kompilieren.
Das bedeutet, dass zur Run-Time weniger Arbeit anfällt, was die Performance erhöhen sollte.

## Größe

Du solltest versuchen, die Größe des Images zu reduzieren. Das bedeutet, dass es:

- schneller ausgerollt werden kann
- die Kosten für uns senkt
- die Startzeit jedes Containers verbessert

### Probiere verschiedene Distributionen aus

Verschiedene Distributions-Images haben unterschiedliche Größen.
Zum Beispiel ist das Image `alpine:3.20.2` **zehnmal** kleiner als das Image `ubuntu:24.10`:

```
REPOSITORY   TAG       SIZE
alpine       3.20.2    8.83MB
ubuntu       24.10     101MB
```

Im Allgemeinen gehören Alpine-basierte Images zu den kleinsten Images, daher basieren viele Tooling-Images auf Alpine.

### Probiere abgespeckte Images aus

Manche Images haben spezielle „slim“-Varianten, bei denen einige Funktionen entfernt wurden, was zu kleineren Image-Größen führt.
Zum Beispiel ist das Image `node:20.16.0-slim` **fünfmal** kleiner als das Image `node:20.16.0`:

```
REPOSITORY   TAG            SIZE
node         20.16.0        1.09GB
node         20.16.0-slim   219MB
```

Der Grund, warum „slim“-Varianten kleiner sind, ist, dass sie weniger Funktionen haben.
Dein Image braucht die zusätzlichen Funktionen vielleicht nicht. Wenn nicht, denk über die Verwendung der „slim“-Variante nach.

### Unnötiges entfernen

Eine offensichtliche, aber großartige Möglichkeit, die Größe deines Images zu reduzieren, ist alles zu entfernen, was du nicht brauchst.
Dazu gehören zum Beispiel:

- Quelldateien, die nach dem Bauen einer Binärdatei daraus nicht mehr benötigt werden
- Dateien, die auf andere Architekturen als das Docker-Image abzielen
- Dokumentation

#### Entferne Dateien des Paketmanagers

Die meisten Docker-Images müssen zusätzliche Pakete installieren, was normalerweise über einen Paketmanager erfolgt.
Diese Pakete müssen zur _Build-Time_ installiert werden (da zur _Run-Time_ keine Internetverbindung verfügbar ist).
Daher sollten alle Caching- und Buchhaltungsdateien des Paketmanagers nach der Installation der zusätzlichen Pakete entfernt werden.

##### apk

Distributionen, die den `apk`-Paketmanager verwenden (wie Alpine), sollten beim Installieren von Paketen mit `apk add` das Flag `--no-cache` verwenden:

```dockerfile
RUN apk add --no-cache curl
```

##### apt-get/apt

Distributionen, die den `apt-get`/`apk`-Paketmanager verwenden (wie Ubuntu), sollten die Befehle `apt-get autoremove -y` und `rm -rf /var/lib/apt/lists/*` _nach_ der Installation der Pakete und im selben `RUN`-Befehl ausführen:

```dockerfile
RUN apt-get update && \
    apt-get install curl -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
```

### Verwende Multi-Stage-Builds

Docker hat eine Funktion namens [Multi-Stage-Builds](https://docs.docker.com/build/building/multi-stage/).
Damit kannst du dein Dockerfile in separate _Stages_ aufteilen, wobei nur die letzte Stage im erzeugten Docker-Image landet (der Rest ist nur dazu da, den Bau der letzten Stage zu unterstützen).
Du kannst dir jede Stage als ein eigenes Mini-Dockerfile vorstellen; Stages können verschiedene Basis-Images verwenden.

Multi-Stage-Builds sind besonders nützlich, wenn dein Dockerfile Pakete installieren muss, die _nur_ zur Build-Time benötigt werden.
In dieser Situation sieht die allgemeine Struktur deines Dockerfiles so aus:

1. Definiere eine neue Stage (nennen wir sie die „build“-Stage).
   Diese Stage wird _nur_ zur Build-Time verwendet.
2. Installiere die erforderlichen zusätzlichen Pakete (in die „build“-Stage).
3. Führe die Befehle aus, die die zusätzlichen Pakete benötigen (innerhalb der „build“-Stage).
4. Definiere eine neue Stage (nennen wir sie die „runtime“-Stage).
   Diese Stage bildet das resultierende Docker-Image und wird zur Run-Time ausgeführt.
5. Kopiere das Ergebnis (die Ergebnisse) der in Schritt 3 ausgeführten Befehle (in der „build“-Stage) in diese Stage (die „runtime“-Stage).

Mit diesem Aufbau werden die zusätzlichen Pakete _nur_ in der „build“-Stage installiert und _nicht_ in der „runtime“-Stage, was bedeutet, dass sie nicht im erzeugten Docker-Image landen.

#### Beispiel: Dateien herunterladen

Der Fortran-Test-Runner benötigt `curl`, um einige Dateien herunterzuladen.
Sein Run-Time-Image benötigt `curl` jedoch _nicht_, was dies zu einem perfekten Anwendungsfall für einen Multi-Stage-Build macht.

Zuerst definiert sein [Dockerfile](https://github.com/exercism/fortran-test-runner/blob/783e228d8449143d2040e68b95128bb791833a27/Dockerfile) eine Stage (namens „build“), in der das Paket `curl` installiert wird.
Dann verwendet es curl, um Dateien in diese Stage herunterzuladen.

```dockerfile
FROM alpine:3.15 AS build

RUN apk add --no-cache curl

WORKDIR /opt/test-runner
COPY bust_cache .

WORKDIR /opt/test-runner/testlib
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/testlib/CMakeLists.txt
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/testlib/TesterMain.f90

WORKDIR /opt/test-runner
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/config/CMakeLists.txt
```

Der zweite Teil des Dockerfiles definiert eine neue Stage und kopiert die heruntergeladenen Dateien mit dem Befehl `COPY` aus der „build“-Stage in die eigene Stage:

```dockerfile
FROM alpine:3.15

RUN apk add --no-cache coreutils jq gfortran libc-dev cmake make

WORKDIR /opt/test-runner
COPY --from=build /opt/test-runner/ .

COPY . .
ENTRYPOINT ["/opt/test-runner/bin/run.sh"]
```

##### Beispiel: Bibliotheken installieren

Der Ruby-Test-Runner benötigt die installierten Pakete `git`, `openssh`, `build-base`, `gcc` und `wget`, bevor seine erforderlichen Bibliotheken (Gems) installiert werden können.
Sein [Dockerfile](https://github.com/exercism/ruby-test-runner/blob/e57ed45b553d6c6411faeea55efa3a4754d1cdbf/Dockerfile) beginnt mit einer Stage (mit dem Namen `build`), die diese Pakete installiert (über `apk add`) und dann die Abhängigkeiten installiert (über `bundle install`):

```dockerfile
FROM ruby:3.2.2-alpine3.18 AS build

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh build-base gcc wget git

COPY Gemfile Gemfile.lock .

RUN gem install bundler:2.4.18 && \
    bundle config set without 'development test' && \
    bundle install
```

Dann definiert es die Stage, die das resultierende Docker-Image bildet.
Diese Stage installiert _nicht_ die Abhängigkeiten, die die vorherige Stage installiert hat, sondern verwendet den Befehl `COPY`, um die installierten Bibliotheken aus der Build-Stage in die eigene Stage zu kopieren:

```dockerfile
FROM ruby:3.2.2-alpine3.18

RUN apk add --no-cache bash

WORKDIR /opt/test-runner

COPY --from=build /usr/local/bundle /usr/local/bundle

COPY . .

ENTRYPOINT [ "sh", "/opt/test-runner/bin/run.sh" ]
```

```exercism/note
Das [Dockerfile des C#-Test-Runners](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) macht etwas Ähnliches, nur kann in diesem Fall die Build-Stage ein vorhandenes Docker-Image verwenden, in dem die zusätzlichen Pakete, die zum Installieren von Bibliotheken nötig sind, bereits vorinstalliert sind.
```

## Testen

### Verwende Integrationstests

Unit-Tests können sehr nützlich sein, aber wir empfehlen, dich auf das Schreiben von [Integrationstests](https://en.wikipedia.org/wiki/Integration_testing) zu konzentrieren.
Ihr Hauptvorteil ist, dass sie besser testen, wie Tooling in der Produktion läuft, und so helfen, das Vertrauen in die Implementierung deines Toolings zu stärken.

#### Verwende Docker

Um die Produktionsumgebung bestmöglich nachzubilden, sollten die Integrationstests das Tooling _wie die Produktionsumgebung_ ausführen.
Das bedeutet, das Docker-Image zu bauen und dann das gebaute Image mit einer Lösung auszuführen, um seine Ausgabe zu überprüfen.

#### Verwende Golden-Tests

Integrationstests sollten als [Golden-Tests](https://ro-che.info/articles/2017-12-04-golden-tests) definiert werden. Das sind Tests, bei denen die erwartete Ausgabe in einer Datei gespeichert ist.
Das ist perfekt für Integrationstests von Track-Tooling, da die Ausgabe von Tooling ebenfalls Dateien sind.

##### Beispiel: Test-Runner

Wenn der Test-Runner mit einer Lösung ausgeführt wird, ist seine Ausgabe eine Datei `results.json`.
Wir können diese Datei dann mit einer „bekannt guten“ (also „erwarteten“) Ausgabedatei (namens `expected_results.json`) vergleichen, um zu prüfen, ob der Test-Runner wie beabsichtigt funktioniert.

## Sicherheit

Sicherheit ist ein Hauptgrund dafür, dass wir Docker-Container verwenden, um unser Tooling auszuführen.

### Bevorzuge offizielle Images

Auf [Docker Hub](https://hub.docker.com/) gibt es viele Docker-Images, aber versuche, [offizielle](https://hub.docker.com/search?q=&image_filter=official) zu verwenden.
Diese Images werden gepflegt und haben ein (weit) geringeres Risiko, unsicher zu sein.

### Fixiere Versionen

Um sicherzustellen, dass Builds stabil sind (also nicht plötzlich kaputtgehen), solltest du deine Basis-Images immer auf bestimmte Tags festlegen.
Das heißt, statt:

```dockerfile
FROM alpine:latest
```

solltest du Folgendes verwenden:

```dockerfile
FROM alpine:3.20.2
```

Mit Letzterem verwenden Builds immer dieselbe Version.

### Führe als nicht-privilegierter Benutzer aus

Standardmäßig laufen viele Images mit einem Benutzer, der Root-Rechte hat.
Du solltest in Betracht ziehen, als nicht-privilegierter Benutzer auszuführen.

```dockerfile
FROM alpine

RUN groupadd -r myuser && useradd -r -g myuser myuser

# RUN <COMMANDS THAT REQUIRE ROOT USER, E.G. INSTALLING PACKAGES>

USER myuser
```

### Aktualisiere Paket-Repositories auf die neueste Version

Es ist (fast) immer eine gute Idee, die neuesten Versionen zu installieren

```dockerfile
RUN apt-get update && \
    apt-get install curl
```

### Unterstütze ein schreibgeschütztes Dateisystem

Wir empfehlen, Dockerfiles für ein schreibgeschütztes Dateisystem zu schreiben.
Die einzigen Verzeichnisse, die du als beschreibbar annehmen solltest, sind:

- Das Lösungsverzeichnis (als zweites Argument übergeben)
- Das Ausgabeverzeichnis (als drittes Argument übergeben)
- Das Verzeichnis `/tmp`

```exercism/caution
Unsere Produktionsumgebung erzwingt derzeit _kein_ schreibgeschütztes Dateisystem, aber das könnte sich in Zukunft ändern.
Aus diesem Grund startet die Basisvorlage für einen neuen Test-Runner/Analyzer/Representer mit einem schreibgeschützten Dateisystem.
Wenn du etwas auf einem schreibgeschützten Dateisystem nicht zum Laufen bringst, kannst du (vorerst) gern ein beschreibbares Dateisystem annehmen.
```

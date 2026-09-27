# Istruzioni

In questo esercizio simulerai un sistema informatico basato su finestre.
Creerai alcune finestre che possono essere spostate e ridimensionate.
L'immagine seguente è rappresentativa dei valori con cui lavorerai qui sotto.

```text
                  <--------------------- screenSize.width --------------------->

       ^          ┌────────────────────────────────────────────────────────────┐
       |          │                                                            │
       |          │         position.x, _                                      │
       |          │         position.y   \                                     │
       |          │                       \<----- size.width ----->            │
       |          │                 ^      *──────────────────────┐            │
       |          │                 |      │        title         │            │
       |          │                 |      ├──────────────────────┤            │
screenSize.height │                 |      │                      │            │
       |          │            size.height │                      │            │
       |          │                 |      │       contents       │            │
       |          │                 |      │                      │            │
       |          │                 |      │                      │            │
       |          │                 v      └──────────────────────┘            │
       |          │                                                            │
       |          │                                                            │
       v          └────────────────────────────────────────────────────────────┘
```

📣 Per mettere in pratica la tua ampia gamma di competenze in JavaScript, **prova a risolvere le attività 1 e 2 con la sintassi dei prototipi e le attività rimanenti con la sintassi delle classi**.

## 1. Definisci Size per memorizzare le dimensioni della finestra

Definisci una classe (funzione costruttrice) di nome `Size`.
Dovrebbe avere due campi, `width` e `height`, che memorizzano le dimensioni attuali della finestra.
La funzione costruttrice dovrebbe accettare dei valori iniziali per questi campi.
Il valore di width viene fornito come primo parametro, quello di height come secondo.
I valori predefiniti di width e height dovrebbero essere `80` e `60`, rispettivamente.

Definisci inoltre un metodo `resize(newWidth, newHeight)` che accetta come parametri una nuova larghezza e una nuova altezza e modifica i campi in modo che riflettano le nuove dimensioni.

```javascript
const size = new Size(1080, 764);
size.width;
// => 1080
size.height;
// => 764

size.resize(1920, 1080);
size.width;
// => 1920
size.height;
// => 1080
```

## 2. Definisci Position per memorizzare la posizione di una finestra

Definisci una classe (funzione costruttrice) di nome `Position` con due campi, `x` e `y`, che memorizzano rispettivamente la posizione orizzontale e quella verticale dell'angolo in alto a sinistra della finestra.
La funzione costruttrice dovrebbe accettare dei valori iniziali per questi campi.
Il valore di `x` viene fornito come primo parametro, quello di `y` come secondo.
Il valore predefinito dovrebbe essere `0` per entrambi i campi.

La posizione (0, 0) è l'angolo in alto a sinistra dello schermo: i valori di `x` aumentano man mano che ci si sposta verso destra e i valori di `y` aumentano man mano che ci si sposta verso il basso.

Definisci anche un metodo `move(newX, newY)` che accetta come parametri i nuovi valori di x e y e modifica le proprietà in modo che riflettano la nuova posizione.

```javascript
const point = new Position();
point.x;
// => 0
point.y;
// => 0

point.move(100, 200);
point.x;
// => 100
point.y;
// => 200
```

## 3. Definisci una classe ProgramWindow

Definisci una classe `ProgramWindow` con i seguenti campi:

- `screenSize`: contiene un valore fisso di tipo `Size` con `width` 800 e `height` 600
- `size` : contiene un valore di tipo `Size`, il valore iniziale è quello predefinito dell'istanza di `Size`
- `position` : contiene un valore di tipo `Position`, il valore iniziale è quello predefinito dell'istanza di `Position`

Quando la finestra viene aperta (creata), all'inizio ha sempre la dimensione e la posizione predefinite.

```javascript
const programWindow = new ProgramWindow();
programWindow.screenSize.width;
// => 800

// Similar for the other fields.
```

Nota a margine: il nome `ProgramWindow` è usato al posto di `Window` per distinguere la classe dalla classe `Window` integrata che esiste negli ambienti browser.

## 4. Aggiungi un metodo per ridimensionare la finestra

La classe `ProgramWindow` dovrebbe includere un metodo `resize`.
Dovrebbe accettare come input un parametro di tipo `Size` e tentare di ridimensionare la finestra alla dimensione specificata.

Tuttavia, la nuova dimensione non può superare certi limiti.

- L'altezza o la larghezza minima consentita è 1.
  Le altezze o le larghezze richieste inferiori a 1 vengono limitate a 1.
- L'altezza e la larghezza massime dipendono dalla posizione attuale della finestra: i bordi della finestra non possono oltrepassare i bordi dello schermo.
  I valori superiori a questi limiti vengono ridotti alla dimensione massima possibile.
  Ad esempio, se la posizione della finestra è a `x` = 400, `y` = 300 e viene richiesto un ridimensionamento a `height` = 400, `width` = 300, la finestra verrà ridimensionata a `height` = 300, `width` = 300, perché lo schermo non è abbastanza grande nella direzione `y` da soddisfare completamente la richiesta.

```javascript
const programWindow = new ProgramWindow();

const newSize = new Size(600, 400);
programWindow.resize(newSize);
programWindow.size.width;
// => 600
programWindow.size.height;
// => 400
```

## 5. Aggiungi un metodo per spostare la finestra

Oltre alla funzionalità di ridimensionamento, la classe `ProgramWindow` dovrebbe includere anche un metodo `move`.
Dovrebbe accettare come input un parametro di tipo `Position`.
Il metodo `move` è simile a `resize`, ma questo metodo regola la _posizione_ della finestra al valore richiesto, non la dimensione.

Come per `resize`, la nuova posizione non può superare certi limiti.

- La posizione più piccola è 0 sia per `x` che per `y`.
- La posizione massima in ciascuna direzione dipende dalle dimensioni attuali della finestra.
  I bordi non possono oltrepassare i bordi dello schermo.
  I valori superiori a questi limiti vengono ridotti alla dimensione massima possibile.
  Ad esempio, se la dimensione della finestra è a `x` = 250, `y` = 100 e viene richiesto uno spostamento a `x` = 600, `y` = 200, la finestra verrà spostata a `x` = 550, `y` = 200, perché lo schermo non è abbastanza grande nella direzione `x` da soddisfare completamente la richiesta.

```javascript
const programWindow = new ProgramWindow();

const newPosition = new Position(50, 100);
programWindow.move(newPosition);
programWindow.position.x;
// => 50
programWindow.position.y;
// => 100
```

## 6. Modifica una finestra di programma

Implementa una funzione `changeWindow` che accetta come input un'istanza di `ProgramWindow` e modifica la finestra portandola alla dimensione e alla posizione specificate.
La funzione dovrebbe restituire l'istanza di `ProgramWindow` che è stata passata, dopo che le modifiche sono state applicate.

La finestra dovrebbe avere una larghezza di 400, un'altezza di 300 ed essere posizionata a x = 100, y = 150.

```javascript
const programWindow = new ProgramWindow();
changeWindow(programWindow);
programWindow.size.width;
// => 400

// Similar for the other fields.
```

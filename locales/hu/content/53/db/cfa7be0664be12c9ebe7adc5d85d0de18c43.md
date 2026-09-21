# Bevezetés

A JavaScriptben van egy beépített `...` operátor, amely megkönnyíti a határozatlan számú elemmel való munkát. A szövegkörnyezettől függően _rest operátornak_ vagy _spread operátornak_ nevezik.

## Rest operátor

### Rest elemek

Amikor a `...` egy értékadás bal oldalán jelenik meg, ezt a három pontot `rest` operátornak nevezzük. A három pontot egy változónévvel együtt rest elemnek hívjuk. Nulla vagy több értéket gyűjt össze, és egyetlen tömbbe tárolja őket.

```javascript
const [a, b, ...everythingElse] = [0, 1, 1, 2, 3, 5, 8];
a;
// => 0
b;
// => 1
everythingElse;
// => [1, 2, 3, 5, 8]
```

Figyeld meg, hogy a JavaScriptben, néhány más nyelvvel ellentétben, egy `rest` elem után nem állhat vessző. Egy destrukturáló értékadásban az utolsó elemnek _kell_ lennie. Az alábbi példa `SyntaxError`-t dob:

```javascript
const [...items, last] = [2, 4, 8, 16]
```

### Rest tulajdonságok

A tömbökhöz hasonlóan a `rest` operátor arra is használható, hogy egy vagy több objektumtulajdonságot összegyűjtsön, és egyetlen objektumban tárolja őket.

```javascript
const { street, ...address } = {
  street: 'Platz der Republik 1',
  postalCode: '11011',
  city: 'Berlin',
};
street;
// => 'Platz der Republik 1'
address;
// => {postalCode: '11011', city: 'Berlin'}
```

## Rest paraméterek

Amikor a `...` egy függvénydefinícióban az utolsó argumentuma mellett jelenik meg, azt a paramétert _rest paraméternek_ nevezzük. Lehetővé teszi, hogy a függvény határozatlan számú argumentumot tömbként fogadjon el.

```javascript
function concat(...strings) {
  return strings.join(' ');
}
concat('one');
// => 'one'
concat('one', 'two', 'three');
// => 'one two three'
```

## Spread

### Spread elemek

Amikor a `...` egy értékadás jobb oldalán jelenik meg, `spread` operátorként ismert. Egy tömböt elemek listájává bont ki. A rest elemmel ellentétben egy tömbliterál kifejezésben bárhol szerepelhet, és egynél több is lehet belőle.

```javascript
const oneToFive = [1, 2, 3, 4, 5];
const oneToTen = [...oneToFive, 6, 7, 8, 9, 10];
oneToTen;
// => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const woow = ['A', ...oneToFive, 'B', 'C', 'D', 'E', ...oneToFive, 42];
woow;
// =>  ["A", 1, 2, 3, 4, 5, "B", "C", "D", "E", 1, 2, 3, 4, 5, 42]
```

### Spread tulajdonságok

A tömbökhöz hasonlóan a `spread` operátor arra is használható, hogy tulajdonságokat másoljunk át egyik objektumból a másikba.

```javascript
let address = {
  postalCode: '11011',
  city: 'Berlin',
};
address = { ...address, country: 'Germany' };
// => {
//   postalCode: '11011',
//   city: 'Berlin',
//   country: 'Germany',
// }
```

# 소개

JavaScript에는 개수가 정해지지 않은 여러 원소를 다루기 쉽게 해 주는 `...` 연산자가 내장되어 있어요. 문맥에 따라 이 연산자를 _rest 연산자_ 또는 _spread 연산자_라고 불러요.

## rest 연산자

### rest 원소

`...`이 할당의 왼쪽에 나타나면, 이 세 개의 점을 `rest` 연산자라고 해요. 세 개의 점과 변수 이름을 함께 묶은 것을 rest 원소라고 하는데, rest 원소는 0개 이상의 값을 모아서 하나의 배열에 저장해요.

```javascript
const [a, b, ...everythingElse] = [0, 1, 1, 2, 3, 5, 8];
a;
// => 0
b;
// => 1
everythingElse;
// => [1, 2, 3, 5, 8]
```

다른 언어와 달리 JavaScript에서는 `rest` 원소 뒤에 쉼표를 붙일 수 없다는 점에 주의하세요. `rest` 원소는 구조 분해 할당에서 _반드시_ 마지막 원소여야 해요. 아래 예제는 `SyntaxError`를 발생시켜요.

```javascript
const [...items, last] = [2, 4, 8, 16]
```

### rest 프로퍼티

배열과 마찬가지로, rest 연산자를 사용하면 하나 이상의 객체 프로퍼티를 모아서 하나의 객체에 저장할 수도 있어요.

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

## rest 매개변수

`...`이 함수 정의에서 마지막 인자 옆에 나타나면, 그 매개변수를 _rest 매개변수_라고 해요. rest 매개변수를 사용하면 함수가 개수가 정해지지 않은 여러 인자를 배열로 받을 수 있어요.

```javascript
function concat(...strings) {
  return strings.join(' ');
}
concat('one');
// => 'one'
concat('one', 'two', 'three');
// => 'one two three'
```

## spread

### spread 원소

`...`이 할당의 오른쪽에 나타나면, `spread` 연산자라고 해요. spread 연산자는 배열을 원소들의 목록으로 펼쳐요. rest 원소와 달리, 배열 리터럴 표현식의 어디에나 나타날 수 있고, 두 개 이상 사용할 수도 있어요.

```javascript
const oneToFive = [1, 2, 3, 4, 5];
const oneToTen = [...oneToFive, 6, 7, 8, 9, 10];
oneToTen;
// => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const woow = ['A', ...oneToFive, 'B', 'C', 'D', 'E', ...oneToFive, 42];
woow;
// =>  ["A", 1, 2, 3, 4, 5, "B", "C", "D", "E", 1, 2, 3, 4, 5, 42]
```

### spread 프로퍼티

배열과 마찬가지로, spread 연산자를 사용하면 한 객체의 프로퍼티를 다른 객체로 복사할 수도 있어요.

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

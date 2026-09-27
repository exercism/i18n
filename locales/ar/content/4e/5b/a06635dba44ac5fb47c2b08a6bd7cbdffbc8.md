# مقدمة

عند العمل مع المصفوفات، قد ترغب أحيانًا في تنفيذ كود لكل قيمة في المصفوفة. ويُسمّى هذا التكرار على المصفوفة أو الدوران عليها.

سننظر هنا في الحالة التي لا ترغب فيها بتعديل المصفوفة أثناء ذلك.
أما لتحويل المصفوفات، فراجع [مفهوم تحويلات المصفوفات][concept-array-transformations] بدلًا من ذلك.

## حلقة `for`

أبسط أسلوب للتكرار على مصفوفة هو استخدام حلقة `for`، انظر [مفهوم حلقات `for`][concept-for-loops].

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## حلقة `for...of`

عندما ترغب في التعامل مع القيمة مباشرة في كل تكرار ولا تحتاج إلى الفهرس إطلاقًا، يمكنك استخدام حلقة `for...of`.

تعمل حلقة `for...of` مثل حلقة `for` الأساسية الموضّحة أعلاه، لكن بدلًا من التعامل مع _الفهرس_ كمتغير في الحلقة، تُمنح _القيمة_ مباشرة.

```javascript
const numbers = [6.0221515, 10, 23];

// Because re-assigning number inside the loop will be very
// confusing, disallowing that via const is preferable.
for (const number of numbers) {
  console.log(number);
}
// => 6.0221515
// => 10
// => 23
```

وكما في حلقات `for` العادية، يمكنك استخدام `continue` لإيقاف التكرار الحالي و`break` لإيقاف تنفيذ الحلقة تمامًا.

## طريقة `forEach`

تتضمن كل مصفوفة طريقة `forEach` يمكن استخدامها للمرور على عناصر المصفوفة.

تقبل `forEach` [دالة استدعاء راجعة][concept-callbacks] كمعامل.
تُستدعى دالة الاستدعاء الراجعة مرة واحدة لكل عنصر في المصفوفة.
ويُمرَّر إلى الدالة العنصر الحالي وفهرسه والمصفوفة كاملة كوسائط.
وغالبًا ما يُستخدم العنصر الحالي أو الفهرس فقط.

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

لا يمكنك إيقاف التكرار بعد بدء حلقة `forEach`.
ولا وجود للعبارتين `break` و`continue` في هذا السياق.

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks

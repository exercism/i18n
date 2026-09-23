# Підказки

## 1. Визначте схвалення

- Визначте [алгебраїчний тип даних][ADT] `Approval` із конструкторами для потрібних варіантів.

## 2. Визначте кухню

- Визначте [алгебраїчний тип даних][ADT] `Cuisine` із конструкторами для потрібних варіантів.

## 3. Визначте жанри фільмів

- Визначте [алгебраїчний тип даних][ADT] `Genre` із конструкторами для потрібних варіантів.

## 4. Визначте заняття

- Визначте [алгебраїчний тип даних із повʼязаними даними][ADT-with-data], щоб інкапсулювати різні заняття.

## 5. Оцініть заняття

- Найкращий спосіб виконати логіку на основі значення заняття - скористатися [виразами case][case-expression].
- Зіставлення зі зразком варіанта алгебраїчного типу даних дає доступ до його повʼязаних даних.
- Щоб додати додаткову умову до зразка, можна скористатися [охоронним виразом][guards] усередині case.
- Якщо треба охопити всі інші можливі значення в одному case, можна використати узагальнений зразок `_`.

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards

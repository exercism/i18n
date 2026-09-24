# Вступ

«Статистика» - велика й складна тема з багатьма аспектами.

Деякі з них ми порушували в концепції [`Randomness`][randomness], яка є окремою, але спорідненою темою.

У найпростішому вигляді статистика може охоплювати способи звести колекцію даних, яку можна перебрати, до одного значення.
Новачків у Julia може здивувати, як мало функцій мова має вбудованими за типових налаштувань:

- [`sum`][sum], щоб додавати числа.
- [`min`][min] і [`max`][max], щоб отримувати крайні значення заданих параметрів.
- [`extrema`][extrema], щоб отримувати кортеж (min, max) колекції, яку можна перебрати.
- [`length`][length], щоб порахувати всі значення.
- [`count`][count], щоб порахувати лише ті значення, які відповідають якомусь критерію.

```julia-repl
julia> v = collect(1:0.2:3)
11-element Vector{Float64}:
 1.0
 1.2
 ... # display truncated
 3.0

julia> mean(v)
2.0

julia> extrema(v)
(1.0, 3.0)

julia> length(v)
11

julia> min('g', 'a', 'c')
'a': ASCII/Unicode U+0061 (category Ll: Letter, lowercase)

julia> count(isodd, 1:5)  # 1, 3, and 5 are odd
3
```

Цей обмежений набір функцій - свідоме рішення, покликане зменшити роздутість базової Julia, винісши інші функції в каскад інших модулів і пакетів.

## Модуль `Statistics`

[`Statistics`][statistics] входить до стандартної бібліотеки, тож, імовірно, уже встановлений: достатньо додати `using Statistics` на початок програми, щоб внести його в простір імен.

Цей модуль містить наступний рівень поширених функцій, які, ймовірно, широко використовуватиме певна частина програмістів.

Багато функцій у `Statistics` вимагають певних базових знань із цієї теми.
Найпростіші приклади:

- [`mean`][mean], який багато хто назвав би середнім (той самий результат, що й `sum / length`).
- [`median`][median], серединне значення після сортування.
- [`std`][std], [стандартне відхилення][stddev]: міра того, наскільки широко розкидані значення.
- [`var`][var], дисперсія: квадрат `std`, який зазвичай швидше обчислити.

Кожна функція зазвичай має різні опції, а функцій _набагато_ більше, тож, якщо це цікаво, зазирніть у [документацію][statistics].

## Інші пакети

Як і слід очікувати, статистика - один із головних сценаріїв використання Julia, і є багато доступних пакетів для вужчої спеціалізованої роботи.

Група JuliaStats любʼязно підтримує [онлайн-список][juliastats].

[statistics]: https://docs.julialang.org/en/v1/stdlib/Statistics/
[randomness]: https://exercism.org/tracks/julia/concepts/randomness
[sum]: https://docs.julialang.org/en/v1/base/collections/#Base.sum
[min]: https://docs.julialang.org/en/v1/base/math/#Base.min
[max]: https://docs.julialang.org/en/v1/base/math/#Base.max
[extrema]: https://docs.julialang.org/en/v1/base/collections/#Base.extrema
[length]: https://docs.julialang.org/en/v1/base/collections/#Base.length
[count]: https://docs.julialang.org/en/v1/base/collections/#Base.count
[mean]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.mean
[median]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.median
[std]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.std
[var]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.var
[stddev]: https://en.wikipedia.org/wiki/Standard_deviation
[juliastats]: https://juliapackages.com/u/juliastats

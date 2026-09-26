# Introducción

Un tipo de datos algebraico (ADT) representa un número fijo de casos con nombre.
Cada valor de un ADT corresponde exactamente a uno de los casos con nombre.

Un ADT se define con la palabra clave `data`, con los casos separados por caracteres de barra vertical (`|`).
Si ninguno de los casos tiene datos asociados, el ADT es similar a lo que en otros lenguajes suele llamarse una _enumeración_ (o _enum_).

```haskell
data Season
  = Spring
  | Summer
  | Autumn
  | Winter
```

Cada caso de un ADT puede tener datos asociados de forma opcional, y distintos casos pueden tener distintos tipos de datos. Cuando el caso tiene datos asociados, se requiere un constructor.

```haskell
data Number
  = NInt Int      --'NInt' is the constructor for an Int Number.
  | NFloat Float  --'NFloat' is the constructor for an Float Number.
  | Invalid       --'Invalid' does not have data associated to it.
```

Puedes crear un valor para un caso específico refiriéndote a su nombre (por ejemplo, `NInt 22`).
Como los nombres de los casos no son más que funciones constructoras, los datos asociados se pueden pasar como un argumento normal de una función.

Los ADT tienen _igualdad estructural_, lo que significa que dos valores del mismo caso y con los mismos datos (opcionales) son equivalentes.

Aunque puedes usar expresiones `if/else` para trabajar con ADT, la forma recomendada de hacerlo es mediante coincidencia de patrones usando la sentencia _case_:

```haskell
add1 :: Number -> String
add1 number =
    case number of
      NInt    i -> show (i + 1)
      NFloat  f -> show (f + 1.0)
      Invalid   -> error "Invalid input"
```

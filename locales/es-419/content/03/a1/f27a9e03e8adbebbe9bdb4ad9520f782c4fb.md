# Introducción

El tipo `Maybe` es la solución que ofrece el lenguaje Elm para los valores opcionales.
Por eso aparece en las firmas de tipo de muchísimas funciones centrales de Elm, y entenderlo es fundamental.
El tipo `Maybe` se define así:

```elm
type Maybe a = Nothing | Just a
```

Esto se conoce en la terminología de Elm como una definición de «tipo personalizado».
Indica que un valor de este tipo puede ser `Nothing` o ser `Just` algo de tipo `a`.
Para crear un valor de tipo `Maybe` se usa uno de sus dos constructores, `Nothing` y `Just`.
Para leer el contenido de un `Maybe` se usa la coincidencia de patrones.

```elm
matthieu : Maybe String
matthieu = Just "Matthieu"

anon : Maybe String
anon = Nothing

sayHello : Maybe String -> String
sayHello maybeName =
    case maybeName of
        Nothing -> "Hello, World!"
        Just someName -> "Hello, " ++ someName ++ "!"

sayHello matthieu
    --> "Hello, Matthieu!"

sayHello anon
    --> "Hello, World!"
```

También hay varias funciones útiles en el módulo `Maybe` para manipular valores de tipo `Maybe`.

```elm
sayHelloAgain : Maybe String -> String
sayHelloAgain name = "Hello, " ++ Maybe.withDefault "World" name ++ "!"

capitalizeName : Maybe String -> Maybe String
capitalizeName name = Maybe.map String.toUpper name

capitalizeName matthieu
    --> Just "MATTHIEU"

capitalizeName anon
    --> Nothing
```

# Anexo a las instrucciones

## Pistas

Tienes que implementar la función `diamond`, que imprime un rombo que empieza en `A` y tiene el carácter dado en sus puntos más anchos. Puedes usar la signatura que se proporciona si no estás seguro de los tipos, pero no dejes que limite tu creatividad:

```haskell
diamond :: Char -> Maybe [String]
```

Este ejercicio trabaja con datos textuales. Por razones históricas, el tipo `String` de Haskell es sinónimo de `[Char]`, un array de caracteres. Para manejar datos textuales de forma más eficiente, se puede usar el tipo `Text`.

Como ampliación opcional de este ejercicio, puedes:

- Leer sobre los [tipos de string](https://haskell-lang.org/tutorial/string-types) en Haskell.
- Añadir `- text` a tus dependencias en package.yaml.
- Importar `Data.Text` de [la siguiente manera](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c):

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- Escribir, por ejemplo, `diamond :: Char -> Maybe [Text]` y referirte a los combinadores de `Data.Text` como, por ejemplo, `T.pack`.
- Consultar la documentación de [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html).
- Sustituir después todas las apariciones de `String` por `Text` en Diamond.hs:

```haskell
diamond :: Char -> Maybe [Text]
```

Esta parte es totalmente opcional.

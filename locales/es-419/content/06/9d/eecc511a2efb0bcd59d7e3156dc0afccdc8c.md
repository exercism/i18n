# Anexo a las instrucciones

## Pistas

Necesitas implementar la función `diamond`, que dibuja un rombo que empieza en `A` y que tiene el carácter dado en sus puntos más anchos. Puedes usar la firma que te proporcionamos si tienes dudas sobre los tipos, pero no dejes que limite tu creatividad:

```haskell
diamond :: Char -> Maybe [String]
```

Este ejercicio trabaja con datos textuales. Por razones históricas, el tipo `String` de Haskell es sinónimo de `[Char]`, una lista de caracteres. Para un manejo más eficiente de datos textuales, se puede usar el tipo `Text`.

Como extensión opcional de este ejercicio, puedes

- Leer sobre los [tipos de string](https://haskell-lang.org/tutorial/string-types) en Haskell.
- Agregar `- text` a tu lista de dependencias en package.yaml.
- Importar `Data.Text` de [la siguiente manera](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c):

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- Ahora puedes escribir, por ejemplo, `diamond :: Char -> Maybe [Text]` y referirte a los combinadores de `Data.Text` como, por ejemplo, `T.pack`,
- Buscar la documentación de [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html),
- Luego puedes reemplazar todas las apariciones de `String` por `Text` en Diamond.hs:

```haskell
diamond :: Char -> Maybe [Text]
```

Esta parte es totalmente opcional.

# Apêndice às instruções

## Dicas

Tens de implementar a função `diamond`, que imprime um losango que começa em `A` e tem o caráter dado nos seus pontos mais largos. Podes usar a assinatura fornecida se tiveres dúvidas sobre os tipos, mas não deixes que ela limite a tua criatividade:

```haskell
diamond :: Char -> Maybe [String]
```

Este exercício trabalha com dados textuais. Por razões históricas, o tipo `String` do Haskell é sinónimo de `[Char]`, uma lista de carateres. Para um tratamento mais eficiente de dados textuais, pode usar-se o tipo `Text`.

Como extensão opcional deste exercício, podes

- Ler sobre [tipos de string](https://haskell-lang.org/tutorial/string-types) em Haskell.
- Acrescentar `- text` à tua lista de dependências no package.yaml.
- Importar `Data.Text` [da seguinte forma](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c):

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- Podes agora escrever, por exemplo, `diamond :: Char -> Maybe [Text]` e referir-te aos combinadores de `Data.Text` como, por exemplo, `T.pack`,
- Consultar a documentação de [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html),
- Podes depois substituir todas as ocorrências de `String` por `Text` no Diamond.hs:

```haskell
diamond :: Char -> Maybe [Text]
```

Esta parte é totalmente opcional.

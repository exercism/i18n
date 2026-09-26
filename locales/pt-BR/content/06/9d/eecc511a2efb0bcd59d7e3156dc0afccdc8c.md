# Anexo às instruções

## Dicas

Você precisa implementar a função `diamond`, que imprime um losango começando em
`A`, com o caractere dado nos seus pontos mais largos. Você pode usar a
assinatura fornecida se estiver em dúvida sobre os tipos, mas não deixe que ela
restrinja sua criatividade:

```haskell
diamond :: Char -> Maybe [String]
```

Este exercício trabalha com dados textuais. Por razões históricas, o tipo
`String` do Haskell é sinônimo de `[Char]`, uma lista de caracteres. Para lidar
com dados textuais de forma mais eficiente, pode-se usar o tipo `Text`.

Como extensão opcional deste exercício, você pode

- Ler sobre [tipos de string](https://haskell-lang.org/tutorial/string-types) em
  Haskell.
- Adicionar `- text` à sua lista de dependências no package.yaml.
- Importar `Data.Text` da [seguinte
  forma](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c):

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- Agora você pode escrever, por exemplo, `diamond :: Char -> Maybe [Text]` e se
  referir aos combinadores de `Data.Text` como, por exemplo, `T.pack`,
- Consultar a documentação de
  [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html),
- Você pode então substituir todas as ocorrências de `String` por `Text` no Diamond.hs:

```haskell
diamond :: Char -> Maybe [Text]
```

Esta parte é totalmente opcional.

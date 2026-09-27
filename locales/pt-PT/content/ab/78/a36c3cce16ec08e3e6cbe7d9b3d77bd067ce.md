# Testes na track do Pyret

## Instalar os pré-requisitos

Depois de descarregares um exercício com êxito, vais ter de instalar os módulos do Node.js para correres os testes:

```sh
cd /path/to/exercise
npm install
```

Depois, adiciona o diretório que contém a ferramenta de linha de comandos `pyret` ao teu $PATH

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## Primeiros passos

Vais encontrar vários ficheiros dentro do diretório do exercício, mas os dois mais importantes são o teu ficheiro de solução e o ficheiro de testes.
No exemplo seguinte, descarregámos o exercício Leap.

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

Para correres os testes, usa `exercism test` se tiveres descarregado a CLI oficial do Exercism, ou corre `pyret leap-test.arr`.
O Pyret corre o conjunto de testes, que é composto por uma série de blocos `check` etiquetados que testam o teu ficheiro de solução com entradas e resultados esperados específicos.
Uma parte essencial deste processo é exportar explicitamente partes do teu código, para que o conjunto de testes as consiga ver.

## provide

Os testes desta track importam o teu ficheiro, o que dá acesso a tudo o que for explicitamente exportado do teu código.

Para exportares variáveis, tens de adicionar uma [instrução provide][provide-statement] no início do teu ficheiro.

Os excertos seguintes são duas formas válidas de exportar `a`, `b` e `c`.

```pyret
# using a list of bindings
provide a, b, c end
```

```pyret
# using an object literal
provide {
  a: a,
  b: b,
  c: c
}
end
```

Um terceiro método, `provide *`, é uma forma abreviada de exportar todas as ligações de nível superior, exceto os tipos de dados personalizados.
No entanto, geralmente não é recomendado, porque o Pyret não permite [shadowing][shadowing] e é rigoroso nesse aspeto.

## provide-types

Alguns exercícios vão exigir que um [tipo de dados personalizado][data-definition] seja exportado para efeitos de teste.
Nessas situações, podes usar uma [instrução provide-types][provide-types-statement].
Como um tipo de dados tem funções adicionais que podem não estar exportadas, aconselha-se a usar `provide-types *`, apesar da questão do shadowing.

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

Todos os esboços dos exercícios terão instruções `provide` ou `provide-types` já preparadas para tu usares.

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html

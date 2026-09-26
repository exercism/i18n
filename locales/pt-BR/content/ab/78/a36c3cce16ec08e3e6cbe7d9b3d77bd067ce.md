# Testes na trilha Pyret

## Instalando os pré-requisitos

Depois de baixar um exercício, você vai precisar instalar os módulos do Node.js para rodar os testes:

```sh
cd /path/to/exercise
npm install
```

Depois, adicione o diretório que contém a ferramenta de linha de comando `pyret` ao seu $PATH

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## Primeiros passos

Vai haver vários arquivos dentro do diretório do exercício, mas os dois mais importantes são o arquivo da sua solução e o de testes.
No exemplo a seguir, baixamos o exercício Leap.

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

Para rodar os testes, use `exercism test`, caso você tenha baixado a CLI oficial do Exercism, ou rode `pyret leap-test.arr`.
O Pyret vai rodar a suíte de testes, que consiste em uma série de blocos `check` rotulados que testam o arquivo da sua solução com entradas específicas e resultados esperados.
Uma parte essencial desse processo é exportar explicitamente partes do seu código para que a suíte de testes consiga enxergá-las.

## provide

Os testes desta trilha vão importar o seu arquivo, dando acesso a tudo que for exportado explicitamente do seu código.

Para exportar variáveis, você precisa adicionar uma [instrução provide][provide-statement] no início do seu arquivo.

Os exemplos a seguir são duas formas válidas de exportar `a`, `b` e `c`.

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

Um terceiro método, `provide *`, é uma forma abreviada de exportar todas as associações de nível superior, exceto os tipos de dados personalizados.
Porém, em geral ele não é recomendado, porque o Pyret é rígido quanto a não permitir [sombreamento][shadowing].

## provide-types

Alguns exercícios vão exigir que um [tipo de dados personalizado][data-definition] seja exportado para fins de teste.
Nessas situações, você pode usar uma [instrução provide-types][provide-types-statement].
Como um tipo de dados tem funções adicionais que podem não ser exportadas, é aconselhável usar `provide-types *` apesar da questão do sombreamento.

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

Todos os esqueletos de exercício já terão instruções `provide` ou `provide-types` prontas para você usar.

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html

# O que está fora do âmbito do percurso de Rust do Exercism?

Este ficheiro tem como objetivo explicar o que o percurso de Rust do Exercism pode e não pode ensinar dentro dos limites da linguagem Rust, da sua comunidade e do seu ecossistema.

Quando um determinado exercício aborda um tema na secção "Out of scope" do _design.md_, esse tema não deve ser repetido aqui, a menos que se considere que, de outra forma, não tem destaque suficiente.

## Os limites da interface web

Um estudante que use a interface web está limitado àquilo que a interface web e o executor de testes permitem, pelo que as capacidades da interface web funcionam, na prática, como o limite exterior do percurso de Rust.

Um estudante pode:

- Editar um único ficheiro `.rs`
- Receber a saída de `stdout` (por exemplo, de `dbg!`)

Em particular, isto significa que não pode editar o Cargo.toml, pelo que qualquer exercício que dependa de uma crate externa tem de incluir já todas as dependências no Cargo.toml.

## O que não é o objetivo do Exercism

O Exercism tem como objetivo ganhar fluência numa linguagem de programação, e não ensinar competências mais abstratas como o design de software ou a informática. Por isso, qualquer tema que não seja particularmente relevante para a linguagem de programação Rust não faz parte do âmbito do percurso de Rust.

## Exemplos de temas excluídos

Alguns exemplos de temas excluídos incluem:

### Cargo

- editar o Cargo.toml
- comandos de CLI, por exemplo `new`, `update`, `bench`

### Frameworks

- Amethyst
- Yew, Iced, Sauron, etc.

### Interoperabilidade

- CFFI
- `asm!`

### Em geral:

- Manipulação de ficheiros
- Redes

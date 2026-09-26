# O que está fora do escopo da trilha de Rust do Exercism?

Este arquivo tem o objetivo de explicar o que a trilha de Rust do Exercism pode e não pode ensinar dentro dos limites da linguagem Rust, da sua comunidade e do seu ecossistema.

Quando um assunto já estiver coberto em "Out of scope" no _design.md_ de um exercício específico, ele não deve ser repetido aqui, a menos que se considere que o tema, fora isso, tem destaque insuficiente.

## Os limites da interface web

Quem usa a interface web fica limitado ao que a interface web e o executor de testes permitem, então os recursos da interface web funcionam, na prática, como um limite externo para a trilha de Rust.

Quem está estudando pode:

- Editar um único arquivo `.rs`
- Receber a saída de `stdout` (por exemplo, de `dbg!`)

Em especial, isso significa que não é possível editar o Cargo.toml, então qualquer exercício que dependa de um crate externo precisa já incluir todas as dependências no Cargo.toml.

## Do que o Exercism não trata

O Exercism é sobre adquirir fluência em uma linguagem de programação, e não sobre ensinar habilidades mais abstratas, como design de software ou ciência da computação. Por isso, qualquer assunto que não seja especialmente relevante para a linguagem Rust não está no escopo da trilha de Rust.

## Exemplos de assuntos excluídos

Alguns exemplos de assuntos excluídos:

### Cargo

- editar o Cargo.toml
- comandos de CLI, como `new`, `update` e `bench`

### Frameworks

- Amethyst
- Yew, Iced, Sauron, etc.

### Interoperabilidade

- CFFI
- `asm!`

### Em geral:

- Manipulação de arquivos
- Redes

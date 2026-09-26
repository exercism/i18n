# Sobre o Wren

Wren é uma linguagem de script concorrente, pequena, rápida e baseada em classes. Pense em Smalltalk num pacote do tamanho do Lua, com um toque de Erlang e embalado numa sintaxe moderna e familiar.

- **Pequena.** A VM tem menos de 4.000 pontos e vírgulas de C legível e carinhosamente comentado.

- **Rápida.** Um compilador inteligente, de uma única passada, produz bytecode enxuto e eficiente.

- **Baseada em classes.** Classes e objetos estão no centro de tudo.

- **Concorrente.** Fibras leves já fazem parte da linguagem.

- **Script.** Embutível, sem dependências, com uma pequena biblioteca padrão e uma API em C fácil de usar.


### A VM

O coração do Wren é a VM. A Máquina Virtual do Wren é o núcleo da linguagem e executa todo o código-fonte em Wren. É apenas uma biblioteca, não um aplicativo independente. Ela foi projetada para ser embutida numa aplicação hospedeira maior.

Você encontra o Wren embutido em projetos como:

* [TIC-80](https://tic80.com): um computador fantasia para criar, jogar e compartilhar joguinhos (parecido com o PICO8).
* [DOME](https://domeengine.com): um framework multiplataforma para criar jogos.
* [luxe](https://luxeengine.com): uma engine de jogos multiplataforma para desenvolvimento rápido.
* [Wren Console][wren-console]: um REPL e uma CLI do Wren, escritos em grande parte no próprio Wren.

Você pode até embutir o Wren nos seus próprios projetos. Para os fins do Exercism, a aplicação hospedeira que vamos usar é o [Wren Console][wren-console], o que nos permite rodar e testar nossos scripts Wren pelo terminal.


### Por que o Wren?

O Wren foi criado originalmente por [Bob Nystrom](http://journal.stuffwithstuff.com), famoso pelo livro [Crafting Interpreters](http://craftinginterpreters.com). Ele já tem mais de algumas linguagens no currículo, mas explica especificamente o que levou à criação do Wren:

> Existem algumas linguagens de script usadas para embutir em aplicações. Lua é a principal. TCL já foi. Há também Guile, cada vez mais JavaScript, e algumas aplicações embutem Python. Sou ex-desenvolvedor de jogos, então quando penso em "script", costumo pensar em "script de jogos".

> Lua é legal: é pequena, simples e rápida. Mas (e não digo isso como crítica) também é estranha se você está acostumado com linguagens como C++ e Java. A sintaxe é diferente. A semântica, especialmente o modelo de objetos, é incomum. Qualquer um se acostuma com indexação começando em 1, mas coisas como metatables mostram mesmo que os objetos foram encaixados no Lua depois, meio que na marra.

> Acho que há espaço para uma linguagem tão simples quanto Lua, mas que pareça natural para quem tem experiência com orientação a objetos. O Wren é minha tentativa de fazer isso.

### Experimente

Você pode [experimentar rapidinho][try-it] direto no navegador (sem instalar nada). Se quiser brincar com o Wren dentro de uma interface elegante, dê uma olhada no [Wren Playground][wren-playground].

[wren]: https://wren.io
[wren-console]: https://github.com/joshgoebel/wren-console
[wren-playground]: https://github.com/ninjascl/wren-playground
[try-it]: https://wren.io/try/

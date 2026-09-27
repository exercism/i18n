## Introdução
Olá a todos! Espero que estejam todos bem.

Têm sido umas semanas mesmo entusiasmantes no Exercism, com o lançamento do Exercism Premium e do Exercism Insiders. Também tivemos ótimas chamadas da comunidade e pusemos no ar muitas melhorias no site, com mais a caminho. Há muitos motivos para estar entusiasmado neste momento, mas nenhum tão entusiasmante como entrarmos no mês 6 do #12in23! O verão das S-expressions, ou, dito de forma mais bonita, o Summer of Sexps.

Como sempre, tenho comigo o sábio do mundo da programação: o Erik.

Este mês temos cinco linguagens: Clojure, Common Lisp, Emacs Lisp, Racket e Scheme. Cada uma destas linguagens é um dialeto da linguagem Lisp, por isso, em vez de nos focarmos demasiado nas diferenças entre as linguagens neste vídeo, vamos olhar um pouco mais para o próprio Lisp e para o que o torna único. E no fim, passamos rapidamente pelas linguagens.

Mas, antes disso, uns assuntos práticos! Para ganhares o distintivo do Summer of Sexps, tens de completar cinco exercícios, à tua escolha, numa dessas linguagens durante o mês de junho.

## Os distintivos

Há também o distintivo anual 12in23. Para o obteres, tens de resolver cinco dos nossos exercícios em destaque na linguagem. Se estás a ver isto depois de junho, podes fazer esta parte em qualquer altura do ano, por isso não perdeste nada. Como muitas pessoas nunca trabalharam com um Lisp, tentámos escolher exercícios relativamente simples que te dão uma ideia do que é uma linguagem Lisp.
- **Salto:** trabalha com condições booleanas e com o que conta como verdadeiro (e, opcionalmente, com âmbito lexical)
- **Dois por Um:** formata uma string e trabalha com um parâmetro opcional
- **Diferença de Quadrados:** chama funções definidas por ti e faz contas em notação de prefixo
- **Nome do Robô:** trabalha com aleatoriedade, átomos e dados estruturados
- **Parênteses Correspondentes:** usa recursão para validar uma string

Estes exercícios e os dos meses anteriores estão todos na página do #12in23.

## Visão geral

Então, linguagens baseadas em Lisp. Acho que devemos começar por perceber um pouco o que é o Lisp. Vamos começar com uma pequena introdução ao Lisp em geral.

### Lisp
- A primeira coisa a notar é que o Lisp é uma das linguagens mais antigas.
- Foi criado por John McCarthy no MIT, em 1958, na altura em que os computadores ainda ocupavam salas inteiras de cima a baixo 🙂
- O nome Lisp vem de LISt Processing (ou LISt Processor), o que mostra a importância da estrutura de dados de lista.
- Foi concebido com o objetivo de fazer investigação em IA.
- O Lisp baseou-se no cálculo lambda, inventado por Alonzo Church, que é um sistema formal para descrever a computação em matemática (de forma simplificada).

- É uma linguagem incrivelmente influente, por várias razões:
- É a segunda linguagem de programação de alto nível mais antiga ainda em uso comum (depois do Fortran)
- Foi a primeira linguagem de programação funcional de alto nível e introduziu muitas das características que hoje associamos à programação funcional.
- Repara que o Lisp também suportava programação imperativa
- Foi a primeira linguagem de sempre com um coletor de lixo, o que libertou quem programa da gestão manual de memória
- A sua sintaxe comparativamente reduzida e a sua semântica relativamente simples tornam-no ótimo para fins educativos.
- Por isso, o Lisp (ou melhor, um dos seus dialetos) é usado frequentemente para ensinar programação
- Deu origem (e continua a dar!) a muitíssimos dialetos da linguagem (dos quais vamos falar daqueles que são suportados no Exercism).
- Por outras palavras, na árvore das linguagens de programação há um ramo separado para as linguagens do tipo Lisp (tal como há um ramo para as linguagens do tipo C).

Quando falei recentemente com o Simon Peyton Jones, um dos criadores do Haskell, ele falou-me da diferença entre linguagens construídas à volta de Máquinas de Turing e linguagens construídas à volta do cálculo lambda. Por isso, vale a pena ver essa entrevista, se quiseres saber mais sobre isto.

### Parênteses

Há muitos parênteses nos Lisps, mas isso não é necessariamente mau (tal como ter muitas chavetas não é necessariamente mau nas linguagens do tipo C).
Os Lisps assentam numa coisa chamada: S-expressions.
Uma S-expression (abreviatura de symbolic expression, abreviada para sexpr ou sexp, daí o nome do desafio deste mês) é uma expressão para representar dados. Foram inventadas para a linguagem Lisp original, que as divulgou.
Uma S-expression pode assumir uma de duas formas:

- Um átomo (por exemplo, "x"). Pensa neles como "valores" não aninhados ou como as folhas da árvore
- Uma expressão x . y, em que x e y são S-expressions. Pensa nelas como pares, em que y pode ser o elemento seguinte da lista (se existir) ou nós de uma árvore. Repara que esta é uma definição recursiva, que termina ao nível das folhas. Normalmente, usam-se parênteses para este tipo de S-expression.


### S-expressions
As S-expressions são usadas para representar tanto dados como listas em Lisp.
Por isso, sempre que defines uma lista, usas parênteses.
Junta isto ao facto de que:
a lista é a estrutura de dados central do Lisp (daí o seu nome),
em alguns Lisps é a única estrutura de dados,
e acabas com muitos parênteses.
Para mostrares como as listas são centrais: se quiseres chamar uma função em Lisp, fazes isso criando uma lista.

Curiosamente, o primeiro elemento da lista (também conhecido como cabeça) representa a função que está a ser chamada, e os restantes elementos (também conhecidos como cauda) são passados como argumentos.
Isto é conhecido como notação de prefixo (em que o operador vem antes dos operandos), o que pode parecer um pouco estranho ao início, mas é na verdade muito útil:
- Podes aplicar um operador a vários argumentos sem teres de repetir o operador (por exemplo, (+ 1 2 3))
- A precedência dos operadores fica explícita, já que tens de definir uma nova S-expression para chamar um operador diferente

Curiosamente, as listas são usadas até para representar o código-fonte, mas voltamos a isso mais à frente.

Em geral, a maioria dos Lisps tem uma sintaxe bastante minimalista e uma semântica relativamente simples, o que os torna relativamente fáceis de aprender e torna também mais fácil compreender o código.
Esta sintaxe minimalista não os torna menos poderosos!
Juntar estas duas coisas (sintaxe minimalista + semântica simples) torna os Lisps ideais para escrever compiladores e intérpretes.
Se alguma vez quiseres construir o teu próprio compilador, construir um Lisp é uma boa opção!

### Funcionalidades interessantes do Lisp

Como já referimos, os Lisps usam internamente os mesmos tipos e estruturas de dados para representar o código.
Esta propriedade chama-se homoiconicidade (ou homoicónico).
Por outras palavras, uma linguagem é homoicónica se um programa escrito nela puder ser manipulado como dados usando a própria linguagem, e, por isso, a representação interna do programa puder ser inferida apenas por ler o programa.
Esta propriedade é muitas vezes resumida dizendo que a linguagem trata o código como dados.

## As linguagens

### Scheme
- Criada durante a década de 1970 por Guy Steele e Gerald Sussman, no MIT AI Lab.
- Começou como uma tentativa de compreender o modelo de atores de Carl Hewitt através de um pequeno intérprete de Lisp.
- A própria linguagem foi apresentada numa série de memorandos de investigação (AI Memos) que ficaram conhecidos, no seu conjunto, como os Lambda Papers.
- Primeiro dialeto de Lisp a usar âmbito lexical (os valores só existem no âmbito onde são definidos) e uma das primeiras linguagens a suportar continuações de primeira classe.
- Tem uma norma oficial do IEEE e uma norma de facto chamada Revised Report on the Algorithmic Language Scheme (RnRS).
- Muitas implementações: ChezScheme, Guile (ambas suportadas no Exercism), MIT/GNU Scheme e Racket
- Linguagem muito minimalista, com pouca sintaxe, mas isso não foi intencional.
- Os autores tentaram construir algo complicado, mas acabaram por desenhar algo muito mais simples do que pretendiam
- Recursão de cauda apropriada. A forma idiomática de fazer iteração é através de recursão.
- O Scheme otimiza as chamadas recursivas de cauda para não consumir espaço de pilha nem outros recursos. Isto significa que a recursão pode ser usada com dados arbitrariamente grandes ou para cálculos arbitrariamente longos
- Tipos de dados numéricos poderosos, incluindo números racionais e complexos
- Avaliação adiada, que é como as promises.
- Sistema de macros poderoso.
- As macros higiénicas reduzem a probabilidade de resultados inesperados ao definir macros.

### Common Lisp
- O trabalho no Common Lisp começou em 1981, depois de uma iniciativa de Bob Engelmore, gestor da ARPA, para desenvolver um único dialeto de Lisp padrão da comunidade, porque os vários dialetos em uso eram muitas vezes incompatíveis, o que fazia com que o código e o conhecimento não fossem partilháveis
- A primeira norma foi publicada em 1984 e a definitiva em 1994 (uma especificação muito estável)
- Por ser uma norma, existem diferentes implementações da norma, como o Steel Bank Common Lisp (a predefinida do Exercism) e o CLisp.
- Há também implementações comerciais, como o Allegro CL e o LispWorks, além do ECL (Embeddable Common Lisp), que pode ser incorporado em programas C, e do ABCL, que corre na Java Virtual Machine.
- Definida por uma norma (ANSI INCITS 226-1994), por isso código escrito há 30 anos continua a correr bem hoje
- Sistema de tipos rico e extensível
- Concebida para o desenvolvimento com imagens e REPL, o que facilita muito a introspeção.

### Emacs Lisp
- Desenvolvida em 1985 com o objetivo de ter uma linguagem eficiente para estender um editor de texto
- Com tipos dinâmicos
- Cerca de 80% do Emacs está escrito em Emacs Lisp (20% em C, por razões de desempenho)
- Um pouco diferente dos outros Lisps:
- Não está normalizada e continua a evoluir lentamente
- Sem eliminação automática de chamadas de cauda, com suporte através da macro named-let (que se transforma num ciclo while)
- Âmbito dinâmico por predefinição, com âmbito lexical recomendado para código novo
- Boa documentação dentro do editor
- Multiplataforma (corre em todo o lado onde o Emacs corre)
- Aprende a linguagem lendo o código das funcionalidades que usas todos os dias (Emacs Core + Packages)
- Um subconjunto do Common Lisp está disponível através do pacote cl-lib. Enquanto o Emacs Lisp é bastante minimalista, o Common Lisp tem muito mais funcionalidades. O pacote cl-lib disponibiliza um subconjunto do CL

### Racket
- Matthias Felleisen fundou a PLT Inc., que em janeiro de 1995 decidiu desenvolver um ambiente de programação pedagógico baseado no Scheme. Originalmente chamado PLT Scheme, foi mais tarde renomeado para Racket.
- Além de ser um ambiente de programação pedagógico, foi concebido como uma plataforma para o desenho e a implementação de linguagens de programação.
- LISP moderno, descendente do Scheme
- Suporta programação lógica!
- Sintaxe simples e expressiva, ideal para principiantes e poderosa nas mãos de especialistas
- Suporta muitos paradigmas de programação: programação funcional, programação orientada a objetos, design por contrato, programação lógica, metaprogramação
- Uma biblioteca padrão abrangente
- Vem com o DrRacket, um IDE completo concebido para aprender e explorar com o mínimo de complicações
- Documentação excelente, com muita informação de contexto e muitos exemplos

### Clojure
- Desenvolvida por Rich Hickey com o objetivo de ter um LISP moderno que corre na JVM e com excelente concorrência
- É um dialeto de LISP, mas também é um pouco diferente dos outros LISPs, por não suportar recursão de cauda implícita (não te preocupes se não sabes o que é) e por ter mais estruturas de dados além das listas: mapas, conjuntos e vetores. Todas estas estruturas de dados têm a sua própria sintaxe literal.
- Além disso, são todas imutáveis, mas mesmo assim têm um ótimo desempenho, com uma pesquisa O(log32 n) que é "efetivamente" tempo constante
- Polimorfismo em tempo de execução através de multimétodos e protocolos
- Excelente interoperabilidade com a JVM
- O sistema de especificação de dados Clojure Spec (em tempo de execução, não de compilação) permite definir a estrutura dos dados, gerar dados, fazer testes baseados em propriedades e muito mais

## Casos de uso

### Scheme
- Usada na educação para ajudar a ensinar ciências da computação (a influente Structure and Interpretation of Computer Programs usa Scheme).
- Usada em IA. Usada como linguagem de scripting, por exemplo no GIMP (editor de imagens), em ferramentas CAD (Computer Aided Design) e até em filmes, com os scripts de gestão do motor de renderização de Final Fantasy: The Spirit Within

### Common Lisp
- O Common Lisp é usado em muitos sítios, por exemplo em inteligência artificial e investigação, mas também em aplicações comerciais: a NASA escreveu em Common Lisp o software de piloto automático da nave espacial Deep Space One, o Viaweb foi escrito em Common Lisp, tendo sido mais tarde adquirido pela Yahoo e rebatizado como Yahoo Store!, e a primeira versão do Reddit também

### Emacs Lisp
- O Emacs Lisp é usado no... Emacs!
- No seu núcleo, o Emacs é um intérprete de Emacs Lisp, um dialeto da linguagem de programação Lisp, mas com extensões adicionais para suportar a edição de texto

### Racket
- Usada na educação, já que o Racket foi concebido com ênfase em apoiar a criação, a simplificação e a análise de linguagens.
- Usada na investigação, porque a sua sintaxe e semântica extensíveis tornam-no adequado para desenhar e criar protótipos de novas linguagens e de novas funcionalidades de linguagens.
- Usada em jogos, por exemplo por John Carmack (o criador do Doom) num ambiente de scripting interativo para realidade virtual, e a produtora Naughty Dog usou-a para scripting (por exemplo em Uncharted). O Hacker News é escrito em Arc, também um Lisp, que por sua vez é escrito em Racket.

### Clojure
- O Clojure é usado para muitas coisas diferentes, incluindo a aquisição da Atomist pela Docker em 2022, uma plataforma de segurança e automatização de contentores implementada em Clojure.
- O maior utilizador de Clojure do mundo é o Nubank, um banco novo, que o adquiriu há alguns anos e que agora emprega a equipa principal do Clojure.
- É muito usado para prototipagem rápida, por ser dinâmico e altamente interativo.

## Perspetiva da programação
Todas as linguagens suportam os paradigmas funcional, imperativo e simbólico.
Algumas também suportam programação orientada a objetos, com destaque para o Common Lisp.

Os Lisps são, na sua maioria, linguagens dinâmicas, embora o Racket suporte tipagem estática.

Isto não significa que sejam todos interpretados, porque há uma mistura de opções: interpretadas (sem qualquer passo de compilação), compiladas para bytecode e depois interpretadas, e compiladas diretamente para código máquina.

### Scheme
- Minimalista, com uma semântica clara e simples e poucas formas diferentes de construir expressões.
- Torna fácil aprender a linguagem e compreender o código.
- Por esta razão, o Scheme é também usado frequentemente em muitos cursos introdutórios de ciências da computação
- Continuações de primeira classe.
- Uma continuação é uma representação do estado de um programa.
- As continuações podem ser usadas para modelar o fluxo de controlo (por exemplo, uma construção `return`) ou corrotinas (que permitem multitarefa)

### Common Lisp
- Sistema orientado a objetos extensível, com combinações de métodos programáveis (tanto na forma como os métodos de subclasses e superclasses são combinados, como nos métodos before, after e around, que permitem estender sistemas sem os modificar)
- Sistema de condições programável (um superconjunto das "exceções") que permite desacoplar o reconhecimento das condições da escolha de como são tratadas. O sistema de condições é mais flexível do que os sistemas de exceções porque, em vez de dividir as responsabilidades entre o código que sinaliza um erro1 e o código que o trata,2, o sistema de condições reparte-as em três partes: sinalizar uma condição, tratá-la e reiniciar.
- As macros permitem estender a sintaxe da linguagem, e não apenas gerar código repetitivo. Isto ajuda a construir uma linguagem à medida do domínio, em vez do contrário.

### Emacs Lisp
- Excelente suporte e integração com o editor
- Pode ser usada para personalizar o Emacs enquanto este está a correr ("como fazer cirurgia ao próprio cérebro" :))
- Pode ser usada em modo batch, no qual tens disponíveis todas as capacidades do editor para processar texto (como buffers e comandos de movimento)

### Racket
- Sistema de macros poderoso. O açúcar sintático, como as threading macros, é construído sobre ele. As macros também são higiénicas, o que responde a uma pergunta simples: uma macro gera código que é colocado noutro sítio. Quando esse código é avaliado, como é que determinamos as ligações dos identificadores que estão dentro? As macros higiénicas reduzem a probabilidade de resultados inesperados ao definir macros.
- Orientado à linguagem.
- O Racket vem com as ferramentas para escreveres a tua própria linguagem de programação ou DSL, construídas sobre as macros do Racket.
- Várias linguagens incorporadas, como o typed Racket (que suporta anotações de tipo verificadas estaticamente), o datalog (uma linguagem do tipo Prolog), com suporte no IDE DrRacket, e o scribble, uma ferramenta para criar documentos de texto em HTML ou PDF
- O REPL é uma parte central do fluxo de trabalho de desenvolvimento, não serve só para experimentar coisas ou consultar a documentação

### Clojure
- Sistema de macros poderoso.
- O açúcar sintático, como as threading macros, é construído sobre ele
- O REPL é uma parte central do fluxo de trabalho de desenvolvimento, não serve só para experimentar coisas ou consultar a documentação

## Qual escolher

- Se nunca experimentaste um Lisp, o Scheme e o Racket são ótimas opções, pois ambos têm uma sintaxe muito minimalista.
- Dito isto, o Common Lisp e o Clojure têm ambos o Modo de Aprendizagem, por isso são provavelmente os melhores para aprender no Exercism.
- Se já usas o Emacs, o Emacs Lisp é uma escolha natural.
- Da mesma forma, se usas uma linguagem da JVM, o Clojure é uma opção natural.
- O Emacs Lisp (através do Emacs), o Clojure (através do IntelliJ) e o Racket (através do DrRacket) têm todos um excelente suporte de IDE.
- Claro que também há bons IDEs para Common Lisp e Scheme.
- Se queres um Lisp realmente cheio de funcionalidades, o Common Lisp, o Clojure e o Racket são bastante completos
- Se queres um Lisp um pouco diferente, o Clojure tem uma sintaxe bastante invulgar para um Lisp.
- Se te interessam as macros e a metaprogramação, praticamente todos são boas opções! Mas se queres construir linguagens novas, o Racket em particular é excelente

Claro que, se tiveres tempo, recomendo que experimentes duas ou três!
E não tenhas medo dos parênteses! Eu sei que eu tinha, e foi por isso que adiei aprender Lisp durante bastante tempo.
Mas vais habituar-te depressa e talvez até aprendas a apreciá-los, como aconteceu comigo.
Na verdade, hoje adoro as linguagens Lisp, com a sua sintaxe minimalista, semântica simples e ainda assim muito expressivas.

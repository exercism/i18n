## Introdução
Oi, pessoal! Espero que esteja tudo bem com vocês.

Foram algumas semanas bem empolgantes no Exercism, com o lançamento do Exercism Premium e do Exercism Insiders. Também tivemos ótimas chamadas da comunidade e publicamos muitas melhorias no site, com mais algumas chegando em breve. Tem muita coisa empolgante acontecendo agora, mas nada mais empolgante do que entrar no mês 6 do #12in23! O verão das S-expressions, ou, de forma mais simpática, o Verão dos Sexps.

Como sempre, tenho comigo o sábio do mundo da programação: Erik.

Então, temos cinco linguagens neste mês: Clojure, Common Lisp, Emacs Lisp, Racket e Scheme. Cada uma delas é um dialeto da linguagem Lisp, então, em vez de focar demais nas diferenças entre as linguagens neste vídeo, vamos olhar um pouco mais para o próprio Lisp e para o que o torna único. No final, passamos rapidamente por cada uma das linguagens.

Mas, antes disso, alguns recados! Para ganhar a medalha do Verão dos Sexps, você precisa completar cinco exercícios quaisquer em uma dessas linguagens durante o mês de junho.

## As medalhas

Também existe a medalha anual do 12in23. Para ganhá-la, você precisa resolver cinco dos nossos exercícios em destaque na linguagem. Se você estiver assistindo a este vídeo depois de junho, pode fazer essa parte em qualquer momento do ano, então você não perdeu nada. Como muita gente nunca trabalhou com um Lisp, procuramos escolher exercícios relativamente simples, que dão uma ideia de como é uma linguagem Lisp.
- **Salto:** trabalhe com condições do tipo Boolean e veracidade (e, opcionalmente, escopo lexical)
- **Dois por Um:** formate uma string e trabalhe com um parâmetro opcional
- **Diferença de Quadrados:** chame funções definidas por você e faça contas em notação prefixa
- **Nome do Robô:** trabalhe com aleatoriedade, átomos e dados estruturados
- **Colchetes Correspondentes:** use recursão para validar uma string

Esses exercícios e os dos meses anteriores estão todos na página #12in23.

## Visão geral

Então, linguagens baseadas em Lisp. Acho que devemos começar entendendo um pouco sobre o Lisp. Vamos começar com uma pequena introdução ao Lisp em geral.

### Lisp
- A primeira coisa a observar é que o Lisp é uma das linguagens mais antigas.
- Foi criado por John McCarthy no MIT, em 1958, na época em que os computadores ainda ocupavam salas inteiras, de cima a baixo 🙂
- O nome Lisp vem de LISt Processing (ou LISt Processor), o que mostra a importância da lista como estrutura de dados.
- Foi projetado com o propósito de fazer pesquisa em IA.
- O Lisp foi baseado no cálculo lambda, inventado por Alonzo Church, um sistema formal para descrever computação na matemática (de forma simplificada).

- É uma linguagem incrivelmente influente, por vários motivos:
- É a segunda linguagem de programação de alto nível mais antiga ainda em uso comum (depois do Fortran)
- Foi a primeira linguagem de programação funcional de alto nível e introduziu muitas das características que hoje associamos à programação funcional.
- Repare que o Lisp também dava suporte à programação imperativa
- Foi a primeiríssima linguagem a ter um coletor de lixo, o que livrava quem escrevia o código de fazer o gerenciamento de memória na mão
- Sua sintaxe comparativamente pequena e sua semântica relativamente simples a tornam ótima para fins educacionais.
- Por isso, o Lisp (ou melhor: um de seus dialetos) é muito usado para ensinar programação
- Ele gerou (e continua gerando!) um grande número de dialetos (e vamos falar daqueles que têm suporte no Exercism).
- Em outras palavras, na árvore das linguagens de programação existe um ramo separado para as linguagens do tipo Lisp (assim como existe um ramo para as linguagens do tipo C).

Quando conversei recentemente com Simon Peyton Jones, um dos criadores do Haskell, ele falou sobre a diferença entre as linguagens construídas em torno das máquinas de Turing e as construídas em torno do cálculo lambda. Vale a pena conferir essa entrevista se você quiser saber mais sobre isso.

### Parênteses

Existem muitos parênteses nos Lisps, mas isso não é necessariamente ruim (assim como ter muitas chaves não é necessariamente ruim nas linguagens do tipo C).
Os Lisps são baseados em algo chamado: S-expressions.
Uma S-expression (abreviação de expressão simbólica, encurtada para sexpr ou sexp, daí o nome do desafio deste mês) é uma expressão para representar dados. Elas foram inventadas e popularizadas pela Lisp original.
Uma S-expression pode ter uma de duas formas:

- Um átomo (por exemplo, 'x'). Pense neles como "valores" não aninhados ou as folhas da árvore
- Uma expressão x . y, em que x e y são S-expressions. Pense nelas como pares, em que y pode ser o próximo elemento da lista (se houver) ou um nó da árvore. Repare que essa é uma definição recursiva, que termina no nível das folhas. Normalmente, usamos parênteses para esse tipo de S-expression.


### S-expressions
As S-expressions são usadas para representar tanto dados quanto listas no Lisp.
Por isso, toda vez que você define uma lista, usa parênteses.
Juntando isso ao fato de que:
a lista é a estrutura de dados central do Lisp (daí o nome),
em alguns Lisps ela é a única estrutura de dados,
você acaba com um monte de parênteses.
Para mostrar o quanto as listas são centrais: se você quer chamar uma função em Lisp, você faz isso criando uma lista.

Curiosamente, o primeiro elemento da lista (a cabeça) representa a função que está sendo chamada, e os outros elementos (a cauda) são passados como argumentos.
Isso é conhecido como notação prefixa (em que o operador vem antes dos operandos), o que pode parecer meio estranho no começo, mas na verdade é muito útil:
- Você pode aplicar um operador a vários argumentos sem precisar repetir o operador (por exemplo, `(+ 1 2 3)`)
- A precedência de operadores fica explícita, já que você precisa definir uma nova S-expression para chamar outro operador de qualquer forma

Curiosamente, as listas são usadas até para representar o código-fonte, mas voltaremos a isso mais adiante.

Em geral, a maioria dos Lisps tem uma sintaxe bem minimalista e uma semântica relativamente simples, o que as torna relativamente fáceis de aprender, e entender o código também fica mais fácil.
Essa sintaxe minimalista não as torna menos poderosas!
Combinar essas duas coisas (sintaxe minimalista + semântica simples) torna os Lisps ideais para escrever compiladores e intérpretes.
Se algum dia você quiser construir seu próprio compilador, construir um Lisp é uma boa opção!

### Recursos legais do Lisp

Como mencionamos antes, os Lisps usam os mesmos tipos e as mesmas estruturas de dados internamente para representar o código.
Essa propriedade se chama homoiconicidade (ou homoicônico).
Em outras palavras, uma linguagem é homoicônica se um programa escrito nela pode ser manipulado como dados usando a própria linguagem e, assim, dá para inferir a representação interna do programa só de ler o programa.
Essa propriedade costuma ser resumida dizendo que a linguagem trata código como dados.

## As linguagens

### Scheme
- Criada na década de 1970 por Guy Steele e Gerald Sussman, no laboratório de IA do MIT.
- Começou como uma tentativa de entender o modelo de atores de Carl Hewitt por meio de um pequeno intérprete de Lisp.
- A linguagem em si foi apresentada em uma série de AI Memos de pesquisa, que juntos ficaram conhecidos como os Lambda Papers.
- Primeiro dialeto de Lisp a usar escopo lexical (os valores só existem no escopo em que são definidos) e uma das primeiras linguagens a dar suporte a continuações de primeira classe.
- Padrão oficial do IEEE e um padrão de fato chamado Revised Report on the Algorithmic Language Scheme (RnRS).
- Muitas implementações: ChezScheme, Guile (as duas com suporte no Exercism), MIT/GNU Scheme e Racket
- Linguagem bem minimalista, com pouca sintaxe, mas isso não foi intencional.
- Os autores tentaram construir algo complicado, mas acabaram projetando algo bem mais simples do que pretendiam
- Recursão de cauda de verdade. A forma idiomática de fazer iteração é por meio de recursão.
- O Scheme otimiza chamadas recursivas de cauda para não consumir espaço na pilha nem outros recursos. Isso significa que a recursão pode ser usada com dados arbitrariamente grandes ou para um cálculo arbitrariamente longo
- Tipos numéricos poderosos, incluindo números racionais e complexos
- Avaliação adiada, que é parecido com promises.
- Sistema de macros poderoso.
- Macros higiênicas reduzem a chance de resultados inesperados ao definir macros.

### Common Lisp
- O trabalho no Common Lisp começou em 1981, depois de uma iniciativa de Bob Engelmore, gerente da ARPA, para desenvolver um único dialeto de Lisp que fosse padrão da comunidade, porque os vários dialetos em uso eram muitas vezes incompatíveis, o que significava que código e conhecimento não podiam ser compartilhados
- O primeiro padrão foi publicado em 1984 e o definitivo, em 1994 (uma especificação muito estável)
- Por ser um padrão, existem implementações diferentes dele, como o Steel Bank Common Lisp (que é o padrão do Exercism) e o CLisp.
- Há também implementações comerciais, como o Allegro CL e o LispWorks, além do ECL (Embeddable Common Lisp), que pode ser embutido em programas em C, e do ABCL, que roda na Máquina Virtual Java.
- Definido por um Padrão (ANSI INCITS 226-1994), então código escrito há 30 anos ainda roda sem problemas hoje
- Sistema de tipos rico e extensível
- Projetado para desenvolvimento com imagem e REPL, então é muito introspectável.

### Emacs Lisp
- Desenvolvido em 1985 com o propósito de ter uma linguagem eficiente para estender um editor de texto
- Tipagem dinâmica
- Cerca de 80% do Emacs é escrito em Emacs Lisp (20% em C, por questões de desempenho)
- Um pouco diferente dos outros Lisps:
- Não é padronizado e ainda evolui devagar
- Sem eliminação automática de chamadas de cauda; há suporte por meio da macro named-let (que se transforma em um laço while)
- Escopo dinâmico por padrão; recomenda-se escopo lexical para código novo
- Boa documentação dentro do editor
- Multiplataforma (roda em qualquer lugar onde o Emacs roda)
- Dá para aprender a linguagem lendo o código das funcionalidades que você usa todo dia (núcleo do Emacs + pacotes)
- Subconjunto do Common Lisp disponível por meio do pacote cl-lib. Enquanto o Emacs Lisp é bem minimalista, o Common Lisp tem muito mais recursos. O pacote cl-lib disponibiliza um subconjunto do CL

### Racket
- Matthias Felleisen fundou a PLT Inc., que em janeiro de 1995 decidiu desenvolver um ambiente de programação pedagógico baseado no Scheme. Originalmente chamado PLT Scheme, depois foi renomeado para Racket.
- Além de ser um ambiente de programação pedagógico, foi projetado como uma plataforma para projetar e implementar linguagens de programação.
- LISP moderno, descendente do Scheme
- Dá suporte a programação lógica!
- Sintaxe simples e expressiva, ideal para quem está começando e poderosa nas mãos de especialistas
- Dá suporte a vários paradigmas de programação: programação funcional, orientação a objetos, design by contract, programação lógica, metaprogramação
- Uma biblioteca padrão abrangente
- Vem com o DrRacket, uma IDE completa projetada para aprender e explorar com o mínimo de complicação
- Documentação excelente, com bastante informação de contexto e exemplos

### Clojure
- Desenvolvido por Rich Hickey com o objetivo de ter um LISP moderno que roda na JVM e com ótima concorrência
- É um dialeto de LISP, mas também um pouco diferente dos outros LISPs: não dá suporte a recursão de cauda implícita (não se preocupe se você não sabe o que é isso) e tem mais estruturas de dados além de listas: mapas, conjuntos e vetores. Todas essas estruturas têm sua própria sintaxe literal.
- Elas também são todas imutáveis, mas ainda têm ótimo desempenho, com busca em O(log32 n), que é "efetivamente" tempo constante
- Polimorfismo em tempo de execução por meio de multimétodos e protocolos
- Ótima interoperabilidade com a JVM
- O sistema de especificação de dados Clojure Spec (em tempo de execução, não em tempo de compilação) permite definir a estrutura dos dados, gerar dados, fazer testes baseados em propriedades e mais

## Casos de uso

### Scheme
- Usada na educação para ajudar a ensinar ciência da computação (o influente Structure and Interpretation of Computer Programs usa Scheme).
- Usada em IA. Usada como linguagem de script, por exemplo no GIMP (editor de imagens), em ferramentas de CAD (Computer Aided Design) e até em filmes, com os scripts de gerenciamento do motor de renderização de Final Fantasy: The Spirit Within

### Common Lisp
- O Common Lisp é usado em muitos lugares, por exemplo em inteligência artificial e pesquisa, mas também em aplicações comerciais: a NASA escreveu em Common Lisp o software de piloto automático da nave Deep Space One, o Viaweb foi escrito em Common Lisp, depois comprado pelo Yahoo e rebatizado como Yahoo Store!, e a primeira versão do Reddit

### Emacs Lisp
- O Emacs Lisp é usado no... bem, no Emacs!
- No fundo, o Emacs é um intérprete de Emacs Lisp, um dialeto da linguagem Lisp, mas com extensões adicionais para dar suporte à edição de texto

### Racket
- Usada na educação, já que o Racket foi projetado com ênfase em dar suporte à criação, à simplificação e à análise de linguagens.
- Usada em pesquisa, porque sua sintaxe e sua semântica extensíveis a tornam adequada para projetar e prototipar novas linguagens e novos recursos de linguagem.
- Usada em jogos, por exemplo por John Carmack (famoso pelo Doom) em um ambiente de script interativo para VR, e a desenvolvedora Naughty Dog a usou para scripting (por exemplo, em Uncharted). O Hacker News é escrito em Arc, que também é um Lisp e que por sua vez é escrito em Racket.

### Clojure
- O Clojure é usado para muitas coisas diferentes, incluindo a aquisição da Atomist pela Docker em 2022, uma plataforma de segurança e automação de contêineres implementada em Clojure.
- O maior usuário de Clojure do mundo é o Nubank, um banco novo, que fez essa aquisição há alguns anos e hoje emprega o time principal do Clojure.
- É muito usado para prototipagem rápida, por ser dinâmico e altamente interativo.

## Perspectiva de programação
Todas as linguagens dão suporte aos paradigmas funcional, imperativo e simbólico.
Algumas delas também dão suporte a POO, com destaque para o Common Lisp.

Os Lisps são, em sua maioria, linguagens dinâmicas, embora o Racket dê suporte a tipagem estática.

Isso não quer dizer que todas sejam interpretadas, pois há uma mistura de opções: interpretadas (sem nenhuma etapa de compilação), compiladas para bytecode e depois interpretadas, e compiladas direto para código de máquina.

### Scheme
- Minimalista, com semântica clara e simples e poucas formas diferentes de montar expressões.
- Isso facilita aprender a linguagem e entender o código.
- Por isso, o Scheme também é muito usado em muitos cursos introdutórios de Ciência da Computação
- Continuações de primeira classe.
- Uma continuação é uma representação do estado de um programa.
- As continuações podem ser usadas para modelar fluxo de controle (por exemplo, uma construção `return`) ou corrotinas (que permitem multitarefa)

### Common Lisp
- Sistema Orientado a Objetos extensível, com combinações de métodos programáveis (tanto na forma como métodos de subclasses e superclasses são combinados quanto em métodos before, after e around, que permitem estender sistemas sem modificá-los)
- Sistema de condições programável (um superconjunto das "exceções"), que permite desacoplar o reconhecimento das condições da escolha de como tratá-las. O sistema de condições é mais flexível que os sistemas de exceções porque, em vez de dividir o código em duas partes (a que sinaliza um erro e a que o trata), ele divide as responsabilidades em três partes: sinalizar uma condição, tratá-la e reiniciar.
- As macros permitem estender a sintaxe da linguagem, e não apenas gerar código repetitivo. Isso ajuda a construir uma linguagem que se encaixe no domínio, e não o contrário.

### Emacs Lisp
- Ótimo suporte e integração com o editor
- Pode ser usada para personalizar o Emacs enquanto ele está rodando ("como fazer cirurgia no próprio cérebro" :))
- Pode ser usada em modo batch, no qual todos os recursos do editor para processar texto ficam à sua disposição (como buffers e comandos de movimento)

### Racket
- Sistema de macros poderoso. Recursos de açúcar sintático, como as threading macros, são construídos sobre ele. As macros também são higiênicas, o que responde a uma pergunta simples: uma macro gera código que é depositado em outro lugar. Quando esse código é avaliado, como determinamos as ligações dos identificadores dentro dele? Macros higiênicas reduzem a chance de resultados inesperados ao definir macros.
- Orientada a linguagens.
- O Racket vem com as ferramentas para você escrever sua própria linguagem de programação ou DSL, construídas sobre as macros do Racket.
- Várias linguagens embutidas, como o typed Racket (com anotações de tipo verificadas estaticamente), o datalog (uma linguagem parecida com Prolog), com suporte na IDE DrRacket, e o scribble, uma ferramenta para criar documentos em prosa em HTML ou PDF
- O REPL é parte central do fluxo de trabalho de desenvolvimento, e não só para testar coisas ou consultar a documentação

### Clojure
- Sistema de macros poderoso.
- Recursos de açúcar sintático, como as threading macros, são construídos sobre ele
- O REPL é parte central do fluxo de trabalho de desenvolvimento, e não só para testar coisas ou consultar a documentação

## Qual experimentar

- Se você nunca experimentou um Lisp, Scheme e Racket são ótimas opções, porque as duas têm uma sintaxe bem minimalista.
- Dito isso, Common Lisp e Clojure têm o Modo de Aprendizagem, então provavelmente são as melhores para aprender no Exercism.
- Se você já usa o Emacs, o Emacs Lisp é uma escolha natural.
- Da mesma forma, se você usa alguma linguagem da JVM, o Clojure é uma opção natural.
- Emacs Lisp (com o Emacs), Clojure (com o IntelliJ) e Racket (com o DrRacket) têm todos um excelente suporte de IDE.
- Também existem boas IDEs para Common Lisp e Scheme, claro.
- Se você quer um Lisp realmente cheio de recursos, Common Lisp, Clojure e Racket são bem completos
- Se você quer um Lisp um pouco diferente, o Clojure tem uma sintaxe bem peculiar para um Lisp.
- Se você se interessa por macros e metaprogramação, basicamente todas são boas opções! Mas se você quer construir novas linguagens, o Racket em especial é ótimo

Claro, se você tiver tempo, recomendo experimentar algumas!
E não tenha medo dos parênteses! Eu sei que eu tinha, e foi por isso que adiei aprender Lisp por bastante tempo.
Você vai se acostumar rápido com eles e talvez até passe a gostar deles, como aconteceu comigo.
Na verdade, hoje eu adoro as linguagens Lisp: sintaxe minimalista, semântica fácil e, ao mesmo tempo, muito expressivas.

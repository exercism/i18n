# Outubro Orientado a Objetos

## Introdução

Olá a todos. Espero que estejam bem. Tivemos um mês bastante ocupado em setembro. Lançámos imensas melhorias e funcionalidades novas no site, sobretudo em torno da melhoria da mentoria e dos fluxos associados. Como resultado, estamos agora a receber o dobro dos pedidos de mentoria do que há 4 semanas, o que é ótimo. Se ainda não experimentaste ter o teu código revisto por um mentor, fá-lo sem dúvida: é uma forma fantástica de aprender. E se estás a pensar ajudar os outros, há imensos pedidos nas filas à espera da tua ajuda. Podes inscrever-te como mentor através do link Mentoring no menu Contribute! Fizemos também uma grande atualização da base de dados, do MySQL 5.6 para o MySQL 8, que eu gravei e que está disponível na secção Insiders. Por isso, se és Insider e ainda não viste, não deixes de ver!

Muito bem, passemos ao #12in23. Setembro foi um mês interessante, a explorar linguagens concisas e sucintas. Este mês vamos no sentido oposto e vamos olhar para umas feras bem maiores. Vamos focar-nos nas linguagens orientadas a objetos e, em concreto, em C#, Crystal, Java, Pharo, Ruby e PowerShell. Já falámos do Pharo e do Java, em maio e agosto, respetivamente, por isso não os vamos abordar novamente neste vídeo. Mas não deixes de ver os vídeos dos meses anteriores se tiveres interesse nas introduções a essas linguagens. Mas, neste vídeo, vamos explorar C#, Crystal, Ruby e PowerShell e, como habitualmente, o Erik vai falar-nos sobre o que torna estas linguagens interessantes e únicas.

## Os emblemas

Como sempre, podes ganhar o emblema de Outubro Orientado a Objetos completando 5 exercícios, quaisquer que sejam, nestas linguagens. Temos também o emblema anual, que sei que muitos de vocês estão a tentar alcançar. Para isso, temos 5 exercícios em destaque para completares, todos eles propícios a serem resolvidos de uma forma mais orientada a objetos. São estes:

- **Árvore de Pesquisa Binária**: inserir e procurar números numa árvore binária
- **Buffer Circular**: implementar uma estrutura de dados ligada de ponta a ponta
- **Relógio**: implementar um relógio que lida com horas sem datas
- **Matriz**: devolver as linhas e as colunas de uma matriz representada como string
- **Cifra Simples**: implementar uma cifra de substituição

## Visões gerais

### C#
- Desenvolvida por Anders Hejlsberg na Microsoft, em 2000
- A linguagem e a máquina virtual têm especificações oficiais. Tornou-se norma oficial ECMA em 2002 e norma ISO em 2003
- O compilador, o .NET Framework (biblioteca padrão) e o Visual Studio (editor) eram todos de código fechado inicialmente, mas o compilador e o .NET Framework passaram a código aberto em 2014
- Apesar de partilhar muita sintaxe com o Java (que tinha sido lançado uns anos antes), o C# não era uma cópia exata do Java (por exemplo, suporte para propriedades e tipos de valor, e ausência de exceções verificadas)
- Compila para bytecode, com compilação para código de máquina suportada desde o .NET 7 (ainda em melhoria)
- Usado em imensos programas, desde sites a sistemas embebidos, e desde aplicações (Xamarin) a jogos (Unity)

### Crystal
- O Crystal foi desenvolvido por Ary Borenszweig (que tem conta no Exercism), Juan Wajnerman e Brian Cardiff (originalmente chamado Joy, mas renomeado para Crystal 3 dias depois :))
- Foi concebido para ter a elegância e a produtividade do Ruby, mas com a velocidade, a eficiência e a segurança de tipos de uma linguagem compilada moderna.
- Linguagem de código aberto desenvolvida pela organização Manas.
- A versão 1.0 foi lançada em 2021.
- Compila para código de máquina usando o LLVM (tal como o Rust)
- O compilador foi inicialmente escrito em Ruby, mas mais tarde converteu-se numa versão que se compila a si própria
- É usado pela empresa de camiões Nikola, pela Manas e por outros, sobretudo em sites, mas também em serviços na nuvem, aplicações de linha de comandos e scripts

### PowerShell
- Criado por uma equipa liderada por Jeffrey Snover na Microsoft e lançado originalmente em 2006.
- O desenvolvimento foi desencadeado pela Intel, que queria mudar os seus scripts KornShell do Sun RISC para outra plataforma, para ajudar no desenvolvimento dos seus processadores. No fim, a Intel escolheu uma plataforma diferente, mas a Microsoft continuou a trabalhar no seu novo shell: o PowerShell, já que oferecia a possibilidade de melhorar a administração de sistemas Windows (que na altura não era particularmente boa, exigindo muitas vezes interfaces gráficas)
- A sintaxe foi inspirada no KornShell, mas também no PHP, no Perl e noutros.
- A primeira versão só corria no .NET Framework, o que significa que só corria no Windows. Mas o PowerShell 6.0 (lançado em 2018) corria no .NET Core, que é multiplataforma e de código aberto.
- É usado sobretudo para administração de sistemas, mas também para fornecer utilitários de linha de comandos ou wrappers em torno de outras ferramentas. Já o usámos imenso para trabalhar em massa com repositórios do Exercism

### Ruby
- Desenvolvido por Yukihiro Matsumoto (também conhecido como Matz) e lançado pela primeira vez em 1995
- O Matz queria trabalhar com uma verdadeira linguagem de script orientada a objetos, mas não gostava das opções existentes (como o Perl e o Python), por isso criou uma nova linguagem: o Ruby
- O Matz descreve o Ruby como uma linguagem Lisp simples no seu núcleo, com um sistema de objetos semelhante ao do Smalltalk, blocos inspirados em funções de ordem superior e uma utilidade prática como a do Perl.
- Normalmente é interpretado, mas também pode ser compilado just-in-time para código de máquina
- Além do intérprete oficial, existem implementações alternativas, como o JRuby (corre na JVM), o Rubinius (usa o LLVM) e o YJIT, um compilador just-in-time que é incluído no pacote de instalação oficial
- É usado sobretudo em sites (com o Ruby on Rails), por exemplo no GitHub, no Stripe, no Shopify e em muitos mais (incluindo no Exercism e no fórum do Exercism!). O Ruby também é usado para fins de automatização

## E, do ponto de vista da programação, em que diferem?

São todas linguagens orientadas a objetos, embora não implementem isso todas da mesma forma (por exemplo, o Crystal e o Ruby usam o modelo de envio de mensagens do Smalltalk para invocar métodos).

### C#
- Tipagem forte e estática
- Também suporta os paradigmas imperativo e declarativo, e está a tornar-se cada vez mais funcional

### Crystal
- Tipagem forte e estática (ao contrário do Ruby)
- Também suporta programação funcional e imperativa

### PowerShell
- Tipagem forte
- Também suporta programação imperativa e funcional, e programação baseada em pipelines.

### Ruby
- Tipagem dinâmica
- Também suporta programação funcional e imperativa

Dito isto, todas estas linguagens são, acima de tudo, linguagens orientadas a objetos.

## O que torna estas linguagens fantásticas?

### C#
- Corre em (quase) todo o lado, incluindo aplicações via Xamarin. Originalmente só corria no Windows, o que deu origem ao Mono, uma implementação gratuita e de código aberto de um compilador e runtime de C# que era multiplataforma. Em 2015, foi introduzido o .NET Core, que era totalmente multiplataforma e de código aberto.
- De uso geral: pode ser usado para quase qualquer tipo de carga de trabalho, incluindo aplicações, sites e jogos
- Expressivo: consegues fazer muito com relativamente pouco código C#. O LINQ, em especial, é um enorme impulso de produtividade e é muito divertido de usar
- Excelentes ferramentas, tanto para IDEs como para outras ferramentas, como sistemas de build. Enquanto o Visual Studio é só para Windows, o JetBrains Rider e o VS Code são multiplataforma
- A Plataforma de Compilador .NET (habitualmente designada por Roslyn) é uma forma fantástica de analisar, transformar e gerar código C# (usamo-la intensivamente no test runner, no analyzer e no representer do C#)
- A documentação é extensa, detalhada e bem escrita
- Comunidade grande: há muitos recursos disponíveis, incluindo blogs, fóruns e muito mais

### Crystal
- Sintaxe elegante e legível, o que torna o código Crystal fácil de ler e escrever
- Expressivo. Tal como o Ruby, o Crystal é muito expressivo, permitindo fazer muito com pouco código. Isto deve-se, em parte, à excelente e extensa biblioteca padrão.
- Rápido. A tipagem estática permite compilar para código de máquina eficiente usando o LLVM, com uma gestão de memória simples através de um coletor de lixo.
- Excelente implementação orientada a objetos. Tudo é um objeto, incluindo classes e tipos primitivos, como números e Boolean
- Vem com tudo incluído, uma biblioteca padrão grande, um formatador incorporado, um motor de templates, um framework de testes e muito mais
- Interoperabilidade. Fácil interoperabilidade com bibliotecas C
- Multiplataforma: corre em Linux, macOS e Windows, embora o Windows ainda não seja um cidadão de primeira classe

### PowerShell
- Poderoso: o PowerShell é uma ferramenta poderosa para administradores. Integra-se bem com muitos outros sistemas, como o sistema operativo Windows (componentes, serviços e definições), outros produtos Microsoft como o Exchange, o SharePoint, o Azure, etc. Também consegue interagir com muitas outras tecnologias, como APIs REST, bases de dados, serviços web e muito mais.
- Disponibilidade: o PowerShell vem pré-instalado em todos os sistemas operativos Windows modernos e pode ser instalado em qualquer sistema que corra .NET (o que inclui macOS, Linux e muitos sistemas Unix)
- Segurança: o PowerShell inclui funcionalidades para proteger scripts e restringir a sua execução com base em scripts assinados e políticas de execução. Isto é crucial para garantir a segurança dos teus processos de automatização.
- Interface gráfica: podes combiná-lo com outros frameworks, como o Windows Forms ou o Windows Presentation Foundation, para conceber e construir interfaces gráficas para os teus scripts PowerShell, tornando-os mais fáceis de usar.
- Pipeline: tal como o Bash nos sistemas Unix, o PowerShell permite encadear cmdlets para realizar operações e tarefas complexas, passando a saída de um cmdlet como valor de entrada de outro

### Ruby
- Sintaxe elegante e legível, o que torna o código Ruby fácil de ler e escrever
- Expressivo. O Ruby é uma linguagem muito expressiva, permitindo fazer muito com pouco código. Isto deve-se, em parte, à excelente e extensa biblioteca padrão.
- Ecossistema enorme, com um número massivo de bibliotecas disponíveis (gems)
- Excelente implementação orientada a objetos. Tudo é um objeto, incluindo classes e tipos primitivos, como números e Boolean.
- Pragmático. O Ruby e a maioria das suas bibliotecas são muito pragmáticos, focando-se em resolver problemas do mundo real.
- Interoperabilidade. Fácil interoperabilidade com bibliotecas C, algo frequentemente usado quando o desempenho é particularmente importante. Por exemplo, a gem Nokogiri permite trabalhar com XML de forma muito eficiente, envolvendo bibliotecas C para fazer o trabalho pesado
- Está a acontecer muita inovação. Por exemplo, a Stripe criou o Sorbet, um verificador de tipos para Ruby; a Shopify desenvolveu o YJIT, um compilador just-in-time para Ruby (incluído no Ruby 3.1+) e está a trabalhar-se no suporte a WASM

## Funcionalidades de destaque

### C#
- Ótimo desempenho, especialmente para uma linguagem gerida. Tanto a linguagem como o runtime têm imensas funcionalidades para melhorar o desempenho, por exemplo o tipo Span<T> e o acesso a instruções intrínsecas da CPU (como as instruções AVX). O CLR é uma máquina virtual madura, estável e de elevado desempenho, que está continuamente a ser melhorada
- Ecossistema enorme, com um número massivo de bibliotecas disponíveis. Essas bibliotecas são, tal como o C#, maduras, estáveis e completas
- Moderna e em evolução: a linguagem e o runtime continuam a evoluir, com atualizações muito regulares à linguagem para a tornar mais moderna. Alguns exemplos:
- async/await para concorrência fácil
- span<T> para uma utilização eficiente da memória
- Tipos de referência anuláveis (a correção do erro de mil milhões de dólares)
- O runtime também é atualizado regularmente, por exemplo o .NET AOT para compilar diretamente para código de máquina
- Menos alternativas do que muitas outras linguagens/ecossistemas. Para a maioria dos casos, podes usar as soluções predefinidas fornecidas pela Microsoft, que muitas vezes incluem também a IDE. Pode-se argumentar que isto também é uma desvantagem, mas pode ser ótimo, especialmente quando se está a começar com uma linguagem

### Crystal
- O melhor dos dois mundos. A combinação de inferência de tipos global e tipos união faz com que o Crystal pareça uma linguagem de tipagem dinâmica, com pouca necessidade de especificar tipos, mas mantendo o desempenho e as garantias de segurança adicionais (incluindo a verificação de nil em tempo de compilação) de uma linguagem de tipagem estática
- Metaprogramação. Em vez da metaprogramação dinâmica do Ruby, em tempo de execução, o Crystal tem macros, que correm em tempo de compilação. As macros operam sobre nós da AST e produzem código. São bastante fáceis de definir e usar. O Embedded Crystal (ECR) é um motor de templates incorporado que usa macros para incorporar código Crystal noutro texto
- Excelente concorrência. A concorrência é fácil de usar com um modelo de concorrência à Go que usa fibers (unidade de execução leve) que comunicam através de canais
- Produtivo e divertido. O Ruby é famoso por ter sido concebido para a produtividade e a felicidade dos programadores, com uma sintaxe elegante e legível e uma ótima ergonomia. Como a sintaxe e o design do Crystal são muito semelhantes aos do Ruby, isto também se aplica ao Crystal (curiosidade: bastante código Ruby é código Crystal válido).

### PowerShell

- Cmdlets: o PowerShell usa cmdlets (pronunciado "command-lets") como os seus blocos de construção. São comandos pequenos e orientados a tarefas que envolvem funcionalidades existentes, oferecendo uma interface consistente (por exemplo, Get-Help para mostrar a ajuda de qualquer cmdlet) e amiga do administrador. Há cmdlets para uma grande variedade de "backends", como todas as classes .NET, o Windows Management Instrumentation, o Azure e muitos mais. Os cmdlets podem ser definidos em qualquer linguagem .NET e são definidos de forma muito declarativa, com parâmetros, a sua validação, requisitos (required true/false), nomes alternativos (switch), etc., facilmente definidos.
- Orientado a objetos: quase tudo no PowerShell é um objeto com muitas propriedades diferentes. Ficheiros, processos, chaves de registo e até tipos de dados simples como string e número são todos tratados como objetos; esta abordagem simplifica a forma como trabalhas e interages com diferentes tipos de dados e serviços. Será muito familiar para quem já trabalhou com .NET
- Gestão remota: suporta a gestão remota de servidores e sistemas Windows e até de recursos na nuvem em Azure, AWS e GCP, o que é essencial para gerir automatizações e colocações em produção em grande escala.
- Extensível: tem um excelente sistema de módulos incorporado, além de permitir criar cmdlets, funções e módulos personalizados e trabalhar com outras linguagens e bibliotecas de programação para ampliar ainda mais as suas capacidades, conforme necessário.

### Ruby

- Produtivo e divertido. O Ruby é famoso por ter sido concebido para a produtividade e a felicidade dos programadores. Embora seja difícil de quantificar, o entusiasmo de quem já usou Ruby fala por si
- Metaprogramação. O Ruby é altamente dinâmico e permite metaprogramação em tempo de execução. Quer se trate de fazer monkey-patching a classes existentes, ou de adicionar ou chamar métodos dinamicamente, o Ruby tem a solução
- O Ruby on Rails é um framework fantástico e completo para construir sites. De fábrica, inclui templates, caching, ActiveRecord (uma forma de interagir com uma base de dados através de objetos), migrações, scaffolding, WebSockets e muito mais.

## Qual escolher

- Se estás familiarizado com a programação orientada a objetos, mas queres ver uma abordagem diferente, experimenta o Pharo
- Se sabes Java ou C#, mas já não lhes tocas há algum tempo, dá-lhes outra oportunidade. Ambas as linguagens evoluíram muito, por isso experimenta algumas dessas novas funcionalidades brilhantes!
- O C# e o Java (e o Ruby, em menor grau) também são ótimas opções se procuras trabalho, pois estão entre as linguagens mais procuradas pelas empresas
- Se sabes Ruby, experimenta o Crystal para ver como seria um Ruby de tipagem estática
- Se gostas de linguagens dinâmicas, mas queres também um ótimo desempenho, dá uma olhadela ao Crystal
- Se conheces o Bash ou os ficheiros batch do Windows, experimenta o PowerShell para uma abordagem diferente e orientada a objetos à escrita de scripts de shell
- Se gostas de linguagens de scripting em geral, o Ruby, o Crystal e o PowerShell são boas opções
- O Pharo, o Crystal e o Ruby são ótimos se quiseres fazer alguma metaprogramação (o C# também está a ganhar algumas funcionalidades de metaprogramação)
- Se queres experimentar como é programar numa linguagem que não é suportada por ficheiros de texto, experimenta o Pharo e o seu IDE único e poderoso
- Se gostas de construir sites, vale a pena experimentar o Ruby com o seu framework Ruby on Rails

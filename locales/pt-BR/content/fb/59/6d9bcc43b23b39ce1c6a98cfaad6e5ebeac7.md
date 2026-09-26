# Outubro Orientado a Objetos

## Introdução

Olá, pessoal. Espero que vocês estejam bem. Tivemos um mês agitado em setembro. Lançamos várias melhorias e recursos novos no site, principalmente em torno de melhorar a mentoria e os fluxos relacionados a ela. Como resultado, agora recebemos o dobro de pedidos de mentoria em comparação com quatro semanas atrás, o que é ótimo. Se você ainda não experimentou ter seu código revisado por um mentor, faça isso sem pensar duas vezes: é uma forma incrível de aprender. E se você quer ajudar outras pessoas, há muitos pedidos nas filas esperando pela sua ajuda. Você pode se inscrever como mentor no link Mentoria do menu Contribuir! Também fizemos uma grande atualização do banco de dados, do MySQL 5.6 para o MySQL 8. Eu gravei um vídeo sobre isso e ele está disponível na seção Insiders, então, se você é Insider e ainda não assistiu, dá uma olhada!

Bem, vamos ao #12in23. Setembro foi um mês interessante, explorando linguagens concisas e enxutas. Este mês seguimos o caminho oposto e olhamos para feras bem maiores. Estamos focando em linguagens orientadas a objetos, mais especificamente C#, Crystal, Java, Pharo, Ruby e PowerShell. Já falamos de Pharo e Java (em maio e agosto, respectivamente), então não vamos repetir esses dois neste vídeo, mas dá uma olhada nos vídeos dos meses anteriores se você quiser conhecer essas linguagens. Mas neste vídeo vamos explorar C#, Crystal, Ruby e PowerShell e, como sempre, o Erik vai nos contar o que torna essas linguagens interessantes e únicas.

## As medalhas

Como sempre, você pode ganhar a medalha Outubro Orientado a Objetos completando 5 exercícios quaisquer nessas linguagens. Também temos a medalha Anual, que sei que muitos de vocês estão buscando. Para ela, temos 5 exercícios em destaque para você completar, e todos eles se dão bem com uma abordagem de orientação a objetos. São eles:

- **Árvore Binária de Busca**: insira e busque números em uma árvore binária
- **Buffer Circular**: implemente uma estrutura de dados conectada de ponta a ponta
- **Relógio**: implemente um relógio que lida com horários sem datas
- **Matriz**: retorne as linhas e as colunas de uma matriz representada como uma string
- **Cifra Simples**: implemente uma cifra de substituição

## Visões gerais

### C#
- Desenvolvida por Anders Hejlsberg na Microsoft em 2000
- A linguagem e a máquina virtual têm especificações oficiais. Tornaram-se um padrão oficial da ECMA em 2002 e um padrão ISO em 2003
- O compilador, o .NET Framework (biblioteca padrão) e o Visual Studio (editor) eram todos de código fechado no início, mas o compilador e o .NET Framework tiveram seu código aberto em 2014
- Embora compartilhe muita sintaxe com Java (lançada alguns anos antes), o C# não foi uma cópia idêntica do Java (por exemplo: suporte a propriedades, tipos de valor e ausência de exceções verificadas)
- Compila para bytecode, com suporte à compilação para código de máquina desde o .NET 7 (ainda em melhoria)
- Usado em uma quantidade enorme de softwares, de sites a sistemas embarcados, e de aplicativos (Xamarin) a jogos (Unity)

### Crystal
- O Crystal foi desenvolvido por Ary Borenszweig (que tem uma conta no Exercism), Juan Wajnerman e Brian Cardiff (originalmente chamado de Joy, mas renomeado para Crystal 3 dias depois :))
- Projetado para ter a elegância e a produtividade do Ruby, mas com a velocidade, a eficiência e a segurança de tipos de uma linguagem moderna compilada.
- Linguagem de código aberto desenvolvida pela organização Manas.
- A versão 1.0 foi lançada em 2021.
- Compila para código de máquina usando LLVM (como o Rust)
- O compilador foi escrito inicialmente em Ruby, mas depois foi convertido para uma versão que compila a si mesma
- Usado pela montadora de caminhões Nikola, pela Manas e por outras empresas, principalmente para sites, mas também para serviços em nuvem, aplicações de linha de comando e scripts

### PowerShell
- Criado por uma equipe liderada por Jeffrey Snover na Microsoft e lançado originalmente em 2006.
- O desenvolvimento foi motivado pela Intel, que queria migrar seus scripts KornShell do Sun RISC para outra plataforma, para ajudar no desenvolvimento de suas CPUs. No fim, a Intel escolheu outra plataforma, mas a Microsoft continuou trabalhando em seu novo shell, o PowerShell, já que ele oferecia a possibilidade de melhorar a administração de sistemas Windows (que não era grande coisa na época e muitas vezes exigia interfaces gráficas)
- A sintaxe foi inspirada no KornShell, mas também em PHP, Perl e outros
- A primeira versão rodava apenas no .NET Framework, o que significa que só rodava no Windows. Mas o PowerShell 6.0 (lançado em 2018) rodava no .NET Core, que é multiplataforma e de código aberto.
- Usado principalmente para administração de sistemas, mas também para oferecer utilitários de CLI ou wrappers em torno de outras ferramentas. Usamos muito ele para trabalhar em massa com os repositórios do Exercism

### Ruby
- Desenvolvido por Yukihiro Matsumoto (também conhecido como Matz) e lançado em 1995
- Matz queria trabalhar com uma linguagem de script realmente orientada a objetos, mas não gostava das opções existentes (como Perl e Python), então criou uma nova linguagem: o Ruby
- Matz descreve o Ruby como uma linguagem Lisp simples em sua essência, com um sistema de objetos parecido com o do Smalltalk, blocos inspirados em funções de ordem superior e uma utilidade prática semelhante à do Perl.
- Geralmente interpretado, mas também pode ser compilado just-in-time para código de máquina
- Além do interpretador oficial, existem implementações alternativas, como JRuby (roda na JVM), Rubinius (usa LLVM) e YJIT, um compilador just-in-time que vem incluído no pacote de instalação oficial
- Usado principalmente em sites (com Ruby on Rails), como GitHub, Stripe, Shopify e muitos outros (incluindo o Exercism e o fórum do Exercism!). O Ruby também é usado para automação

## E do ponto de vista da programação, como elas se diferenciam?

Todas elas são linguagens orientadas a objetos, embora nem todas implementem isso da mesma forma (por exemplo, Crystal e Ruby usam o modelo de envio de mensagens do Smalltalk para invocar métodos).

### C#
- Tipagem forte e estática
- Também dá suporte a paradigmas imperativo e declarativo, e está cada vez mais funcional

### Crystal
- Tipagem forte e estática (ao contrário do Ruby)
- Também dá suporte à programação funcional e imperativa

### PowerShell
- Tipagem forte
- Também dá suporte à programação imperativa e funcional, além da programação baseada em pipeline.

### Ruby
- Tipagem dinâmica
- Também dá suporte à programação funcional e imperativa

Dito isso, todas essas linguagens são, antes de tudo, linguagens orientadas a objetos.

## O que faz essas linguagens serem ótimas?

### C#
- Roda em (quase) todo lugar, inclusive em aplicativos via Xamarin. No início rodava apenas no Windows, o que deu origem ao Mono, uma implementação livre e de código aberto de um compilador e runtime de C# que era multiplataforma. Em 2015, surgiu o .NET Core, totalmente multiplataforma e de código aberto.
- Propósito geral: pode ser usada para quase qualquer tipo de trabalho, incluindo aplicativos, sites e jogos
- Expressiva: dá para fazer muita coisa com relativamente pouco código C#. O LINQ, em especial, aumenta muito a produtividade e é muito divertido de usar
- Ferramentas excelentes, tanto para IDEs quanto para outras ferramentas, como sistemas de build. Enquanto o Visual Studio é exclusivo para Windows, o JetBrains Rider e o VS Code são multiplataforma
- A .NET Compiler Platform (conhecida como Roslyn) é uma forma fantástica de analisar, transformar e gerar código C# (usamos ela intensamente no test runner, no analyzer e no representer de C#)
- A documentação é extensa, detalhada e bem escrita
- Comunidade grande: há muitos recursos disponíveis, incluindo blogs, fóruns e mais

### Crystal
- Sintaxe elegante e legível, o que torna o código Crystal fácil de ler e escrever
- Expressivo. Como o Ruby, o Crystal é muito expressivo: dá para fazer muita coisa com pouco código. Isso se deve, em parte, à biblioteca padrão excelente e extensa.
- Rápido. A tipagem estática permite compilar para código de máquina eficiente usando LLVM, com gerenciamento de memória simples por meio de um coletor de lixo.
- Implementação excelente de orientação a objetos. Tudo é um objeto, inclusive classes e tipos primitivos como números e valores Boolean
- Vem com tudo incluído, biblioteca padrão grande, formatador embutido, motor de templates, framework de testes e mais
- Interoperabilidade. Fácil interoperabilidade com bibliotecas em C
- Multiplataforma: roda em Linux, macOS e Windows, embora o Windows ainda não seja tratado como prioridade

### PowerShell
- Poderoso: o PowerShell é uma ferramenta poderosa para administradores. Ele se integra bem a muitos outros sistemas, como o próprio Windows (componentes, serviços e configurações) e outros produtos da Microsoft, como Exchange, SharePoint, Azure etc. Também consegue interagir com muitas outras tecnologias, como APIs REST, bancos de dados, serviços web e mais.
- Disponibilidade: o PowerShell já vem pré-instalado em todo Windows moderno e pode ser instalado em qualquer sistema que rode .NET (o que inclui macOS, Linux e muitos sistemas Unix)
- Segurança: o PowerShell inclui recursos para proteger scripts e restringir sua execução com base em scripts assinados e políticas de execução. Isso é fundamental para garantir a segurança dos seus processos de automação.
- Interface gráfica: você pode combiná-lo com outros frameworks, como Windows Forms ou Windows Presentation Foundation, para projetar e construir interfaces gráficas para seus scripts PowerShell, deixando-os mais amigáveis.
- Pipeline: assim como o Bash em sistemas Unix, o PowerShell permite encadear cmdlets para realizar operações e tarefas complexas, passando a saída de um cmdlet como entrada de outro

### Ruby
- Sintaxe elegante e legível, o que torna o código Ruby fácil de ler e escrever
- Expressivo. O Ruby é uma linguagem muito expressiva: dá para fazer muita coisa com pouco código. Isso se deve, em parte, à biblioteca padrão excelente e extensa
- Ecossistema enorme, com uma quantidade gigantesca de bibliotecas disponíveis (gems)
- Implementação excelente de orientação a objetos. Tudo é um objeto, inclusive classes e tipos primitivos como números e valores Boolean.
- Pragmático. O Ruby e a maioria de suas bibliotecas são muito pragmáticos, com foco em resolver problemas do mundo real.
- Interoperabilidade. Fácil interoperabilidade com bibliotecas em C, algo muito usado quando o desempenho é especialmente importante. Por exemplo, a gem Nokogiri permite trabalhar com XML de forma muito performática, encapsulando bibliotecas em C para fazer o trabalho pesado
- Muita inovação está acontecendo. Por exemplo, a Stripe criou o Sorbet, um verificador de tipos para Ruby, a Shopify desenvolveu o YJIT, um compilador Just-In-Time para Ruby (incluído no Ruby 3.1+) e há trabalho em andamento no suporte a WASM

## Recursos de destaque

### C#
- Ótimo desempenho, especialmente para uma linguagem gerenciada. Tanto a linguagem quanto o runtime têm uma infinidade de recursos para melhorar o desempenho, como o tipo Span<T> e o acesso a intrinsics de CPU (como instruções AVX). O CLR é uma máquina virtual madura, estável e de alto desempenho, que é continuamente aprimorada
- Ecossistema enorme, com uma quantidade gigantesca de bibliotecas disponíveis. Essas bibliotecas são, como o C#, maduras, estáveis e completas
- Moderna e em evolução: a linguagem e o runtime continuam evoluindo, com atualizações muito frequentes para torná-los mais modernos. Alguns exemplos:
- async/await para concorrência fácil
- span<T> para uso eficiente de memória
- Tipos de referência anuláveis (corrigindo o erro de um bilhão de dólares)
- O runtime também é atualizado com frequência, como o .NET AOT para compilar direto para código de máquina
- Menos alternativas do que em muitas outras linguagens/ecossistemas. Para a maioria dos propósitos, dá para usar as soluções padrão fornecidas pela Microsoft, que muitas vezes incluem também a IDE. Também dá para argumentar que isso é uma desvantagem, mas pode ser ótimo, especialmente quando você está começando em uma linguagem

### Crystal
- O melhor dos dois mundos. A combinação de inferência de tipos global e tipos união faz o Crystal parecer uma linguagem de tipagem dinâmica, muitas vezes com pouca necessidade de especificar tipos, mas ainda com o desempenho e as garantias extras de segurança (incluindo a verificação de nil em tempo de compilação) de uma linguagem de tipagem estática
- Metaprogramação. Em vez da metaprogramação dinâmica em tempo de execução do Ruby, o Crystal tem macros, que rodam em tempo de compilação. As macros trabalham com nós da AST e produzem código. Elas são bem fáceis de definir e usar. O Embedded Crystal (ECR) é um motor de templates embutido que usa macros para inserir código Crystal em outros textos
- Ótima concorrência. A concorrência é fácil de usar com um modelo parecido com o do Go, que usa fibers (unidades de execução leves) que se comunicam por canais
- Produtivo e divertido. O Ruby é famoso por ter sido projetado para a produtividade e a felicidade de quem desenvolve, com sintaxe elegante e legível e ótima ergonomia. Como a sintaxe e o design do Crystal são muito parecidos com os do Ruby, isso também vale para o Crystal (curiosidade: boa parte do código Ruby é código Crystal válido).

### PowerShell

- Cmdlets: o PowerShell usa cmdlets (pronuncia-se “command-lets”) como seus blocos de construção. São comandos pequenos e orientados a tarefas que encapsulam funcionalidades existentes, oferecendo uma interface consistente (por exemplo, Get-Help, que mostra a ajuda de qualquer cmdlet) e amigável para administradores de sistemas. Existem cmdlets para uma grande variedade de “backends”, como todas as classes .NET, o Windows Management Instrumentation, o Azure e muito mais. Cmdlets podem ser definidos em qualquer linguagem .NET e são definidos de forma bem declarativa, com parâmetros, sua validação, requisitos (required true/false), nomes alternativos (switch) etc. facilmente definidos.
- Orientado a objetos: quase tudo no PowerShell é um objeto com muitas propriedades diferentes. Arquivos, processos, chaves de registro e até tipos de dados simples, como string e número, são todos tratados como objetos; essa abordagem simplifica a forma como você trabalha e interage com diferentes tipos de dados e serviços. Vai ser muito familiar para quem já trabalhou com .NET
- Gerenciamento remoto: ele dá suporte ao gerenciamento remoto de servidores e sistemas Windows e até de recursos na nuvem no Azure, AWS e GCP, o que é essencial para gerenciar automações e implantações em grande escala.
- Extensível: ele tem um ótimo sistema de módulos embutido, além de permitir criar cmdlets, funções e módulos personalizados e trabalhar com outras linguagens de programação e bibliotecas para ampliar ainda mais seus recursos conforme a necessidade.

### Ruby

- Produtivo e divertido. O Ruby é famoso por ter sido projetado para a produtividade e a felicidade de quem desenvolve. Embora seja difícil quantificar, o entusiasmo de quem já usou Ruby fala por si
- Metaprogramação. O Ruby é altamente dinâmico e permite metaprogramação em tempo de execução. Seja fazendo monkey-patching em classes existentes, seja adicionando ou chamando métodos dinamicamente, o Ruby dá conta do recado
- O Ruby on Rails é um framework fantástico e completo para construir sites. Já de fábrica, ele inclui templates, cache, ActiveRecord (uma forma de interagir com um banco de dados por meio de objetos), migrations, scaffolding, WebSockets e muito mais.

## Qual escolher

- Se você já conhece programação orientada a objetos, mas quer ver uma abordagem diferente, experimente o Pharo
- Se você conhece Java ou C#, mas não mexe com elas há um tempo, dê outra chance. As duas linguagens evoluíram muito, então dá uma olhada nesses recursos novos e brilhantes!
- C# e Java (e Ruby, em menor grau) também são ótimas opções se você está procurando trabalho, já que estão entre as linguagens mais pedidas pelas empresas
- Se você conhece Ruby, experimente o Crystal para ver como seria um Ruby com tipagem estática
- Se você gosta de linguagens dinâmicas, mas também quer um ótimo desempenho, dê uma olhada no Crystal
- Se você conhece Bash ou arquivos em lote do Windows, experimente o PowerShell para uma abordagem diferente e orientada a objetos de script de shell
- Se você curte linguagens de script em geral, Ruby, Crystal e PowerShell são todas boas opções
- Pharo, Crystal e Ruby são ótimos se você quer fazer um pouco de metaprogramação (o C# também está ganhando alguns recursos de metaprogramação)
- Se você quer sentir como é programar em uma linguagem que não é baseada em arquivos de texto, experimente o Pharo e sua IDE única e poderosa
- Se você gosta de construir sites, vale a pena experimentar o Ruby com seu framework Ruby on Rails

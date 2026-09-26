**Importante: Esta informação está desatualizada. Confira nosso [post mais recente no blog](https://exercism.org/blog/contribution-guidelines-nov-2023) para detalhes atualizados.**

---

_TL;DR; Vamos passar alguns meses redesenhando nosso modelo de voluntariado e dando aos nossos principais voluntários uma pausa do trabalho de revisar as contribuições da comunidade.
Se você usa o Exercism apenas para aprender ou mentorar, não há nada aqui que você precise saber (mas leia se tiver interesse!).
Se você é mantenedor de trilha, quer contribuir com o Exercism ou quer reportar um bug/problema, então considere esta leitura essencial 🙂_

---

Nos últimos 6 meses, dedicamos muito tempo a explorar o futuro do Exercism, imaginando como seria se cada trilha de linguagem pudesse ser a melhor possível.
Temos um orgulho enorme do que construímos até aqui.
Os 85.000 depoimentos recebidos mostram o trabalho incrível que nossa comunidade fez ao construir nossas trilhas de linguagem e ao mentorar tantos estudantes por meio delas.
Mais importante ainda: acreditamos que estamos apenas arranhando a superfície do que é possível.
Temos ideias grandiosas, esperança e empolgação com tudo o que o Exercism pode se tornar.
Mas, para alcançar isso, primeiro precisamos resolver alguns problemas fundamentais que se escondem sob a superfície.

O principal deles é a necessidade de resolver o desafio de escalar nossa comunidade de voluntários de forma saudável e sustentável.
O Exercism foi construído nos ombros de centenas de voluntários dedicados, mas uma grande parte deles hoje está esgotada e muitos acabaram saindo por causa disso.
Há uma infinidade de motivos para isso, alguns diretamente ligados ao Exercism, outros pela falta de tempo da vida, e outros pelo pano de fundo de tudo o que está acontecendo no mundo neste momento.
Mas ficou muito claro para nós que precisamos projetar e desenvolver uma forma melhor de construir nossa plataforma juntos.

Historicamente, tentamos construir o Exercism com um modelo de software de código aberto (OSS), com mantenedores que revisam as contribuições da comunidade em geral.
Isso nos causou muitos problemas e gerou frustração tanto para mantenedores quanto para contribuidores.
Exploro isso com mais detalhes abaixo, caso você queira, mas o TL;DR é que nossos principais voluntários hoje passam o tempo atuando como porteiros reativos em vez de criadores inovadores.
Isso é bem menos divertido para eles e significa que o Exercism perde a magia que essas pessoas traziam à plataforma.

Há duas coisas que precisamos fazer para resolver isso:
1. Precisamos projetar um novo sistema de voluntariado que combine mais com o Exercism do que o modelo tradicional de OSS.
  Já gastamos bastante energia tentando fazer isso até agora, e falhamos.
  Então vamos tirar um tempo para trabalhar com nossos voluntários e projetar isso direito ao longo dos próximos meses.
2. Vamos pausar em grande parte as contribuições da comunidade pelos próximos meses, para deixar nossos principais voluntários focarem em construir e desenvolver as trilhas do jeito que quiserem (ou tirar um sabático, se só quiserem dar uma respirada!).

Minha esperança é que, ao dar um passo atrás e projetar isso de verdade, junto com a captação de recursos para ampliar nossa equipe de educação, possamos tornar o Exercism um lugar excelente para ser voluntário e ajudar a garantir seu futuro.
Enquanto isso, essas mudanças devem fazer com que as trilhas possam melhorar e crescer mais do que conseguiram no último ano, e que nossos mantenedores parem de se esgotar e, em vez disso, se sintam mais felizes, mais energizados e mais conectados por trabalhar no Exercism.

## Mudanças concretas

São três mudanças concretas que estamos implementando.

### Use o fórum, não as issues do GitHub

Vamos liberar o GitHub inteiramente para que nossos mantenedores trabalhem nas issues que quiserem resolver.
Vamos fechar uma série de issues que criamos antes para a comunidade trabalhar (e adicionar uma tag para que possam ser facilmente reabertas no futuro, se quisermos), ao mesmo tempo que não permitiremos novas issues ou PRs não solicitados na maioria dos repositórios.
Se você quiser discutir ou reportar algo, use o [fórum](https://forum.exercism.org) em vez disso.
Se você abrir uma issue ou um PR não solicitado, será fechado automaticamente e você será direcionado ao fórum.

### Pausa nas contribuições da comunidade

As trilhas serão divididas em três categorias:
- A maioria das trilhas com mantenedores ativos terá as contribuições da comunidade pausadas, para permitir que os mantenedores sejam autônomos ou tenham uma folga.
  (Os mantenedores dessas trilhas podem pedir a remoção do requisito obrigatório de uma revisão.
  Para isso, fale com o Erik no Slack.)
- Algumas trilhas com mantenedores ativos que realmente querem continuar aceitando contribuições da comunidade permanecerão abertas (se você é mantenedor e prefere esse modo em vez do (1), fale com Jonathan Middleton no Slack para conversar sobre isso).
- Nas trilhas em que não há mantenedores ativos, o desenvolvimento da trilha ficará praticamente pausado durante esse período.

Em todos os casos, Erik e eu vamos continuar fazendo uma verificação de confiança nos PRs dos repositórios de Tooling antes do merge.

A única exceção é que continuaremos aceitando PRs para Abordagens e Artigos, e vamos implementar uma política de mesclagem otimista em toda a organização, que busca preencher uma base de Abordagens em todo o Exercism e permitir melhorias incrementais, usando as seguintes regras:
1. Se o código resolve o exercício e é sintática e semanticamente idiomático (ou seja, parece código em $LANG), ele deve ser mesclado.
  Caso contrário, deve ser corrigido por quem abriu o PR.
2. Se um mantenedor quiser fazer mudanças no conteúdo (por exemplo, melhorar os conselhos, ajustar detalhes, destacar abordagens melhores, alternativas ou mais idiomáticas), isso deve ser feito em um PR posterior.

### Projetando um novo sistema de voluntariado

Vamos montar um Conselho da Comunidade para co-projetar um framework de voluntariado sustentável e saudável para o nosso futuro, que destrave o potencial do Exercism.
Se o futuro do Exercism importa para você e você quer fazer parte desse processo, entre em contato com [Jonathan](mailto:jonathan@exercism.org).

Vamos seguir com essas ações pelos próximos meses.
Vamos considerar tudo ao longo desse período e pretendemos tomar algumas decisões novas até junho de 2023.
Se você tiver alguma ideia, comece um tópico no [fórum](https://forum.exercism.org)!

## Posfácio: Por que nosso modelo de OSS está quebrado

Nosso modelo histórico foi construído em torno do modelo de OSS.
Ele dependia de voluntários que chegaram ao Exercism, fizeram um ótimo trabalho construindo trilhas e depois receberam privilégios de mantenedor, com os quais podiam aceitar contribuições da nossa base mais ampla de usuários para melhorá-las.

Embora isso pareça ótimo no papel, tem alguns problemas significativos.
O principal deles é que as pessoas que trazem mais magia ao Exercism acabam sem tempo para programar ou criar o Exercism, porque o tempo delas é gasto respondendo a contribuições da comunidade.
Quase nunca foi por isso que os mantenedores se envolveram com o Exercism, e não é um trabalho de que gostem.
É um pouco como alguém que adora desenvolver ser “promovido” a líder de equipe, passando a gerenciar pessoas em vez de programar.
Pode parecer uma promoção legal na hora, mas muitas vezes acontece de as pessoas não gostarem nem metade de ser gestoras do que gostam de programar.

Ele também se baseia na suposição de que a soma das contribuições da comunidade é maior do que a contribuição individual que um determinado mantenedor poderia fazer de outra forma.
Mas, no Exercism, quase nunca é o caso.
O Exercism é complexo, a educação é difícil, e juntos eles fazem de contribuir com o Exercism algo complexo e difícil de construir.
Há muito a aprender e entender tanto sobre como o Exercism funciona tecnicamente quanto sobre sua abordagem de educação, e isso significa que a maioria das primeiras contribuições é de pessoas ainda encontrando o seu caminho.
Isso significa que suas contribuições iniciais são relativamente pequenas, mas também que quase sempre exigem bastante trabalho de revisão e ajuste.
Esse é um trabalho que consome tempo dos mantenedores.
Na verdade, o tempo total gasto na revisão (assim como a troca de contexto necessária) faz com que o mantenedor normalmente invista mais esforço em revisar o PR do que se simplesmente o tivesse feito sozinho.
Existem, é claro, algumas exceções, mas isso é verdade em 99% dos casos.
E muitas vezes isso é ainda mais doloroso para o mantenedor, já que o problema que o PR resolve não estava no topo da lista de prioridades dele, o que significa que as coisas que ele sabe serem realmente essenciais acabam não sendo feitas.

Por fim, o modelo de OSS depende de que os contribuidores comecem pequenos e, com o tempo, se tornem conhecedores e regulares o bastante para se tornarem mantenedores.
Em projetos de OSS como bibliotecas de software, isso funciona relativamente bem (por exemplo, alguém usa uma biblioteca em produção e vai adicionando melhorias a ela, até que um dia tem tanto conhecimento quanto o criador original).
No entanto, com o Exercism, isso simplesmente não aconteceu.
Apesar de termos mesclado PRs de milhares de contribuidores nos últimos 12 meses, apenas um punhado deles se tornou contribuidor regular e um número ainda menor virou mantenedor.
Isso se deve, mais uma vez, principalmente à complexidade do Exercism, mas também porque ele não é um software isolado, onde esse modelo tradicionalmente funciona.

Tudo isso é incrivelmente desanimador para os mantenedores e prejudicial ao Exercism.

As trilhas estagnaram, e nossos voluntários mais importantes, que tinham paixão por construir, em grande parte perderam essa paixão quando o trabalho deles virou revisar o trabalho dos outros, negociar prioridades concorrentes e lidar com pedidos inesperados.
Durante a construção da v3, os mantenedores puderam trabalhar com relativa autonomia, já que o trabalho deles era em grande parte nos bastidores, o que levou a um nível enorme de produtividade e fez com que a maioria das pessoas realmente gostasse de contribuir.
Desde o lançamento da v3, apesar de muitos voluntários dedicarem tanto tempo quanto antes ao Exercism, tem sido um período bem menos agradável e produtivo, em grande parte por causa de quanta energia foi gasta respondendo a contribuições ou issues dos outros.
Nossos voluntários agora passam o tempo atuando como porteiros reativos em vez de inovadores, e isso é bem menos divertido.

Esses são os desafios que precisamos resolver, e são difíceis.
Precisamos encontrar uma forma de as pessoas que querem dedicar centenas de horas construindo as trilhas de linguagem do Exercism poderem fazer isso e amar o que fazem.
Precisamos encontrar uma forma de correções de bugs e pequenas contribuições entrarem na nossa base de código sem exigir a atenção desses voluntários essenciais.
E precisamos encontrar uma forma de atrair novos voluntários para o Exercism e apoiá-los caso escolham se comprometer com contribuições contínuas.
Precisamos reduzir esse papel de porteiro em geral, respeitando ao mesmo tempo o fato de que quem dedicou tanto esforço às trilhas tem opiniões fortes e muito bem fundamentadas.
Precisamos tornar divertido gerenciar e conduzir toda essa estrutura de voluntariado.
E também precisamos resolver uma porção de outras coisas.
Vai levar tempo e vai ser um desafio, mas quando conseguirmos, vai ser incrível.

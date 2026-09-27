**Importante: esta informação está desatualizada. Consulta o nosso [artigo do blogue mais recente](https://exercism.org/blog/contribution-guidelines-nov-2023) para obteres os detalhes atualizados.**

---

_TL;DR; Vamos passar alguns meses a redesenhar o nosso modelo de voluntariado e a dar um descanso aos nossos principais voluntários, para que deixem de ter de se ocupar da revisão das contribuições da comunidade.
Se usas o Exercism apenas para aprender ou para fazer mentoria, não há aqui nada que precises de saber (mas lê, se tiveres curiosidade!).
Se és maintainer de uma track, queres contribuir para o Exercism ou queres comunicar um bug ou um problema, considera então esta leitura essencial 🙂_

---

Ao longo dos últimos 6 meses, passámos muito tempo a explorar o futuro do Exercism e a imaginar como seria se cada track de linguagem fosse o melhor possível.
Estamos incrivelmente orgulhosos daquilo que construímos até agora.
Os 85 000 testemunhos deixados até hoje mostram o trabalho fantástico que a nossa comunidade tem feito a construir as tracks de linguagem e a orientar tantos estudantes através delas.
Mais importante ainda, acreditamos que estamos apenas a arranhar a superfície do que é possível.
Temos ideias enormes, muitas esperanças e muito entusiasmo em relação a tudo o que o Exercism pode vir a ser.
Mas, para lá chegarmos, temos primeiro de resolver alguns problemas fundamentais que persistem debaixo da superfície.

O mais premente é a necessidade de resolver o desafio de fazer crescer a nossa comunidade de voluntários de uma forma saudável e sustentável.
O Exercism foi construído sobre os ombros de centenas de voluntários dedicados, mas muitos deles sentem-se agora esgotados e, por isso, muitos já se foram embora.
Há uma miríade de razões para isto: algumas diretamente ligadas ao Exercism, outras devido à pressão do tempo na vida de cada um e outras ainda ao pano de fundo de tudo o que se passa no mundo neste momento.
Mas tornou-se muito claro para nós que precisamos de conceber e desenvolver uma forma melhor de construirmos a nossa plataforma em conjunto.

Historicamente, tentámos construir o Exercism segundo um modelo de software de código aberto (OSS), com maintainers que revêm as contribuições da comunidade em geral.
Isso causou-nos muitos problemas e gerou frustração tanto nos maintainers como nos contribuidores.
Exploro isto mais em detalhe abaixo, se quiseres saber mais, mas o TL;DR; é que os nossos principais voluntários passam agora o tempo a agir como guardiões reativos em vez de criadores inovadores.
Isso é muito menos divertido para eles e faz com que o Exercism perca a magia que essas pessoas trouxeram anteriormente à plataforma.

Há duas coisas que precisamos de fazer para resolver isto:
1. Precisamos de conceber um novo sistema de voluntariado que se adeque ao Exercism melhor do que o modelo tradicional de OSS.
  Já gastámos bastante energia a tentar fazê-lo até agora, sem sucesso.
  Por isso, vamos tirar algum tempo para trabalhar com os nossos voluntários e conceber isto como deve ser ao longo dos próximos meses.
2. Vamos suspender em grande parte as contribuições mais amplas da comunidade durante os próximos meses, para que os nossos principais voluntários se possam concentrar em construir e desenvolver as tracks como quiserem (ou tirar um ano sabático, se só quiserem respirar um pouco!)

A minha esperança é que, ao dar um passo atrás e ao conceber isto realmente bem, a par de angariar fundos para ampliar a nossa equipa educativa, consigamos fazer do Exercism um lugar fantástico para ser voluntário e ajudar a garantir o seu futuro.
Entretanto, estas mudanças deverão permitir que as tracks melhorem e cresçam mais do que conseguiram no último ano, e que os nossos maintainers deixem de se esgotar e passem a sentir-se mais felizes, com mais energia e mais ligados por trabalharem no Exercism.

## Mudanças concretas

Vamos implementar três mudanças concretas.

### Usa o fórum, não as Issues do GitHub

Vamos libertar o GitHub por completo para que os nossos maintainers possam trabalhar nas issues que querem resolver.
Vamos fechar uma grande quantidade de issues que criámos anteriormente para a comunidade trabalhar (e adicionar uma etiqueta para que possam ser facilmente reabertas no futuro, se quisermos), ao mesmo tempo que deixaremos de permitir novas issues ou PRs não solicitados na maioria dos repositórios.
Se quiseres discutir ou comunicar alguma coisa, usa antes o [fórum](https://forum.exercism.org).
Se abrires uma issue ou um PR não solicitado, será fechado automaticamente e serás encaminhado para o fórum.

### Suspender as contribuições mais amplas da comunidade

As tracks serão divididas em três categorias:
- Na maioria das tracks com maintainers ativos, as contribuições da comunidade ficarão suspensas, para que os maintainers possam ser autónomos ou fazer uma pausa.
  (Os maintainers destas tracks podem pedir para remover o requisito obrigatório de uma revisão.
  Para isso, fala com o Erik no Slack.)
- Algumas tracks com maintainers ativos que querem mesmo continuar a aceitar contribuições da comunidade permanecerão abertas (Se és maintainer e preferes este modo em vez do (1), contacta o Jonathan Middleton no Slack para falarmos sobre isso).
- Nas tracks sem maintainers ativos, o desenvolvimento das tracks ficará essencialmente suspenso durante este período.

Em todos os casos, o Erik e eu continuaremos a fazer uma verificação de confiança dos PRs para os repositórios de Tooling antes do merge.

A única exceção é que continuaremos a aceitar PRs para Approaches e Articles e vamos implementar uma política de merge otimista em toda a organização, com o objetivo de criar uma base de Approaches em todo o Exercism e permitir melhorias incrementais, seguindo as seguintes regras:
1. Se o código resolve o exercício e é sintática e semanticamente idiomático (ou seja, parece código de $LANG), deve ser incorporado.
  Se não, deve ser corrigido pelo autor do PR.
2. Se um maintainer quiser fazer alterações ao conteúdo (por exemplo, melhorar os conselhos, afinar pormenores, destacar abordagens melhores, alternativas ou mais idiomáticas), isso deve ser feito num PR posterior.

### Conceber um novo sistema de voluntariado

Vamos criar um Community Board para conceber em conjunto um framework de voluntariado sustentável e saudável para o futuro, que liberte o potencial do Exercism.
Se acreditas no futuro do Exercism e queres fazer parte deste processo, contacta o [Jonathan](mailto:jonathan@exercism.org).

Vamos seguir com estas medidas durante os próximos meses.
Vamos ponderar tudo ao longo deste período e planeamos tomar novas decisões até junho de 2023.
Se tiveres ideias, abre um tópico no [fórum](https://forum.exercism.org)!

## Posfácio: porque é que o nosso modelo OSS não funciona

O nosso modelo histórico foi construído em torno do modelo de OSS.
Assentava em voluntários que chegaram ao Exercism, fizeram um trabalho fantástico a construir tracks e depois receberam privilégios de maintainer, com os quais podiam aceitar contribuições da nossa base de utilizadores mais vasta para as melhorar.

Embora pareça ótimo no papel, tem alguns problemas significativos.
O mais grave é que as pessoas que acrescentam mais magia ao Exercism acabam sem tempo para programar ou para criar no Exercism, porque o seu tempo é todo gasto a responder a contribuições da comunidade.
Isto quase nunca é a razão pela qual os maintainers se envolveram no Exercism, e não é trabalho de que gostem.
É um pouco como alguém que adora programar ser “promovido” a líder de equipa, onde passa a gerir pessoas em vez de programar.
Pode parecer uma promoção simpática na altura, mas, muitas vezes, as pessoas acabam por gostar muito menos de ser gestoras do que de programar.

Assenta também no pressuposto de que a soma das contribuições da comunidade em geral é maior do que a contribuição individual que um determinado maintainer poderia fazer de outra forma.
Mas, no Exercism, isso quase nunca acontece.
O Exercism é complexo e a educação é difícil e, juntos, fazem com que contribuir para o Exercism seja algo complexo e difícil de construir.
Há imenso para aprender e compreender tanto sobre o funcionamento técnico do Exercism como sobre a sua abordagem à educação, o que faz com que a maioria das primeiras contribuições sejam de pessoas a encontrar o seu caminho.
Isso significa que as suas contribuições iniciais são relativamente pequenas, mas também que quase sempre exigem muito trabalho de revisão e ajuste.
É um trabalho que consome muito tempo aos maintainers.
Na verdade, o tempo total gasto na revisão (assim como a mudança de contexto que ela exige) faz com que o maintainer tenha geralmente mais trabalho a revê-la do que se tivesse sido ele próprio a fazer a alteração.
Há, claro, algumas exceções, mas é verdade em 99% dos casos.
E, muitas vezes, isto é ainda mais penoso para o maintainer, porque o problema que o PR resolve não estava entre as suas principais prioridades, o que faz com que aquilo que ele sabe ser realmente essencial acabe por não ser feito.

Por fim, o modelo de OSS assenta em contribuidores que começam por fazer coisas pequenas e que, com o tempo, ganham conhecimento e regularidade suficientes para se tornarem maintainers.
Em projetos de OSS como bibliotecas de software, isto funciona relativamente bem (por exemplo, alguém usa uma biblioteca em produção e vai acrescentando melhorias, até ter tanto conhecimento como o criador original).
No entanto, no Exercism, isso simplesmente não aconteceu.
Apesar de termos incorporado PRs de milhares de contribuidores nos últimos 12 meses, apenas um punhado deles se tornou contribuidor regular e ainda menos se tornaram maintainers.
Isto deve-se, mais uma vez, sobretudo à complexidade do Exercism, mas também ao facto de não ser um programa delimitado, onde este modelo funciona tradicionalmente.

Tudo isto é incrivelmente desmoralizador para os maintainers e prejudicial para o Exercism.

As tracks estagnaram e os nossos voluntários mais dedicados, que tinham paixão por construir, perderam em grande parte essa paixão quando a sua função passou a ser rever o trabalho dos outros, negociar prioridades em conflito e responder a pedidos inesperados.
Durante o desenvolvimento da v3, os maintainers puderam trabalhar com relativa autonomia, uma vez que o seu trabalho era em grande parte nos bastidores, o que levou a um nível enorme de produtividade e fez com que a maioria das pessoas gostasse realmente de contribuir.
Desde o lançamento da v3, apesar de muitos voluntários dedicarem tanto tempo ao Exercism como antes, tem sido um período muito menos agradável e produtivo, sobretudo devido à quantidade de energia gasta a responder a contribuições ou issues de outras pessoas.
Os nossos voluntários passam agora o tempo a agir como guardiões reativos em vez de inovadores, e isso é muito menos divertido.

Estes são os desafios que precisamos de resolver, e são difíceis.
Precisamos de encontrar uma forma de permitir que as pessoas que querem dedicar centenas de horas a construir as tracks de linguagem do Exercism o possam fazer e adorem fazê-lo.
Precisamos de encontrar uma forma de as correções de bugs e as pequenas contribuições entrarem no nosso código sem exigirem a atenção desses voluntários essenciais.
E precisamos de encontrar uma forma de atrair novos voluntários para o Exercism e de os apoiar, caso decidam comprometer-se com contribuições contínuas.
Precisamos de reduzir o papel de guardião em geral, respeitando ao mesmo tempo o facto de quem dedicou tanto esforço às tracks ter opiniões fortes e muito bem fundamentadas.
Precisamos de tornar divertido gerir e manter todo esse sistema de voluntariado.
E há ainda uma série de outras coisas que precisamos de resolver.
Vai levar tempo e vai ser um desafio, mas, quando conseguirmos, vai ser fantástico.

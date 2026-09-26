# Escolhendo uma solução para mentorar

[video:vimeo/595885125]()

A primeira decisão que você precisa tomar como mentor é qual solução mentorar.

## Trabalhando com a fila

Você encontra uma lista de todas as soluções enviadas para mentoria na [Fila de mentoria](/mentoring/queue).
A interface deve ficar mais ou menos assim:

![Fila de mentoria](https://exercism-static.s3.eu-west-1.amazonaws.com/docs/mentor_queue.png)

No topo do painel da fila, há uma caixa de texto que permite filtrar pelo nome do estudante.
À direita dela, você pode ordenar as solicitações por mais antigas primeiro, mais recentes primeiro, nome do estudante ou nome do exercício.
No lado direito da interface, você pode filtrar por linguagem ou nome do exercício.
Você também pode optar por mostrar apenas os exercícios que você mesmo já concluiu, o que costuma ser prudente, já que pode ser difícil dar um ótimo feedback se você nunca se debruçou sobre a solução do exercício.
A lista de exercícios com solicitações de mentoria em aberto pode ser usada para filtrar ainda mais a lista de solicitações.
Faça isso selecionando o nome do exercício (visível na parte inferior direita da captura de tela acima).

A tabela principal mostra o exercício, o estudante e quando ele solicitou a mentoria.
Passar o mouse sobre uma linha mostra mais detalhes sobre o estudante.
Você pode ver o nome, a localização e a reputação da pessoa (um indicador de se ela também é contribuidora ou mentora), além de quantas vezes ela já foi mentorada antes.
Você também vê um breve texto de apresentação que ela escreveu explicando o que espera tirar da trilha.
Conforme você começa a mentorar pessoas, também vai ver se já mentorou aquela pessoa antes e se a adicionou aos favoritos.

O texto de apresentação no tooltip é um primeiro indicador de se esse estudante combina com você.
A sua especialidade corresponde às lacunas de conhecimento dele?
Se a pessoa diz que quer ficar boa em programação funcional, você consegue ajudar com isso?
Se ela é nova na linguagem e quer aprender o básico, então, se você tiver **qualquer** experiência real, provavelmente vai conseguir ajudar.
Mas se ela programa nessa linguagem há anos e está tentando chegar ao nível de especialista, você mesmo precisa ter um domínio bem sólido da linguagem.

Depois de encontrar uma solução que pareça uma boa opção para você mentorar, podemos dar o próximo passo e dar uma olhada no código.
Então clique nessa solução e entre na interface de discussão de mentoria!

## A interface de discussão de mentoria

Nesta etapa, você está olhando a solução de alguém, mas ainda não se comprometeu a mentorá-la.
Você tem a oportunidade de ler o código da pessoa e obter outras informações antes de começar.

**Se você é novo nesta interface, ela pode parecer um pouco assustadora por ter muita informação, mas não se preocupe, logo ela vai ficar familiar.**

### O código do estudante

No lado esquerdo da tela, você vê o código do estudante.
A interface será parecida com isto:

<img src="https://raw.githubusercontent.com/exercism/docs/main/.imgs/mentor-discussion-area.png" height="100">

1. A maior parte do lado esquerdo contém o código do estudante.
   Por padrão, você vê a iteração mais recente dele.
   Se ele enviou várias iterações, você pode alternar entre elas usando os números em círculos no canto inferior esquerdo ou os botões `Previous` e `Next` localizados na parte inferior direita deste painel.
   Se ele enviou apenas uma iteração, esses ícones não vão aparecer.

2. Na parte superior do código do estudante, você pode usar as abas para alternar entre o código dele, as instruções e os testes.
   Isso é útil para relembrar o que foi pedido ao estudante neste exercício.

3. Você também vê um indicador de se os testes passaram ou falharam (localizado na parte superior direita deste painel esquerdo), além de botões para baixar o código do estudante ou copiá-lo para a área de transferência.
   Se falharam, clicar nesse indicador abre uma janela que mostra os detalhes específicos da execução dos testes, para você ver o que deu errado.

O lado direito da tela contém um painel com a interação de mentoria. Na parte superior desse painel, você vê três abas.
A aba "**Discussão**" contém as informações sobre a pessoa (nome de usuário, nome, reputação, texto de apresentação).
Abaixo dela, há um comentário da pessoa sobre o que ela quer aprender com esta solução específica.
(Em algumas soluções mais antigas, isso pode estar ausente.)
Esse é um indicador importante de se esta solução é a certa para você.
Você consegue responder à pergunta dela?
Você consegue atender às expectativas dela para este exercício?

A segunda aba é o seu "**Rascunho**".
Você pode escrever código nela, para poder consultá-lo no seu comentário.
Ela ajuda a identificar o código que é importante ao revisar este exercício.
Assim, suas explicações ficam mais simples e claras.
As anotações escritas aqui são só suas, e você as verá toda vez que mentorar a solução do exercício em questão.

A terceira aba se chama "**Orientação**".
Se você clicar nela, verá algumas informações que podem ser úteis:

- **A solução exemplar** Tente guiar o estudante em direção a essa solução.
  É o melhor ponto de chegada para ele neste momento da trilha.
  Você pode perceber que a sua abordagem difere bastante da solução exemplar.
  Isso pode acontecer porque você conhece técnicas mais avançadas do que o estudante.
   Lembre-se de que você só pode esperar que o estudante conheça os conceitos que aprendeu ao percorrer o caminho de aprendizado até o exercício em que está trabalhando.
   Leve isso em conta ao dar o seu feedback e tente não sobrecarregar o estudante com conhecimentos para os quais ele ainda pode não estar preparado.
- **Notas de mentoria:** são anotações escritas pela comunidade que ajudam a mostrar a outros mentores a melhor forma de mentorar um exercício.
  Nós adoraríamos que você contribuísse com a sua experiência nessas anotações.
- **Feedback automatizado:** é o feedback que os nossos analisadores determinaram que pode ser útil para você dar a um estudante.
  Vamos falar mais sobre isso depois.
- **Sua solução:** um link para a sua própria solução, que você pode usar como referência de como resolveu o exercício.

## Comece a mentorar

Se você leu o código, conferiu as orientações e sente que pode ajudar, então é hora de começar!
Clique no botão "Começar a mentorar" e você será convidado a escrever o seu feedback.

Depois, leia [Como dar um ótimo feedback](/docs/mentoring/how-to-give-great-feedback)!

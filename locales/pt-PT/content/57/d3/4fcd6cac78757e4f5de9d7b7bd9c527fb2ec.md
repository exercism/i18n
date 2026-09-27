# Escolher uma solução para mentorar

[video:vimeo/595885125]()

A primeira decisão que tens de tomar como mentor é escolher que solução mentorar.

## Trabalhar com a fila

Encontras uma lista de todas as soluções submetidas para mentoria na [Fila de mentoria](/mentoring/queue).
A interface deverá ter um aspeto semelhante a este:

![Fila de mentoria](https://exercism-static.s3.eu-west-1.amazonaws.com/docs/mentor_queue.png)

No topo do painel da fila, encontras uma caixa de texto que te permite filtrar pelo nome do estudante.
À direita desta, podes ordenar os pedidos por mais antigos primeiro, mais recentes primeiro, nome do estudante ou nome do exercício.
Do lado direito da interface, podes filtrar por linguagem ou por nome do exercício.
Também podes optar por mostrar apenas os exercícios que já completaste, o que é muitas vezes sensato, porque podes ter dificuldade em dar um bom feedback se nunca te debateste com a resolução do exercício.
A lista de exercícios com pedidos de mentoria pendentes pode ser usada para filtrar ainda mais a lista de pedidos.
Para isso, seleciona o nome do exercício (visível na secção inferior direita da imagem acima).

A tabela principal mostra o exercício, o estudante e quando pediu mentoria.
Ao passares o cursor sobre uma linha, obténs mais detalhes sobre o estudante.
Podes ver o nome, a localização e a reputação (que é um indicador de se a própria pessoa é contribuidora ou mentora), bem como o número de vezes que já recebeu mentoria.
Verás também um pequeno texto que a pessoa escreveu a explicar o que espera tirar do percurso.
À medida que começas a mentorar pessoas, também verás se já mentoraste essa pessoa antes e se a marcaste como favorita.

O texto na tooltip é um primeiro indicador sobre se este estudante é adequado para ti.
A tua experiência corresponde às lacunas de conhecimento da pessoa?
Se a pessoa disser que quer ficar boa em programação funcional, consegues ajudar nisso?
Se está a começar na linguagem e quer aprender o básico, provavelmente consegues ajudar desde que tenhas **alguma** experiência real. Mas se programa nessa linguagem há anos e está a tentar atingir o nível de especialista, precisas de dominar bem a linguagem.

Assim que encontrares uma solução que pareça ser uma boa escolha para mentorar, podemos dar o passo seguinte e ver o código.
Por isso, clica nessa solução e entra na interface de discussão de mentoria!

## A interface de discussão de mentoria

Nesta fase, estás a ver a solução de alguém, mas ainda não te comprometeste a mentorá-la.
Antes de começar, tens a oportunidade de ler o código e obter outras informações.

**Se é a primeira vez que usas esta interface, pode parecer um pouco avassaladora por ter muita informação, mas não te preocupes: depressa te vais familiarizar com ela.**

### O código do estudante

Do lado esquerdo do ecrã, vês o código do estudante.
A interface terá um aspeto semelhante a este:

<img src="https://raw.githubusercontent.com/exercism/docs/main/.imgs/mentor-discussion-area.png" height="100">

1. A parte principal do lado esquerdo contém o código do estudante.
   Por defeito, vais ver a iteração mais recente.
   Se submeteu várias iterações, podes alternar entre elas através dos números dentro de círculos, na parte inferior esquerda, ou dos botões `Previous` e `Next`, no canto inferior direito deste painel.
   Se submeteu apenas uma iteração, esses ícones não aparecem.

2. No topo do código do estudante, podes usar os separadores para alternar entre o código do estudante, as instruções e os testes.
   Isto é útil para recordares o que foi pedido ao estudante neste exercício.

3. Também vês um indicador de se os testes passaram ou falharam (no canto superior direito deste painel esquerdo), bem como botões para descarregar o código do estudante ou copiá-lo para a área de transferência.
   Se falharam, ao clicares neste indicador abre-se uma janela modal que te mostra os detalhes específicos da execução dos testes, para veres o que correu mal.

O lado direito do ecrã tem um painel com a interação de mentoria. No topo deste painel, vês três separadores.
O separador "**Discussão**" contém a informação sobre o utilizador (nome de utilizador, nome, reputação, texto pessoal).
Por baixo, há um comentário do utilizador sobre o que quer aprender com esta solução em concreto.
(Nalgumas soluções mais antigas, este comentário pode faltar).
Este é um indicador fundamental para saberes se esta solução é a certa para ti.
Consegues responder à pergunta da pessoa?
Consegues corresponder às expectativas dela para este exercício?

O segundo separador é o teu "**Rascunho**".
Podes escrever código lá, para fazer referência a ele no teu comentário.
Ajuda a identificar o código que é importante ao reveres este exercício.
Assim, as tuas explicações podem ficar mais simples e mais claras.
As notas escritas aqui são só tuas e vais vê-las sempre que estiveres a mentorar a solução do exercício em questão.

O terceiro separador chama-se "**Orientação**".
Se clicares nele, vês algumas informações que te podem ser úteis:

- **A solução exemplar** Tenta orientar o estudante para esta solução.
  É o melhor ponto a que o estudante pode chegar nesta fase do percurso.
  Podes descobrir que a tua abordagem é bastante diferente da solução exemplar.
  Isso pode dever-se ao facto de conheceres técnicas mais avançadas do que o estudante.
  Tem em conta que só podes esperar que o estudante conheça os conceitos que aprendeu ao longo do caminho de aprendizagem até ao exercício em que está a trabalhar.
   Leva este facto em conta ao dar o teu feedback e evita sobrecarregar o estudante com conhecimentos para os quais talvez ainda não esteja preparado.
- **Notas de mentoria:** São notas escritas pela comunidade que ajudam a orientar outros mentores para a melhor forma de mentorar um exercício.
  Gostaríamos muito que contribuísses com a tua experiência para estas notas.
- **Feedback automático:** É o feedback que os nossos analisadores consideraram que pode ser útil dares a um estudante.
  Vamos falar disto mais adiante.
- **A tua solução:** Uma ligação à tua própria solução, que podes usar como referência de como resolveste o exercício.

## Começar a mentorar

Se leste o código, consultaste as orientações e achas que podes ser útil, está na hora de avançar!
Clica no botão "Começa a mentorar" e ser-te-á pedido que escrevas o teu feedback.

A seguir, lê [Como dar um bom feedback](/docs/mentoring/how-to-give-great-feedback)!

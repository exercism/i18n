# Dicas de mentoria

## Notas de mentoria

Uma das maiores ajudas para a mentoria pode ser ter um arquivo para guardar anotações de cada exercício que você mentorа.
Você pode perceber que muitas soluções se beneficiam das mesmas sugestões; assim, mantendo anotações, você não precisa ficar reescrevendo as mesmas sugestões de memória.
E, tendo as sugestões em um só lugar, você pode ir refinando-as com o tempo para deixá-las mais claras.

Se você não tem certeza de como começar suas anotações, pode encontrar um arquivo `mentoring.md` para o exercício da sua trilha em [exercism/website-copy/tracks][website-copy].
Se ele existir, pode incluir exemplos de soluções razoáveis, além de sugestões comuns e pontos de discussão para estimular uma conversa mais aprofundada.
Se ele não existir, talvez você queira voltar e criar um depois de montar seu próprio arquivo de anotações para esse exercício.

Além disso, mesmo que você só mentorе uma linguagem agora, pode mentorar outras no futuro.
Pode ajudar organizar suas anotações de mentoria por trilha e também por nome de exercício, já que trilhas diferentes provavelmente vão exigir sugestões diferentes para o mesmo exercício.

Anotações de mentoria são úteis, quer você mentorе o exercício com frequência, quer raramente.
Se você mentorа o exercício com frequência, isso economiza muito tempo de digitação, já que você pode apenas copiar e colar das suas anotações.
Se você mentorа o exercício raramente, as anotações podem lembrar você de sugestões que talvez tenha esquecido nas semanas ou meses desde a última vez que o mentorou.

Não tem problema que as anotações de mentoria sejam diferentes de um mentor para outro.
Aqui está uma forma de estruturá-las, mas não é a _única_.

Parabenize o estudante por ter passado nos testes (se ele passou).

Se o exercício estiver na fila há alguns dias, talvez você possa comentar algo como:

>Desculpe a demora para alguém te responder.
>No momento há uma escassez de mentores ativos de JavaScript para `Resistor Color Duo`.

Liste o que você gostou na solução do estudante.
Por exemplo:

- Gosto que esta solução é sucinta e legível.

- Gosto do uso de `indexOf`.

- Gosto que esta usa a abordagem `(first * 10) + second` para evitar converter de número para string e de volta para número.

- Gosto que esta não usa laços/iteração.

- Gosto do parâmetro desestruturado.

Depois podem vir as sugestões que você faz com frequência.

~~~~exercism/note
Pode ajudar muito o estudante se você fornecer um link para cada recurso novo da linguagem que apresentar.
Por exemplo:

>Não é necessário para este exercício, mas talvez você possa considerar converter a função em uma [função arrow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
~~~~

Embora não queiramos entregar a solução, às vezes o estudante aprende melhor com exemplos.
Colocar um trecho de código em uma seção de detalhes recolhida pode fornecer esse exemplo, que o estudante pode escolher expandir ou não.
Por exemplo:

&lt;details&gt;&lt;summary&gt;Exemplo de spoiler&lt;/summary&gt;

&lt;pre&gt;

export const decodedValue = ([firstColor, secondColor]) =>
  COLORS.indexOf(firstColor) * 10 + COLORS.indexOf(secondColor)

&lt;/pre&gt;

&lt;/details&gt;

Perto do final das anotações, você pode incluir um link para uma solução publicada que represente as sugestões por completo.

Bem no final das suas anotações, talvez você queira colocar explicações mais longas que os estudantes às vezes pedem.
Essas explicações não aparecem com frequência, mas ainda assim pode ser bom registrá-las na primeira vez que você as usar, para que da próxima vez, que pode ser semanas ou meses depois, você não precise criar a explicação do zero.
Por exemplo, às vezes um estudante vai perguntar como a abordagem de multiplicação funcionaria para o Duo de Cores de Resistores se preto fosse a primeira faixa para um zero à esquerda:

>Preto como primeira faixa é um bom ponto a considerar, então vamos considerar.
>A cor do resistor deve representar a quantidade de ohms do resistor,
>e um zero à esquerda não seria usado em um resistor de múltiplas faixas.
>Então preto não seria uma primeira faixa.
>Além disso, `parseInt` ou `Number` também removem o zero à esquerda.

Uma categoria opcional de dados para guardar nas anotações de mentoria é um registro de benchmarks de várias soluções ou abordagens.

## Benchmarks

Uma preocupação comum dos estudantes é o quão eficiente é a solução deles.
Isso acontece especialmente com linguagens "de baixo nível", como C, C++, Go e Rust.
Além de quão idiomático é o código deles, estudantes de outras linguagens também costumam se preocupar com a eficiência do código.

~~~~exercism/note
Fazer benchmarks não é algo que se _espera_ de um mentor.
No entanto, os estudantes costumam ficar especialmente impressionados ao ver como o benchmark da solução deles se compara a outras abordagens.
~~~~

Go é uma trilha particularmente amigável para benchmarks, já que eles costumam estar incluídos no arquivo de teste.
Outras linguagens podem exigir alguma pesquisa para descobrir qual método funcionaria melhor para você.
Por exemplo, se você só usa o editor online, vai procurar um lugar para rodar benchmarks online.
Por exemplo, o [JSBench.me][jsbench-me] é um benchmark online para JavaScript.

Se você roda código localmente, tem a opção de baixar um software de benchmark para rodar na sua máquina.
Por exemplo, Rust pode usar o [Criterion][criterion] ou o [cargo bench][cargo-bench] com [testes de benchmark][rust-benchmark-tests].

Há pelo menos algumas formas de acompanhar benchmarks.
Uma forma é manter uma lista contínua de todos os que você mediu, mas ela pode ficar difícil de gerenciar se crescer muito.
Outra forma é manter uma lista de benchmarks representativos de diferentes abordagens.
Os estudantes costumam querer ver o código das abordagens mais rápidas; então, se uma abordagem mais rápida estiver publicada, provavelmente será muito bem-vindo fornecer o link para ela.

~~~~exercism/caution
Se você for fornecer um link para uma solução que mediu, certifique-se de fornecer o link para a solução publicada, e não para a sessão de mentoria.
Nem todas as soluções que recebem mentoria são publicadas.
~~~~

## Anotações de mentoria que não são específicas de um exercício

Pode haver recursos da linguagem que você acaba abordando em mais de um exercício.
Quando estiver prestes a copiar e colar uma sugestão de um arquivo para outro, talvez considere colocá-la em um arquivo próprio.
De novo, uma vantagem de manter uma sugestão em um só lugar é facilitar o refinamento ao longo do tempo.
Também fica mais fácil de encontrar quando você for usá-la em um exercício em que nunca a usou antes.
Em vez de tentar lembrar em qual exercício você já abordou aquela sugestão, você pode ir direto ao arquivo da própria sugestão.

## Quando um estudante tem uma dúvida

Os estudantes são incentivados a especificar o que esperam obter da sessão de mentoria.
Muitas vezes eles expressam isso na forma de uma pergunta.
Se a pergunta for algo cuja resposta você não sabe e que não te interessa, não tem problema deixar o pedido de mentoria para outro mentor.

Se você não sabe a resposta, mas quer descobri-la, talvez seja melhor não pegar o pedido de mentoria até aprender a resposta.
Se o pedido de mentoria já tiver sido atendido nesse meio-tempo, pelo menos você aprendeu algo e não fez o estudante esperar.

Uma exceção a isso pode ser quando o pedido de mentoria já está na fila há vários dias ou mais.
Nessa situação, talvez você queira pegar o pedido de mentoria e dar o feedback que puder, e avisar o estudante que você vai responder à dúvida dele depois.
Claro, é importante dar esse retorno, seja para informar a resposta ao estudante, seja para avisar que você não conseguiu encontrá-la.
Se você não conseguiu encontrar a resposta, pode ser útil para o estudante descrever os caminhos que você tentou para encontrá-la.
O estudante pode responder com outras formas de tentar encontrar a resposta.
Entre vocês dois, a resposta pode aparecer.

Se você esgotou todas as formas que conhece de encontrar a resposta, pode sugerir que o estudante encerre a discussão e reenvie o pedido, na esperança de que outro mentor possa fornecer a resposta.
Se quiser, o estudante pode comentar na discussão encerrada para compartilhar a resposta com você quando descobri-la.
E, da mesma forma, se você descobrir a resposta depois, pode voltar à discussão encerrada e avisar o estudante.

Se você sabe a resposta e quer abordá-la, um bom lugar para isso é entre dizer ao estudante o que você gostou na solução dele e oferecer sugestões de outras abordagens.

### Código que falha

O código pode falhar porque não passa em todos os testes ou porque não compila ou não satisfaz o interpretador.

Mentores diferentes têm inclinações e/ou paciência variadas para lidar com código que falha, o que pode depender um pouco de como ele é apresentado, já que o código que falha nem sempre é apresentado da mesma forma.

Às vezes o estudante vai dizer que tentou outra abordagem e não funcionou, e vai perguntar por que não funcionou.
O código pode nem ser fornecido, ou pode ser colocado em um comentário praticamente ilegível em vez de em uma iteração.

Uma solução testada no editor web só pode ser enviada para um pedido de mentoria se tiver passado em todos os testes.
Uma das razões é que o mentor possa focar em sugerir melhorias ou outras abordagens para o código que já funciona.
_Fazer debug_ de código não é necessariamente algo que um mentor queira ou que se espere que ele faça.
No entanto, uma solução que falha enviada pela CLI pode ser enviada para um pedido de mentoria, com o estudante pedindo ajuda para resolvê-la.

Se o código que falha não foi fornecido, e a abordagem que falhou não parece boa, pode bastar sugerir que, em vez de usar a abordagem que falhou, outra possibilidade seria uma abordagem que não seja nem a que falhou nem a que passou.
Ou pode bastar explicar por que a abordagem que eles usaram é melhor que a que falhou, sem entrar nos detalhes de qual era o bug na abordagem que falhou.

Por exemplo, é comum estudantes terem dificuldade com o Nome do Robô.
Ou os testes dão timeout, ou eles não conseguem gerar nomes suficientes, e querem saber como corrigir isso.
Se você tiver a inclinação e a paciência, pode certamente analisar o código deles e sugerir como resolver o problema.
Ou pode explicar que verificar nomes gerados aleatoriamente causa mais colisões à medida que mais nomes são gerados, e sugerir que outra abordagem seria gerar os nomes sequencialmente e depois embaralhá-los.

Se o código que falha foi colado em um comentário praticamente ilegível, talvez você queira dar o feedback que puder sobre a solução que passa, e sugerir que enviem o código do comentário como outra iteração.
Você também pode sugerir que o estudante confira os erros da iteração que falhou como um guia de onde está o problema.

Se o código está em uma iteração que falha, pode ser útil orientar o estudante a conferir os erros da execução dos testes.
Algumas linguagens precisam de um pouco mais de orientação sobre como ler erros ou resultados de testes do que outras.
Pode ser útil citar uma ou mais partes dos erros e explicar ao estudante o que elas significam.

No fim das contas, não é responsabilidade do mentor corrigir o código que falha do estudante, mas o mentor, se quiser, pode sugerir formas de o estudante corrigi-lo sozinho.

## Lidando com o continuum da fila

Pode acontecer de você se inscrever para mentorar uma trilha, mas nunca ver nenhum exercício na fila dela para mentorar.
Você pode achar que algo está errado, mas há pelo menos algumas razões para isso.
Uma razão é que as pessoas podem não estar pedindo mentoria na trilha no momento.
Às vezes uma trilha pode ter períodos de inatividade.
Outra razão é que outros mentores podem estar pegando os pedidos antes de você vê-los.
Isso provavelmente acontece em uma trilha popular que tem muitos mentores ativos.

Se há muitos pedidos na fila, há algumas formas de abordar a mentoria deles.
Talvez você queira trabalhar do mais antigo para o mais recente, para atender primeiro quem esperou mais tempo.
Ou pode escolher trabalhar do mais recente para o mais antigo, especialmente se os mais antigos já estão esperando há muito tempo.
Assim, quem esteve ativo recentemente não precisa esperar a fila acumulada ser resolvida.

Se há vários pedidos para o mesmo exercício, talvez você queira trabalhá-los em lotes do mesmo exercício para manter o foco, em vez de ir do exercício A para o exercício B e voltar ao exercício A.

Pode ser que um pedido de um exercício no qual você não tem interesse esteja parado ali há dias ou semanas.
Você pode escolher não atendê-lo, na esperança de que outro mentor o pegue, ou ele pode servir de motivação para você mesmo tentar o exercício.
Uma coisa que pode ajudar é olhar a solução enviada.
Ela pode usar uma abordagem na qual você não tinha pensado, e essa abordagem pode tornar o exercício mais atraente para você resolver.
Mas, se você olhar o código e ainda não tiver interesse em resolver o exercício, não há problema nenhum.
Só porque você olhou um pedido de mentoria não significa que você precise clicar no botão "Iniciar mentoria".

[website-copy]: https://github.com/exercism/website-copy/tree/main/tracks
[jsbench-me]: https://jsbench.me/
[criterion]: https://crates.io/crates/criterion
[cargo-bench]: https://doc.rust-lang.org/cargo/commands/cargo-bench.html
[rust-benchmark-tests]: https://doc.rust-lang.org/unstable-book/library-features/test.html

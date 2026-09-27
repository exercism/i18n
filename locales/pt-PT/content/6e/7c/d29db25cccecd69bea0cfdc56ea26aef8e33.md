# Dicas de mentoria

## Notas de mentoria

Uma das maiores ajudas para a mentoria pode ser teres um ficheiro para guardar notas de cada exercício que mentoras.
Podes descobrir que muitas soluções beneficiam das mesmas sugestões, por isso, ao manteres notas, não precisas de estar sempre a escrever as mesmas sugestões de memória.
E, ao teres as sugestões num só sítio, podes ir aperfeiçoando-as ao longo do tempo para as tornar mais claras.

Se não tiveres a certeza de como começar as tuas notas, podes encontrar um ficheiro `mentoring.md` para o exercício do teu percurso em [exercism/website-copy/tracks][website-copy].
Se existir, pode incluir exemplos de soluções razoáveis, juntamente com sugestões comuns e pontos de conversa para promover mais discussão.
Se não existir, podes querer voltar atrás e criar um depois de teres feito o teu próprio ficheiro de notas para esse exercício.

Além disso, mesmo que agora só mentoras uma linguagem, podes vir a mentorar mais no futuro.
Pode ajudar organizares as tuas notas de mentoria por percurso, bem como por nome de exercício, já que percursos diferentes vão provavelmente exigir sugestões diferentes para o mesmo exercício.

As notas de mentoria são úteis, quer mentoras o exercício com frequência, quer raramente.
Se mentoras o exercício com frequência, poupas muito tempo a escrever de raiz, quando podes simplesmente copiar e colar das tuas notas.
Se mentoras o exercício raramente, as notas podem lembrar-te de sugestões a fazer que possas ter esquecido nas semanas ou meses desde a última vez que o mentoraste.

Não há problema que as notas de mentoria sejam diferentes entre mentores.
Eis uma forma de as estruturar, mas não é a _única_ forma.

Dá os parabéns ao mentorado por ter passado nos testes (se é que passou).

Se o exercício estiver na fila há alguns dias, talvez o abordes com algo como:

>Desculpa a demora até alguém te responder.
>De momento há uma falta de mentores de JavaScript ativos para `Resistor Color Duo`.

Enumera aquilo de que gostas na solução do mentorado.
Por exemplo:

- Gosto que esta solução seja sucinta e legível.

- Gosto do uso de `indexOf`.

- Gosto de isto usar a abordagem `(first * 10) + second` para evitar converter de número para string e de volta a número.

- Gosto de isto não usar ciclos/iteração.

- Gosto do parâmetro desestruturado.

A seguir podem vir as tuas sugestões mais frequentes.

~~~~exercism/note
Pode ser muito útil para o mentorado se forneceres uma ligação para cada nova funcionalidade da linguagem que apresentas.
Por exemplo:

>Não é necessário para este exercício, mas talvez consideres converter a função numa [função arrow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
~~~~

Embora não queiramos revelar a solução, por vezes o mentorado aprende melhor com exemplos.
Colocar um excerto de código numa secção de detalhes recolhida pode fornecer esse exemplo, que o mentorado pode optar por expandir ou não.
Por exemplo:

&lt;details&gt;&lt;summary&gt;Exemplo de spoiler&lt;/summary&gt;

&lt;pre&gt;

export const decodedValue = ([firstColor, secondColor]) =>
  COLORS.indexOf(firstColor) * 10 + COLORS.indexOf(secondColor)

&lt;/pre&gt;

&lt;/details&gt;

Perto do fim das notas, podes incluir uma ligação para uma solução publicada que represente as sugestões na íntegra.

Mesmo no fundo das tuas notas, podes querer colocar explicações mais longas que os mentorados às vezes pedem.
Estas explicações não aparecem muitas vezes, mas ainda assim pode ser bom registá-las na primeira vez que as usas, para que da próxima vez, que pode ser daqui a semanas ou meses, não tenhas de as criar de raiz.
Por exemplo, às vezes um mentorado pergunta como a abordagem da multiplicação funcionaria para o Duo de Cores do Resistor se o preto fosse a primeira faixa para um zero à esquerda:

>O preto como primeira faixa é um bom ponto a considerar, por isso vamos considerá-lo.
>A cor do resistor serve para representar a quantidade de ohms do resistor,
>e um zero à esquerda não seria usado num resistor com várias faixas.
>Por isso o preto não seria uma primeira faixa.
>Além disso, `parseInt` ou `Number` também removem o zero à esquerda.

Uma categoria opcional de dados a guardar nas notas de mentoria é um registo de benchmarks para várias soluções ou abordagens.

## Benchmarks

Uma preocupação comum dos mentorados é o desempenho da sua solução.
É especialmente o caso das linguagens "de mais baixo nível", como C, C++, Go e Rust.
A par de quão idiomático é o seu código, os mentorados de outras linguagens também se preocupam muitas vezes com a eficiência do código.

~~~~exercism/note
Fazer benchmarks não é algo que se _espere_ que um mentor faça.
No entanto, os mentorados ficam muitas vezes particularmente impressionados com a forma como um benchmark da sua solução se compara com outras abordagens.
~~~~

O Go é um percurso especialmente amigável para fazer benchmarks, já que estes são muitas vezes incluídos no ficheiro de testes.
Outras linguagens podem exigir alguma pesquisa para determinar qual o método que funcionaria melhor para ti.
Por exemplo, se só usares o editor online, vais procurar um sítio para correr benchmarks online.
Por exemplo, o [JSBench.me][jsbench-me] é uma ferramenta de benchmark online para JavaScript.

Se correres código localmente, tens a opção de transferir software de benchmark que podes correr na tua máquina.
Por exemplo, o Rust pode usar o [Criterion][criterion], ou [cargo bench][cargo-bench] com [testes de benchmark][rust-benchmark-tests].

Há pelo menos algumas formas de manteres um registo dos benchmarks.
Uma forma é manteres uma lista contínua de todos os que avalias, mas isso pode tornar-se difícil de gerir se a lista ficar longa.
Outra forma é manteres uma lista de benchmarks representativos das diferentes abordagens.
Os mentorados querem muitas vezes ver o código das abordagens mais rápidas, por isso, se uma abordagem mais rápida estiver publicada, será provavelmente muito apreciado forneceres a ligação para ela.

~~~~exercism/caution
Se forneceres uma ligação para uma solução que avaliaste, certifica-te de que forneces uma ligação para a solução publicada e não para a sessão de mentoria.
Nem todas as soluções mentoradas são publicadas.
~~~~

## Notas de mentoria que não são específicas de um exercício

Pode haver funcionalidades da linguagem que te vejas a abordar em mais do que um exercício.
Quando estiveres prestes a copiar e colar uma sugestão de um ficheiro para outro, talvez consideres colocá-la num ficheiro próprio.
Mais uma vez, uma vantagem de manteres uma sugestão num só sítio é tornar mais fácil aperfeiçoá-la ao longo do tempo.
Também torna mais fácil de encontrar quando a usas num exercício em que nunca a tinhas usado antes.
Em vez de tentares lembrar-te em que exercício abordaste a sugestão antes, podes ir diretamente ao ficheiro da própria sugestão.

## Quando um mentorado tem uma pergunta

Os mentorados são encorajados a especificar o que esperam obter da sessão de mentoria.
Muitas vezes, expressam isso sob a forma de uma pergunta.
Se a pergunta for sobre algo cuja resposta não sabes e que não te interessa, não há problema em deixar o pedido de mentoria para outro mentor.

Se não souberes a resposta mas quiseres descobri-la, talvez seja melhor não aceitares o pedido de mentoria até teres aprendido a resposta.
Se, entretanto, o pedido de mentoria já tiver sido aceite por outra pessoa, pelo menos aprendeste algo e não fizeste o mentorado esperar.

Uma exceção a isto pode ser o caso de o pedido de mentoria já estar na fila há vários dias ou mais.
Nessa situação, podes querer aceitar o pedido de mentoria e dar o feedback que conseguires, e avisar o mentorado de que voltarás a falar com ele sobre a sua pergunta.
Claro que é importante dar seguimento a isso, quer para informar o mentorado da resposta, quer para lhe dizeres que não a conseguiste encontrar.
Se não conseguiste encontrar a resposta, pode ser útil para o mentorado descreveres os caminhos que seguiste para tentar encontrá-la.
O mentorado pode responder com outras formas de tentar encontrar a resposta.
Entre os dois, podem acabar por encontrar a resposta.

Se esgotaste todas as formas que conheces de encontrar a resposta, podes sugerir ao mentorado que termine a discussão e volte a submeter o pedido, na eventualidade de outro mentor poder dar a resposta.
Se quiser, o mentorado pode publicar na discussão terminada para partilhar a resposta contigo assim que a souber.
E, do mesmo modo, se souberes a resposta mais tarde, podes voltar à discussão terminada e avisar o mentorado.

Se souberes a resposta e quiseres abordá-la, um bom momento para o fazer é entre dizeres ao mentorado o que gostas na solução dele e apresentares sugestões de outras abordagens.

### Código que falha

O código pode falhar porque não passa em todos os testes ou porque não compila ou não satisfaz o intérprete.

Diferentes mentores terão maior ou menor inclinação e/ou paciência para lidar com código que falha, o que pode depender um pouco da forma como é apresentado, já que o código que falha nem sempre é apresentado da mesma maneira.

Às vezes, um mentorado diz que tentou outra abordagem e que não funcionou, e pergunta por que razão não funcionou.
Pode até nem fornecer o código, ou pode publicá-lo num comentário praticamente ilegível em vez de o fazer numa iteração.

Uma solução testada no editor web só pode ser submetida para um pedido de mentoria se tiver passado em todos os testes.
Uma das razões é para que o mentor se possa concentrar em sugerir melhorias ou outras abordagens ao código que já funciona.
_Fazer debug_ de código não é necessariamente algo que um mentor queira ou se espere que faça.
No entanto, uma solução que falha submetida através da CLI pode ser submetida para um pedido de mentoria, com o mentorado a pedir ajuda para a resolver.

Se o código que falha não tiver sido fornecido, e a abordagem que falhou, tal como descrita, não parecer boa, pode ser suficiente sugerir que, em vez de usarem a abordagem que falhou, outra abordagem poderia ser uma que não seja nem a que falhou nem a que usaram e que passou.
Ou pode ser suficiente explicar porque é que a abordagem que usaram é melhor do que a que falhou, sem entrar em detalhes sobre qual era o bug na abordagem que falhou.

Por exemplo, uma ocorrência comum é os mentorados terem dificuldades com o Nome do robô.
Ou os testes dão tempo limite excedido, ou não conseguem gerar nomes suficientes, e querem saber como corrigir isso.
Se tiveres inclinação e paciência, podes certamente analisar o código e sugerir como resolver o problema.
Ou podes explicar que verificar nomes gerados aleatoriamente causa mais colisões à medida que se geram mais nomes, e sugerir que outra abordagem poderia ser gerar os nomes sequencialmente e depois baralhá-los.

Se o código que falha tiver sido colado num comentário praticamente ilegível, podes querer dar o feedback que conseguires sobre a solução que passa, e sugerir que submetam o código do comentário como outra iteração.
Também podes sugerir que o mentorado verifique depois os erros da iteração que falha, como guia para onde está o problema.

Se o código estiver numa iteração que falha, pode ser útil indicar ao mentorado que verifique os erros da execução dos testes.
Algumas linguagens precisam de um pouco mais de orientação sobre como ler erros ou resultados de testes do que outras.
Pode ser útil citar uma ou mais partes dos erros e explicar ao mentorado o que significam.

Em última análise, não é responsabilidade do mentor corrigir o código que falha do mentorado, mas o mentor, se quiser, pode sugerir ao mentorado formas de o corrigir sozinho.

## Lidar com o continuum da fila

Pode acontecer inscreveres-te para mentorar um percurso, mas nunca vês exercícios na respetiva fila para mentorar.
Podes pensar que algo está errado, mas há pelo menos algumas razões para isso.
Uma razão é que as pessoas podem não estar a pedir mentoria no percurso por agora.
Às vezes, um percurso pode ter períodos de inatividade.
Outra razão é que outros mentores podem estar a aceitar os pedidos antes de os veres.
É provável que aconteça num percurso popular que tem muitos mentores ativos.

Se houver muitos pedidos na fila, há algumas formas de os mentorar.
Podes querer começar pelos mais antigos e ir até aos mais recentes, para que quem esperou mais tempo seja atendido primeiro.
Ou podes optar por ir dos mais recentes para os mais antigos, especialmente se os mais antigos já estiverem à espera há muito tempo.
Assim, as pessoas que estiveram ativas recentemente não têm de esperar que o acumulado seja tratado.

Se houver vários pedidos para o mesmo exercício, podes querer tratá-los em lotes do mesmo exercício para manteres o foco, em vez de passares do exercício A para o exercício B e voltares ao exercício A.

Pode acontecer que um pedido para um exercício em que não estás interessado esteja ali parado há dias ou semanas.
Podes optar por não o abordar, na esperança de que outro mentor o aceite, ou pode servir de motivação para experimentares resolver tu o exercício.
Uma coisa que pode ser útil é olhares para a solução submetida.
Pode usar uma abordagem em que não tinhas pensado, e essa abordagem pode tornar a resolução do exercício mais atrativa para ti.
Mas, se olhares para o código e continuares sem interesse em resolver o exercício, não há mal nenhum.
Só porque olhas para um pedido de mentoria não significa que tenhas de clicar no botão "Começar a mentorar".

[website-copy]: https://github.com/exercism/website-copy/tree/main/tracks
[jsbench-me]: https://jsbench.me/
[criterion]: https://crates.io/crates/criterion
[cargo-bench]: https://doc.rust-lang.org/cargo/commands/cargo-bench.html
[rust-benchmark-tests]: https://doc.rust-lang.org/unstable-book/library-features/test.html

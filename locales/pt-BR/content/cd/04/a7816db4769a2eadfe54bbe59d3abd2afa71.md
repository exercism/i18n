**Alerta de spoiler: este artigo contém spoilers do exercício Grãos em geral e, mais especificamente, do exercício Grãos da trilha de Bash. Se você ainda não o concluiu e não quer que algumas soluções lhe sejam mostradas, volte quando tiver terminado!**

É seu primeiro dia em uma empresa nova.  Você já cuidou de toda a papelada, conheceu a equipe e, finalmente, chegou a hora de sentar e começar a ler um pouco do código com o qual vai trabalhar.  Você começa a ler as diferentes funções, classes e módulos e, conforme lê, você se pega apertando os olhos para a tela, sem entender nada.  Você continua lendo, e uma única palavra escapa da sua boca, mal falada, quase sussurrada: "Quêêêêêêêê..."[^1]  Quanto mais você avança, mais isso acontece, e o desnorteamento aumenta, até virar um pouco de raiva.

> O que está acontecendo neste código?

Sempre que mais de uma pessoa trabalha no mesmo trecho de código, a quantidade de cuidado e de intenção necessária para manter tudo administrável aumenta *muito*.  Não é mais o conceito que vive na sua cabeça e o código que só precisa fazer esse conceito acontecer.  Agora, o conceito precisa viver *dentro do código*, onde todos os colaboradores possam vê-lo e alterá-lo se for preciso.

*Como* você implementa algo não significa muito para o usuário final, mas deveria comunicar *muita coisa* a todo engenheiro que encostar no seu projeto em qualquer momento.  Muitas vezes há várias formas de alcançar a mesma funcionalidade, e pode parecer que qualquer uma das opções bastaria para fazer o trabalho.  No entanto, acredito que cada decisão que você toma deve ter um motivo (mesmo que seja uma decisão pequena com um motivo pequeno), e esse motivo deve comunicar um objetivo ou um requisito.

A ideia de que os detalhes de implementação devem ajudar quem lê o código a perceber o processo de raciocínio, os objetivos e as prioridades se chama **intenção de projeto**.  Como você nomeia suas variáveis, quais parâmetros sua função recebe e como as coisas são abstraídas são todos pontos onde a intenção de projeto pode se expressar, bem ou mal.

Acredito firmemente que a intenção de projeto é uma das coisas mais importantes a se considerar ao implementar um projeto de engenharia.  É uma das coisas que diferencia a Engenharia de Software da programação.

 > Engenharia de software é o que acontece com a programação quando você adiciona tempo e outros programadores.
 >
 > [Russ Cox](https://research.swtch.com/vgo-eng)

## A intenção de projeto é multidisciplinar

Trabalho como engenheiro mecânico, projetando [moldes de injeção](https://youtu.be/WHwTHarf8Ck?t=51), principalmente para dispositivos médicos.  Todos os meus projetos, quando ficam prontos, saem direto porta afora para a oficina de usinagem, onde começam a produzir todas as peças e a montá-las.  Como eles não sabem tudo o que passou pela minha cabeça enquanto eu criava cada projeto, preciso dar um jeito de *mostrar* minha intenção por meio do próprio projeto.

Muitas vezes, alguns detalhes são especialmente críticos.  Ou o cliente disse que precisa de tolerâncias bem apertadas ali, ou a forma como o molde se encaixa exige precisão extrema por algum motivo.  Então, para ajudar os mecânicos a produzir as peças de um jeito que priorize a precisão nas partes importantes, preciso deixar pontos especificamente esquadrejados ou fáceis de prender na morsa de uma certa maneira.  Assim, o caminho mais fácil para eles produz o melhor resultado para mim.

Também há pontos em que as dimensões não são tão críticas.  Por exemplo, se eu fizer um furo no projeto que serve só de respiro de ar, vou fazê-lo de um tamanho bem comum, tipo 6mm.

Quando eles usinam esse furo e vão medir como ele ficou, se virem um número tipo 5,99mm, vão pensar: "OK, isso provavelmente era para ser 6mm, então estou bem perto", e nem vão precisar conferir de novo as dimensões no CAD ou no desenho de especificação.  Já se eu fizesse algo incomum, tipo 5,87mm, eles olhariam para o furo e teriam esta reação inicial:

1. Opa, será que saiu muito abaixo da medida?  Era para ser 6mm?
2. (Eles vão conferir o CAD e veem que o furo está bom e que é só um tamanho incomum.)
3. Hmmm.  Esse furo deve ter um tamanho incomum por algum motivo.  Talvez seja muito importante, ou o cliente pediu um furo especial aqui.  Vou ter que falar com o Ryan para ver o que tem de tão importante nesse furo.
4. (PAM!  Eles põem o bloco de alumínio na minha mesa delicadamente.)
5. (Eles descobrem que não há nada de importante nesse furo, que eu simplesmente escolhi um tamanho estranho, e que todo esse trabalho e preocupação extras foram em vão.)
6. Puxa, esse tal de Ryan, viu, é um caso à parte. (resmunga, fala um palavrão, resmunga)

Tudo isso acontece porque cada decisão do meu projeto comunica algo às outras pessoas que olham para ele e trabalham nele, quer eu queira que comunique ou não.  Elas *precisam* ver significado nele, porque é a única informação que têm para se guiar!  Então, é muito melhor se eu puder dedicar um tempo para colocar informação *significativa* e **intencional** no meu projeto.

## Grãos: uma introdução

Agora, vamos falar de como a intenção de projeto pode ser comunicada no código, usando um exemplo de um dos exercícios do Exercism.  Recentemente, trabalhei com um estudante na solução dele para o exercício *Grãos* da trilha de Bash.  *Grãos* é um exercício que trata do [problema do trigo e do tabuleiro de xadrez](https://en.wikipedia.org/wiki/Wheat_and_chessboard_problem).  Em resumo, um grão de trigo é colocado na primeira casa de um tabuleiro de xadrez.  Dois grãos vão na casa seguinte.  Quatro grãos vão na próxima casa.  E assim por diante, com cada casa tendo o dobro dos grãos da anterior.  Pede-se aos estudantes que encontrem uma forma de calcular o valor de cada casa individualmente, bem como o número total de grãos no tabuleiro.

Esse estudante em particular bolou uma forma bem esperta de calcular o total.

```bash
bc <<< 'ibase=16;FFFFFFFFFFFFFFFF'
```

O `bc` é uma calculadora de linha de comando.  Você pode passar a ele strings de aritmética, e ele as avalia, até mesmo para inteiros muito grandes e números de ponto flutuante.  Existem outras formas de fazer cálculos sem usar o `bc` no Bash, mas, por questão de simplicidade, vamos ver como a intenção pode ser comunicada, ou não, ao usar o `bc`.

Essa solução funciona porque todo o exercício gira em torno de potências de dois.  E onde há potências de dois, há binário; e onde há binário, há hexadecimal[^2]!

É uma solução esperta, mas o que o código está nos dizendo?  Que o hexadecimal é importante aqui?  Que o problema gira fundamentalmente em torno de 16?  Depois de reler o enunciado do problema, fica bem claro que nenhuma das duas coisas é o caso.  O estudante e eu fizemos um brainstorming de algumas ideias para comunicar a intenção com mais clareza.  Aqui estão algumas coisas que surgiram:

### Primeira opção: binário

Como temos um monte de coisas dobrando (e, portanto, um monte de potências de 2), vamos olhar o que acontece em binário para ver se isso ajuda.

---

A primeira casa tem 1 grão.  Em binário, isso também seria `0b1` (o `0b` significa apenas "isto é um número binário", e o número em si é `1`).

A segunda casa tem 2 grãos.  Em binário, `0b10`.  O total até agora é 3 (ou `0b11`).

A terceira casa tem 4 (`0b100`) grãos.  Total até agora: 7 (`0b111`).

A quarta casa tem 8 grãos (`0b1000`).  Total até agora: 15 (`0b1111`).

---

Você consegue enxergar o padrão?

Cada casa representa mais um dígito binário, e somar todas juntas resulta só em um monte de 1's.

Na solução do estudante, poderíamos substituir os F's por 64 1's (um para cada casa)!

```bash
bc <<< "ibase=2;1111111111111111111111111111111111111111111111111111111111111111"
```

Mais intencional, porque corresponde mais de perto ao que o problema nos dá.  Mas nós não falamos robô.  Uma string longa e praticamente incontável de 1's talvez não seja uma melhoria.

### Segunda opção: o cálculo por força bruta

OK, então talvez a gente abandone de vez os sistemas de numeração não decimal.  Por que não fazer o código corresponder à forma como somaríamos à mão o número de grãos de um tabuleiro de xadrez, contando os grãos de cada casa?

```bash
total=0
current_grains=1
for square in {1..64}; do
  total=$( bc <<< "$total + $current_grains" )
  current_grains=$( bc <<< "$current_grains * 2" )
done
echo "$total"
```

Isso é muito mais legível e compreensível.  O código mostra claramente que o número de casas do tabuleiro de xadrez é um fator determinante, assim como o efeito de dobrar a cada casa.  Acho isso melhor do que a solução inicial.

Porém.

É lento.  Fazer laço, somar e chamar repetidamente um comando externo?  Tudo isso se acumula em um tempo de execução meio lento.  Bom, isso é um grande problema?  Não.  Se você está escrevendo um script disso em Bash, provavelmente já decidiu que não tem restrições de velocidade.  Mas poderia ser melhor?  Sim.

### Terceira opção: cálculo direto

Então, como somamos tudo isso sem iterar?

Vamos considerar uma versão *menor* do mesmo problema: um tabuleiro de xadrez com 5 casas[^3].

As cinco casas teriam o seguinte número de grãos:

```txt
---------------------
| 1 | 2 | 4 | 8 |16 |
---------------------
```

E o total aqui seria: 1 + 2 + 4 + 8 + 16 = 31.  Hm.  O 31 ainda não me grita nada óbvio.  Vamos aumentar um pouco.

OK, e que tal um tabuleiro de xadrez de 6 casas?  Desta vez, vou mostrar o total acumulado embaixo de cada casa para ajudar a somar.

```txt
-------------------------
| 1 | 2 | 4 | 8 |16 |32 |
|   | 3 | 7 |15 |31 |63 |
-------------------------
```

E a soma: 1 + 2 + 4 + 8 + 16 + 32 = 63.  Hmm... na verdade, estou começando a enxergar um vislumbre de padrão, mas vamos fazer mais um só para ter certeza.

7 casas:

```txt
-----------------------------
| 1 | 2 | 4 | 8 |16 |32 |64 |
|   | 3 | 7 |15 |31 |63 |127|
-----------------------------
```

1 + 2 + 4 + 8 + 16 + 32 + 64 = 127.  Você vê?  Alguma coisa soa um alarme com os valores 31, 63, 127?

Eles são *quase* potências de 2.  Na verdade, são *uma unidade menos* que a *próxima* potência de dois.

Mais um exemplo, para deixar isso bem claro.  Imagine um tabuleiro de xadrez de 12 casas.  Isso é um, dobrado 11 vezes (o que, no mundo da matemática, é 2^11): 2048.  Dobre de novo e você chega a 4096 (2^12).  Então... se acertamos o padrão, o total acumulado ficaria *uma unidade abaixo* de 4096, também conhecido como 4095.  E, se somarmos tudo, é exatamente isso que obtemos: 1 + 2 + 4 + 8 + 16 + 32 + 64 + 128 + 256 + 512 + 1024 + 2048 = 4095.

> Dito de outra forma, para encontrar o total de todas as `n` casas, você precisa subir uma potência de dois e subtrair 1 do resultado.

O número de grãos na casa 64 é 2^63 (indexação a partir do zero, lembra?).  Entãããão, se quisermos calcular o total de grãos em todas as casas até a casa 64, precisamos calcular 2^64 e subtrair 1.

Bum.

No Bash, vai ficar assim:

```bash
bc <<< "2^64 - 1"
```

Isso faz sentido quando você confirma o que acontece com o binário.  Em binário, qual era o total de todas as 64 casas?

```txt
0b1111...  # 64 ones
```

Qual é o número de grãos na hipotética 65ª casa?

```txt
0b10000... # 1 and 64 zeros
```

Como você sai de 1 e 64 zeros para chegar a 64 uns?  Você subtrai 1.

E que benefício adicional isso nos traz?  Bom, agora temos uma expressão para o total que é agradável e legível.  Ela não itera, então o desempenho é bom.  E contém o número 64, que é o número de casas de um tabuleiro de xadrez, o que é um bom exemplo de **intenção de projeto** bem sinalizada.  Se, por algum motivo, daqui a 1000 anos o mundo padronizar um tabuleiro de xadrez 7x7, esse engenheiro do futuro (provavelmente usando Bash 6.1) vai olhar o script, entender a sua intenção e trocar o 64 por 49.  Tudo certo!

## Seja intencional, pessoal

Ao elaborar uma implementação, é fácil jogar as coisas de qualquer jeito e se agarrar à primeira solução que funciona.  Isso é tranquilo enquanto você está explorando o problema, mas, depois de entender bem os componentes críticos, se você tiver tempo para dar um bom acabamento às coisas, garanta que cada algoritmo, cada nome de variável e até o seu espaçamento pintem um quadro do problema, dos requisitos críticos e de como todas as peças se encaixam.

[^1]: Veja também a [tirinha de Thom Holwerda](https://www.osnews.com/story/19266/wtfsm/).

[^2]: Se você está um pouco enferrujado na contagem em binário e hexadecimal, @kytrinyx recomenda o livro [How to Count](https://www.amazon.com/Count-Programming-Mere-Mortals-Book-ebook/dp/B005DPIKPE).  Como uma autopromoção descarada, eu também escrevi recentemente [alguns posts de blog sobre binário e hexadecimal](https://www.assertnotmagic.com/2018/09/10/binary-hexadecimal-part-1/).

[^3]: Não sei como isso funcionaria.  Talvez pudéssemos simplesmente fazer os peões se enfrentarem em justas.

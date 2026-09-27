**Alerta de spoilers: este artigo contém spoilers sobre o exercício Grains em geral e, em particular, sobre o exercício Grains no percurso de Bash. Se ainda não o completaste e não queres que te mostrem algumas soluções, volta quando o tiveres terminado!**

É o teu primeiro dia numa empresa nova. Já trataste de toda a papelada, conheceste a equipa e, finalmente, chegou a hora de te sentares e começares a ler algum do código com que vais trabalhar. Começas a ler as diferentes funções, classes e módulos e, à medida que lês, dás por ti a semicerrar os olhos para o ecrã, baralhado. Continuas a ler e escapa-se-te da boca uma única palavra, mal pronunciada, quase apenas soprada: «Quêêêêêê...»[^1] Quanto mais avanças, mais isto acontece, à medida que ficas mais perplexo e até um pouco irritado.

> O que se passa neste código?

Sempre que mais do que uma pessoa trabalha no mesmo código, a quantidade de cuidado e de deliberação necessária para manter as coisas tratáveis aumenta *imenso*. Já não basta o conceito que vive na tua cabeça e o código que só tem de o concretizar. Agora, o conceito tem de viver *dentro do código*, onde todos os colaboradores o possam ver e alterar se for preciso.

*A forma como* implementas algo não significa muito para o utilizador final, mas devia dizer *imenso* a qualquer engenheiro que, em algum momento, mexa no teu design. Muitas vezes há imensas formas de obter a mesma funcionalidade, e pode parecer que qualquer uma das opções chegava para fazer o trabalho. No entanto, acredito que cada decisão que tomas deve ter uma razão (mesmo que seja uma decisão pequena com uma razão pequena), e essa razão deve comunicar um objetivo ou um requisito.

A ideia de que os detalhes de implementação devem ajudar quem lê o código a perceber o processo de pensamento, os objetivos e as prioridades chama-se **intenção de design**. A forma como dás nomes às variáveis, os parâmetros que a tua função recebe e o modo como as coisas são abstraídas são todos sítios onde a intenção de design pode ser expressa, bem ou mal.

Acredito firmemente que a intenção de design é uma das coisas mais importantes a considerar ao implementar um projeto de engenharia. É uma das coisas que distingue a Engenharia de Software da programação.

 > A engenharia de software é o que acontece à programação quando lhe acrescentas tempo e outros programadores.
 >
 > [Russ Cox](https://research.swtch.com/vgo-eng)

## A intenção de design atravessa disciplinas

Trabalho como engenheiro mecânico, a conceber [moldes de injeção](https://youtu.be/WHwTHarf8Ck?t=51), sobretudo para dispositivos médicos. Todos os meus projetos, quando ficam prontos, saem porta fora diretamente para a oficina, onde começam a fazer todas as peças e a montá-las. Como não sabem tudo o que me passou pela cabeça enquanto criava cada projeto, tenho de arranjar forma de *mostrar* a minha intenção através do próprio design.

Muitas vezes, certas características são especialmente críticas. Ou o cliente disse que precisa ali de tolerâncias apertadas especiais, ou a forma como o molde se encaixa exige, por alguma razão, uma exatidão extrema. Por isso, para ajudar os maquinistas a fazer as peças de modo a darem prioridade à exatidão nas partes importantes, tenho de deixar zonas especificamente quadradas ou fáceis de prender num torno de bancada de determinada maneira. Assim, o caminho mais fácil para eles produz os melhores resultados para mim.

Também há zonas onde as dimensões não são tão críticas. Por exemplo, se fizer um furo no projeto que serve apenas de respiro de ar, faço-o numa medida comum e certinha, como 6 mm.

Quando estão a maquinar este furo e vão medir como ele ficou, se virem um número como 5,99 mm, pensam: «OK, este devia ser de 6 mm, por isso estou muito perto», e nem precisam de ir confirmar as dimensões no CAD ou no desenho de especificação. Em vez disso, se eu fizesse algo pouco comum, como 5,87 mm, olhariam para aquilo e teriam esta reação inicial:

1. Oh, raios, fiquei muito abaixo da medida? Era suposto ser 6 mm?
2. (Vão verificar o CAD e reparam que o furo deles está bem e que é apenas uma medida pouco comum.)
3. Hmmm. De certeza que este furo tem uma medida pouco comum por alguma razão. Talvez seja mesmo importante, ou o cliente pediu um furo especial aqui. Vou ter de falar com o Ryan e ver o que este furo tem de tão importante.
4. (SLAM! Pousam o bloco de alumínio na minha secretária com toda a delicadeza.)
5. (Descobrem que este furo não tem nada de importante, que eu escolhi uma medida estranha e que todo este trabalho e preocupação extra foi em vão.)
6. Eh, pá, esse Ryan é mesmo uma peça. (resmungos, asneira, resmungos)

Tudo isto acontece porque cada decisão do meu projeto comunica algo às outras pessoas que o veem e trabalham com ele, quer eu queira ou não. *Têm* de ver significado nele, porque é a única informação de que dispõem! Por isso, é muito melhor se eu conseguir arranjar tempo para colocar informação significativa e **intencional** no meu projeto.

## Grains: uma introdução

Agora, vamos falar de como a intenção de design pode ser comunicada no código, usando um exemplo de um dos exercícios do Exercism. Trabalhei recentemente com um estudante na solução dele para o exercício *Grains* no percurso de Bash. *Grains* é um exercício que aborda o [problema do trigo e do tabuleiro de xadrez](https://en.wikipedia.org/wiki/Wheat_and_chessboard_problem). Resumindo, coloca-se um grão de trigo na primeira casa de um tabuleiro de xadrez. Dois grãos vão para a casa seguinte. Quatro grãos vão para a casa a seguir. E assim por diante, com cada casa a ter o dobro dos grãos da anterior. Pede-se aos estudantes que encontrem uma forma de calcular o valor de cada casa individual, bem como o total geral de grãos no tabuleiro.

Este estudante em particular arranjou uma forma bastante engenhosa de calcular o total.

```bash
bc <<< 'ibase=16;FFFFFFFFFFFFFFFF'
```

O `bc` é uma calculadora de linha de comandos. Podes passar-lhe expressões aritméticas e ele avalia-as, mesmo para números inteiros muito grandes e números de vírgula flutuante. Há outras formas de fazer cálculos sem usar o `bc` em Bash, mas, para simplificar, vamos ver como a intenção pode ser comunicada, ou não, ao usar o `bc`.

Esta solução funciona porque todo o exercício gira em torno de potências de dois. E onde há potências de dois há binário, e onde há binário há hexadecimal[^2]!

É uma solução engenhosa, mas o que é que o código nos diz? Que o hexadecimal é importante aqui? Que o problema gira fundamentalmente em torno do 16? Depois de reler o enunciado do problema, é bastante claro que nenhuma das duas coisas é verdade. O estudante e eu fizemos uma chuva de ideias sobre formas de comunicar a intenção com mais clareza. Aqui ficam algumas das coisas que nos surgiram:

### Primeira opção: binário

Como temos várias coisas a duplicar (e, portanto, várias potências de 2), vamos ver o que se passa em binário, a ver se isso ajuda.

---

A primeira casa tem 1 grão. Em binário, isto também seria `0b1` (o `0b` significa apenas «isto é um número binário», sendo o número propriamente dito o `1`).

A segunda casa tem 2 grãos. Em binário, `0b10`. O total até agora é 3 (ou `0b11`).

A terceira casa tem 4 grãos (`0b100`). Total até agora: 7 (`0b111`).

A quarta casa tem 8 grãos (`0b1000`). Total até agora: 15 (`0b1111`).

---

Consegues ver o padrão?

Cada casa representa mais um algarismo binário, e somá-los todos dá apenas uma série de 1s.

Na solução do estudante, podíamos substituir os F por 64 1s (um por cada casa)!

```bash
bc <<< "ibase=2;1111111111111111111111111111111111111111111111111111111111111111"
```

Mais intencional, porque corresponde mais de perto ao que o problema nos dá. Mas nós não falamos robô. Uma longa sequência de 1s, praticamente impossível de contar, talvez não seja uma melhoria.

### Segunda opção: o cálculo por força bruta

OK, então talvez abandonemos por completo os sistemas de numeração não decimais. Porque não fazemos com que o código corresponda à forma como somaríamos à mão o número de grãos num tabuleiro de xadrez, contando os grãos de cada casa?

```bash
total=0
current_grains=1
for square in {1..64}; do
  total=$( bc <<< "$total + $current_grains" )
  current_grains=$( bc <<< "$current_grains * 2" )
done
echo "$total"
```

Isto é muito mais legível e compreensível. O código mostra claramente que o número de casas do tabuleiro de xadrez é um fator determinante, tal como o efeito de duplicação em cada casa. Acho que isto é melhor do que a solução inicial.

No entanto.

É lento. Fazer ciclos, somar e chamar repetidamente um comando externo? Tudo isso se acumula num tempo de execução algo lento. Agora, isso é assim tão grave? Não. Se estás a fazer um script disto em Bash, provavelmente já decidiste que não tens restrições de velocidade. Mas podia ser melhor? Podia.

### Terceira opção: cálculo direto

Então, como somamos tudo isto sem iterar?

Consideremos uma versão *mais pequena* do mesmo problema: um tabuleiro de xadrez com 5 casas[^3].

As cinco casas teriam o seguinte número de grãos:

```txt
---------------------
| 1 | 2 | 4 | 8 |16 |
---------------------
```

E o total aqui seria: 1 + 2 + 4 + 8 + 16 = 31. Hm. O 31 ainda não me diz nada de óbvio. Vamos aumentar um pouco.

OK, e que tal um tabuleiro de xadrez com 6 casas? Desta vez, mostro o total acumulado por baixo de cada casa, para nos ajudar a somar.

```txt
-------------------------
| 1 | 2 | 4 | 8 |16 |32 |
|   | 3 | 7 |15 |31 |63 |
-------------------------
```

E a soma: 1 + 2 + 4 + 8 + 16 + 32 = 63. Hmm... Na verdade, estou a começar a vislumbrar um padrão, mas vamos fazer mais um só para ter a certeza.

7 casas:

```txt
-----------------------------
| 1 | 2 | 4 | 8 |16 |32 |64 |
|   | 3 | 7 |15 |31 |63 |127|
-----------------------------
```

1 + 2 + 4 + 8 + 16 + 32 + 64 = 127. Vês? Alguma coisa te faz soar alarmes com os valores 31, 63, 127?

São *quase* potências de 2. Na verdade, são *uma unidade menos* do que a potência de dois *seguinte*.

Mais um exemplo, para ficar bem claro. Imagina um tabuleiro de xadrez com 12 casas. Isso é um, duplicado 11 vezes (o que, no mundo da matemática, é 2^11): 2048. Duplica isso outra vez e obténs 4096 (2^12). Então... se acertámos no padrão, o total acumulado seria *uma unidade abaixo* de 4096, também conhecido como 4095. E, se fizermos as contas, é exatamente isso que obtemos: 1 + 2 + 4 + 8 + 16 + 32 + 64 + 128 + 256 + 512 + 1024 + 2048 = 4095.

> Por outras palavras, para encontrar o total de todas as `n` casas, tens de subir uma potência de dois e subtrair 1 ao resultado.

O número de grãos na casa 64 é 2^63 (índices a começar em zero, lembras-te?). Portaaaaanto, se quisermos calcular o total de grãos em todas as casas *até* à casa 64, temos de calcular 2^64 e subtrair 1.

Pimba.

Em Bash, ficará assim:

```bash
bc <<< "2^64 - 1"
```

Isto faz sentido quando confirmas o que se passa em binário. Em binário, qual era o total de todas as 64 casas?

```txt
0b1111...  # 64 ones
```

Qual é o número de grãos na hipotética 65.ª casa?

```txt
0b10000... # 1 and 64 zeros
```

Como é que passas de um 1 e 64 zeros para 64 uns? Subtrais 1.

E que benefício adicional é que isto nos dá? Bem, agora temos uma expressão agradável e legível para o total. Não itera, por isso o desempenho é bom. E contém o número 64, que é o número de casas de um tabuleiro de xadrez, o que é um bom exemplo de **intenção de design** bem sinalizada. Se, por alguma razão, daqui a 1000 anos o mundo adotar um tabuleiro de xadrez 7x7 como norma, esse engenheiro do futuro (provavelmente a usar Bash 6.1) vai verificar o script, perceber a tua intenção e mudar o 64 para 49. Tudo bem!

## Mantém-te intencional, meus amigos

Quando estás a trabalhar numa implementação, é fácil atirar coisas para o ar e agarrar-te à primeira solução que funciona. Isso é aceitável enquanto estás a explorar o problema, mas, quando compreenderes bem os componentes críticos, se tiveres tempo para dar um bom polimento às coisas, certifica-te de que cada algoritmo, cada nome de variável e até os teus espaços em branco pintam um retrato do problema, dos requisitos críticos e de como todas as peças se encaixam.

[^1]: Vê também a [banda desenhada do Thom Holwerda.](https://www.osnews.com/story/19266/wtfsm/)
[^2]: Se estás um pouco enferrujado na contagem em binário e hexadecimal, o @kytrinyx recomenda o livro [How to Count](https://www.amazon.com/Count-Programming-Mere-Mortals-Book-ebook/dp/B005DPIKPE). E, num autoelogio descarado, escrevi recentemente [um par de artigos no blogue sobre binário e hexadecimal.](https://www.assertnotmagic.com/2018/09/10/binary-hexadecimal-part-1/)
[^3]: Não sei como é que isso funcionaria. Talvez pudéssemos pôr os peões a justar uns contra os outros.

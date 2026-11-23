# Introdução

Certa noite, você encontrou um caderno antigo cheio de rabiscos enigmáticos, como se alguém estivesse perseguindo uma ideia de forma obsessiva.
Em uma das páginas, uma única pergunta se destacava: **Todo número consegue encontrar o caminho até 1?**
Ela estava ligada a algo chamado **Conjectura de Collatz**, um enigma que confunde pensadores há décadas.

As regras eram enganosamente simples.
Escolha qualquer número inteiro positivo.

- Se for par, divida por 2.
- Se for ímpar, multiplique por 3 e some 1.

Depois, repita esses passos com o resultado, continuando indefinidamente.

A curiosidade venceu: você escolheu o número 12 para testar e começou a jornada:

12 ➜ 6 ➜ 3 ➜ 10 ➜ 5 ➜ 16 ➜ 8 ➜ 4 ➜ 2 ➜ 1

Contando a partir do segundo número (6), foram 9 passos até chegar a 1, e a cada vez que as regras se repetiam, o número continuava mudando.
No início, a sequência parecia imprevisível: subia, descia e pulava de um lado para o outro.
Ainda assim, a conjectura afirma que, não importa o número inicial, sempre vamos terminar em 1.

Era fascinante, mas também intrigante.
Por que isso parece sempre funcionar?
Será que existe um número em que o processo se quebra, repetindo para sempre ou escapando para o infinito?
O caderno sugeria que resolver isso poderia revelar algo profundo. E, com isso, fama, [fortuna][collatz-prize] e um lugar na história esperam por quem conseguisse desvendar seus segredos.

[collatz-prize]: https://mathprize.net/posts/collatz-conjecture/

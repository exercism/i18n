# Instruções

Conta os pontos marcados num tabuleiro de Go.

No jogo de Go (também conhecido como baduk, igo, cờ vây e wéiqí), ganham-se pontos ao rodear completamente interseções vazias com as tuas pedras.
As interseções rodeadas de um jogador são conhecidas como o seu território.

Calcula o território de cada jogador.
Podes assumir que quaisquer pedras que tenham ficado presas em território inimigo já foram retiradas do tabuleiro.

Determina o território que inclui uma coordenada especificada.

É possível rodear várias interseções vazias ao mesmo tempo e, para rodear, só contam os vizinhos horizontais e verticais.
No diagrama seguinte, as pedras que importam estão marcadas com "O" e as que não importam estão marcadas com "I" (ignoradas).
Os espaços vazios representam interseções vazias.

```text
+----+
|IOOI|
|O  O|
|O OI|
|IOI |
+----+
```

Para ser mais preciso, uma interseção vazia faz parte do território de um jogador se todos os seus vizinhos forem pedras desse jogador ou interseções vazias que fazem parte do território desse jogador.

Para mais informações, consulta a [Wikipedia][go-wikipedia] ou a [Sensei's Library][go-sensei].

[go-wikipedia]: https://en.wikipedia.org/wiki/Go_%28game%29
[go-sensei]: https://senseis.xmp.net/

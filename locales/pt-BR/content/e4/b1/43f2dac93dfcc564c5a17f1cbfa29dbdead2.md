# Instruções

Conte os pontos pontuados em um tabuleiro de go.

No jogo de go (também conhecido como baduk, igo, cờ vây e wéiqí), ganham-se pontos ao cercar completamente interseções vazias com suas pedras.
As interseções cercadas de um jogador são conhecidas como seu território.

Calcule o território de cada jogador.
Você pode assumir que quaisquer pedras que tenham ficado presas em território inimigo já foram retiradas do tabuleiro.

Determine o território que inclui uma coordenada especificada.

Várias interseções vazias podem ser cercadas de uma só vez e, para cercar, contam apenas os vizinhos horizontais e verticais.
No diagrama a seguir, as pedras que importam estão marcadas com "O" e as que não importam estão marcadas com "I" (ignoradas).
Espaços vazios representam interseções vazias.

```text
+----+
|IOOI|
|O  O|
|O OI|
|IOI |
+----+
```

Para ser mais preciso, uma interseção vazia faz parte do território de um jogador se todos os seus vizinhos forem pedras desse jogador ou interseções vazias que fazem parte do território desse jogador.

Para mais informações, veja a [Wikipedia][go-wikipedia] ou a [Sensei's Library][go-sensei].

[go-wikipedia]: https://en.wikipedia.org/wiki/Go_%28game%29
[go-sensei]: https://senseis.xmp.net/

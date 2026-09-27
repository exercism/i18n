# Sobre

Um vocabulário é a unidade de organização em Factor: uma coleção nomeada de definições de palavras.

```factor
USING: kernel ;
IN: greetings.formal

: hello ( name -- str ) "Greetings, " prepend ;
```

## Organização de ficheiros e diretórios

Os nomes de vocabulário usam `.` como separador. O caminho segue os pontos:

| Vocabulário            | Ficheiro                                   |
| ---                    | ---                                        |
| `greetings`            | `greetings/greetings.factor`               |
| `greetings.formal`     | `greetings/formal/formal.factor`           |
| `greetings.casual`     | `greetings/casual/casual.factor`           |

O carregador do Factor procura os vocabulários percorrendo as *raízes dos vocabulários*, ou seja, a raiz do projeto e a biblioteca basis que vem incluída, até encontrar um diretório cujo nome corresponde a cada segmento do caminho. O último segmento repete-se como nome do ficheiro.

## `USING:` e `IN:`

`USING:` (a par de `USE:` para um vocabulário de cada vez) traz outros vocabulários para o caminho de pesquisa do ficheiro atual. `IN:` declara a que vocabulário *pertencem* as palavras definidas neste ficheiro: os seus nomes totalmente qualificados começam com esse prefixo.

```factor
USING: kernel sequences greetings.formal ;
IN: greetings

: greet-everyone ( names -- strs )
    [ hello ] map ;
```

Aqui, `greet-everyone` está em `greetings`, chama `hello` de `greetings.formal` e `map` de `sequences`.

## Porquê dividir uma solução por vocabulários

Dividir o código por vocabulários permite-te:

- Agrupar pequenas palavras auxiliares por responsabilidade, separadas da rotina de alto nível que as compõe.
- Reutilizar as palavras auxiliares noutros sítios sem arrastar a rotina principal.
- Ler cada ficheiro como uma única camada de abstração coerente.

O carregador do Factor é suficientemente rápido e preguiçoso para que dividir *ainda mais* em vocabulários mais pequenos seja barato; a convenção na biblioteca padrão é fatorizar agressivamente.

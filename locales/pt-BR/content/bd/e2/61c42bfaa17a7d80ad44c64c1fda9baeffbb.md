# Sobre

Um vocabulário é a unidade de organização no Factor: uma coleção nomeada de definições de palavras.

```factor
USING: kernel ;
IN: greetings.formal

: hello ( name -- str ) "Greetings, " prepend ;
```

## Organização de arquivos e diretórios

Os nomes de vocabulário usam `.` como separador. O caminho segue os pontos:

| Vocabulário            | Arquivo                                    |
| ---                    | ---                                        |
| `greetings`            | `greetings/greetings.factor`               |
| `greetings.formal`     | `greetings/formal/formal.factor`           |
| `greetings.casual`     | `greetings/casual/casual.factor`           |

O carregador do Factor procura vocabulários percorrendo as *raízes de vocabulário* (a raiz do projeto e a biblioteca basis que vem junto) até encontrar um diretório cujo nome corresponda a cada segmento do caminho. O último segmento se repete como nome do arquivo.

## `USING:` e `IN:`

`USING:` (junto com `USE:`, para um vocabulário de cada vez) traz outros vocabulários para o caminho de busca do arquivo atual. `IN:` declara a qual vocabulário as palavras definidas neste arquivo *pertencem*: seus nomes totalmente qualificados começam com esse prefixo.

```factor
USING: kernel sequences greetings.formal ;
IN: greetings

: greet-everyone ( names -- strs )
    [ hello ] map ;
```

Aqui, `greet-everyone` está em `greetings`, chama `hello` de `greetings.formal` e `map` de `sequences`.

## Por que dividir uma solução entre vocabulários

Dividir o código entre vocabulários permite que você:

- Agrupe palavras auxiliares pequenas por responsabilidade, longe da rotina de alto nível que as compõe.
- Reutilize as auxiliares em outros lugares sem arrastar junto a rotina principal.
- Leia cada arquivo como uma única camada de abstração coerente.

O carregador do Factor é rápido e preguiçoso o bastante para que dividir *para baixo*, em vocabulários menores, saia barato. A convenção na biblioteca padrão é fatorar agressivamente.

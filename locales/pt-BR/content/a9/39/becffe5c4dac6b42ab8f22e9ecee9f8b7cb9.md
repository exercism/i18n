# Formatando arquivos JSON

Um repositório de track do Exercism tem muitos arquivos JSON, incluindo:

- O arquivo `config.json` do track.
- Para cada conceito, um arquivo `.meta/config.json` e um `links.json`.
- Para cada Exercício de Conceito ou Exercício de Prática, um arquivo `.meta/config.json`.

Esses arquivos ficam mais legíveis quando têm uma formatação consistente em todo o Exercism, e por isso o configlet tem um comando `fmt` para reescrever os arquivos JSON de um track em uma forma canônica.

O comando `fmt` formata os seguintes arquivos:

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## Uso

O comando `fmt` formata os arquivos 'meta/config.json' dos exercícios.

```
configlet [global-options] fmt [command-options]

Global options:
  -h, --help                   Show this help message and exit
      --version                Show this tool's version information and exit
  -t, --track-dir <dir>        Specify a track directory to use instead of the current directory
  -v, --verbosity <verbosity>  The verbosity of output. Allowed values: q[uiet], n[ormal], d[etailed]

Options for fmt:
  -e, --exercise <slug>        Only operate on this exercise
  -u, --update                 Prompt to write formatted files
  -y, --yes                    Auto-confirm the prompt from --update
```

Um `configlet fmt` sem mais nada não faz nenhuma alteração no track e verifica a formatação do arquivo `.meta/config.json` de cada Exercício de Conceito e Exercício de Prática, além do arquivo `config.json` do track.

Para imprimir uma lista de caminhos para os quais ainda não existe um arquivo `.meta/config.json` de exercício formatado (encerrando com um código de saída diferente de zero se pelo menos um exercício não tiver um arquivo de configuração formatado):

```shell
configlet fmt
```

Para receber um prompt perguntando se você quer gravar os arquivos de configuração formatados, adicione a opção `--update` (ou `-u` na forma curta):

```shell
configlet fmt --update
```

Para gravar os arquivos de configuração formatados sem interação, adicione a opção `--yes` (ou `-y` na forma curta):

```shell
configlet fmt --update --yes
```

Para operar em um único exercício, use a opção `--exercise` (ou `-e` na forma curta).
Por exemplo, para gravar sem interação o arquivo de configuração formatado do exercício `prime-factors`:

```shell
configlet fmt -uy -e prime-factors
```

Ao gravar arquivos JSON, o `configlet fmt` faz o seguinte:

- Grava os pares chave/valor na ordem canônica.

- Usa dois espaços para a indentação.

- Usa uma linha separada para cada item de um array JSON e para cada chave de um objeto JSON.

- Remove os pares chave/valor das chaves que são opcionais e têm valores vazios.
  Por exemplo, `"source": ""` é removido.

- Remove `"test_runner": true` dos arquivos de configuração de Exercícios de Prática.
  Essa é uma chave opcional: a especificação diz que uma chave `test_runner` omitida implica o valor `true`.

- Quando um objeto JSON tem mais de um par chave/valor com o mesmo nome de chave, mantém apenas o último.

A ordem canônica das chaves de um arquivo `.meta/config.json` de exercício é:

```text
- authors
- [contributors]
- files
  - solution
  - test
  - exemplar           (Concept Exercises only)
  - example            (Practice Exercises only)
  - [editor]
  - [invalidator]
- [language_versions]
- [forked_from]        (Concept Exercises only)
- [icon]               (Concept Exercises only)
- [test_runner]        (Practice Exercises only)
- blurb
- [source]
- [source_url]
- [custom]
```

em que os colchetes indicam que a chave entre eles é opcional.

Observe que o `configlet fmt` só opera em exercícios que existem no arquivo `config.json` do track.
Portanto, se você está implementando um novo exercício em um track e quer formatar o arquivo `.meta/config.json` dele, adicione o exercício ao arquivo `config.json` do track primeiro.
Se o exercício ainda não estiver pronto para quem usa o site, defina o valor de `status` dele como `wip`.

O código de saída é 0 quando todos os arquivos de configuração encontrados estão formatados no momento em que o configlet encerra, e 1 caso contrário.

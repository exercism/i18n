# Formatar ficheiros JSON

Um repositório de trilha do Exercism tem muitos ficheiros JSON, entre os quais:

- O ficheiro `config.json` da trilha.
- Para cada conceito, um ficheiro `.meta/config.json` e um ficheiro `links.json`.
- Para cada exercício de conceito ou exercício de prática, um ficheiro `.meta/config.json`.

Estes ficheiros são mais fáceis de ler se tiverem uma formatação consistente em todo o Exercism, por isso o configlet tem um comando `fmt` que reescreve os ficheiros JSON de uma trilha numa forma canónica.

O comando `fmt` formata os seguintes ficheiros:

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## Utilização

O comando `fmt` formata os ficheiros 'meta/config.json' dos exercícios.

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

Um `configlet fmt` simples não faz alterações à trilha: verifica a formatação do ficheiro `.meta/config.json` de cada exercício de conceito e exercício de prática, bem como do ficheiro `config.json` da trilha.

Para imprimir uma lista de caminhos para os quais ainda não existe um ficheiro `.meta/config.json` de exercício formatado (terminando com um código de saída diferente de zero se pelo menos um exercício não tiver um ficheiro de configuração formatado):

```shell
configlet fmt
```

Para que te seja pedido que escrevas os ficheiros de configuração formatados, adiciona a opção `--update` (ou `-u`, na forma abreviada):

```shell
configlet fmt --update
```

Para escrever os ficheiros de configuração formatados de forma não interativa, adiciona a opção `--yes` (ou `-y`, na forma abreviada):

```shell
configlet fmt --update --yes
```

Para operar sobre um único exercício, usa a opção `--exercise` (ou `-e`, na forma abreviada).
Por exemplo, para escrever de forma não interativa o ficheiro de configuração formatado do exercício `prime-factors`:

```shell
configlet fmt -uy -e prime-factors
```

Ao escrever ficheiros JSON, o `configlet fmt`:

- Escreve os pares chave/valor pela ordem canónica.

- Usa dois espaços para a indentação.

- Usa uma linha separada para cada item de um array JSON e para cada chave de um objeto JSON.

- Remove os pares chave/valor das chaves que são opcionais e têm valores vazios.
  Por exemplo, `"source": ""` é removido.

- Remove `"test_runner": true` dos ficheiros de configuração dos exercícios de prática.
  Esta chave é opcional: a especificação diz que uma chave `test_runner` omitida implica o valor `true`.

- Quando um objeto JSON tem mais do que um par chave/valor com o mesmo nome de chave, mantém apenas o último.

A ordem canónica das chaves de um ficheiro `.meta/config.json` de exercício é:

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

em que os parênteses retos indicam que a chave entre eles é opcional.

Repara que o `configlet fmt` só opera sobre exercícios que existem no ficheiro `config.json` ao nível da trilha.
Por isso, se estás a implementar um novo exercício numa trilha e queres formatar o ficheiro `.meta/config.json` dele, adiciona primeiro o exercício ao ficheiro `config.json` ao nível da trilha.
Se o exercício ainda não estiver pronto para ser mostrado aos utilizadores, define o valor de `status` como `wip`.

O código de saída é 0 quando todos os ficheiros de configuração encontrados estão formatados no momento em que o configlet termina, e 1 caso contrário.

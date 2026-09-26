# Introdução

## Expressões regulares

As expressões regulares (regex) são uma ferramenta poderosa para trabalhar com strings em Elixir. As expressões regulares em Elixir seguem a especificação **PCRE** (**P**erl **C**ompatible **R**egular **E**xpressions). Os padrões de string que representam o significado da expressão regular são primeiro compilados e depois usados para fazer a correspondência de toda a string ou de parte dela.

Em Elixir, a forma mais comum de criar expressões regulares é usando o sigilo `~r`. Os sigilos oferecem atalhos de _açúcar sintático_ para tarefas comuns em Elixir. Para corresponder a um _literal de string_, podemos usar a própria string como padrão logo após o sigilo.

```elixir
~r/test/
```

O operador `=~/2` é útil para fazer uma correspondência de regex em uma string e retornar um resultado `boolean`.

```elixir
"this is a test" =~ ~r/test/
# => true
```

Duas observações sobre o uso de sigilos:

- você pode usar vários delimitadores diferentes, dependendo da sua necessidade, em vez de `/`
- os padrões de string já vêm _escapados_; ao escrever o padrão como string sem usar uma regex, você vai precisar _escapar_ as barras invertidas (`\`)

### Classes de caracteres

Corresponder a um intervalo de caracteres usando colchetes `[]` define uma _classe de caracteres_. Isso corresponde a qualquer um dos caracteres da classe. Você também pode especificar um intervalo de caracteres como `a-z`, desde que o início e o fim representem um intervalo contíguo de pontos de código.

```elixir
regex = ~r/[a-z][ADKZ][0-9][!?]/
"jZ5!" =~ regex
# => true
"jB5?" =~ regex
# => false
```

_Classes de caracteres abreviadas_ deixam o padrão mais conciso. Por exemplo:

- `\d`, abreviação de `[0-9]` (qualquer dígito)
- `\w`, abreviação de `[A-Za-z0-9_]` (qualquer caractere de 'palavra')
- `\s`, abreviação de `[ \t\r\n\f]` (qualquer caractere de espaço em branco)

Quando uma _classe de caracteres abreviada_ é usada fora de um sigilo, ela precisa ser escapada: `"\\d"`

### Alternâncias

As _alternâncias_ usam `|` como caractere especial para indicar a correspondência de um _ou_ outro

```elixir
regex = ~r/cat|bat/
"bat" =~ regex
# => true
"cat" =~ regex
# => true
```

### Quantificadores

Os _quantificadores_ permitem um padrão repetido na regex. Eles afetam o grupo que vem antes do quantificador.

- `{N, M}`, em que `N` é o número mínimo de repetições e `M` é o máximo
- `{N,}` corresponde a `N` repetições ou mais
  - `{0,}` também pode ser escrito como `*`: corresponde a zero ou mais repetições
  - `{1,}` também pode ser escrito como `+`: corresponde a uma ou mais repetições
- `{,N}` corresponde a até `N` repetições

### Grupos

Parênteses `()` são usados para denotar _grupos_ e _capturas_. Em alguns casos, o grupo também pode ser _capturado_ para ser retornado e usado. Em Elixir, eles podem ser nomeados ou não nomeados. As capturas são nomeadas acrescentando `?<name>` depois do parêntese de abertura. Os grupos funcionam como uma unidade única, como quando são seguidos por _quantificadores_.

```elixir
regex = ~r/(h)at/
Regex.replace(regex, "hat", "\\1op")
# => "hop"

regex = ~r/(?<letter_b>b)/
Regex.scan(regex, "blueberry", capture: :all_names)
# => [["b"], ["b"]]
```

### Âncoras

As _âncoras_ são usadas para prender a expressão regular ao início ou ao fim da string que será correspondida:

- `^` ancora no início da string
- `$` ancora no fim da string

### Interpolação

Como o `~r` é um atalho para `"pattern" |> Regex.escape() |> Regex.compile!()`, você também pode usar interpolação de string para montar dinamicamente um padrão de expressão regular:

```elixir
anchor = "$"
regex = ~r/end of the line#{anchor}/
"end of the line?" =~ regex
# => false
"end of the line" =~ regex
# => true
```

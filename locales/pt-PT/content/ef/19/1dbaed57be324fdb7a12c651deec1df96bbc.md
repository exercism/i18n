# Introdução

## Expressões regulares

As expressões regulares (regex) são uma ferramenta poderosa para trabalhar com strings em Elixir. As expressões regulares em Elixir seguem a especificação **PCRE** (**P**erl **C**ompatible **R**egular **E**xpressions). Os padrões de string que representam o significado da expressão regular são primeiro compilados e só depois usados para corresponder a toda a string ou a parte dela.

Em Elixir, a forma mais comum de criar expressões regulares é usar o sigil `~r`. Os sigils fornecem atalhos de _açúcar sintático_ para tarefas comuns em Elixir. Para corresponder a um _literal de string_, podemos usar a própria string como padrão a seguir ao sigil.

```elixir
~r/test/
```

O operador `=~/2` é útil para efetuar uma correspondência de regex numa string e devolver um resultado `boolean`.

```elixir
"this is a test" =~ ~r/test/
# => true
```

Duas notas sobre a utilização de sigils:

- podes usar muitos delimitadores diferentes, em vez de `/`, consoante aquilo de que precisas
- os padrões de string já estão _escapados_; se escreveres o padrão como string, sem usar uma regex, tens de _escapar_ as barras invertidas (`\`)

### Classes de carateres

Corresponder a um intervalo de carateres com parênteses retos `[]` define uma _classe de carateres_. Isto corresponde a um único caráter pertencente à classe. Também podes especificar um intervalo de carateres como `a-z`, desde que o início e o fim representem um intervalo contíguo de pontos de código.

```elixir
regex = ~r/[a-z][ADKZ][0-9][!?]/
"jZ5!" =~ regex
# => true
"jB5?" =~ regex
# => false
```

As _classes de carateres abreviadas_ tornam o padrão mais conciso. Por exemplo:

- `\d` é a forma abreviada de `[0-9]` (qualquer algarismo)
- `\w` é a forma abreviada de `[A-Za-z0-9_]` (qualquer caráter de "palavra")
- `\s` é a forma abreviada de `[ \t\r\n\f]` (qualquer caráter de espaço em branco)

Quando usas uma _classe de carateres abreviada_ fora de um sigil, tens de a escapar: `"\\d"`

### Alternâncias

As _alternâncias_ usam `|` como caráter especial para indicar a correspondência com um _ou_ outro

```elixir
regex = ~r/cat|bat/
"bat" =~ regex
# => true
"cat" =~ regex
# => true
```

### Quantificadores

Os _quantificadores_ permitem um padrão repetido na regex. Afetam o grupo que precede o quantificador.

- `{N, M}` onde `N` é o número mínimo de repetições e `M` é o máximo
- `{N,}` corresponde a `N` ou mais repetições
  - `{0,}` também pode ser escrito como `*`: corresponde a zero ou mais repetições
  - `{1,}` também pode ser escrito como `+`: corresponde a uma ou mais repetições
- `{,N}` corresponde a até `N` repetições

### Grupos

Os parênteses curvos `()` são usados para denotar _grupos_ e _capturas_. Nalguns casos, o grupo também pode ser _capturado_ para ser devolvido e usado. Em Elixir, estes podem ser nomeados ou não nomeados. As capturas são nomeadas acrescentando `?<name>` depois do parêntese de abertura. Os grupos funcionam como uma única unidade, tal como quando são seguidos de _quantificadores_.

```elixir
regex = ~r/(h)at/
Regex.replace(regex, "hat", "\\1op")
# => "hop"

regex = ~r/(?<letter_b>b)/
Regex.scan(regex, "blueberry", capture: :all_names)
# => [["b"], ["b"]]
```

### Âncoras

As _âncoras_ servem para fixar a expressão regular ao início ou ao fim da string com que queremos corresponder:

- `^` fixa ao início da string
- `$` fixa ao fim da string

### Interpolação

Como o `~r` é um atalho para `"pattern" |> Regex.escape() |> Regex.compile!()`, também podes usar interpolação de strings para construir dinamicamente um padrão de expressão regular:

```elixir
anchor = "$"
regex = ~r/end of the line#{anchor}/
"end of the line?" =~ regex
# => false
"end of the line" =~ regex
# => true
```

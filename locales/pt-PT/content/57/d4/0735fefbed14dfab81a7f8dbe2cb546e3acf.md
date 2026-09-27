# Guia de estilo de Rexx

Este guia descreve o estilo a usar nos ficheiros de teste e de exemplo dos exercícios da track de Rexx.

## Norma Rexx

O código deve estar em conformidade com o nível 5.0 da linguagem Rexx.

Podem usar-se as extensões do Regina Rexx e as funções do padrão SAA para acesso a bibliotecas externas.

Não devem usar-se as extensões do AREXX nem as rotinas de manipulação de buffers do CMS.

## Plataforma

O ambiente de teste em tempo de execução é baseado em Linux; por isso, nas invocações da instrução ADDRESS só podem ser usados comandos disponíveis nesse ambiente. Estes devem ser claramente destacados nos comentários do código.

## Nomes

### Instruções

As instruções (palavras reservadas) devem ser escritas em **_minúsculas_**. Assim, o seguinte está em conformidade com as recomendações do guia de estilo:

```rexx
do while input \= ''
  parse var input char +1 input
  say char
end
```

enquanto nenhum dos seguintes está em conformidade, pelo que não são recomendados:

```rexx
/* *** Not recommended *** */
Do While input \= ''
  Parse Var input char +1 input
  Say char
End
```

e:

```rexx
/* *** Not recommended *** */
DO WHILE input \= ''
  PARSE VAR input char +1 input
  SAY char
END
```

### Funções incorporadas (BIFs)

As BIFs devem ser escritas em **_maiúsculas_**, como se ilustra aqui:

```rexx
input = 'ABCDE'
say 'Length of input is' LENGTH(input)
say 'First letter of input is' SUBSTR(input, 1, 1)
```

### Etiquetas (funções definidas pelo utilizador)

Os nomes das etiquetas devem estar em **_Pascal case_**, como se mostra aqui:

```rexx
greeting = MyFuncSayHello()
say greeting

exit 0

MyFuncSayHello : procedure
  hello = 'Hello there!'
return hello
```

### Variáveis

Os nomes das variáveis devem começar por uma letra **_minúscula_**; por isso, as variáveis de uma só palavra ficam em minúsculas.

As variáveis com várias palavras podem ser escritas em **_camel case_** ou em **_snake case_**.

A convenção adotada na track é usar _camel case na maioria das variáveis_ e reservar o snake case para as variáveis de teste. As variáveis que se destinam a ser constantes podem, opcionalmente, ficar também em maiúsculas.

```rexx
input = 'ABCDE'
i = 0

personName = 'Alice'
test_person_description = 'Brown hair, blue eyes'

TRUE = 1
PI_CONSTANT = 3.14159
```

## Literais

As strings podem ser delimitadas com plicas ou com aspas, **`'`** e **`"`**, respetivamente. Os exemplos seguintes são equivalentes:

```rexx
say "Hello, world!"

say 'Hello, world!'
```

Cada uma pode ser incluída dentro da outra sem precisar de um caráter de escape:

```rexx
say "Please don't do that as it's wrong."

say 'He said, "Please sir, may I have more?".'
```

A não ser que as strings contenham plicas ou aspas incorporadas, o que obriga a misturar os dois tipos de delimitadores, é preferível delimitar as strings com **_plicas_**.

### Strings hexadecimais e binárias

Os valores binários e hexadecimais podem representar-se acrescentando um **`B`** ou um **`X`**, respetivamente, a uma string. Exemplos:

```rexx
hexvalue = "0A"X

binvalue = "00001010"B
```

Recomenda-se que esses valores sejam delimitados por **_aspas_**.

Em conjunto com a recomendação anterior de usar plicas para representar strings simples, esta convenção deve facilitar a identificação de strings binárias e hexadecimais numa base de código.

### Terminador de nova linha
Em muitas linguagens UNIX ou influenciadas por C, o literal **_`\n`_** é usado como terminador de **_nova linha_**. Esse uso está muito difundido e vários exercícios desta track envolvem a utilização e a manipulação de strings com este terminador.

O Rexx não suporta este terminador, nem suporta **_`\`_** (nem qualquer outro caráter) como caráter de escape.

O equivalente em Rexx do caráter de nova linha é um valor hexadecimal (dependente da plataforma); nas plataformas derivadas do UNIX é:

**_`"0A"X`_**

O equivalente em Rexx da seguinte string com novas linhas incorporadas (usando a shell bash):

```bash
printf "I have\nthree embedded\nnewlines.\n"
```

é:

```rexx
say 'I have' || "0A"X || 'three embedded' || "0A"X || 'newlines.' || "0A"X
```

Os exercícios desta track só traduzem **_`\n`_** para **_`"0A"X`_** quando tal for necessário numa string destinada a ser apresentada no terminal. Caso contrário, a string **_`\n`_** é simplesmente interpretada como uma nova linha lógica.

## Outras recomendações de estilo

A indentação pode ser de dois, três ou quatro caracteres de ESPAÇO, embora se prefira a indentação de _dois caracteres_, e a consistência na indentação.

A instrução **_return_** final de uma função deve ficar alinhada com o nome da etiqueta, marcando assim claramente o fim dessa função, e deve devolver _sempre_ um valor.

O operador Boolean NOT pode representar-se por vários símbolos diferentes. O símbolo preferido nesta track é **`\`** e, para manter a consistência com este uso, o operador relacional de 'não igual' deve ser **`\=`**.

Os valores Boolean **`false`** e **`true`** são representados por **`0`** e **`1`**, respetivamente. Não existem literais predefinidos para estes valores.

Os estados de erro são indicados através de valores devolvidos, sendo que a string vazia, **`''`**, ou **`-1`** indicam estados de erro, consoante o contexto.

## Exemplo canónico de estilo de código
```rexx
TO DO EXAMPLE
```

## Estrutura do ficheiro de teste

Cada exercício tem um único ficheiro de teste, no diretório de topo do exercício, com o nome: `<exercise>-check.rexx`

Seguindo esta convenção, o ficheiro de teste do exercício `acronym` chama-se: `acronym-check.rexx`

O ficheiro de teste de cada exercício segue uma disposição flexível, mas específica, para ajudar quem aprende a compreender os requisitos do exercício e facilitar a tarefa de quem contribui de implementar ou ampliar testes.

O seguinte é um subconjunto do ficheiro de teste do exercício `acronym`:

```rexx
/* Unit Test Runner: t-rexx */
function = 'Abbreviate'
context('Checking the' function 'function')

/* Unit tests */
check('basic' function||'("Portable Network Graphics")',,
      function||'("Portable Network Graphics")',, 'to be', 'PNG')

check('lowercase words' function||'("Ruby on Rails")',,
      function||'("Ruby on Rails")',, 'to be', 'ROR')
```

O ficheiro está dividido em duas secções lógicas, cada uma identificada por uma linha de comentário.

A primeira secção atribui o nome da **_função em teste_** (aqui a função `Abbreviate`) à variável `function`. Este nome de variável é descritivo, mas arbitrário, e é referido no resto do ficheiro sempre que é necessário o nome da função em teste.

Nesta secção há também uma chamada à função `context`, cujo propósito é evidente.

A secção seguinte contém os testes unitários. Cada invocação da função `check` é um teste unitário. Parâmetros esperados:

```rexx
check(<test description>,
      <function invocation>,
      [<actual result variable>],
      <test comparator>,
      <expected result>)
```

**\<test description>** é a string emitida quando o teste é executado. Para a tornar o mais descritiva possível, recomenda-se uma string que inclua o nome da função em teste e os argumentos que lhe são passados, como no exemplo.

**\<function invocation>** é a invocação ou chamada real da função, passando assim o seu valor devolvido ao `check` para comparação no teste.

**\<actual result variable>** é um parâmetro opcional e, se for usado, é o nome de uma variável que contém o valor a usar na comparação do teste.

A razão para o usar é permitir verificar resultados _derivados do_ valor devolvido da função em teste, em vez do próprio valor devolvido. Um exemplo óbvio é quando o valor devolvido é uma string de vários kB, como se mostra:

```rexx
expected_length = LENGTH(FUT(...))

check('...', FUT(...), expected_length, 'to be', 50)
```

Repara que o argumento \<function invocation> continua a ter de ser passado.

**\<test comparator>** é uma string que descreve o tipo de comparação a efetuar. Na maioria dos casos será a string 'to be', que pede uma comparação de igualdade. Consulta a documentação do framework de testes unitários para outras opções de comparação.

**\<expected result>** é, como é evidente, o valor com que o resultado real é comparado.

As variáveis podem ser declaradas livremente no ficheiro de teste (antes de serem usadas, claro) e usadas em vez de literais, como argumentos do `check`.

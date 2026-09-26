# Guia de estilo do Rexx

Este guia descreve o estilo recomendado para os arquivos de teste e de exemplo dos exercícios da trilha de Rexx.

## Padrão Rexx

O código deve seguir o nível 5.0 da linguagem Rexx.

É permitido usar as extensões do Regina Rexx e as funções do padrão SAA para acesso a bibliotecas externas.

As extensões AREXX e as rotinas de manipulação de buffer do CMS não devem ser usadas.

## Plataforma

O ambiente de teste em tempo de execução é baseado em Linux, portanto apenas comandos disponíveis nesse ambiente podem ser usados nas invocações da instrução ADDRESS. Eles devem ser destacados claramente nos comentários do código.

## Nomes

### Instruções

As instruções (palavras reservadas) devem ser escritas em **_minúsculas_**. Sendo assim, o seguinte está de acordo com as recomendações do guia de estilo:

```rexx
do while input \= ''
  parse var input char +1 input
  say char
end
```

enquanto nenhum dos exemplos a seguir está de acordo, por isso não são recomendados:

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

### Funções internas (BIFs)

As BIFs devem ser escritas em **_maiúsculas_**, como ilustrado aqui:

```rexx
input = 'ABCDE'
say 'Length of input is' LENGTH(input)
say 'First letter of input is' SUBSTR(input, 1, 1)
```

### Rótulos (funções definidas pelo usuário)

Os nomes de rótulo devem estar em **_Pascal case_**, como mostrado aqui:

```rexx
greeting = MyFuncSayHello()
say greeting

exit 0

MyFuncSayHello : procedure
  hello = 'Hello there!'
return hello
```

### Variáveis

Os nomes de variável devem começar com uma letra **_minúscula_**, então variáveis de uma só palavra ficam em minúsculas.

Variáveis com mais de uma palavra podem ser escritas em **_camel case_** ou **_snake case_**.

A convenção adotada para a trilha é usar _camel case para a maioria das variáveis_ e reservar o snake case para as variáveis de teste. Variáveis que representam constantes também podem, opcionalmente, ficar em maiúsculas.

```rexx
input = 'ABCDE'
i = 0

personName = 'Alice'
test_person_description = 'Brown hair, blue eyes'

TRUE = 1
PI_CONSTANT = 3.14159
```

## Literais

As strings podem ser delimitadas por aspas simples ou duplas, **`'`** e **`"`**, respectivamente. Os exemplos a seguir são equivalentes:

```rexx
say "Hello, world!"

say 'Hello, world!'
```

Cada um pode ser embutido no outro sem precisar de um caractere de escape:

```rexx
say "Please don't do that as it's wrong."

say 'He said, "Please sir, may I have more?".'
```

A menos que as strings contenham aspas embutidas, exigindo a mistura de aspas, é preferível delimitar as strings com **_aspas simples_**.

### Strings hexadecimais e binárias

Valores binários e hexadecimais podem ser representados acrescentando um **`B`** ou um **`X`**, respectivamente, a uma string. Exemplos:

```rexx
hexvalue = "0A"X

binvalue = "00001010"B
```

Recomenda-se delimitar tais valores com **_aspas duplas_**.

Junto com a recomendação anterior de usar aspas simples para representar strings comuns, essa convenção deve facilitar a identificação de strings binárias e hexadecimais em uma base de código.

### Terminador de nova linha
Em muitas linguagens UNIX ou influenciadas por C, o literal **_`\n`_** é usado como terminador de **_nova linha_**. Esse uso é amplamente difundido, e vários exercícios desta trilha envolvem o uso e a manipulação de strings com esse terminador.

O Rexx não oferece suporte a esse terminador, nem a **_`\`_** (ou qualquer outro caractere) como caractere de escape.

O equivalente do caractere de nova linha no Rexx é um valor hexadecimal (dependente da plataforma); em plataformas derivadas do UNIX, é:

**_`"0A"X`_**

O equivalente em Rexx da seguinte string com novas linhas embutidas (usando o shell bash):

```bash
printf "I have\nthree embedded\nnewlines.\n"
```

é:

```rexx
say 'I have' || "0A"X || 'three embedded' || "0A"X || 'newlines.' || "0A"X
```

Os exercícios desta trilha só traduzirão **_`\n`_** para **_`"0A"X`_** quando isso for necessário em uma string destinada à exibição no terminal. Caso contrário, a string **_`\n`_** será simplesmente interpretada como uma nova linha lógica.

## Outras recomendações de estilo

A indentação pode ser de dois, três ou quatro caracteres de espaço, embora a indentação de _dois caracteres_ e a consistência na indentação sejam preferíveis.

A instrução **_return_** final de uma função deve estar alinhada com o nome do rótulo, marcando assim claramente o fim daquela função, e _sempre_ deve retornar um valor.

O operador booleano NOT pode ser representado por vários símbolos diferentes. O símbolo preferido nesta trilha é **`\`** e, para manter a consistência com esse uso, o operador relacional de 'diferente de' deve ser **`\=`**.

Os valores booleanos **`false`** e **`true`** são representados por **`0`** e **`1`**, respectivamente. Não existem literais predefinidos para esses valores.

Os estados de erro são indicados por meio de valores de retorno, com a string vazia, **`''`**, ou **`-1`** indicando estados de erro, dependendo do contexto.

## Exemplo canônico de estilo de código
```rexx
TO DO EXAMPLE
```

## Estrutura do arquivo de teste

Um exercício terá um único arquivo de teste, localizado no diretório de nível superior do exercício, chamado: `<exercise>-check.rexx`

Seguindo essa convenção, o arquivo de teste do exercício `acronym` se chamará: `acronym-check.rexx`

O arquivo de teste de cada exercício é organizado de uma forma livre, mas específica, para ajudar quem está aprendendo a entender os requisitos do exercício e facilitar a tarefa de quem contribui de implementar ou estender os testes.

O seguinte é um subconjunto do arquivo de teste do exercício `acronym`:

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

O arquivo é dividido em duas seções lógicas, cada uma identificada com uma linha de comentário.

A primeira seção atribui o nome da **_função em teste_** (aqui, a função `Abbreviate`) à variável `function`. Esse nome de variável é descritivo, mas arbitrário, e é referenciado no restante do arquivo sempre que o nome da função em teste for necessário.

Nesta seção também há uma chamada à função `context`, cujo propósito é evidente.

A seção seguinte contém os testes unitários. Cada invocação da função `check` é um único teste unitário. Parâmetros esperados:

```rexx
check(<test description>,
      <function invocation>,
      [<actual result variable>],
      <test comparator>,
      <expected result>)
```

**\<test description>** é a string emitida quando o teste é executado. Para torná-la o mais descritiva possível, recomenda-se usar uma string composta pelo nome da função em teste e pelos argumentos passados a ela, como no exemplo.

**\<function invocation>** é a invocação ou chamada da função propriamente dita, passando assim o valor de retorno dela para `check` para comparação no teste.

**\<actual result variable>** é um parâmetro opcional e, se usado, é o nome de uma variável que contém o valor a ser usado na comparação do teste.

O motivo de usá-lo é permitir verificar resultados _derivados_ do valor de retorno da função em teste, em vez do próprio valor de retorno. Um exemplo óbvio é quando o valor de retorno é uma string de vários kB, como mostrado:

```rexx
expected_length = LENGTH(FUT(...))

check('...', FUT(...), expected_length, 'to be', 50)
```

Observe que o argumento \<function invocation> ainda precisa ser passado.

**\<test comparator>** é uma string que descreve o tipo de comparação a ser feita. Na maioria dos casos, será a string 'to be', que solicita uma comparação de igualdade. Consulte a documentação do framework de testes unitários para outras opções de comparação.

**\<expected result>** é, evidentemente, o valor com o qual o resultado real é comparado.

As variáveis podem ser declaradas livremente no arquivo de teste (antes do uso, é claro) e usadas no lugar de literais, como argumentos para `check`.

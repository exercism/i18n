# Instruções

Este exercício aborda a análise de ficheiros de log.

Após uma auditoria de segurança recente, pediram-te que limpasses os ficheiros de log arquivados da organização.

Todas as strings passadas às funções são garantidamente não nulas e sem espaços no início nem no fim.

## 1. Identifica linhas de log corrompidas

Precisas de ter uma ideia de quantas linhas de log do teu arquivo não cumprem os padrões atuais.
Acreditas que um teste simples revela se uma linha de log é válida.
Para ser considerada válida, uma linha tem de começar com uma das seguintes strings:

- [TRC]
- [DBG]
- [INF]
- [WRN]
- [ERR]
- [FTL]

Implementa a função `IsValidLine` de modo a devolver `false` se uma string não for válida e `true` caso contrário.

```go
IsValidLine("[ERR] A good error here")
// => true
IsValidLine("Any old [ERR] text")
// => false
IsValidLine("[BOB] Any old text")
// => false
```

## 2. Divide a linha de log

Uma nova equipa juntou-se à organização e descobriste que os ficheiros de log dessa equipa usam um separador estranho para os «campos».
Em vez de algo sensato como dois pontos «:», usam uma string como «<--->» ou «<=>» (porque é mais bonito), na verdade qualquer string cujo primeiro caráter seja «<» e o último seja «>», com qualquer combinação dos seguintes carateres pelo meio: «~», «\*», «=» e «-».

Implementa a função `SplitLogLine`, que recebe uma linha e devolve um array de strings, cada uma delas com um campo.

```go
SplitLogLine("section 1<*>section 2<~~~>section 3")
// => []string{"section 1", "section 2", "section 3"},
```

## 3. Conta o número de linhas que contêm `password` em texto entre aspas

A equipa precisa de saber que referências a palavras-passe existem em texto entre aspas, para as poder examinar manualmente.

Implementa a função `CountQuotedPasswords` para teres uma ideia da provável dimensão do trabalho manual.

Identifica as linhas de log em que a string «password», que pode estar em qualquer combinação de maiúsculas e minúsculas, está rodeada por aspas.
Deves ter em conta a possibilidade de existir conteúdo adicional entre as aspas, antes e depois de «password».
Cada linha terá, no máximo, duas aspas.

As linhas passadas à rotina podem ser válidas ou não, segundo a definição da tarefa 1.
Processamo-las da mesma forma, sejam válidas ou não.

```go
lines := []string{
    `[INF] passWord`, // contains 'password' but not surrounded by quotation marks
    `"passWord"`,  // count this one
    `[INF] User saw error message "Unexpected Error" on page load.`, // does not contain 'password'
    `[INF] The message "Please reset your password" was ignored by the user`, // count this one
}
// => 2
```

## 4. Remove artefactos do log

Descobriste que algum processamento anterior dos logs tem vindo a espalhar pelos logs o texto «end-of-line» seguido de um número de linha (sem espaço pelo meio).

Implementa a função `RemoveEndOfLineText`, que recebe uma string, remove o texto end-of-line e devolve uma string «limpa».

As linhas que não contenham texto end-of-line devem ser devolvidas sem alterações.

Limita-te a remover a string end-of-line.
Não tentes ajustar os espaços em branco.

```go
RemoveEndOfLineText("[INF] end-of-line23033 Network Failure end-of-line27")
// => "[INF]  Network Failure "
```

## 5. Etiqueta linhas com nomes de utilizador

Reparaste que algumas das linhas de log incluem frases que se referem a utilizadores.
Essas frases contêm sempre a string `"User"`, seguida de um ou mais espaços e depois de um nome de utilizador.
Decidiste etiquetar essas linhas.

Implementa uma função `TagWithUserName` que processa linhas de log:

- As linhas que não contêm a string `"User "` ficam inalteradas.
- Nas linhas que contêm a string `"User "`, acrescenta no início da linha `[USR]` seguido do nome de utilizador.

Por exemplo:

```go
result := TagWithUserName([]string{
    "[WRN] User James123 has exceeded storage space.",
	"[WRN] Host down. User   Michelle4 lost connection.",
	"[INF] Users can login again after 23:00.",
	"[DBG] We need to check that user names are at least 6 chars long.",
})
// => []string {
//  "[USR] James123 [WRN] User James123 has exceeded storage space.",
//  "[USR] Michelle4 [WRN] Host down. User   Michelle4 lost connection.",
//  "[INF] Users can login again after 23:00.",
//  "[DBG] We need to check that user names are at least 6 chars long."
// }
```

Podes assumir que:

- Os nomes de utilizador são seguidos de, pelo menos, um espaço em branco no log.
- Existe, no máximo, uma ocorrência da string `"User "` em cada linha.
- Os nomes de utilizador são strings não vazias e sem espaços em branco.

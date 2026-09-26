# Instruções

Este exercício aborda a análise de arquivos de log.

Depois de uma revisão de segurança recente, pediram que você fizesse uma limpeza nos arquivos de log arquivados da organização.

Todas as strings passadas para as funções têm garantia de não serem nulas e de não terem espaços no início nem no fim.

## 1. Identifique linhas de log corrompidas

Você precisa ter uma ideia de quantas linhas de log do seu arquivo não seguem os padrões atuais.
Você acredita que um teste simples revela se uma linha de log é válida.
Para ser considerada válida, uma linha deve começar com uma das seguintes strings:

- [TRC]
- [DBG]
- [INF]
- [WRN]
- [ERR]
- [FTL]

Implemente a função `IsValidLine` para retornar `false` se uma string não for válida e `true` caso contrário.

```go
IsValidLine("[ERR] A good error here")
// => true
IsValidLine("Any old [ERR] text")
// => false
IsValidLine("[BOB] Any old text")
// => false
```

## 2. Divida a linha de log

Uma nova equipe entrou na organização, e você descobre que os arquivos de log dela usam um separador estranho para "campos".
Em vez de algo sensato como dois-pontos ":", elas usam uma string como "<--->" ou "<=>" (porque é mais bonito), na verdade qualquer string que tenha "<" como primeiro caractere e ">" como último, com qualquer combinação dos seguintes caracteres no meio: "~", "\*", "=" e "-".

Implemente a função `SplitLogLine`, que recebe uma linha e retorna um array de strings, cada uma contendo um campo.

```go
SplitLogLine("section 1<*>section 2<~~~>section 3")
// => []string{"section 1", "section 2", "section 3"},
```

## 3. Conte o número de linhas que contêm `password` em texto entre aspas

A equipe precisa saber das referências a senhas em texto entre aspas para que elas possam ser examinadas manualmente.

Implemente a função `CountQuotedPasswords` para ter uma indicação da provável escala do trabalho manual.

Identifique as linhas de log em que a string "password", que pode estar em qualquer combinação de maiúsculas e minúsculas, está cercada por aspas.
Você deve levar em conta a possibilidade de haver conteúdo adicional entre as aspas, antes e depois de "password".
Cada linha conterá no máximo duas aspas.

As linhas passadas para a rotina podem ser válidas ou não, conforme definido na tarefa 1.
Nós as processamos da mesma forma, sejam válidas ou não.

```go
lines := []string{
    `[INF] passWord`, // contains 'password' but not surrounded by quotation marks
    `"passWord"`,  // count this one
    `[INF] User saw error message "Unexpected Error" on page load.`, // does not contain 'password'
    `[INF] The message "Please reset your password" was ignored by the user`, // count this one
}
// => 2
```

## 4. Remova artefatos do log

Você descobriu que certo processamento anterior dos logs vem espalhando pelos logs o texto "end-of-line" seguido de um número de linha (sem espaço entre eles).

Implemente a função `RemoveEndOfLineText` para receber uma string, remover o texto de fim de linha e retornar uma string "limpa".

As linhas que não contêm o texto de fim de linha devem ser retornadas sem modificação.

Remova apenas a string de fim de linha.
Não tente ajustar os espaços em branco.

```go
RemoveEndOfLineText("[INF] end-of-line23033 Network Failure end-of-line27")
// => "[INF]  Network Failure "
```

## 5. Marque linhas com nomes de usuário

Você notou que algumas linhas de log incluem frases que se referem a usuários.
Essas frases sempre contêm a string `"User"`, seguida de um ou mais espaços e, depois, de um nome de usuário.
Você decide marcar essas linhas.

Implemente uma função `TagWithUserName` que processa linhas de log:

- As linhas que não contêm a string `"User "` permanecem inalteradas.
- Nas linhas que contêm a string `"User "`, coloque `[USR]` seguido do nome de usuário no início da linha.

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

Você pode assumir que:

- Os nomes de usuário são seguidos de pelo menos um espaço em branco no log.
- Há no máximo uma ocorrência da string `"User "` em cada linha.
- Os nomes de usuário são strings não vazias que não contêm espaços em branco.

# Instruções

A associação do teu bairro está a pedir-te para gerires as inscrições dos lotes do jardim. O estado vive em duas variáveis dinâmicas:

- `registrations`, um vetor de tuplos `plot` atualmente atribuídos a uma pessoa.
- `next-id`, o número inteiro a usar para a próxima inscrição.

O tuplo `plot` tem duas fendas:

| fenda           | tipo     |
| --------------- | -------- |
| `id`            | inteiro  |
| `registered-to` | string   |

## 1. Abrir o jardim e listar as inscrições

Define `open-garden` para inicializar as variáveis dinâmicas: um vetor vazio para `registrations` e `1` para `next-id`. De seguida, define `list-registrations` para devolver o vetor de lotes atual.

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. Registar um lote

Define `register` para retirar um nome da pilha, construir um `plot` novo com o próximo id disponível, acrescentá-lo ao vetor `registrations`, aumentar `next-id` em uma unidade e devolver o novo lote.

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

Os ids dos lotes têm de ser únicos e aumentar mesmo depois de uma libertação: o `next-id` nunca deve reutilizar um valor.

## 3. Libertar um lote

Define `release` para receber um id e remover a entrada correspondente de `registrations`. Libertar um id desconhecido não faz nada.

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. Obter um lote registado

Define `get-registration` para receber um id e devolver o lote correspondente, ou o símbolo `not-found` se nenhum lote tiver esse id.

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. Encontrar lotes por nome

Define `find-by-name` para receber um nome e devolver um vetor com todos os lotes atualmente atribuídos a essa pessoa.

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```

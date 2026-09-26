# Instruções

A associação de moradores está pedindo que você cuide dos registros dos canteiros do jardim. O estado fica em duas variáveis dinâmicas:

- `registrations`: um vetor de tuplas `plot` registradas no momento para uma pessoa.
- `next-id`: o inteiro que será usado no próximo registro.

A tupla `plot` tem duas fendas:

| fenda           | tipo     |
| --------------- | -------- |
| `id`            | inteiro  |
| `registered-to` | string   |

## 1. Abra o jardim e liste os registros

Defina `open-garden` para inicializar as variáveis dinâmicas: um vetor vazio para `registrations` e `1` para `next-id`. Depois, defina `list-registrations` para retornar o vetor atual de canteiros.

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. Registre um canteiro

Defina `register` para retirar um nome da pilha, montar um novo `plot` com o próximo id disponível, adicioná-lo ao vetor `registrations`, incrementar `next-id` em um e retornar o novo canteiro.

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

Os ids dos canteiros devem ser únicos e continuar crescendo mesmo depois de uma liberação: `next-id` nunca deve reutilizar um valor.

## 3. Libere um canteiro

Defina `release` para receber um id e remover a entrada correspondente de `registrations`. Liberar um id desconhecido não faz nada.

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. Obtenha um canteiro registrado

Defina `get-registration` para receber um id e retornar o canteiro correspondente, ou o símbolo `not-found` se nenhum canteiro tiver esse id.

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. Encontre canteiros por nome

Defina `find-by-name` para receber um nome e retornar um vetor com todos os canteiros registrados no momento para essa pessoa.

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```

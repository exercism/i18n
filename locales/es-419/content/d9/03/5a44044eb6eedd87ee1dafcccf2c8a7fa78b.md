# Instrucciones

La asociación de tu comunidad te pide que administres los registros de parcelas del jardín. El estado se guarda en dos variables dinámicas:

- `registrations` — un vector de tuplas `plot` asignadas actualmente a una persona.
- `next-id` — el entero que se usará para el próximo registro.

La tupla `plot` tiene dos campos:

| campo           | tipo     |
| --------------- | -------- |
| `id`            | integer  |
| `registered-to` | string   |

## 1. Abre el jardín y lista sus registros

Define `open-garden` para inicializar las variables dinámicas: un vector vacío para `registrations` y `1` para `next-id`. Después define `list-registrations` para devolver el vector actual de parcelas.

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. Registra una parcela

Define `register` para tomar un nombre de la pila, construir una `plot` nueva con el siguiente id disponible, agregarla al vector `registrations`, aumentar `next-id` en uno y devolver la nueva parcela.

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

Los ids de las parcelas deben ser únicos y seguir aumentando incluso después de liberar una. `next-id` nunca debe reutilizar un valor.

## 3. Libera una parcela

Define `release` para tomar un id y eliminar de `registrations` la entrada que coincida. Liberar un id desconocido no tiene ningún efecto.

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. Obtén una parcela registrada

Define `get-registration` para tomar un id y devolver la parcela que coincida, o el símbolo `not-found` si ninguna parcela tiene ese id.

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. Busca parcelas por nombre

Define `find-by-name` para tomar un nombre y devolver un vector con todas las parcelas registradas actualmente a nombre de esa persona.

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```

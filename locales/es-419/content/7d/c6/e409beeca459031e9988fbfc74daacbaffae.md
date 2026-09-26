# Instrucciones

En este ejercicio, tienes que traducir algunas reglas del clásico juego Pac-Man a funciones de Elixir.

Tienes cuatro reglas que traducir, todas relacionadas con los estados del juego.

> No te preocupes por cómo se derivan los argumentos; simplemente concéntrate en combinarlos para devolver el resultado esperado.

## 1. Define si Pac-Man se come un fantasma

Define la función `Rules.eat_ghost?/2`, que recibe dos argumentos (_si Pac-Man tiene una píldora de poder activa_ y _si Pac-Man está tocando un fantasma_) y devuelve un valor de tipo Boolean si Pac-Man puede comerse al fantasma. La función debe devolver true solo si Pac-Man tiene una píldora de poder activa y está tocando un fantasma.

```elixir
Rules.eat_ghost?(false, true)
# => false
```

## 2. Define si Pac-Man anota

Define la función `Rules.score?/2`, que recibe dos argumentos (_si Pac-Man está tocando una píldora de poder_ y _si Pac-Man está tocando un punto_) y devuelve un valor de tipo Boolean si Pac-Man anota. La función debe devolver true si Pac-Man está tocando una píldora de poder o un punto.

```elixir
Rules.score?(true, true)
# => true
```

## 3. Define si Pac-Man pierde

Define la función `Rules.lose?/2`, que recibe dos argumentos (_si Pac-Man tiene una píldora de poder activa_ y _si Pac-Man está tocando un fantasma_) y devuelve un valor de tipo Boolean si Pac-Man pierde. La función debe devolver true si Pac-Man está tocando un fantasma y no tiene una píldora de poder activa.

```elixir
Rules.lose?(false, true)
# => true
```

## 4. Define si Pac-Man gana

Define la función `Rules.win?/3`, que recibe tres argumentos (_si Pac-Man se ha comido todos los puntos_, _si Pac-Man tiene una píldora de poder activa_ y _si Pac-Man está tocando un fantasma_) y devuelve un valor de tipo Boolean si Pac-Man gana. La función debe devolver true si Pac-Man se ha comido todos los puntos y no ha perdido según los argumentos definidos en la parte 3.

```elixir
Rules.win?(false, true, false)
# => false
```

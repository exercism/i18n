# Instrucciones

Eres un marinero que vuelve a estibar cajas de carga en el muelle. Cada tarea es una sola palabra cuyo cuerpo usa únicamente palabras de reordenamiento, sin aritmética.

## 1. Intercambia las dos cajas de arriba

Define la palabra `swap-crates`. Toma dos cajas de la pila y las vuelve a dejar en el orden opuesto.

```factor
1 2 swap-crates .s
! 2
! 1
```

## 2. Elimina la caja derramada

Define la palabra `clear-spill`. Toma tres cajas de la pila y deja las dos de abajo, descartando la de arriba.

```factor
1 2 3 clear-spill .s
! 1
! 2
```

## 3. Conserva una copia de la caja de abajo

Define la palabra `peek-under`. Toma dos cajas de la pila y las deja con una copia de la caja inferior colocada encima.

```factor
1 2 peek-under .s
! 1
! 2
! 1
```

## 4. Ordena la cubierta

Define la palabra `tidy-deck`. Toma tres cajas de la pila, en el orden `x y z`, y deja `z z y`: descarta la caja de abajo y luego deja dos copias de la caja de arriba debajo de la del medio.

```factor
1 2 3 tidy-deck .s
! 3
! 3
! 2
```

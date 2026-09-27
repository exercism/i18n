# Pistas

## General

- Un `include` va dentro de la clase, normalmente como su primera línea.
- Solo cambia lo que renombras o dejas fuera. Todo lo demás entra tal cual estaba.

## 1. La rutina de jazz

- Una línea dentro de la clase: `include WARM_UP;`
- Nada más. El cuerpo de la clase es esa línea y nada más.

## 2. La rutina de claqué

- `include WARM_UP describe -> ;`
- El `-> ;` sin nada después de la flecha deja fuera `describe`, que es lo que hace sitio para el que escribes.
- Sin él, el compilador se queja de que `describe` está definido dos veces. Ese error es la funcionalidad: Sather no elegirá uno en silencio.

## 3. El final

- Dos entradas en un solo include, separadas por una coma:
  `include WARM_UP counts -> warm_up_counts, describe -> ;`
- Después escribe `counts` devolviendo `warm_up_counts * 2`, y `describe`.
- `describe` debería llamar a `counts`, no volver a calcular el número.
- Recuerda que a un número no se le puede sumar un string, así que una descripción que empiece con palabras está bien: `"Finale: " + counts + " counts"`.

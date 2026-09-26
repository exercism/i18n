# Instrucciones

Eres el gerente de un restaurante elegante que tiene una cava de vinos considerable. Muchos de tus clientes son exigentes aficionados al vino. Encontrar la botella de vino adecuada para un cliente en particular no es una tarea fácil.

Como dueño de restaurante con buen conocimiento de la tecnología, decidiste agilizar el proceso de selección de vinos escribiendo una app que les permita a tus comensales filtrar tus vinos según sus preferencias.

## 1. Obtén todos los vinos de un color determinado

Una botella de vino se representa con un tipo personalizado, y los vinos se almacenan en un array.

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

Implementa la función `wines_of_color`. Debe recibir un array de vinos y devolver todos los vinos de un color determinado.

```gleam
wines_of_color(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  color: White
)
// -> [
//   Wine("Chardonnay", 2015, "Italy", White),
//   Wine("Pinot grigio", 2017, "Germany", White),
// ]
```

## 2. Obtén todas las botellas de vino de un país determinado

Implementa la función `wines_from_country`. Debe recibir un array de vinos y devolver todos los vinos de un país determinado.

```gleam
wines_from_country(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  country: "Germany"
)
// -> [
//   Wine("Dornfelder", 2018, "Germany", Rose)
// ]
```

## 3. Obtén todos los vinos de un color determinado embotellados en un país determinado

Implementa la función `filter`. Debe recibir un array de vinos, un color y un país, y devolver todos los vinos del color determinado embotellados en el país determinado.

```gleam
filter(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  color: White
  country: "Italy"
)
// -> [
//   Wine("Chardonnay", 2015, "Italy", White),
// ]
```

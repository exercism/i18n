# Instruções

Você é o gerente de um restaurante chique que tem uma adega considerável. Muitos dos seus clientes são entusiastas exigentes de vinho. Encontrar a garrafa certa de vinho para um cliente específico não é uma tarefa fácil.

Como dono de restaurante ligado em tecnologia, você decidiu acelerar o processo de seleção de vinhos escrevendo um aplicativo que permite aos clientes filtrar seus vinhos de acordo com as preferências deles.

## 1. Obter todos os vinhos de uma determinada cor

Uma garrafa de vinho é representada por um tipo personalizado, e os vinhos são armazenados em uma lista.

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

Implemente a função `wines_of_color`. Ela deve receber uma lista de vinhos e retornar todos os vinhos de uma determinada cor.

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

## 2. Obter todas as garrafas de vinho de um determinado país

Implemente a função `wines_from_country`. Ela deve receber uma lista de vinhos e retornar todos os vinhos de um determinado país.

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

## 3. Obter todos os vinhos de uma determinada cor engarrafados em um determinado país

Implemente a função `filter`. Ela deve receber uma lista de vinhos, uma cor e um país e retornar todos os vinhos da cor determinada engarrafados no país determinado.

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

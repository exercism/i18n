# Instruções

És o gerente de um restaurante requintado com uma cave de vinhos considerável. Muitos dos teus clientes são apreciadores de vinho exigentes. Encontrar a garrafa de vinho certa para um determinado cliente não é tarefa fácil.

Como proprietário de um restaurante com conhecimentos de tecnologia, decidiste acelerar o processo de seleção de vinhos escrevendo uma aplicação que permite aos clientes filtrar os teus vinhos pelas suas preferências.

## 1. Obter todos os vinhos de uma determinada cor

Uma garrafa de vinho é representada por um tipo personalizado e os vinhos são guardados numa lista.

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

Implementa a função `wines_of_color`. Deve receber uma lista de vinhos e devolver todos os vinhos de uma determinada cor.

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

Implementa a função `wines_from_country`. Deve receber uma lista de vinhos e devolver todos os vinhos de um determinado país.

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

## 3. Obter todos os vinhos de uma determinada cor engarrafados num determinado país

Implementa a função `filter`. Deve receber uma lista de vinhos, uma cor e um país, e devolver todos os vinhos de uma determinada cor engarrafados num determinado país.

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

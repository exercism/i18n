# Dicas

## Geral

- Existem três tipos principais de condicionais em Swift: condicionais `if`, condicionais `switch` e condicionais `guard`.

## 1. Calcule se você pode ou não pagar as parcelas mensais de um determinado carro

- Certifique-se de dividir o preço total do carro pelo número de meses para calcular o valor da parcela mensal.
- Você pode usar `+` para concatenar duas strings.

## 2. Determine o tipo de carteira de motorista que você vai precisar

- As condicionais `switch` são boas para lidar com um grande número de casos de forma limpa.
- Você pode tratar vários casos com um único caso de `switch` se o comportamento for o mesmo para todos eles.
- O caso `default` trata todos os casos que não foram listados explicitamente.

## 3. Calcule as taxas de registro do seu novo veículo

- A condicional `guard` é usada em situações em que uma saída antecipada é desejável, porque o processamento adicional não é necessário (ou não é possível).
- Você só precisa fazer o cálculo com a fórmula se o veículo tiver menos de 10 anos.

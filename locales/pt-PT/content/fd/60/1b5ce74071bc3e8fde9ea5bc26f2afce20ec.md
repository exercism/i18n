# Instruções

Já trabalhas no escritório da cidade há algum tempo e tens vindo a desenvolver um conjunto de ferramentas que aceleram o teu trabalho do dia a dia, por exemplo a preencher formulários.

Agora, um novo colega vai juntar-se a ti e apercebeste-te de que as tuas ferramentas podem não ser autoexplicativas.
Há muitas convenções estranhas no teu escritório, como preencher sempre os formulários com letras maiúsculas e evitar deixar campos vazios.

Como primeiro passo, decides adicionar declarações de tipo do PHP para que seja mais fácil para o teu novo colega começar a usar as tuas ferramentas de imediato.

## 1. Declara os tipos da classe Address

Adiciona declarações de tipo das propriedades a cada uma das propriedades declaradas da classe `Address`.
Cada propriedade da classe deve ser declarada como string.

## 2. Declara os tipos para preencher o formulário com valores em branco

Adiciona uma declaração de tipo de parâmetro e uma declaração de tipo devolvido ao método `blanks` da classe `Form`.
O método deve receber um comprimento inteiro e devolver uma representação da linha em branco sob a forma de string.

## 3. Declara o tipo ao dividir um valor em letras separadas

Adiciona uma declaração de tipo de parâmetro e uma declaração de tipo devolvido ao método `letters` da classe `Form`.
O método deve receber uma string, que representa palavras, e devolver um array de letras.

## 4. Declara o tipo ao verificar se um valor cabe num formulário

Adiciona declarações de tipo de parâmetro e uma declaração de tipo devolvido ao método `checkLength` da classe `Form`.
O método deve receber uma palavra em string e um comprimento máximo inteiro, e devolver um valor verdadeiro ou falso.

## 5. Declara o tipo ao formatar um endereço no formulário

Adiciona uma declaração de tipo de parâmetro, recorrendo à classe `Address` atualizada anteriormente, e uma declaração de tipo devolvido ao método `formatAddress` da classe `Form`.
O método deve receber um `Address` e devolver uma string formatada.

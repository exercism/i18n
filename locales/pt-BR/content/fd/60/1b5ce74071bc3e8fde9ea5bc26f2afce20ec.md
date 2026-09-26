# Instruções

Você trabalha no escritório da cidade há um tempo e desenvolveu um conjunto de ferramentas que agilizam seu dia a dia, por exemplo para preencher formulários.

Agora, um novo colega está se juntando a você, e você percebeu que suas ferramentas podem não ser autoexplicativas.
Existem muitas convenções estranhas no seu escritório, como sempre preencher formulários com letras maiúsculas e evitar deixar campos vazios.

Como primeiro passo, você decide adicionar declarações de tipo do PHP para que seu novo colega possa entrar em ação e começar a usar suas ferramentas com mais facilidade.

## 1. Declare os tipos da classe Address

Adicione declarações de tipo às propriedades declaradas da classe `Address`.
Cada propriedade da classe deve ser declarada como uma string.

## 2. Declare os tipos para preencher o formulário com valores em branco

Adicione uma declaração de tipo de parâmetro e uma declaração de tipo de retorno ao método `blanks` da classe `Form`.
O método deve receber um comprimento como número inteiro e retornar uma string que representa a linha em branco.

## 3. Declare o tipo ao dividir um valor em letras separadas

Adicione uma declaração de tipo de parâmetro e uma declaração de tipo de retorno ao método `letters` da classe `Form`.
O método deve receber uma string, representando palavras, e retornar um array de letras.

## 4. Declare o tipo ao verificar se um valor cabe em um formulário

Adicione declarações de tipo de parâmetro e uma declaração de tipo de retorno ao método `checkLength` da classe `Form`.
O método deve receber uma palavra como string e um comprimento máximo como número inteiro, e retornar um valor true ou false.

## 5. Declare o tipo ao formatar um endereço no formulário

Adicione uma declaração de tipo de parâmetro, usando a classe `Address` atualizada anteriormente, e uma declaração de tipo de retorno ao método `formatAddress` da classe `Form`.
O método deve receber um `Address` e retornar uma string formatada.

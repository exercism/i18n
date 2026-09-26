# Cabeçalho fictício

## Biblioteca de funções

Este é o primeiro exercício que vemos em que a solução que estamos escrevendo
não é um script "main". Estamos escrevendo uma biblioteca para ser carregada
com "source" em outros scripts que vão chamar nossas funções.

### Namerefs do Bash

Este exercício exige o uso de variáveis `nameref`. Isso requer uma versão do
bash pelo menos 4.0. Se você estiver usando o bash padrão no MacOS, vai
precisar instalar outra versão: veja [Instalando o Bash](https://exercism.io/tracks/bash/installation)

Namerefs são uma forma de passar uma variável para uma função _por referência_.
Assim, a variável pode ser modificada dentro da função e o valor atualizado fica
disponível no escopo que fez a chamada. Veja um exemplo:
```bash
prependElements() {
    local -n __array=$1
    shift
    __array=( "$@" "${__array[@]}" )
}

my_array=( a b c )
echo "before: ${my_array[*]}"    # => before: a b c

prependElements my_array d e f
echo "after: ${my_array[*]}"     # => after: d e f a b c
```

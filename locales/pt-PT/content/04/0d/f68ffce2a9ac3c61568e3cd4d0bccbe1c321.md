# Cabeçalho fictício

## Biblioteca de funções

Este é o primeiro exercício que vemos em que a solução que escrevemos não é um script "main". Estamos a escrever uma biblioteca que vai ser "source"ada dentro de outros scripts, que irão invocar as nossas funções.

### Namerefs do Bash

Este exercício exige a utilização de variáveis `nameref`. Para isso é preciso uma versão do bash igual ou superior a 4.0. Se estiveres a usar o bash que vem por omissão no MacOS, vais precisar de instalar outra versão: consulta [Instalar o Bash](https://exercism.io/tracks/bash/installation)

Os namerefs são uma forma de passar uma variável a uma função _por referência_. Assim, a variável pode ser modificada dentro da função e o valor atualizado fica disponível no âmbito de quem a chamou. Aqui está um exemplo:
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

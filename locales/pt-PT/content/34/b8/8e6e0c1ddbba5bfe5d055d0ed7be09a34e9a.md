# Sobre

Reduzir consiste em aplicar repetidamente uma função a cada elemento de uma sequência e em acumular, de alguma forma, os resultados.
A função aplicada recebe dois parâmetros: o valor acumulado atual e o elemento a processar.
Tem de avaliar para o novo valor acumulado.

Nalgumas linguagens de programação, isto chama-se accumulate ou fold.

Em Common Lisp, o processo faz-se com a função `reduce`.
Na sua forma mais simples, é assim:

`(reduce #'function-to-apply sequence :initial-value value)`

Repara que é fornecido um valor inicial: será esse o «valor acumulado atual» que é passado à função quando o primeiro elemento é processado.

Eis um exemplo que soma os números da lista, começando com um valor inicial de 10:

`(reduce #'+ '(1 2 3 4) :initial-value 10) ; => 20`

Repara que, se a sequência estiver vazia, a função nunca é chamada e a forma avalia para o valor inicial.

## Especificar ou não o valor inicial

O argumento `:initial-value` não é obrigatório e o `reduce` comporta-se de forma diferente consoante ele seja ou não fornecido e consoante a sequência tenha elementos.

1. Se o valor inicial não for fornecido e a sequência tiver mais do que um elemento, então a primeira vez que a função é chamada é chamada com os dois primeiros elementos da sequência.
2. Se o valor inicial não for fornecido e a sequência tiver um elemento, então a forma avalia para esse elemento e a função não é chamada.
3. Se o valor inicial for fornecido e a sequência estiver vazia, então a forma avalia para o valor inicial e a função não é chamada.
4. Se o valor inicial não for fornecido e a sequência estiver vazia, então a função é chamada com *zero* argumentos.

O último caso é daqueles que pode apanhar as pessoas de surpresa.
Normalmente é fácil fornecer um valor inicial para que o programa nunca chegue a este caso estranho.

## Outros argumentos de palavra-chave

O `reduce` aceita outros argumentos de palavra-chave que podem ser úteis em alguns casos.

* `:start` e `:end`: especificam índices na sequência que fazem com que o reduce trabalhe sobre uma sub-sequência. Por omissão, são `0` e `nil`, respetivamente, ou seja, o início e o fim da sequência.
* `:from-end`: se este boolean generalizado avaliar como verdadeiro, então, em vez de trabalhar da esquerda para a direita, a redução acontece da direita para a esquerda.
* `:key` especifica uma função a chamar sobre cada elemento *antes* de este ser entregue à função de redução. Esta função *não* é aplicada ao valor especificado como `:initial-value`.

Alguns exemplos:

```lisp
(reduce #'+ '(1 2 3 4 5 6 7 8 9 10) 
        :start 2 :end 5)               ; => 12 (only adds 3, 4, 5)
(reduce #'cons '(1 2 3))               ; => ((1 . 2) . 3)
(reduce #'cons '(1 2 3) :from-end t)   ; => (1 2 . 3)
(reduce #'+ '((1) (2) (3)) :key #'car) ; => 6
```

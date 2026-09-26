# Sobre

Reduzir é a aplicação repetida de uma função a cada elemento de uma sequência, acumulando de alguma forma os resultados.
A função aplicada recebe dois parâmetros: o valor acumulado atual e o item a processar.
Ela deve resultar no novo valor acumulado.

Em algumas linguagens de programação, isso é chamado de accumulate ou fold.

Em Common Lisp, o processo é feito com a função `reduce`.
Na sua forma mais simples, ela se parece com:

`(reduce #'function-to-apply sequence :initial-value value)`

Repare que um valor inicial é fornecido. Esse será o "valor acumulado atual" passado para a função quando o primeiro elemento for processado.

Veja um exemplo que soma os números da lista, começando com um valor inicial de 10:

`(reduce #'+ '(1 2 3 4) :initial-value 10) ; => 20`

Observe que, se a sequência estiver vazia, a função nunca é chamada e a forma resulta no valor inicial.

## Especificar o valor inicial ou não

O argumento `:initial-value` não é obrigatório, e o `reduce` se comporta de forma diferente dependendo de ele ter sido fornecido e de a sequência ter elementos.

1. Se o valor inicial não for fornecido e a sequência tiver mais de um elemento, então, na primeira vez que a função é chamada, ela recebe os dois primeiros elementos da sequência.
2. Se o valor inicial não for fornecido e a sequência tiver um elemento, a forma resulta nesse elemento e a função não é chamada.
3. Se o valor inicial for fornecido e a sequência estiver vazia, a forma resulta no valor inicial e a função não é chamada.
4. Se o valor inicial não for fornecido e a sequência estiver vazia, a função é chamada com *zero* argumentos.

O último caso é um daqueles que pode confundir as pessoas.
Normalmente é fácil fornecer um valor inicial para que o programa nunca chegue a esse caso estranho.

## Outros argumentos de palavra-chave

O `reduce` aceita outros argumentos de palavra-chave que podem ser úteis em alguns casos.

* `:start` e `:end`: especificam índices na sequência, o que faz o `reduce` trabalhar sobre uma sub-sequência. Seus valores padrão são `0` e `nil`, respectivamente, ou seja, o início e o fim da sequência.
* `:from-end`: se esse Boolean generalizado for avaliado como verdadeiro, então, em vez de trabalhar da esquerda para a direita, a redução acontecerá da direita para a esquerda.
* `:key`: especifica uma função a ser chamada em cada elemento *antes* de ele ser passado para a função de redução. Essa função *não* é aplicada ao valor especificado como `:initial-value`.

Alguns exemplos:

```lisp
(reduce #'+ '(1 2 3 4 5 6 7 8 9 10) 
        :start 2 :end 5)               ; => 12 (only adds 3, 4, 5)
(reduce #'cons '(1 2 3))               ; => ((1 . 2) . 3)
(reduce #'cons '(1 2 3) :from-end t)   ; => (1 2 . 3)
(reduce #'+ '((1) (2) (3)) :key #'car) ; => 6
```

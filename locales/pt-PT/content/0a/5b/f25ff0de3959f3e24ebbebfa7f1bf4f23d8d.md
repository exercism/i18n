# Instruções

A Chaitana é proprietária de um parque de diversões muito popular.
 Só tem uma atração, mesmo no centro de terrenos belissimamente ajardinados: The Biggest Roller Coaster in the World(TM).
 Apesar de só existir esta atração, há pessoas que viajam de todo o mundo e ficam horas na fila para poderem andar na montanha-russa da Chaitana.

Há duas filas para esta atração, cada uma representada por uma `list`:

1. Fila normal
2. Fila express (_também conhecida como Fast-track_), onde as pessoas pagam a mais para ter acesso prioritário.


Foi-te pedido que escrevas algum código para gerir melhor os visitantes do parque.
 Tens de implementar as seguintes funções o mais depressa possível, antes que os visitantes (e a tua chefe, a Chaitana!) fiquem irritados.
 Certifica-te de que lês com atenção.
 Algumas tarefas pedem que alteres ou atualizes a fila existente, enquanto outras pedem que faças uma cópia dela.


## 1. Acrescenta-me à fila

Define a função `add_me_to_the_queue()` que recebe 4 parâmetros `<express_queue>, <normal_queue>, <ticket_type>, <person_name>` e devolve a fila adequada atualizada com o nome da pessoa.


1. `<ticket_type>` é um `int`, em que 1 == express_queue e 0 == normal_queue.
2. `<person_name>` é o nome (como `str`) da pessoa a acrescentar à fila respetiva.


```python
>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=1, person_name="RichieRich")
...
["Tony", "Bruce", "RichieRich"]

>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=0, person_name="HawkEye")
....
["RobotGuy", "WW", "HawkEye"]
```

## 2. Onde estão os meus amigos?

Uma pessoa chegou atrasada ao parque, mas quer juntar-se à fila onde os amigos estão à espera.
 Mas não faz ideia de onde os amigos estão na fila e não há cobertura de telemóvel para lhes telefonar.

Define a função `find_my_friend()` que recebe 2 parâmetros `queue` e `friend_name` e devolve a posição na fila do nome da pessoa.


1. `<queue>` é a `list` das pessoas que estão na fila.
2. `<friend_name>` é o nome do amigo cujo índice (lugar na fila) precisas de encontrar.

Lembra-te: a indexação começa em 0 a partir da esquerda e em -1 a partir da direita.


```python
>>> find_my_friend(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], friend_name="Steve")
...
1
```


## 3. Posso juntar-me a eles?

Agora que os amigos já foram encontrados (na tarefa n.º 2 acima), quem chegou atrasado gostaria de se juntar a eles no lugar deles na fila.
Define a função `add_me_with_my_friends()` que recebe 3 parâmetros `queue`, `index` e `person_name`.


1. `<queue>` é a `list` das pessoas que estão na fila.
2. `<index>` é a posição onde a nova pessoa deve ser acrescentada.
3. `<person_name>` é o nome da pessoa a acrescentar na posição do índice.

Devolve a fila atualizada com o nome de quem chegou atrasado.


```python
>>> add_me_with_my_friends(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], index=1, person_name="Bucky")
...
["Natasha", "Bucky", "Steve", "T'challa", "Wanda", "Rocket"]
```

## 4. Pessoa mal-educada na fila

Acabaste de ouvir na fila que há uma pessoa mesmo má a empurrar, a gritar e a criar confusão.
 Tens de expulsar esse malfeitor por mau comportamento!


Define a função `remove_the_mean_person()` que recebe 2 parâmetros `queue` e `person_name`.


1. `<queue>` é a `list` das pessoas que estão na fila.
2. `<person_name>` é o nome da pessoa que precisa de ser expulsa.

Devolve a fila atualizada sem o nome da pessoa má.

```python
>>> remove_the_mean_person(queue=["Natasha", "Steve", "Eltran", "Wanda", "Rocket"], person_name="Eltran")
...
["Natasha", "Steve", "Wanda", "Rocket"]
```


## 5. Homónimos

Pode ser que nunca tenhas visto duas pessoas sem qualquer parentesco que sejam exatamente iguais, mas já viste _de certeza_ pessoas sem qualquer parentesco com exatamente o mesmo nome (_homónimos_)!
 Hoje, parece que há muitos deles entre os presentes.
  Queres saber quantas vezes um determinado nome aparece na fila.

Define a função `how_many_namefellows()` que recebe 2 parâmetros `queue` e `person_name`.

1. `<queue>` é a `list` das pessoas que estão na fila.
2. `<person_name>` é o nome que achas que pode aparecer mais do que uma vez na fila.


Devolve o número de ocorrências de `person_name`, como um `int`.


```python
>>> how_many_namefellows(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"], person_name="Natasha")
...
2
```

## 6. Remove a última pessoa

Infelizmente, hoje o parque está superlotado e tens de remover a última pessoa da fila normal (_vais dar-lhe um vale para voltar na Fast-track noutro dia_).
 Vais ter de definir a função `remove_the_last_person()` que recebe 1 parâmetro, `queue`, que é a lista das pessoas que estão na fila.

Deves atualizar a `list` e também fazer `return` do nome da pessoa que foi removida, para lhe poderes escrever um vale.


```python
>>> remove_the_last_person(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
'Rocket'
```

## 7. Ordena a lista da fila

Por motivos administrativos, precisas de obter todos os nomes de uma determinada fila por ordem alfabética.


Define a função `sorted_names()` que recebe 1 argumento, `queue` (a `list` das pessoas que estão na fila), e devolve uma cópia `sorted` da `list`.


```python
>>> sorted_names(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
['Eltran', 'Natasha', 'Natasha', 'Rocket', 'Steve']
```

# Instruções

Chaitana é dona de um parque temático muito popular.
Ela tem apenas uma atração, bem no centro de um terreno belamente paisagístico: a Maior Montanha-Russa do Mundo(TM).
Embora só exista essa única atração, pessoas vêm de todas as partes do mundo e ficam horas na fila pela oportunidade de andar na hypercoaster de Chaitana.

Há duas filas para essa atração, cada uma representada como uma `list`:

1. Fila Normal
2. Fila Express (_também conhecida como Fast-track_), em que as pessoas pagam a mais por acesso prioritário.


Você recebeu a tarefa de escrever um código para gerenciar melhor os visitantes do parque.
Você precisa implementar as funções a seguir o quanto antes, antes que os visitantes (e sua chefe, Chaitana!) fiquem de mau humor.
Certifique-se de ler com atenção.
Algumas tarefas pedem que você altere ou atualize a fila existente, enquanto outras pedem que você faça uma cópia dela.


## 1. Me adicione à fila

Defina a função `add_me_to_the_queue()` que recebe 4 parâmetros `<express_queue>, <normal_queue>, <ticket_type>, <person_name>` e retorna a fila apropriada atualizada com o nome da pessoa.


1. `<ticket_type>` é um `int` em que 1 == express_queue e 0 == normal_queue.
2. `<person_name>` é o nome (como `str`) da pessoa a ser adicionada à fila correspondente.


```python
>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=1, person_name="RichieRich")
...
["Tony", "Bruce", "RichieRich"]

>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=0, person_name="HawkEye")
....
["RobotGuy", "WW", "HawkEye"]
```

## 2. Onde estão meus amigos?

Uma pessoa chegou atrasada ao parque, mas quer entrar na fila onde seus amigos estão esperando.
Mas ela não tem ideia de onde seus amigos estão na fila e não há sinal de celular para ligar para eles.

Defina a função `find_my_friend()` que recebe 2 parâmetros `queue` e `friend_name` e retorna a posição na fila do nome da pessoa.


1. `<queue>` é a `list` de pessoas na fila.
2. `<friend_name>` é o nome do amigo cujo índice (lugar na fila) você precisa encontrar.

Lembre-se: a indexação começa em 0 pela esquerda e em -1 pela direita.


```python
>>> find_my_friend(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], friend_name="Steve")
...
1
```


## 3. Posso entrar na fila com eles?

Agora que seus amigos foram encontrados (na tarefa nº 2 acima), a pessoa que chegou atrasada gostaria de se juntar a eles em seu lugar na fila.
Defina a função `add_me_with_my_friends()` que recebe 3 parâmetros `queue`, `index` e `person_name`.


1. `<queue>` é a `list` de pessoas na fila.
2. `<index>` é a posição em que a nova pessoa deve ser adicionada.
3. `<person_name>` é o nome da pessoa a adicionar na posição do índice.

Retorne a fila atualizada com o nome de quem chegou atrasado.


```python
>>> add_me_with_my_friends(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], index=1, person_name="Bucky")
...
["Natasha", "Bucky", "Steve", "T'challa", "Wanda", "Rocket"]
```

## 4. Pessoa mal-educada na fila

Você acabou de ouvir na fila que há uma pessoa muito mal-educada empurrando, gritando e causando confusão.
Você precisa expulsar essa pessoa por mau comportamento!


Defina a função `remove_the_mean_person()` que recebe 2 parâmetros `queue` e `person_name`.


1. `<queue>` é a `list` de pessoas na fila.
2. `<person_name>` é o nome da pessoa que precisa ser expulsa.

Retorne a fila atualizada sem o nome da pessoa mal-educada.

```python
>>> remove_the_mean_person(queue=["Natasha", "Steve", "Eltran", "Wanda", "Rocket"], person_name="Eltran")
...
["Natasha", "Steve", "Wanda", "Rocket"]
```


## 5. Xarás

Talvez você nunca tenha visto duas pessoas sem parentesco que se parecem exatamente iguais, mas _com certeza_ já viu pessoas sem parentesco com exatamente o mesmo nome (_xarás_)!
Hoje, parece que há muitos deles presentes.
Você quer saber quantas vezes um determinado nome aparece na fila.

Defina a função `how_many_namefellows()` que recebe 2 parâmetros `queue` e `person_name`.

1. `<queue>` é a `list` de pessoas na fila.
2. `<person_name>` é o nome que você acha que pode aparecer mais de uma vez na fila.


Retorne o número de ocorrências de `person_name`, como um `int`.


```python
>>> how_many_namefellows(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"], person_name="Natasha")
...
2
```

## 6. Remova a última pessoa

Infelizmente, o parque está superlotado hoje e você precisa remover a última pessoa da fila normal (_você vai dar a ela um voucher para voltar na fast-track em outro dia_).
Você terá que definir a função `remove_the_last_person()` que recebe 1 parâmetro `queue`, que é a lista de pessoas na fila.

Você deve atualizar a `list` e também `return` o nome da pessoa que foi removida, para poder escrever o voucher dela.


```python
>>> remove_the_last_person(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
'Rocket'
```

## 7. Ordene a lista da fila

Por motivos administrativos, você precisa colocar todos os nomes de uma fila em ordem alfabética.


Defina a função `sorted_names()` que recebe 1 argumento, `queue` (a `list` de pessoas na fila), e retorna uma cópia `sorted` da `list`.


```python
>>> sorted_names(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
['Eltran', 'Natasha', 'Natasha', 'Rocket', 'Steve']
```

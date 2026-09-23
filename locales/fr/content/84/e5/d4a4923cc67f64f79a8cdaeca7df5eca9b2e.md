# Instructions complémentaires

## Description du DSL

Un graphe, dans ce DSL, est un objet de type `Graph`. Il prend une `list` d'un ou plusieurs tuples qui décrivent :

+ des attributs
+ des `Nodes`
+ des `Edges`

Les implémentations d'un `Node` et d'un `Edge` sont fournies dans `dot_dsl.py`.

Pour plus de détails sur la conception attendue du DSL et sur les types d'erreurs et les messages d'erreur attendus, jette un œil aux cas de test dans `dot_dsl_test.py`


## Messages d'exception

Il est parfois nécessaire de [lever une exception](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Quand tu le fais, tu dois toujours inclure un **message d'erreur explicite** pour indiquer quelle est la source de l'erreur. Cela rend le code plus lisible et facilite grandement le débogage. Dans les cas où tu sais que la source de l'erreur sera d'un certain type, tu peux choisir de lever l'un des [types d'erreur intégrés](https://docs.python.org/3/library/exceptions.html#base-classes), mais tu dois quand même inclure un message explicite.

Cet exercice en particulier demande que tu utilises l'[instruction `raise`](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) pour « lancer » un `TypeError` quand un `Graph` est mal formé, et un `ValueError` quand un `Edge`, un `Node` ou un `attribute` est mal formé. Les tests ne passeront que si tu lèves l'`exception` avec `raise` et que tu y ajoutes un message.

Pour lever une erreur avec un message, écris le message comme argument du type `exception` :

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```

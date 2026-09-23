# Instructions complémentaires

## Messages d'exception

Parfois, il est nécessaire de [lever une exception](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Quand tu le fais, tu dois toujours inclure un **message d'erreur explicite** pour indiquer la source de l'erreur. Cela rend ton code plus lisible et facilite grandement le débogage. Lorsque tu sais que la source de l'erreur sera d'un certain type, tu peux choisir de lever l'un des [types d'erreur intégrés](https://docs.python.org/3/library/exceptions.html#base-classes), mais tu dois quand même inclure un message explicite.

Cet exercice en particulier te demande d'utiliser l'[instruction raise](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) pour « lancer » une `ValueError` lorsque la case fournie en entrée est hors limites. Les tests ne passeront que si tu lèves l'`exception` à l'aide de `raise` et que tu y ajoutes un message.

Pour lever une `ValueError` avec un message, écris le message en argument du type `exception` :

```python
# when the square value is not in the acceptable range        
raise ValueError("square must be between 1 and 64")
```

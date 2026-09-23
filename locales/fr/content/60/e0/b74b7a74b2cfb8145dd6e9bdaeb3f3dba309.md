# Annexe aux instructions

## Messages d'exception

Il est parfois nécessaire de [lever une exception](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Dans ce cas, tu dois toujours inclure un **message d'erreur explicite** pour indiquer l'origine de l'erreur. Cela rend le code plus lisible et facilite grandement le débogage. Dans les situations où tu sais que l'erreur sera d'un type précis, tu peux choisir de lever l'un des [types d'erreur intégrés](https://docs.python.org/3/library/exceptions.html#base-classes), mais tu dois quand même inclure un message explicite.

Cet exercice demande en particulier d'utiliser l'[instruction `raise`](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) pour « lever » une `ValueError` quand la fonction `prime()` reçoit une entrée malformée. Comme cet exercice ne traite que de nombres _positifs_, tout nombre < 1 est malformé. Les tests ne passeront que si tu `raise` l'`exception` et que tu l'accompagnes d'un message.

Pour lever une `ValueError` avec un message, passe le message en argument du type `exception` :

```python
# when the prime function receives malformed input
raise ValueError('there is no zeroth prime')
```

# Ajout aux instructions

## Implémentation

Implémente les méthodes `get` et `post` de la classe `RestAPI`.

Tu ne dois écrire que les fonctions de traitement, sans implémenter un vrai serveur HTTP. On peut simuler la base de données avec un objet en mémoire qui contiendra tous les utilisateurs stockés. Le constructeur de la classe `RestAPI` doit accepter une instance de cette base de données en argument (et définir une valeur par défaut si aucun argument n'a été passé).

Pour cette implémentation, dans le cas d'une requête `GET`, la charge utile doit faire partie de l'URL et être traitée comme des paramètres de requête, par exemple `/users?users=Adam,Bob`.

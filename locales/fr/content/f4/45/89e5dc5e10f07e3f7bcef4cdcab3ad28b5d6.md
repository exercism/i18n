# Workflow « aucun fichier important modifié »

Lorsqu'une PR de parcours qui touche un exercice est fusionnée, elle relance les tests de _toutes_ les dernières itérations publiées des solutions des apprenants.
Pour les exercices populaires, c'est une opération _très_ coûteuse (70 000 exécutions de tests pour le Hello World de Python, dans un cas extrême !).

Ce workflow vérifie si les modifications apportées dans une PR déclencheraient une nouvelle exécution des tests sur les solutions et, le cas échéant, il ajoute un commentaire expliquant le risque de fusionner la PR _en l'état_.
Il explique aussi comment fusionner la PR sans relancer les tests des solutions.

Pour plus d'informations, consulte la documentation [Évite de déclencher des exécutions de tests inutiles](https://exercism.org/docs/building/tracks#h-avoiding-triggering-unnecessary-test-runs).

## Source

Le workflow est défini dans le fichier `.github/workflows/no-important-files-changed.yml`.

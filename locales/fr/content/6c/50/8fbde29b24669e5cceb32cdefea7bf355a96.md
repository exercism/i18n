# Introduction

En Cairo, les tableaux sont des structures de données fondamentales conçues pour stocker des collections d'éléments du même type de manière structurée.
Tout comme les tableaux d'autres langages de programmation, chaque élément d'un tableau est accessible par son indice, ce qui permet de le récupérer et de le manipuler efficacement.

Les tableaux en Cairo sont des structures de données immuables.
On ne peut ajouter des éléments qu'à la fin du tableau ou en retirer qu'au début.
Cette conception garantit l'intégrité et la stabilité des données, ce qui correspond à l'approche de Cairo en matière de gestion de la mémoire.
Les tableaux sont initialisés avec `ArrayTrait::new()` et prennent en charge des déclarations propres au type pour le stockage des éléments.
On peut accéder aux éléments avec les méthodes `get()` ou `at()`, ou bien en utilisant l'opérateur d'indexation `arr[index]`.
On ne peut retirer des éléments qu'au début d'un tableau, en utilisant la fonction `pop_front()`.
Ces caractéristiques rendent les tableaux de Cairo adaptés aux tâches de stockage et de récupération de données structurées.

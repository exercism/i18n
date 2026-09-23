# Qu'est-ce qui est hors du périmètre du parcours Rust d'Exercism ?

Ce fichier a pour but d'expliquer ce que le parcours Rust d'Exercism peut et ne peut pas enseigner dans les limites du langage Rust, de sa communauté et de son écosystème.

Lorsqu'un sujet est traité dans la section « Out of scope » de _design.md_ pour un exercice donné, il ne doit pas être répété ici, sauf si l'on estime que le sujet n'est pas suffisamment mis en avant par ailleurs.

## Les limites de l'interface web

Un apprenant qui utilise l'interface web est limité à ce que permettent l'interface web et l'exécuteur de tests ; les capacités de l'interface web constituent donc en pratique une limite extérieure pour le parcours Rust.

Un apprenant peut :

- modifier un seul fichier `.rs`
- recevoir la sortie de `stdout` (par exemple depuis `dbg!`)

En particulier, cela signifie qu'il n'est pas possible de modifier Cargo.toml : tout exercice qui dépend d'une _crate_ externe doit donc déjà inclure toutes ses dépendances dans Cargo.toml.

## Ce qu'Exercism n'est pas

Exercism vise à acquérir de l'aisance dans un langage de programmation, et non à enseigner des compétences plus abstraites comme la conception logicielle ou l'informatique. Tout sujet qui n'est pas particulièrement pertinent pour le langage Rust n'entre donc pas dans le périmètre du parcours Rust.

## Exemples de sujets exclus

Voici quelques exemples de sujets exclus :

### Cargo

- modifier Cargo.toml
- les commandes CLI, par exemple `new`, `update` et `bench`

### Frameworks

- Amethyst
- Yew, Iced, Sauron, etc.

### Interopérabilité

- CFFI
- `asm!`

### En général :

- la gestion de fichiers
- les réseaux

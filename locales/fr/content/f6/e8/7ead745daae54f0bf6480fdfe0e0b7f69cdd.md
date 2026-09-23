# Instructions

Ta nostalgie des cartes Blorkemon™️ ne montre aucun signe de ralentissement : tu as même recommencé à les collectionner, et tu entraînes tes amis avec toi.

Dans cet exercice, tu vas utiliser l'interface `Set` pour t'aider à gérer ta collection, car les cartes en double n'ont pas d'importance quand ton objectif est d'obtenir toutes les cartes existantes.

## 1. Commence une collection

Tu viens de retrouver ta vieille réserve de cartes Blorkemon™️ !
Cette réserve contient un tas de cartes en double, il est donc temps de commencer une nouvelle collection en supprimant les doublons.

Tu veux vraiment que tes amis rejoignent ta folie Blorkemon™️, et la meilleure façon de faire est de lancer leur collection en leur donnant une carte.

Implémente la méthode `newCollection`, qui transforme une liste de cartes en un `Set` représentant ta nouvelle collection.

```java
GottaSnatchEmAll.newCollection(List.of("Newthree", "Newthree", "Newthree"));
// => {"Newthree"}
```

## 2. Fais grandir la collection

Une fois que tu as une collection, elle prend vie et doit grandir.

Implémente la méthode `addCard`, qui prend une nouvelle carte et ton ensemble actuel de cartes collectionnées.
La méthode doit ajouter la nouvelle carte à la collection si elle n'y est pas déjà présente, et doit renvoyer un `boolean` indiquant si la collection a été mise à jour.

```java
Set<String> collection = GottaSnatchEmAll.newCollection("Newthree");
GottaSnatchEmAll.addCard("Scientuna",collection);
// => true

collection.contains("Scientuna");
// => true
```

## 3. Commence à échanger

Tu veux vraiment que tes amis rejoignent ta folie Blorkemon™️, alors il est temps de commencer à échanger !

Lorsque tu échanges avec des amis, tous les échanges ne valent pas la peine d'être faits, ou ne sont pas possibles.
Tu ne dois échanger que si ton ami et toi possédez chacun une carte que l'autre n'a pas.

Implémente la méthode `canTrade`, qui prend ta collection actuelle et la collection d'un de tes amis.
Elle doit renvoyer un `boolean` indiquant si un échange est possible, en suivant les règles ci-dessus.

```java
Set<String> myCollection = Set.of("Newthree");
Set<String> theirCollection = Set.of("Scientuna");
GottaSnatchEmAll.canTrade(myCollection, theirCollection);
// => true
```

## 4. Identifie les cartes communes

Tes amis passionnés de Blorkemon™️ et toi vous réunissez et vous vous demandez quelles cartes sont les plus communes.

Implémente la méthode `commonCards`, qui prend une liste de collections et renvoie une collection des cartes que toutes les collections ont en commun.

```java
GottaSnatchEmAll.commonCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Scientuna"}
```

## 5. Toutes les cartes

Est-ce que tes amis et toi possédez collectivement toutes les cartes Blorkemon™️ ?

Implémente la méthode `allCards`, qui prend une liste de collections et renvoie une collection de toutes les cartes différentes présentes dans l'ensemble des collections réunies.

```java
GottaSnatchEmAll.allCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Newthree", "Scientuna"}
```

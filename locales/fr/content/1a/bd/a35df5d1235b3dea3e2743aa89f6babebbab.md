# Instructions

Ton amie Li Mei tient un bar à jus où elle vend de délicieux jus de fruits mélangés.
Tu es un client régulier de sa boutique et tu t'es rendu compte que tu pouvais simplifier la vie de ton amie.
Tu décides d'utiliser tes compétences en programmation pour aider Li Mei dans son travail.

## 1. Détermine combien de temps il faut pour mixer un jus

Li Mei aime annoncer à ses clients, à l'avance, combien de temps ils devront attendre pour un jus du menu qu'ils ont commandé.
Elle a du mal à se souvenir des chiffres exacts, car le temps nécessaire pour mixer les jus varie.
`"Pure Strawberry Joy"` prend 0,5 minute, `"Energizer"` et `"Green Garden"` prennent 1,5 minute chacun, `"Tropical Island"` prend 3 minutes et `"All or Nothing"` prend 5 minutes.
Pour toutes les autres boissons (par exemple les offres spéciales), tu peux considérer un temps de préparation de 2,5 minutes.

Pour aider ton amie, écris une fonction `time_to_mix_juice` qui prend en argument un jus du menu et renvoie le nombre de minutes nécessaires pour mixer cette boisson.

```julia-repl
julia> time_to_mix_juice("Tropical Island")
3

julia> time_to_mix_juice("Berries & Lime")
2.5
```

## 2. Réapprovisionne la réserve de quartiers de citron vert

Beaucoup des créations de Li Mei contiennent des quartiers de citron vert, que ce soit comme ingrédient ou pour la décoration.
Quand elle commence son service le matin, elle doit donc s'assurer que la réserve de quartiers de citron vert est pleine pour la journée à venir.

Implémente la fonction `limes_to_cut` qui prend le nombre de quartiers de citron vert que Li Mei doit couper et un tableau représentant la réserve de citrons verts entiers dont elle dispose.
Elle peut obtenir 6 quartiers à partir d'un citron vert `"small"`, 8 quartiers à partir d'un citron vert `"medium"` et 10 à partir d'un citron vert `"large"`.
Elle coupe toujours les citrons verts dans l'ordre dans lequel ils apparaissent dans la liste, en commençant par le premier.
Elle continue jusqu'à avoir atteint le nombre de quartiers dont elle a besoin ou jusqu'à ne plus avoir de citrons verts.

Li Mei aimerait savoir à l'avance combien de citrons verts elle doit couper.
La fonction `limes_to_cut` doit renvoyer le nombre de citrons verts à couper.

```julia-repl
julia> limes_to_cut(25, ["small", "small", "large", "medium", "small"])
4
```

## 3. Dresse la liste des temps de préparation de chaque commande dans la file

Li Mei aime garder une trace du temps qu'il faudra pour mixer les commandes des clients qui attendent.

Implémente la fonction `order_times`, qui prend une file de commandes et renvoie un vecteur de temps de préparation.

```julia-repl
julia> order_times(["Energizer", "Tropical Island"])
[1.5, 3.0]
```

## 4. Termine le service

Li Mei travaille toujours jusqu'à 15 h.
Son employé Dmitry prend alors le relais.
Il arrive souvent que des boissons aient été commandées mais ne soient pas encore préparées lorsque le service de Li Mei se termine.
Dmitry prépare alors les jus restants.

Pour faciliter la transition, implémente une fonction `remaining_orders` qui prend le nombre de minutes restantes dans le service de Li Mei et un tableau de jus qui ont été commandés mais pas encore préparés.
La fonction doit renvoyer les commandes que Li Mei ne peut pas commencer à préparer avant la fin de sa journée de travail.

Le temps restant dans le service sera toujours supérieur à 0.
Le tableau de jus à préparer ne sera jamais vide.
De plus, les commandes sont préparées dans l'ordre dans lequel elles apparaissent dans le tableau.
Si Li Mei commence à mixer un certain jus, elle le terminera toujours, même si elle doit travailler un peu plus longtemps.
S'il ne reste aucune commande dont Dmitry doit s'occuper, un vecteur vide doit être renvoyé.

```julia-repl
julia> remaining_orders(5, ["Energizer", "All or Nothing", "Green Garden"])
["Green Garden"]
```

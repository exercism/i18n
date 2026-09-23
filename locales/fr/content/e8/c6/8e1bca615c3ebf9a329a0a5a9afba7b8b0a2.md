# Bonnes pratiques

## Suis les bonnes pratiques officielles

Les [bonnes pratiques officielles pour les Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) regorgent de contenu très utile sur la façon d'améliorer tes Dockerfile.

## Performance

Tu dois avant tout optimiser les performances (en particulier pour les exécuteurs de tests).
Cela garantira que ton outillage s'exécute le plus rapidement possible et ne dépasse pas le délai imparti.

### Mesure

Mesurer régulièrement le temps d'exécution est un excellent moyen de te faire une idée des performances de l'outillage.
Prends l'habitude de mesurer le temps d'exécution à la fois après _et_ avant une modification.
Même quand tu te sens « certain » qu'une modification va améliorer les performances, tu dois quand même mesurer le temps d'exécution.

#### Scripts

Lorsque c'est possible, écris des scripts pour mesurer automatiquement les performances (ce qu'on appelle aussi le _benchmarking_).
Un outil en ligne de commande très utile est [hyperfine](https://github.com/sharkdp/hyperfine), mais n'hésite pas à utiliser ce qui a le plus de sens pour ton outillage.

Les dépôts d'outillage de parcours les plus récents auront accès aux deux scripts suivants :

1. `./bin/benchmark.sh` : mesurer les performances du code d'outillage du parcours ([code source](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark.sh))
2. `./bin/benchmark-in-docker.sh` : mesurer les performances de l'image Docker de l'outillage du parcours ([code source](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark-in-docker.sh))

```exercism/note
Si tu travailles sur un dépôt d'outillage de parcours qui ne contient pas ces fichiers, n'hésite pas à les copier dans ton dépôt à l'aide des liens de code source ci-dessus.
```

```exercism/caution
Les scripts de _benchmarking_ peuvent aider à estimer les performances de l'outillage.
Garde toutefois à l'esprit que les performances sur les serveurs de production d'Exercism sont souvent inférieures.
```

### Expérimente différentes images de base

Essaie différentes images de base (par exemple Alpine au lieu d'Ubuntu) pour voir si l'une surpasse (nettement) l'autre en performances.
Si les performances sont à peu près équivalentes, choisis l'image la plus petite.

### Essaie le réseau interne

Vérifie si utiliser le réseau `internal` au lieu de `none` améliore les performances.
Consulte la [documentation sur les réseaux](/docs/building/tooling/docker#network) pour plus d'informations.

### Préfère les commandes au moment de la construction à celles au moment de l'exécution

L'outillage du parcours lance un conteneur Docker ponctuel et éphémère qui exécute les étapes suivantes.

1. Un conteneur Docker est créé.
2. Le conteneur Docker est lancé avec les bons arguments.
3. Le conteneur Docker est détruit.

Par conséquent, le code qui s'exécute à l'étape 2 s'exécute à _chaque exécution de l'outillage_.
C'est pourquoi réduire la quantité de code exécuté à l'étape 2 est un excellent moyen d'améliorer les performances.
Une façon de faire est de déplacer du code du moment de l'exécution vers le moment de la construction.
Alors que le code exécuté au moment de l'exécution tourne à chaque exécution de l'outillage, le code exécuté au moment de la construction ne tourne qu'une seule fois (lorsque l'image Docker est construite).

Le code exécuté au moment de la construction tourne une seule fois, dans le cadre d'un workflow GitHub Actions.
Il n'y a donc aucun problème à ce que le code exécuté au moment de la construction soit (relativement) lent.

#### Exemple : précompiler des bibliothèques

Lorsqu'on lance les tests dans l'exécuteur de tests Haskell, certaines bibliothèques de base doivent être compilées.
Comme chaque exécution de tests se déroule dans un conteneur neuf, cela signifie que cette compilation était refaite à _chaque exécution de tests_ !
Pour éviter cela, le [Dockerfile de l'exécuteur de tests Haskell](https://github.com/exercism/haskell-test-runner/blob/5264c460054649fc672c3d5932c2f3cb082e2405/Dockerfile) contient les deux commandes suivantes :

```dockerfile
COPY pre-compiled/ .
RUN stack build --resolver lts-20.18 --no-terminal --test --no-run-tests
```

D'abord, le répertoire `pre-compiled` est copié dans l'image.
Ce répertoire est configuré comme un exercice de test et dépend des mêmes bibliothèques de base que l'exercice réel.
On lance ensuite les tests sur ce répertoire, ce qui ressemble à la façon dont les tests sont lancés pour un véritable exercice.
Lancer les tests entraîne la compilation des bibliothèques de base, mais la différence est que cela se produit au moment de la construction.
L'image Docker résultante aura donc ses bibliothèques de base déjà compilées.
Il n'est donc pas nécessaire de compiler au moment de l'exécution, ce qui donne une exécution (beaucoup) plus rapide.

#### Exemple : précompiler des binaires

Certains langages permettent de compiler le code en amont ou à la volée.
C'est un compromis entre le moment de la construction et le moment de l'exécution, et là encore, on privilégie l'exécution au moment de la construction pour des raisons de performances.

Le [Dockerfile de l'exécuteur de tests C#](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) utilise cette approche : l'exécuteur de tests est compilé en binaire en amont (au moment de la construction) plutôt que de compiler le code à la volée (au moment de l'exécution).
Cela signifie qu'il y a moins de travail à faire au moment de l'exécution, ce qui devrait contribuer à améliorer les performances.

## Taille

Tu dois chercher à réduire la taille de l'image, ce qui signifie qu'elle va :

- se déployer plus rapidement
- réduire nos coûts
- améliorer le temps de démarrage de chaque conteneur

### Essaie différentes distributions

Les différentes images de distribution ont des tailles différentes.
Par exemple, l'image `alpine:3.20.2` est **dix fois** plus petite que l'image `ubuntu:24.10` :

```
REPOSITORY   TAG       SIZE
alpine       3.20.2    8.83MB
ubuntu       24.10     101MB
```

En général, les images basées sur Alpine font partie des plus petites, c'est pourquoi de nombreuses images d'outillage sont basées sur Alpine.

### Essaie les images allégées

Certaines images disposent de variantes « slim » spéciales, dans lesquelles certaines fonctionnalités ont été supprimées, ce qui réduit la taille de l'image.
Par exemple, l'image `node:20.16.0-slim` est **cinq fois** plus petite que l'image `node:20.16.0` :

```
REPOSITORY   TAG            SIZE
node         20.16.0        1.09GB
node         20.16.0-slim   219MB
```

Si les variantes « slim » sont plus petites, c'est parce qu'elles ont moins de fonctionnalités.
Il est possible que ton image n'ait pas besoin de ces fonctionnalités supplémentaires ; dans ce cas, envisage d'utiliser la variante « slim ».

### Supprime les éléments inutiles

Un moyen évident, mais efficace, de réduire la taille de ton image est de supprimer tout ce dont tu n'as pas besoin.
Cela peut inclure des éléments comme :

- les fichiers sources qui ne sont plus nécessaires après avoir compilé un binaire à partir d'eux
- les fichiers qui ciblent des architectures différentes de celle de l'image Docker
- la documentation

#### Supprime les fichiers du gestionnaire de paquets

La plupart des images Docker doivent installer des paquets supplémentaires, ce qui se fait généralement via un gestionnaire de paquets.
Ces paquets doivent être installés au moment de la construction (car aucune connexion internet n'est disponible au moment de l'exécution).
Par conséquent, tous les fichiers de cache ou de suivi du gestionnaire de paquets doivent être supprimés après l'installation des paquets supplémentaires.

##### apk

Les distributions qui utilisent le gestionnaire de paquets `apk` (comme Alpine) doivent utiliser l'option `--no-cache` lorsqu'elles utilisent `apk add` pour installer des paquets :

```dockerfile
RUN apk add --no-cache curl
```

##### apt-get/apt

Les distributions qui utilisent le gestionnaire de paquets `apt-get`/`apk` (comme Ubuntu) doivent exécuter les commandes `apt-get autoremove -y` et `rm -rf /var/lib/apt/lists/*` _après_ l'installation des paquets, et dans la même commande `RUN` :

```dockerfile
RUN apt-get update && \
    apt-get install curl -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
```

### Utilise les constructions multi-étapes

Docker propose une fonctionnalité appelée [constructions multi-étapes](https://docs.docker.com/build/building/multi-stage/).
Celles-ci permettent de découper ton Dockerfile en plusieurs _étapes_ distinctes, seule la dernière se retrouvant dans l'image Docker produite (les autres ne servent qu'à construire cette dernière étape).
Tu peux voir chaque étape comme un mini-Dockerfile à part entière ; les étapes peuvent utiliser différentes images de base.

Les constructions multi-étapes sont particulièrement utiles lorsque ton Dockerfile a besoin d'installer des paquets qui ne sont nécessaires qu'au moment de la construction.
Dans ce cas, la structure générale de ton Dockerfile ressemble à ceci :

1. Définis une nouvelle étape (qu'on appellera l'étape « build »).
   Cette étape ne sera utilisée _que_ au moment de la construction.
2. Installe les paquets supplémentaires requis (dans l'étape « build »).
3. Exécute les commandes qui nécessitent ces paquets supplémentaires (dans l'étape « build »).
4. Définis une nouvelle étape (qu'on appellera l'étape « runtime »).
   Cette étape constituera l'image Docker résultante et sera exécutée au moment de l'exécution.
5. Copie le ou les résultats des commandes exécutées à l'étape 3 (dans l'étape « build ») dans cette étape (l'étape « runtime »).

Avec cette configuration, les paquets supplémentaires ne sont installés que dans l'étape « build » et pas dans l'étape « runtime », ce qui signifie qu'ils ne se retrouveront pas dans l'image Docker produite.

#### Exemple : télécharger des fichiers

L'exécuteur de tests Fortran a besoin de `curl` pour télécharger certains fichiers.
Cependant, son image d'exécution n'a _pas_ besoin de `curl`, ce qui en fait un cas d'usage parfait pour une construction multi-étapes.

D'abord, son [Dockerfile](https://github.com/exercism/fortran-test-runner/blob/783e228d8449143d2040e68b95128bb791833a27/Dockerfile) définit une étape (nommée « build ») dans laquelle le paquet `curl` est installé.
Il utilise ensuite curl pour télécharger des fichiers dans cette étape.

```dockerfile
FROM alpine:3.15 AS build

RUN apk add --no-cache curl

WORKDIR /opt/test-runner
COPY bust_cache .

WORKDIR /opt/test-runner/testlib
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/testlib/CMakeLists.txt
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/testlib/TesterMain.f90

WORKDIR /opt/test-runner
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/config/CMakeLists.txt
```

La deuxième partie du Dockerfile définit une nouvelle étape et copie les fichiers téléchargés depuis l'étape « build » dans sa propre étape à l'aide de la commande `COPY` :

```dockerfile
FROM alpine:3.15

RUN apk add --no-cache coreutils jq gfortran libc-dev cmake make

WORKDIR /opt/test-runner
COPY --from=build /opt/test-runner/ .

COPY . .
ENTRYPOINT ["/opt/test-runner/bin/run.sh"]
```

##### Exemple : installer des bibliothèques

L'exécuteur de tests Ruby a besoin que les paquets `git`, `openssh`, `build-base`, `gcc` et `wget` soient installés avant que ses bibliothèques requises (les gems) puissent être installées.
Son [Dockerfile](https://github.com/exercism/ruby-test-runner/blob/e57ed45b553d6c6411faeea55efa3a4754d1cdbf/Dockerfile) commence par une étape (nommée `build`) qui installe ces paquets (via `apk add`) puis installe les dépendances (via `bundle install`) :

```dockerfile
FROM ruby:3.2.2-alpine3.18 AS build

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh build-base gcc wget git

COPY Gemfile Gemfile.lock .

RUN gem install bundler:2.4.18 && \
    bundle config set without 'development test' && \
    bundle install
```

Il définit ensuite l'étape qui formera l'image Docker résultante.
Cette étape n'installe _pas_ les dépendances installées par l'étape précédente ; elle utilise plutôt la commande `COPY` pour copier les bibliothèques installées depuis l'étape de construction dans sa propre étape :

```dockerfile
FROM ruby:3.2.2-alpine3.18

RUN apk add --no-cache bash

WORKDIR /opt/test-runner

COPY --from=build /usr/local/bundle /usr/local/bundle

COPY . .

ENTRYPOINT [ "sh", "/opt/test-runner/bin/run.sh" ]
```

```exercism/note
Le [Dockerfile de l'exécuteur de tests C#](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) fait quelque chose de similaire, sauf que dans ce cas, l'étape de construction peut utiliser une image Docker existante qui a préinstallé les paquets supplémentaires nécessaires à l'installation des bibliothèques.
```

## Tests

### Utilise les tests d'intégration

Les tests unitaires peuvent être très utiles, mais on recommande de se concentrer sur l'écriture de [tests d'intégration](https://en.wikipedia.org/wiki/Integration_testing).
Leur principal avantage est qu'ils testent mieux la façon dont l'outillage s'exécute en production, ce qui aide à renforcer la confiance dans l'implémentation de ton outillage.

#### Utilise Docker

Pour reproduire au mieux l'environnement de production, les tests d'intégration doivent exécuter l'outillage _comme dans l'environnement de production_.
Cela implique de construire l'image Docker, puis d'exécuter l'image construite sur une solution pour vérifier sa sortie.

#### Utilise les golden tests

Les tests d'intégration devraient être définis comme des [golden tests](https://ro-che.info/articles/2017-12-04-golden-tests), c'est-à-dire des tests où la sortie attendue est stockée dans un fichier.
C'est parfait pour les tests d'intégration de l'outillage d'un parcours, puisque la sortie de l'outillage est elle aussi constituée de fichiers.

##### Exemple : exécuteur de tests

Lorsqu'on exécute l'exécuteur de tests sur une solution, sa sortie est un fichier `results.json`.
On peut ensuite comparer ce fichier à un fichier de sortie « de référence » (autrement dit « attendu »), nommé `expected_results.json`, pour vérifier que l'exécuteur de tests fonctionne comme prévu.

## Sécurité

La sécurité est l'une des principales raisons pour lesquelles on utilise des conteneurs Docker pour exécuter l'outillage.

### Préfère les images officielles

Il existe de nombreuses images Docker sur [Docker Hub](https://hub.docker.com/), mais essaie d'utiliser les [images officielles](https://hub.docker.com/search?q=&image_filter=official).
Ces images sont sélectionnées avec soin et ont (de loin) moins de risques d'être dangereuses.

### Épingle les versions

Pour garantir que les constructions sont stables (c'est-à-dire qu'elles ne cassent pas soudainement), tu dois toujours épingler tes images de base sur des tags précis.
Autrement dit, au lieu de :

```dockerfile
FROM alpine:latest
```

tu dois utiliser :

```dockerfile
FROM alpine:3.20.2
```

Avec cette dernière, les constructions utiliseront toujours la même version.

### Exécute en tant qu'utilisateur non privilégié

Par défaut, de nombreuses images s'exécutent avec un utilisateur qui possède les privilèges root.
Tu devrais envisager d'exécuter ton conteneur en tant qu'utilisateur non privilégié.

```dockerfile
FROM alpine

RUN groupadd -r myuser && useradd -r -g myuser myuser

# RUN <COMMANDS THAT REQUIRE ROOT USER, E.G. INSTALLING PACKAGES>

USER myuser
```

### Mets à jour les dépôts de paquets vers la dernière version

C'est (presque) toujours une bonne idée d'installer les dernières versions

```dockerfile
RUN apt-get update && \
    apt-get install curl
```

### Prends en charge un système de fichiers en lecture seule

On encourage l'écriture de fichiers Docker qui utilisent un système de fichiers en lecture seule.
Les seuls répertoires que tu peux considérer comme accessibles en écriture sont :

- le répertoire de la solution (transmis en deuxième argument)
- le répertoire de sortie (transmis en troisième argument)
- le répertoire `/tmp`

```exercism/caution
Notre environnement de production n'impose actuellement _pas_ un système de fichiers en lecture seule, mais nous pourrions le faire à l'avenir.
C'est pourquoi le modèle de base d'un nouvel exécuteur de tests, analyseur ou representer démarre avec un système de fichiers en lecture seule.
Si tu n'arrives pas à faire fonctionner les choses sur un système de fichiers en lecture seule, n'hésite pas (pour l'instant) à supposer qu'il est accessible en écriture.
```

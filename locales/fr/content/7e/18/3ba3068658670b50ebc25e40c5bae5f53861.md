# Instructions

Elena est la nouvelle responsable qualité d'une usine de journaux.
Comme elle vient tout juste d'arriver dans l'entreprise, elle a décidé de passer en revue certains processus de l'usine pour voir ce qui pourrait être amélioré.
Elle a découvert que les techniciens effectuent beaucoup de contrôles qualité à la main. Elle y voit une bonne occasion d'automatiser les choses et te demande, à toi développeur freelance, de développer un logiciel pour surveiller certaines des machines.

## 1. Vérifie le niveau d'humidité de la pièce

Ta première mission est d'écrire un logiciel pour surveiller le niveau d'humidité de la salle de production. Un capteur est déjà connecté au logiciel de l'entreprise et renvoie régulièrement le pourcentage d'humidité de la pièce.

Tu dois implémenter une fonction dans le logiciel qui lèvera une erreur si le pourcentage d'humidité est trop élevé.
Si l'humidité est à un niveau acceptable, un log _Info_ sera ajouté.
La fonction doit s'appeler `humiditycheck` et prendre le pourcentage d'humidité en argument.

Tu dois t'arrêter avec une `ErrorException` (le message exact n'a pas d'importance, mais il doit contenir le niveau d'humidité mesuré) si le pourcentage dépasse 70 %.
Sinon, ajoute un log _Info_ avec le message `"humidity level check passed: h%"`, où `h` est le pourcentage d'humidité.

```julia-repl
julia> humiditycheck(60)
[ Info: humidity level check passed: 60%
```

```julia-repl
julia> humiditycheck(100)
ERROR: humidity check failed: 100%
```

## 2. Vérifie la surchauffe

Elena est très satisfaite de ta première mission et te demande de t'occuper de la surveillance de la température des machines.
Alors que tu discutes avec un technicien, Greg, il t'apprend que si la température d'une machine dépasse 500 °C, les techniciens commencent à s'inquiéter d'une surchauffe.

La machine est équipée d'un capteur qui mesure sa température interne.
Sache que le capteur est très sensible et tombe souvent en panne.
Dans ce cas, les techniciens devront le remplacer.

Ton travail consiste à implémenter une fonction `temperaturecheck` qui prend la température en argument et qui, soit ajoute un log si tout va bien, soit lève une erreur si le capteur est cassé ou si la machine commence à surchauffer.
Sachant que tu devras plus tard réagir différemment selon l'erreur, il te faut un mécanisme pour distinguer les deux types d'erreurs.

- Si le capteur est cassé, la température vaudra `nothing`.
  Dans ce cas, tu dois t'arrêter avec une `ArgumentError` (le message n'a pas d'importance).
- Quand le capteur fonctionne, si la température dépasse 500 °C, tu dois lever une `DomainError` qui inclut la température mesurée.
- Sinon, tout va bien, alors ajoute un log _Info_ avec le message `"temperature check passed: t °C"`, où `t` est la température.

```julia-repl
julia> temperaturecheck(nothing)
ERROR: ArgumentError: sensor is broken

julia> temperaturecheck(800)
ERROR: DomainError with 800:
"overheating detected"

julia> temperaturecheck(500)
[ Info: temperature check passed: 500 °C
```

## 3. Définis une erreur personnalisée

Pour la tâche suivante, tu devras définir une erreur plus générale, attrape-tout.
Les détails de l'implémentation n'ont pas d'importance, tant qu'il s'agit d'une erreur et que son nom est `MachineError`.
Tu peux inclure des champs et des messages comme tu le juges utile.

## 4. Surveille la machine

Maintenant que ta machine peut détecter les erreurs et que tu disposes d'une erreur machine personnalisée, tu ajoutes une fonction d'encapsulation qui rend compte du bon fonctionnement de l'ensemble.
En plus de renvoyer les logs des fonctions précédentes, cette fonction d'encapsulation devra aussi ajouter des logs selon le ou les types de défaillances qui se produisent.

- Vérifie l'humidité et la température.
- Si la vérification de l'humidité lève une `ErrorException`, un log _Error_ doit être ajouté avec le message `"humidity level check failed: h%"`, où `h` est le pourcentage d'humidité.
- Si la vérification de la température lève une `ArgumentError`, un log _Warn_ doit être ajouté avec le message `"sensor is broken"`.
- Si la vérification de la température lève une `DomainError`, un log _Error_ doit être ajouté avec le message `"overheating detected: t °C"`, où `t` est la température.
- Si l'une des deux vérifications échoue, ou les deux, une seule `MachineError` doit être levée après l'ajout des logs.
- Si tout va bien, seuls les logs de `humiditycheck` et de `temperaturecheck` seront ajoutés.

Implémente une fonction `machinemonitor()` qui prend l'humidité et la température en arguments.

```julia-repl
julia> machinemonitor(42, 450)
[ Info: humidity level check passed: 42%
[ Info: temperature check passed: 450 °C

julia> machinemonitor(42, 550)
[ Info: humidity level check passed: 42%
┌ Error: overheating detected: 550 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(82, 521)
┌ Error: humidity level check failed: 82%
└ @ Main # output truncated
┌ Error: overheating detected: 521 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(42, nothing)
[ Info: humidity level check passed: 42%
┌ Warning: sensor is broken
└ @ Main # output truncated

Error: MachineError
```

# Instructions

Calcule la distance de Hamming entre deux brins d'ADN.

Une mutation est simplement une erreur qui survient lors de la création ou de la copie d'un acide nucléique, en particulier de l'ADN. Comme les acides nucléiques sont vitaux pour les fonctions cellulaires, les mutations ont tendance à provoquer des effets en cascade dans toute la cellule. Bien que les mutations soient techniquement des erreurs, une mutation très rare peut doter la cellule d'un attribut bénéfique. En effet, les effets macro de l'évolution sont attribuables au résultat accumulé de mutations microscopiques bénéfiques au fil de nombreuses générations.

Le type de mutation d'acide nucléique le plus simple et le plus courant est la mutation ponctuelle, qui remplace une base par une autre au niveau d'un seul nucléotide.

En comptant le nombre de différences entre deux brins d'ADN homologues issus de génomes différents ayant un ancêtre commun, on obtient une mesure du nombre minimal de mutations ponctuelles qui ont pu se produire sur le chemin évolutif entre les deux brins.

C'est ce qu'on appelle la « distance de Hamming »

    GAGCCTACTAACGGGAT
    CATCGTAATGACGGCCT
    ^ ^ ^  ^ ^    ^^

La distance de Hamming entre ces deux brins d'ADN est de 7.

# Notes d'implémentation

La distance de Hamming n'est définie que pour des séquences de même longueur. Tu peux donc supposer que seules des séquences de même longueur seront passées à ta fonction de distance de Hamming.

**Note : ce problème est obsolète, remplacé par celui appelé `hamming`.**

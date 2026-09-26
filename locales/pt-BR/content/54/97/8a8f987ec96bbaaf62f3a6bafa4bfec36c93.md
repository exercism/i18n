# Introdução

Os dicionários em Cairo oferecem uma forma de armazenar e recuperar pares chave-valor, assim como mapas de hash ou dicionários em outras linguagens.
No entanto, o modelo de memória do Cairo é único, e a linguagem desempenha um papel na geração de provas computacionais. Por isso, eles funcionam de maneira bem diferente por baixo do capô, oferecendo operações de complexidade $O(n)$ e validação automática por meio de um processo chamado "squashing".
Entender como os dicionários de Cairo diferem dos equivalentes em outras linguagens é essencial para escrever programas eficientes em Cairo.

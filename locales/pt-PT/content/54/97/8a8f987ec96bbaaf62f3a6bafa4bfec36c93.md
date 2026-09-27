# Introdução

Os dicionários em Cairo permitem armazenar e recuperar pares chave-valor, à semelhança de mapas de hash ou dicionários noutras linguagens.
No entanto, devido ao modelo de memória único do Cairo e ao seu papel na geração de provas computacionais, funcionam de forma bastante diferente internamente: oferecem operações de complexidade $O(n)$ e validação automática através de um processo chamado "squashing".
Compreender de que forma os dicionários em Cairo se distinguem dos seus equivalentes noutras linguagens é essencial para escrever programas eficientes em Cairo.

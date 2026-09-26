# Sobre

[Pony](http://www.ponylang.org) é uma linguagem de programação orientada a objetos, de modelo de atores e segura por capacidades, focada em fazer as coisas acontecerem.

Ela é orientada a objetos porque tem classes e objetos, como Python, Java, C++ e muitas outras linguagens. É de modelo de atores porque tem atores (parecidos com os de Erlang ou Akka). Eles se comportam como objetos, mas também podem executar código de forma assíncrona. Os atores são o que torna o Pony incrível.
Quando dizemos que o Pony é seguro por capacidades, queremos dizer algumas coisas:

- É segura em termos de tipos. Muito segura em tipos. Existe até uma prova matemática disso.
- É segura em termos de memória. Ok, isso vem junto com a segurança de tipos, mas ainda é interessante. Não há ponteiros pendentes, nem estouros de buffer e, olha só, a linguagem nem sequer tem o conceito de null!
- É segura em termos de exceções. Não há exceções em tempo de execução. Todas as exceções têm semântica definida e são sempre tratadas.
- É livre de data races. O Pony não tem locks, nem operações atômicas, nem nada do tipo. Em vez disso, o sistema de tipos garante em tempo de compilação que o seu programa concorrente nunca vai ter data races. Assim, você pode escrever código altamente concorrente sem nunca errar.
- É livre de deadlocks. Esse é fácil, porque o Pony não tem lock nenhum! Então com certeza não há deadlock, porque eles não existem.

Para quem está começando, o melhor ponto de partida é o [tutorial](https://tutorial.ponylang.org/).

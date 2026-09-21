# Ál fejléc

## Függvénytár

Ez az első olyan feladat, amellyel találkozunk, ahol a megoldás, amit írunk, nem egy „main” szkript. Egy függvénytárat írunk, amelyet más szkriptekbe `source`-olunk be, és azok hívják majd meg a függvényeinket.

### Bash nameref-ek

Ehhez a feladathoz `nameref` változókra van szükség. Ez legalább 4.0-s bash-verziót igényel. Ha a MacOS alapértelmezett bash-ét használod, telepítened kell egy másik verziót: lásd [A bash telepítése](https://exercism.io/tracks/bash/installation)

A `nameref`-ek segítségével egy változót _referencia szerint_ adhatunk át egy függvénynek. Így a változó a függvényben módosítható, és a hívó scope-ban a frissített érték lesz elérhető. Íme egy példa:
```bash
prependElements() {
    local -n __array=$1
    shift
    __array=( "$@" "${__array[@]}" )
}

my_array=( a b c )
echo "before: ${my_array[*]}"    # => before: a b c

prependElements my_array d e f
echo "after: ${my_array[*]}"     # => after: d e f a b c
```

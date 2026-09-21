# Kiegészítés az utasításokhoz

## A projekt felépítése

* A `src` tartalmazza a feladat megoldását
* A `spec` tartalmazza a feladathoz futtatandó teszteket

## A tesztek futtatása

Ha a megfelelő könyvtárban vagy (vagyis abban, amelyik a `src` és a `spec` könyvtárat is tartalmazza), akkor a feladat tesztjeit a `crystal spec` futtatásával indíthatod el:

```bash
$ pwd
/Users/johndoe/Code/exercism/crystal/hello-world

$ ls
GETTING_STARTED.md README.md          spec               src

$ crystal spec
```

Ez lefuttatja a `spec` könyvtárban lévő összes tesztfájlt.

Minden tesztfájlban az első kivételével az összes teszt ki van kapcsolva.

Amint egy teszt átmegy, a következőt úgy kapcsolhatod be, hogy a `pending`-et `it`-re módosítod.

## A megoldásod beküldése

A megoldásod beküldésekor mindenképpen a `src` könyvtárban lévő forrásfájlt küldd be:

```bash
$ exercism submit src/hello_world.cr
```

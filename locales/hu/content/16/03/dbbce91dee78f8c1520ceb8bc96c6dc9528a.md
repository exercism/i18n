# Utasítások

Készítsd el az affin rejtjel megvalósítását, amely egy ősi, a Közel-Keleten létrehozott titkosítási rendszer.

Az affin rejtjel a monoalfabetikus helyettesítő rejtjelek egyik fajtája.
Minden karaktert hozzárendelünk a számértékéhez, egy matematikai függvénnyel titkosítunk, majd átalakítjuk az új számértékéhez tartozó betűvé.
Bár minden monoalfabetikus rejtjel gyenge, az affin rejtjel sokkal erősebb az Atbas rejtjelnél, mert jóval több kulcsa van.

[//]: # " monoalphabetic as spelled by Merriam-Webster, compare to polyalphabetic "

## Titkosítás

A titkosítás függvénye:

```text
E(x) = (ai + b) mod m
```

Ahol:

- `i` a betű indexe, amely `0`-tól az ábécé hossza mínusz 1-ig terjed.
- `m` az ábécé hossza.
  A latin ábécé esetében `m` értéke `26`.
- `a` és `b` olyan egész számok, amelyek a titkosítási kulcsot alkotják.

Az `a` és `m` értékének _relatív prímnek_ kell lennie (más szóval _egymáshoz képest prímnek_), hogy az automatikus visszafejtés sikeres legyen, azaz csak az `1` a közös osztójuk (további információkat a [relatív prím egészekről szóló Wikipédia-szócikkben][coprime-integers] találsz).
Ha `a` és `m` nem relatív prímek, a programod jelezze, hogy ez hiba.
Ellenkező esetben a megadott kulccsal titkosítson vagy fejtsen vissza.

A feladat szempontjából a számjegyek érvényes bemenetnek számítanak, de nem titkosítjuk őket.
A szóközöket és az írásjeleket kizárjuk.
A rejtjelszöveg rögzített hosszúságú, szóközzel elválasztott csoportokban íródik ki, a hagyományos csoportméret `5` betű.
Ezzel nehezebb a titkosított szöveget a szóhatárok alapján kitalálni.

## Visszafejtés

A visszafejtés függvénye:

```text
D(y) = (a^-1)(y - b) mod m
```

Ahol:

- `y` egy titkosított betű számértéke, azaz `y = E(x)`
- fontos megjegyezni, hogy `a^-1` az `a mod m` moduláris multiplikatív inverze (MMI)
- a moduláris multiplikatív inverz csak akkor létezik, ha `a` és `m` relatív prímek.

Az `a` MMI-je az az `x`, amelyre `ax` `m`-mel való osztásának maradéka `1`:

```text
ax mod m = 1
```

A moduláris multiplikatív inverz megtalálásáról és jelentéséről bővebben a [kapcsolódó Wikipédia-szócikkben][mmi] olvashatsz.

## Általános példák

- A `"test"` titkosítása `a = 5`, `b = 7` kulccsal `"ybty"`.
- A `"ybty"` visszafejtése `a = 5`, `b = 7` kulccsal `"test"`.
- A `"ybty"` visszafejtése a hibás `a = 11`, `b = 7` kulccsal `"lqul"`.
- A `"kqlfd jzvgy tpaet icdhm rtwly kqlon ubstx"` visszafejtése `a = 19`, `b = 13` kulccsal `"thequickbrownfoxjumpsoverthelazydog"`.
- A `"test"` titkosítása `a = 18`, `b = 13` kulccsal hiba, mert `18` és `26` nem relatív prímek.

## Példa a moduláris multiplikatív inverz (MMI) megtalálására

Az MMI megtalálása `a = 15` esetén:

- `(15 * x) mod 26 = 1`
- `(15 * 7) mod 26 = 1`, azaz `105 mod 26 = 1`
- `7` a `15 mod 26` MMI-je.

[mmi]: https://en.wikipedia.org/wiki/Modular_multiplicative_inverse
[coprime-integers]: https://en.wikipedia.org/wiki/Coprime_integers

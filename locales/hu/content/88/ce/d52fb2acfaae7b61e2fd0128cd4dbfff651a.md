# Bevezetés

Előfordul, hogy egy bizonyos kódrészletet többször is fel kell használni. Ilyenkor kényelmes lehet a kódot egy függvénybe tenni. Egy függvény általában csak egyetlen konkrét műveletet végez el. Rustban a ```fn``` kulcsszóval definiálunk függvényeket. A függvényhez tartozó kód mindig kapcsos zárójelek (azaz `{}`) között van. A `main` nevű függvény különleges, mert ez a programok belépési pontja. Abból a függvényből más függvényeket hívhatsz meg.

```rust
fn say_my_name(name: &str) -> &str {
    name
}
```

A függvények paramétereket is átvehetnek, mint például a ```name: &str``` a ```say_my_name()``` függvényben. A függvények értékeket is visszaadhatnak, mint például a fenti `-> &str`.

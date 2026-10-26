# Bevezetés

A `guard` utasítás a Swiftben arra szolgál, hogy korán kiléphess egy függvényből, ciklusból vagy metódusból, ha egy szükséges feltétel nem teljesül:

```swift
guard myValue >= 0 else { return 0 }
let root = myValue.squareRoot()
```

A fenti példában a `guard` az utána következő Boolean-kifejezést értékeli ki.
Ha a feltétel `true`, a végrehajtás a `guard` utasítás utáni kóddal folytatódik.
Ha a feltétel `false`, az `else` blokkban lévő kód fut le.

Az `if` utasítással ellentétben:

- A `guard` utasításnak **mindenképpen** tartalmaznia kell egy `else` ágat.
- Az `else` ágnak **át kell** adnia a vezérlést, hogy kilépjen a környező scope-ból (például `return`, `continue` vagy `break` használatával, illetve hiba dobásával).

A `guard`-ot gyakran használják előfeltételek letisztult ellenőrzésére.
Vegyük például a sinc függvényt ($\text{sinc}(x) = \frac{\sin(x)}{x}$, ahol $\text{sinc}(0) = 1$, hogy elkerüljük a nullával való osztást):

```swift
func sinc(_ x: Double) -> Double {
    guard x != 0 else { return 1 }
    return sin(x) / x
}

sinc(0)             // returns 1
sinc(Double.pi / 2) // returns 0.6366197723675814
```

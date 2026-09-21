# Utasítások

A barátod, Li Mei egy gyümölcslébárt vezet, ahol finom, kevert gyümölcsleveket árul.
Te gyakori vendég vagy a boltjában, és rájöttél, hogy megkönnyíthetnéd a barátod életét.
Úgy döntesz, hogy a programozási tudásodat bevetve segítesz Li Mei-nak a munkájában.

## 1. Határozd meg, mennyi ideig tart megkeverni egy gyümölcslevet

Li Mei szeret előre megmondani a vendégeinek, mennyit kell várniuk a menüből rendelt gyümölcsléjükre.
Nehezen jegyzi meg a pontos számokat, mert a gyümölcslevek megkeverése különböző ideig tart.
A `"Pure Strawberry Joy"` 0,5 percet vesz igénybe, az `"Energizer"` és a `"Green Garden"` 1,5 percet, a `"Tropical Island"` 3 percet, az `"All or Nothing"` pedig 5 percet.
Minden más italnál (például az akciós ajánlatoknál) 2,5 perces elkészítési idővel számolhatsz.

Hogy segíts a barátodnak, írj egy `time_to_mix_juice` függvényt, amely argumentumként egy gyümölcslevet kap a menüből, és visszaadja, hány percig tart megkeverni azt az italt.

```julia-repl
julia> time_to_mix_juice("Tropical Island")
3

julia> time_to_mix_juice("Berries & Lime")
2.5
```

## 2. Töltsd fel a limécikkek készletét

Li Mei sok kreációja tartalmaz limécikket, akár összetevőként, akár a díszítés részeként.
Ezért amikor reggel elkezdi a műszakot, gondoskodnia kell róla, hogy a limécikkek tárolója tele legyen a nap hátralévő részére.

Készítsd el a `limes_to_cut` függvényt, amely megkapja, hány limécikket kell Li Mei-nak felvágni, valamint egy tömböt, amely a kéznél lévő egész lime-ok készletét képviseli.
Egy `"small"` lime-ból 6 limécikket, egy `"medium"` lime-ból 8 limécikket, egy `"large"` lime-ból pedig 10 limécikket tud kivágni.
A lime-okat mindig abban a sorrendben vágja fel, ahogy a listában szerepelnek, az első elemmel kezdve.
Addig folytatja, amíg el nem éri a szükséges cikkek számát, vagy amíg el nem fogynak a lime-ok.

Li Mei szeretné előre tudni, hány lime-ot kell felvágni.
A `limes_to_cut` függvény adja vissza, hány lime-ot kell felvágni.

```julia-repl
julia> limes_to_cut(25, ["small", "small", "large", "medium", "small"])
4
```

## 3. Sorold fel, mennyi ideig tart megkeverni a sorban álló rendeléseket

Li Mei szereti nyomon követni, mennyi ideig tart megkeverni azokat a rendeléseket, amelyekre a vendégek várnak.

Készítsd el az `order_times` függvényt, amely megkapja a rendelések sorát, és visszaad egy vektort az elkeverési időkkel.

```julia-repl
julia> order_times(["Energizer", "Tropical Island"])
[1.5, 3.0]
```

## 4. Fejezd be a műszakot

Li Mei mindig délután 3-ig dolgozik.
Utána az alkalmazottja, Dmitry veszi át a munkát.
Gyakran előfordul, hogy Li Mei műszakjának végén vannak olyan italok, amelyeket már megrendeltek, de még nem készültek el.
Ekkor Dmitry készíti el a maradék gyümölcsleveket.

Hogy könnyebb legyen az átadás, készítsd el a `remaining_orders` függvényt, amely megkapja a Li Mei műszakjából hátralévő percek számát, valamint a megrendelt, de még el nem készített gyümölcslevek tömbjét.
A függvény azokat a rendeléseket adja vissza, amelyeket Li Mei a munkanapja vége előtt már nem tud elkezdeni elkészíteni.

A műszakból hátralévő idő mindig nagyobb lesz, mint 0.
Az elkészítendő gyümölcslevek tömbje soha nem lesz üres.
A rendeléseket ráadásul abban a sorrendben készítik el, ahogy a tömbben szerepelnek.
Ha Li Mei elkezd megkeverni egy bizonyos gyümölcslevet, mindig be is fejezi, még akkor is, ha kicsit tovább kell dolgoznia.
Ha nem marad olyan rendelés, amellyel Dmitry-nak foglalkoznia kell, akkor üres vektort kell visszaadni.

```julia-repl
julia> remaining_orders(5, ["Energizer", "All or Nothing", "Green Garden"])
["Green Garden"]
```

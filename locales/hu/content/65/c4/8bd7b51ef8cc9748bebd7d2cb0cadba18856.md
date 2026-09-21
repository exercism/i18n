# Bevezetés

## Access Behaviour

Az Elixir a kódban _viselkedéseket_ használ, hogy közös, általános interfészeket biztosítson, és közben minden őt megvalósító modul számára lehetővé tegye a saját, egyedi megvalósítást. Egy ilyen gyakori példa az _Access Behaviour_.

Az _Access Behaviour_ közös interfészt biztosít ahhoz, hogy adatokat kérjünk le egy kulcsalapú adatszerkezetből. Ez mapekhez és kulcsszólistákhoz is implementálva van, de nézzük meg a mapeknél való használatát, hogy ráérezzünk. Az _Access Behaviour_ előírja, hogy ha van egy mapünk, akkor utána írhatunk _szögletes zárójelet_, majd a kulccsal kikereshetjük a hozzá tartozó értéket.

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

Ha a kulcs nem szerepel az adatszerkezetben, akkor az eredmény `nil` lesz. Ez könnyen nem várt eredményhez vezethet, mert ilyenkor nem dob hibát. Figyeld meg, hogy a `nil` maga is implementálja az Access Behaviour-t, és bármely kulcsra mindig `nil`-t ad vissza.

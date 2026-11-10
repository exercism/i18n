# Anleitung

Deine Freundin Li Mei betreibt eine Saftbar, in der sie köstliche gemischte Fruchtsäfte verkauft.
Du bist ein häufiger Gast in ihrem Laden und hast erkannt, dass du deiner Freundin das Leben erleichtern könntest.
Du beschließt, deine Programmierkenntnisse zu nutzen, um Li Mei bei ihrer Arbeit zu helfen.

## 1. Ermittle, wie lange es dauert, einen Saft zu mixen

Li Mei erzählt ihren Kundinnen und Kunden gerne im Voraus, wie lange sie auf einen Saft von der Karte warten müssen, den sie bestellt haben.
Es fällt ihr schwer, sich die genauen Zahlen zu merken, weil die Zeit, die zum Mixen der Säfte benötigt wird, variiert.
`"Pure Strawberry Joy"` dauert 0,5 Minuten, `"Energizer"` und `"Green Garden"` dauern jeweils 1,5 Minuten, `"Tropical Island"` dauert 3 Minuten und `"All or Nothing"` dauert 5 Minuten.
Für alle anderen Getränke (z. B. Sonderangebote) kannst du eine Zubereitungszeit von 2,5 Minuten annehmen.

Um deiner Freundin zu helfen, schreibe eine Funktion `time_to_mix_juice`, die einen Saft von der Karte als Argument entgegennimmt und die Anzahl der Minuten zurückgibt, die zum Mixen dieses Getränks benötigt werden.

```julia-repl
julia> time_to_mix_juice("Tropical Island")
3

julia> time_to_mix_juice("Berries & Lime")
2.5
```

## 2. Fülle den Vorrat an Limettenspalten auf

Viele von Li Meis Kreationen enthalten Limettenspalten, sei es als Zutat oder als Teil der Dekoration.
Wenn sie morgens ihre Schicht beginnt, muss sie deshalb sicherstellen, dass der Behälter mit Limettenspalten für den kommenden Tag gut gefüllt ist.

Implementiere die Funktion `limes_to_cut`, die die Anzahl der Limettenspalten, die Li Mei schneiden muss, und ein Array entgegennimmt, das den Vorrat an ganzen Limetten darstellt, die sie zur Hand hat.
Aus einer `"small"` Limette erhält sie 6 Spalten, aus einer `"medium"` Limette 8 Spalten und aus einer `"large"` Limette 10 Spalten.
Sie schneidet die Limetten immer in der Reihenfolge, in der sie in der Liste erscheinen, beginnend mit dem ersten Element.
Sie macht so lange weiter, bis sie die Anzahl der benötigten Spalten erreicht hat oder bis ihr die Limetten ausgehen.

Li Mei möchte im Voraus wissen, wie viele Limetten sie schneiden muss.
Die Funktion `limes_to_cut` sollte die Anzahl der zu schneidenden Limetten zurückgeben.

```julia-repl
julia> limes_to_cut(25, ["small", "small", "large", "medium", "small"])
4
```

## 3. Liste die Mixzeiten jeder Bestellung in der Warteschlange auf

Li Mei behält gerne den Überblick darüber, wie lange das Mixen der Bestellungen dauert, auf die Kundinnen und Kunden warten.

Implementiere die Funktion `order_times`, die eine Warteschlange von Bestellungen entgegennimmt und einen Vektor mit Mixzeiten zurückgibt.

```julia-repl
julia> order_times(["Energizer", "Tropical Island"])
[1.5, 3.0]
```

## 4. Beende die Schicht

Li Mei arbeitet immer bis 15 Uhr.
Dann übernimmt ihr Angestellter Dmitry.
Wenn Li Meis Schicht endet, sind oft Getränke bestellt, aber noch nicht zubereitet.
Dmitry bereitet dann die restlichen Säfte zu.

Um die Übergabe zu erleichtern, implementiere eine Funktion `remaining_orders`, die die Anzahl der Minuten, die in Li Meis Schicht verbleiben, und ein Array von Säften entgegennimmt, die bestellt, aber noch nicht zubereitet wurden.
Die Funktion sollte die Bestellungen zurückgeben, die Li Mei nicht mehr vor dem Ende ihres Arbeitstags mit der Zubereitung beginnen kann.

Die verbleibende Zeit in der Schicht ist immer größer als 0.
Das Array der zuzubereitenden Säfte ist nie leer.
Außerdem werden die Bestellungen in der Reihenfolge zubereitet, in der sie im Array erscheinen.
Wenn Li Mei anfängt, einen bestimmten Saft zu mixen, beendet sie ihn auch immer, selbst wenn sie etwas länger arbeiten muss.
Wenn keine Bestellungen mehr übrig sind, um die sich Dmitry kümmern muss, sollte ein leerer Vektor zurückgegeben werden.

```julia-repl
julia> remaining_orders(5, ["Energizer", "All or Nothing", "Green Garden"])
["Green Garden"]
```

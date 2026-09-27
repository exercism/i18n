# Suggerimenti

## General

- Prova a suddividere un problema in un caso base e un caso ricorsivo. Per esempio, supponiamo di voler contare quanti biscotti ci sono nel barattolo dei biscotti con un approccio ricorsivo. Un caso base è un barattolo vuoto: contiene zero biscotti. Se il barattolo non è vuoto, allora il numero di biscotti al suo interno è uguale a un biscotto più il numero di biscotti nel barattolo dopo averne rimosso uno.

## 1. Definire i tipi di pizza e le opzioni

- Il tipo `Pizza` è un tipo ricorsivo: i casi `ExtraSauce` e `ExtraToppings` contengono una `Pizza`.

## 2. Calcolare il prezzo della pizza

- Per gestire il fatto che il tipo `Pizza` è ricorsivo, definisci una funzione ricorsiva.

## 3. Calcolare il prezzo di un ordine

- Si può fare pattern matching sulla lunghezza esatta dell'array per determinare se applicare il costo aggiuntivo.
- Usa la ricorsione in coda per evitare di consumare troppa memoria quando calcoli il prezzo di un ordine.

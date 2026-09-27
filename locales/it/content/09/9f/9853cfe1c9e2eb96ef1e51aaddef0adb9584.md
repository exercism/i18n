# Suggerimenti

## Generale

- Un `include` va dentro la classe, di solito come sua prima riga.
- Cambia solo quello che rinomini o lasci fuori. Tutto il resto arriva così com'era.

## 1. La routine jazz

- Una sola riga dentro la classe: `include WARM_UP;`
- Nient'altro. Il corpo della classe è quella riga e nulla più.

## 2. La routine di tip tap

- `include WARM_UP describe -> ;`
- Il `-> ;` con nulla dopo la freccia lascia fuori `describe`, ed è proprio questo che fa spazio a quello che scrivi tu.
- Senza di esso, il compilatore si lamenta che `describe` è definito due volte. Quell'errore è la funzionalità: Sather non ne sceglie uno in silenzio.

## 3. Il finale

- Due voci in un unico include, separate da una virgola:
  `include WARM_UP counts -> warm_up_counts, describe -> ;`
- Poi scrivi `counts`, che restituisce `warm_up_counts * 2`, e `describe`.
- `describe` dovrebbe chiamare `counts`, non ricalcolare il numero da capo.
- Ricorda che a un numero non si può sommare una stringa, quindi va bene una descrizione che inizia con delle parole: `"Finale: " + counts + " counts"`.

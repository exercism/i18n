# Test sulla traccia Pyret

## Installare i prerequisiti

Dopo aver scaricato un esercizio, dovrai installare i moduli di Node.js per eseguire i test:

```sh
cd /path/to/exercise
npm install
```

Poi aggiungi al tuo $PATH la directory che contiene lo strumento da riga di comando `pyret`

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## Per iniziare

All'interno della directory dell'esercizio ci saranno diversi file, ma i due più importanti sono il file della soluzione e il file dei test.
Nell'esempio seguente abbiamo scaricato l'esercizio Leap.

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

Per eseguire i test, usa `exercism test` se hai scaricato la CLI ufficiale di Exercism, oppure esegui `pyret leap-test.arr`.
Pyret eseguirà la suite di test, che consiste in una serie di blocchi `check` etichettati che verificano il file della soluzione rispetto a input specifici e risultati attesi.
Una parte fondamentale di questo processo è esportare esplicitamente porzioni del codice, in modo che la suite di test possa vederle.

## provide

I test di questa traccia importeranno il file, dando accesso a tutto ciò che viene esportato esplicitamente dal codice.

Per esportare le variabili, devi aggiungere una [istruzione provide][provide-statement] all'inizio del file.

Gli snippet seguenti sono due modi validi per esportare `a`, `b` e `c`.

```pyret
# using a list of bindings
provide a, b, c end
```

```pyret
# using an object literal
provide {
  a: a,
  b: b,
  c: c
}
end
```

Un terzo metodo, `provide *`, è una scorciatoia per esportare tutti i binding di primo livello, tranne i tipi di dati personalizzati. Tuttavia, in genere non è consigliato, perché Pyret è severo nel non permettere lo [shadowing][shadowing].

## provide-types

Alcuni esercizi richiederanno che venga esportato un [tipo di dati personalizzato][data-definition] a scopo di test.
In questi casi, puoi usare una [istruzione provide-types][provide-types-statement].
Dato che un tipo di dati ha funzioni aggiuntive che potrebbero non essere esportate, è consigliabile usare `provide-types *`, nonostante il problema dello shadowing.

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

Tutti gli stub degli esercizi avranno già pronte delle istruzioni `provide` o `provide-types` da usare.

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html

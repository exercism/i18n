# Introduzione

L'albero sintattico astratto (AST), detto anche _espressione quotata_, è un modo per rappresentare il codice come dati.

Ogni nodo nell'AST è una tupla di tre elementi.

```elixir
# AST representation of:
# 2 + 3
{:+, [], [2, 3]}
```

Il primo elemento, un atomo, è l'operazione. Il secondo elemento, una lista di parole chiave, contiene i metadati. Il terzo elemento è una lista di argomenti, che contiene altri nodi. I valori letterali come numeri interi, atomi e stringhe sono rappresentati nell'AST direttamente, invece che come tuple di tre elementi.

## Trasformare il codice in AST

Trasformare il codice Elixir in AST e gli AST di nuovo in codice fa parte della libreria standard. Puoi trovare funzioni per lavorare con gli AST nei moduli `Code` (ad esempio per trasformare una stringa con del codice in un AST) e `Macro` (ad esempio per percorrere l'AST o trasformarlo in una stringa).

Nota che tutte le funzioni della libreria standard usano il nome «quoted» per indicare l'AST (abbreviazione di _espressione quotata_).

La forma speciale per trasformare il codice in un AST si chiama `quote`. Accetta un blocco di codice e restituisce il suo AST.

```elixir
quote do
  2 + 3 - 1
end

# => {:-, [], [
#      {:+, [], [2, 3]},
#      1
#    ]}
```

## Casi d'uso

La capacità di rappresentare il codice come un AST è al centro della metaprogrammazione in Elixir. Le _macro_, cioè un modo per scrivere codice Elixir che produce codice Elixir, funzionano restituendo AST come output.

Un altro caso d'uso degli AST è l'analisi statica del codice, come lo strumento di Exercism, l'Analyzer, che potresti già conoscere come il piccolo bot che lascia commenti sulle tue soluzioni.

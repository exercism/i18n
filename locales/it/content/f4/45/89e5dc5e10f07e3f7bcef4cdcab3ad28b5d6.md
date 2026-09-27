# Workflow «Nessun file importante modificato»

Quando viene unita una PR di una traccia che tocca un esercizio, si attiva la riesecuzione dei test su _tutte_ le ultime iterazioni pubblicate delle soluzioni degli studenti.
Per gli esercizi popolari, questa è un'operazione _molto_ costosa (70.000 esecuzioni di test per Hello World in Python, come caso estremo!).

Questo workflow controlla se le modifiche in una PR attiverebbero la riesecuzione dei test delle soluzioni e, in tal caso, aggiunge un commento che spiega il rischio di unire la PR _così com'è_.
Spiega anche come unire la PR senza rieseguire i test delle soluzioni.

Per maggiori informazioni, consulta la documentazione [Evitare di attivare esecuzioni di test non necessarie](https://exercism.org/docs/building/tracks#h-avoiding-triggering-unnecessary-test-runs).

## Fonte

Il workflow è definito nel file `.github/workflows/no-important-files-changed.yml`.

# Istruzioni

Elena è la nuova responsabile qualità di una fabbrica di giornali.
Dato che è appena arrivata in azienda, ha deciso di rivedere alcuni processi della fabbrica per capire cosa si potrebbe migliorare.
Ha scoperto che i tecnici fanno molti controlli di qualità a mano. Vede una buona opportunità di automazione e chiede a te, sviluppatore freelance, di realizzare un software per monitorare alcune delle macchine.

## 1. Controlla il livello di umidità della sala

La tua prima missione è scrivere un software per monitorare il livello di umidità della sala di produzione. C'è già un sensore collegato al software dell'azienda che restituisce periodicamente la percentuale di umidità della sala.

Devi implementare una funzione nel software che lanci un errore se la percentuale di umidità è troppo alta.
Se l'umidità è a un livello accettabile, verrà aggiunto un log informativo.
La funzione deve chiamarsi `humiditycheck` e prendere la percentuale di umidità come argomento.

Dovresti interrompere l'esecuzione con un `ErrorException` (il messaggio esatto non è importante, ma deve contenere il livello di umidità misurato) se la percentuale supera il 70%.
Altrimenti, aggiungi un log informativo con il messaggio `"humidity level check passed: h%"`, dove `h` è la percentuale di umidità.

```julia-repl
julia> humiditycheck(60)
[ Info: humidity level check passed: 60%
```

```julia-repl
julia> humiditycheck(100)
ERROR: humidity check failed: 100%
```

## 2. Controlla il surriscaldamento

Elena è molto soddisfatta del tuo primo incarico e ti chiede di occuparti del monitoraggio della temperatura delle macchine. Mentre chiacchieri con un tecnico, Greg, vieni a sapere che se la temperatura di una macchina supera i 500°C, i tecnici iniziano a preoccuparsi del surriscaldamento.

La macchina è dotata di un sensore che ne misura la temperatura interna.
Devi sapere che il sensore è molto sensibile e spesso si rompe.
In questo caso, i tecnici dovranno sostituirlo.

Il tuo compito è implementare una funzione `temperaturecheck` che prende la temperatura come argomento e che aggiunge un log se va tutto bene, oppure lancia un errore se il sensore è rotto o se la macchina inizia a surriscaldarsi. Sapendo che in seguito dovrai reagire in modo diverso a seconda dell'errore, ti serve un meccanismo per distinguere i due tipi di errore.

- Se il sensore è rotto, la temperatura sarà `nothing`.
  In questo caso, dovresti interrompere l'esecuzione con un `ArgumentError` (il messaggio non è importante).
- Quando il sensore funziona, se la temperatura supera i 500°C, dovresti lanciare un `DomainError` che include la temperatura misurata.
- Altrimenti va tutto bene, quindi aggiungi un log informativo con il messaggio `"temperature check passed: t °C"`, dove `t` è la temperatura.

```julia-repl
julia> temperaturecheck(nothing)
ERROR: ArgumentError: sensor is broken

julia> temperaturecheck(800)
ERROR: DomainError with 800:
"overheating detected"

julia> temperaturecheck(500)
[ Info: temperature check passed: 500 °C
```

## 3. Definisci un errore personalizzato

Per il prossimo compito, dovrai definire un errore più generale, in grado di catturare ogni caso. I dettagli dell'implementazione non sono importanti, basta che sia un errore e che si chiami `MachineError`. Sei libero di includere campi e messaggi come ritieni utile.

## 4. Monitora la macchina

Ora che la tua macchina è in grado di rilevare gli errori e hai un errore personalizzato, aggiungi una funzione wrapper che possa riportare come funziona tutto. Oltre a restituire i log delle funzioni precedenti, questo wrapper dovrà anche aggiungere log a seconda del tipo o dei tipi di errore che si verificano.

- Controlla l'umidità e la temperatura.
- Se il controllo dell'umidità lancia un `ErrorException`, va aggiunto un log di errore con il messaggio `"humidity level check failed: h%"`, dove `h` è la percentuale di umidità.
- Se il controllo della temperatura lancia un `ArgumentError`, va aggiunto un log di avviso con il messaggio `"sensor is broken"`.
- Se il controllo della temperatura lancia un `DomainError`, va aggiunto un log di errore con il messaggio `"overheating detected: t °C"`, dove `t` è la temperatura.
- Se uno dei due controlli fallisce, o entrambi, va lanciato un unico `MachineError` dopo che i log sono stati aggiunti.
- Se va tutto bene, verranno aggiunti solo i log di `humiditycheck` e `temperaturecheck`.

Implementa una funzione `machinemonitor()` che prende l'umidità e la temperatura come argomenti.

```julia-repl
julia> machinemonitor(42, 450)
[ Info: humidity level check passed: 42%
[ Info: temperature check passed: 450 °C

julia> machinemonitor(42, 550)
[ Info: humidity level check passed: 42%
┌ Error: overheating detected: 550 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(82, 521)
┌ Error: humidity level check failed: 82%
└ @ Main # output truncated
┌ Error: overheating detected: 521 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(42, nothing)
[ Info: humidity level check passed: 42%
┌ Warning: sensor is broken
└ @ Main # output truncated

Error: MachineError
```

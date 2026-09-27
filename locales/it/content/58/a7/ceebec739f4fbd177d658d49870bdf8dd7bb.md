# Istruzioni

Calcola la differenza di Hamming tra due filamenti di DNA.

Una mutazione è semplicemente un errore che si verifica durante la creazione o la copia di un acido nucleico, in particolare del DNA. Poiché gli acidi nucleici sono vitali per le funzioni cellulari, le mutazioni tendono a causare un effetto a catena in tutta la cellula. Anche se le mutazioni sono tecnicamente degli errori, una mutazione molto rara può dotare la cellula di un attributo vantaggioso. In effetti, gli effetti macroscopici dell'evoluzione sono attribuibili al risultato accumulato di mutazioni microscopiche vantaggiose nel corso di molte generazioni.

Il tipo più semplice e più comune di mutazione degli acidi nucleici è la mutazione puntiforme, che sostituisce una base con un'altra in un singolo nucleotide.

Contando il numero di differenze tra due filamenti di DNA omologhi presi da genomi diversi con un antenato comune, otteniamo una misura del numero minimo di mutazioni puntiformi che potrebbero essersi verificate nel percorso evolutivo tra i due filamenti.

Questa si chiama «distanza di Hamming»

    GAGCCTACTAACGGGAT
    CATCGTAATGACGGCCT
    ^ ^ ^  ^ ^    ^^

La distanza di Hamming tra questi due filamenti di DNA è 7.

# Note di implementazione

La distanza di Hamming è definita solo per sequenze di uguale lunghezza. Pertanto puoi assumere che alla funzione per la distanza di Hamming verranno passate solo sequenze di uguale lunghezza.

**Nota: questo problema è deprecato, sostituito da quello chiamato `hamming`.**

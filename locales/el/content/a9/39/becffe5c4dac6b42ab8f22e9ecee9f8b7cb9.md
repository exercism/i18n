# Μορφοποίηση αρχείων JSON

Ένα αποθετήριο track στο Exercism περιέχει πολλά αρχεία JSON, όπως:

- Το αρχείο `config.json` του track.
- Για κάθε έννοια, ένα αρχείο `.meta/config.json` και ένα `links.json`.
- Για κάθε Concept Exercise ή Practice Exercise, ένα αρχείο `.meta/config.json`.

Αυτά τα αρχεία είναι πιο ευανάγνωστα αν έχουν συνεπή μορφοποίηση σε όλο το Exercism, γι' αυτό το configlet διαθέτει μια εντολή `fmt` για να ξαναγράφει τα αρχεία JSON ενός track σε κανονική μορφή.

Η εντολή `fmt` μορφοποιεί τα παρακάτω αρχεία:

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## Χρήση

Η εντολή `fmt` μορφοποιεί τα αρχεία `.meta/config.json` των ασκήσεων.

```
configlet [global-options] fmt [command-options]

Global options:
  -h, --help                   Show this help message and exit
      --version                Show this tool's version information and exit
  -t, --track-dir <dir>        Specify a track directory to use instead of the current directory
  -v, --verbosity <verbosity>  The verbosity of output. Allowed values: q[uiet], n[ormal], d[etailed]

Options for fmt:
  -e, --exercise <slug>        Only operate on this exercise
  -u, --update                 Prompt to write formatted files
  -y, --yes                    Auto-confirm the prompt from --update
```

Ένα σκέτο `configlet fmt` δεν κάνει καμία αλλαγή στο track και ελέγχει τη μορφοποίηση του αρχείου `.meta/config.json` για κάθε Concept Exercise και Practice Exercise και του αρχείου `config.json` του track.

Για να εκτυπώσεις μια λίστα με διαδρομές για τις οποίες δεν υπάρχει ήδη μορφοποιημένο αρχείο `.meta/config.json` άσκησης (βγαίνοντας με μη μηδενικό κωδικό εξόδου αν τουλάχιστον μία άσκηση δεν έχει μορφοποιημένο αρχείο ρυθμίσεων):

```shell
configlet fmt
```

Για να σου ζητηθεί να γράψεις τα μορφοποιημένα αρχεία ρυθμίσεων, πρόσθεσε την επιλογή `--update` (ή `-u` για συντομία):

```shell
configlet fmt --update
```

Για να γράψεις μη διαδραστικά τα μορφοποιημένα αρχεία ρυθμίσεων, πρόσθεσε την επιλογή `--yes` (ή `-y` για συντομία):

```shell
configlet fmt --update --yes
```

Για να δουλέψεις σε μία μόνο άσκηση, χρησιμοποίησε την επιλογή `--exercise` (ή `-e` για συντομία).
Για παράδειγμα, για να γράψεις μη διαδραστικά το μορφοποιημένο αρχείο ρυθμίσεων για την άσκηση `prime-factors`:

```shell
configlet fmt -uy -e prime-factors
```

Όταν γράφει αρχεία JSON, το `configlet fmt` θα:

- Γράψει τα ζεύγη κλειδιού/τιμής με την κανονική σειρά.

- Χρησιμοποιήσει δύο κενά για τη στοίχιση.

- Χρησιμοποιήσει ξεχωριστή γραμμή για κάθε στοιχείο σε έναν πίνακα JSON και για κάθε κλειδί σε ένα αντικείμενο JSON.

- Αφαιρέσει τα ζεύγη κλειδιού/τιμής για κλειδιά που είναι προαιρετικά και έχουν κενές τιμές.
  Για παράδειγμα, το `"source": ""` αφαιρείται.

- Αφαιρέσει το `"test_runner": true` από τα αρχεία ρυθμίσεων των Practice Exercise.
  Αυτό είναι ένα προαιρετικό κλειδί - η προδιαγραφή λέει ότι ένα κλειδί `test_runner` που παραλείπεται συνεπάγεται την τιμή `true`.

- Όταν ένα αντικείμενο JSON έχει περισσότερα από ένα ζεύγη κλειδιού/τιμής με κάποιο όνομα κλειδιού, κρατήσει μόνο το τελευταίο.

Η κανονική σειρά κλειδιών για ένα αρχείο `.meta/config.json` άσκησης είναι:

```text
- authors
- [contributors]
- files
  - solution
  - test
  - exemplar           (Concept Exercises only)
  - example            (Practice Exercises only)
  - [editor]
  - [invalidator]
- [language_versions]
- [forked_from]        (Concept Exercises only)
- [icon]               (Concept Exercises only)
- [test_runner]        (Practice Exercises only)
- blurb
- [source]
- [source_url]
- [custom]
```

όπου οι αγκύλες δηλώνουν ότι το κλειδί που περικλείεται είναι προαιρετικό.

Σημείωσε ότι το `configlet fmt` δουλεύει μόνο σε ασκήσεις που υπάρχουν στο αρχείο `config.json` στο επίπεδο του track.
Επομένως, αν υλοποιείς μια νέα άσκηση σε ένα track και θέλεις να μορφοποιήσεις το αρχείο `.meta/config.json` της, πρόσθεσε πρώτα την άσκηση στο αρχείο `config.json` στο επίπεδο του track.
Αν η άσκηση δεν είναι ακόμη έτοιμη να είναι ορατή στους χρήστες, όρισε την τιμή `status` της σε `wip`.

Ο κωδικός εξόδου είναι 0 όταν κάθε αρχείο ρυθμίσεων που εξετάστηκε είναι μορφοποιημένο όταν τερματίσει το configlet, και 1 διαφορετικά.

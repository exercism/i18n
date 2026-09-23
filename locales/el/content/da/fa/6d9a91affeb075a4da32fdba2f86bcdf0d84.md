# Εισαγωγή

Σε μια προηγούμενη έννοια αναφέρθηκε ότι τόσο οι τοπικές ετικέτες όσο και οι συναρτήσεις δεν είναι παρά διευθύνσεις μέσα σε ένα τμήμα με εκτελέσιμο κώδικα, όπως το `section .text`.

Στην πραγματικότητα, οι συναρτήσεις μπορούν να χειριστούν με τον ίδιο τρόπο όπως οποιαδήποτε διεύθυνση μνήμης: μπορούν να φορτωθούν σε καταχωρητές, να μεταβιβάζονται ελεύθερα και να αποθηκευτούν στη μνήμη.
Είναι επίσης δυνατό να χρησιμοποιήσεις τις `call` ή `jmp` για να μεταφέρεις την εκτέλεση σε μια συνάρτηση που είναι αποθηκευμένη σε έναν καταχωρητή ή στη μνήμη:

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

Μια διεύθυνση συνάρτησης που μεταβιβάζεται ως τιμή ονομάζεται **thunk**.
Τα thunks αποτελούν δομικό στοιχείο του **προγραμματισμού ανώτερης τάξης** στη assembly: κώδικας που λειτουργεί πάνω σε άλλον κώδικα.

## Ο κώδικας ως δεδομένα

Οι διευθύνσεις συναρτήσεων μπορούν επίσης να αποθηκευτούν στη μνήμη και να ανακτηθούν αργότερα:

```x86asm
section .bss
    cached_fn resq 1

section .text
save_op:
    mov qword [rel cached_fn], rdi
    ret

apply_op:
    ; arguments are already set up according to the ABI
    jmp qword [rel cached_fn] ; tail call
```

Η `save_op` γράφει τη διεύθυνση συνάρτησης που λαμβάνει στη `cached_fn`.
Η τιμή παραμένει εκεί και μετά την επιστροφή της `save_op`, οπότε κάθε μεταγενέστερη κλήση της `apply_op` κάνει άλμα ουράς στη διεύθυνση που αποθηκεύτηκε τελευταία.
Έτσι, είναι δυνατό να αλλάξεις ποια συνάρτηση θα καλέσει η `apply_op` κατά την εκτέλεση.

## Πίνακες αποστολής

Η αποθήκευση διευθύνσεων συναρτήσεων σε έναν πίνακα καθιστά δυνατή την επιλογή διαφορετικών συναρτήσεων ανάλογα με κάποια θέση, η οποία μπορεί να εξαρτάται από μια συνθήκη που προκύπτει κατά την εκτέλεση.
Αυτό ονομάζεται **πίνακας αποστολής**:

```x86asm
section .data
    dispatch_table dq add_op, sub_op, mul_op

section .text
dispatch:
    ; this function takes two arguments in rdi and rsi, and an index in rdx
    ; it then applies the function corresponding to the index in rdx to the arguments
    lea rax, [rel dispatch_table]
    jmp qword [rax + 8*rdx]   ; tail-call the function address for the index
```

## Thunks με κατάσταση

Ένα thunk που διαβάζει ή ενημερώνει κάποια μόνιμη μνήμη ανάμεσα στις κλήσεις μπορεί να συμπεριφέρεται διαφορετικά ανάλογα με το τι προηγήθηκε.
Το αποτέλεσμά του μπορεί να εξαρτάται από περισσότερα από τα ορίσματά του και μόνο.

Για παράδειγμα, ένας _μετρητής_ που παίρνει μια συνάρτηση και την καλεί με το τρέχον πλήθος, αυξάνοντας το πλήθος κάθε φορά:

```x86asm
section .data
    count dq 0

section .text
tick:
    mov rax, rdi               ; saves the function address
    mov rdi, [rel count]       ; loads the current count as the function's argument
    inc qword [rel count]      ; advances the count
    jmp rax                    ; tail-calls the function
```

Η `tick` καλεί τη δεδομένη συνάρτηση με το τρέχον πλήθος ως όρισμα και μετά αυξάνει το πλήθος.
Έτσι, η πρώτη κλήση `tick(square)` καλεί τη `square(0)`, η επόμενη κλήση `tick(square)` καλεί τη `square(1)`, μετά τη `square(2)` και ούτω καθεξής.

Ένα άλλο παράδειγμα θα ήταν ένας _καθυστερημένος υπολογισμός_:

```x86asm
section .bss
    captured_fn resq 1
    argument resq 1

section .text
delay:
    mov qword [rel captured_fn], rdi ; saves the function
    mov qword [rel argument], rsi    ; saves the argument
    lea rax, [rel invoke]            ; returns the `invoke` function
    ret

invoke:
    mov rdi, qword [rel argument]    ; loads the saved argument into `rdi`
    jmp qword [rel captured_fn]      ; tail-calls the saved function
```

Η `delay` παίρνει μια συνάρτηση και μια τιμή, τις αποθηκεύει και επιστρέφει τη συνάρτηση `invoke`.
Όταν καλείται η `invoke`, εκτελεί τη συνάρτηση που είχε συλληφθεί, με το όρισμα που είχε αποθηκευτεί.

Πολλά από τα μοτίβα που συναντάμε συχνά σε γλώσσες υψηλότερου επιπέδου, όπως τα callbacks, οι εικονικές μέθοδοι, οι γεννήτριες, το currying, η σύνθεση συναρτήσεων και πολλά άλλα, βασίζονται σε thunks συνδυασμένα με μόνιμη κατάσταση.

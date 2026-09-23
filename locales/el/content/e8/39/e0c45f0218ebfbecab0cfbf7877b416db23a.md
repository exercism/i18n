# Εισαγωγή

Ένα *ξένο σύνολο* (γνωστό και ως δομή union-find) διατηρεί μια συλλογή
τιμών χωρισμένη σε ομάδες που δεν επικαλύπτονται. Βρίσκεται στο
λεξιλόγιο [`disjoint-sets`][disjoint-sets].

Το `<disjoint-set>` φτιάχνει μια κενή δομή. Το `add-atom` προσθέτει μία
τιμή ως δική της ομάδα, και το `add-atoms` προσθέτει κάθε τιμή μιας
ακολουθίας:

```
<disjoint-set> ( -- disjoint-set )
add-atom       ( atom disjoint-set -- )
add-atoms      ( seq disjoint-set -- )
```

```factor
USING: disjoint-sets ;

<disjoint-set>            ! a new, empty disjoint set
{ 1 2 3 } over add-atoms  ! 1, 2 and 3 each start in their own group
```

Το `equate` ενώνει τις δύο ομάδες που περιέχουν τα atoms του. Μετά από
αυτό, είναι μία μόνο ομάδα:

```
equate ( atom1 atom2 disjoint-set -- )
```

Κάθε ομάδα έχει ένα μοναδικό κανονικό μέλος, τον *αντιπρόσωπό* της. Το
`representative` τον επιστρέφει· δύο atoms βρίσκονται στην ίδια ομάδα
ακριβώς όταν μοιράζονται τον ίδιο αντιπρόσωπο. Το `equiv?` το ελέγχει
απευθείας:

```
representative ( atom disjoint-set -- representative )
equiv?         ( atom1 atom2 disjoint-set -- ? )
```

```factor
USING: disjoint-sets ;

<disjoint-set>
{ 1 2 3 } over add-atoms
1 2 pick equate          ! merge the groups of 1 and 2
1 over representative .   ! => 1
2 over representative .   ! => 1  (same representative as 1)
1 2 pick equiv? .         ! => t
1 3 pick equiv? .         ! => f
```

Το `disjoint-set-members` επιστρέφει κάθε atom που έχει προστεθεί.

[disjoint-sets]: https://docs.factorcode.org/content/vocab-disjoint-sets.html

# Σχετικά

Η TypeScript είναι η JavaScript με σύνταξη για τύπους, γεγονός που την κάνει μια γλώσσα προγραμματισμού με αυστηρή τυποποίηση, που υποστηρίζει αντικειμενοστρεφή, προστακτικά και δηλωτικά στυλ (π.χ. συναρτησιακό προγραμματισμό), και σου δίνει καλύτερα εργαλεία σε οποιαδήποτε κλίμακα.
Έχει λίγες [πρωτογενείς τιμές][mdn-primitive], και όλα τα υπόλοιπα θεωρούνται αντικείμενα.

Αν και η JavaScript είναι περισσότερο γνωστή ως η γλώσσα σεναρίων για ιστοσελίδες, πολλά περιβάλλοντα εκτός προγράμματος περιήγησης τη χρησιμοποιούν επίσης, όπως το Node.js.
Η γλώσσα αναπτύσσεται ενεργά· και λόγω της πολυπαραδειγματικής της φύσης, επιτρέπει πολλά στυλ προγραμματισμού.

Η TypeScript χτίζει πάνω σε αυτό και επίσης αναπτύσσεται ενεργά.
Σε ορισμένες κατατάξεις του 2023 είναι πιο δημοφιλής από τη JavaScript στην καθημερινή χρήση.

Επειδή [δεν μπορείς να μάθεις TypeScript χωρίς να μάθεις JavaScript][handbook-js-or-ts], μέρος του περιεχομένου αυτής της διαδρομής επικεντρώνεται στη διδασκαλία εννοιών της JavaScript και κάποιες από τις έννοιες επικεντρώνονται μόνο σε λειτουργίες ειδικές για τη TypeScript.

## (Επανα)ανάθεση

Υπάρχουν μερικοί βασικοί τρόποι να αναθέσεις τιμές σε ονόματα στη TypeScript: χρησιμοποιώντας μεταβλητές ή σταθερές.
Στο Exercism, οι μεταβλητές γράφονται πάντα σε [camelCase][wiki-camel-case]· οι σταθερές γράφονται σε [SCREAMING_SNAKE_CASE][wiki-snake-case].
Δεν υπάρχει επίσημος οδηγός που να ακολουθείς, και διάφορες εταιρείες και οργανισμοί έχουν διαφορετικούς οδηγούς στυλ.
_Γράψε τις μεταβλητές όπως θέλεις_.
Το πλεονέκτημα του να τις γράφεις με τον τρόπο που έχουν προετοιμαστεί οι ασκήσεις είναι ότι θα επισημαίνονται διαφορετικά στη διαδικτυακή διεπαφή και στα περισσότερα IDE.

Οι μεταβλητές στη TypeScript μπορούν να οριστούν χρησιμοποιώντας τη λέξη-κλειδί [`const`][mdn-const], [`let`][mdn-let] ή [`var`][mdn-var].

Μια μεταβλητή μπορεί να αναφέρεται σε διαφορετικές τιμές κατά τη διάρκεια της ζωής της όταν χρησιμοποιείς `let` ή `var`.
Για παράδειγμα, η `myFirstVariable` μπορεί να οριστεί και να επαναοριστεί πολλές φορές χρησιμοποιώντας τον τελεστή ανάθεσης `=`:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

Σε αντίθεση με τα `let` και `var`, οι μεταβλητές που ορίζονται με `const` μπορούν να πάρουν τιμή μόνο μία φορά.
Αυτό χρησιμοποιείται για τον ορισμό σταθερών στη TypeScript.

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

Επειδή η TypeScript μπορεί να το ανιχνεύσει στατικά, ο μεταγλωττιστής της TypeScript θα εμφανίσει επίσης ένα σφάλμα:

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

Αυτό σημαίνει ότι δεν χρειάζεται να τρέξεις τον κώδικα για να ανιχνεύσεις το `TypeError`.

<!--prettier-ignore -->
~~~~exercism/note
💡 Σε μια επόμενη άσκηση εκμάθησης, εξετάζεται και εξηγείται η διαφορά ανάμεσα στην ανάθεση / δέσμευση _σταθεράς_ και στην τιμή μιας _σταθεράς_.
~~~~

## Συμπερασμός τύπων

Χωρίς να βυθιστούμε πολύ βαθιά στο θέμα του [συμπερασμού τύπων][handbook-type-inference], θα πρέπει να γνωρίζεις ότι μια μεταβλητή στην οποία ανατίθεται μια τιμή έχει συνήθως έναν συμπερασμένο τύπο, ακόμη και χωρίς σχολιασμό τύπου.

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

Αυτός ο τύπος επιβάλλεται στη συνέχεια σε όλο τον κώδικα.
Αυτό σημαίνει επίσης ότι, ενώ ο παρακάτω κώδικας είναι έγκυρος στην JavaScript:

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

στη TypeScript παραπονιέται:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

Αυτή η λειτουργία διασφαλίζει την ασφάλεια τύπων ακόμη και όταν δεν χρησιμοποιούνται σχολιασμοί τύπων.

### Ανάθεση σταθερών

Η λέξη-κλειδί `const` αναφέρεται _τόσο_ για μεταβλητές όσο και για σταθερές.
Μια άλλη έννοια που αναφέρεται συχνά γύρω από τις σταθερές είναι η [(α)μεταβλητότητα][wiki-mutability].

Η λέξη-κλειδί `const` κάνει αμετάβλητη μόνο τη _δέσμευση_, δηλαδή μπορείς να αναθέσεις μια τιμή σε μια μεταβλητή `const` μόνο μία φορά.
Στη TypeScript, μόνο οι [πρωτογενείς][mdn-primitive] τιμές είναι αμετάβλητες.
Ωστόσο, οι [μη πρωτογενείς][mdn-primitive] τιμές μπορούν ακόμη να μεταβληθούν.

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### Τιμή σταθεράς (Αμεταβλητότητα)

Κατά κανόνα, στο Exercism, και σε πολλούς άλλους οργανισμούς και οδηγούς στυλ έργων, μη μεταβάλλεις τιμές που μοιάζουν με `const SCREAMING_SNAKE_CASE`.
Τεχνικά οι τιμές _μπορούν_ να αλλάξουν, αλλά για λόγους σαφήνειας και διαχείρισης των προσδοκιών στο Exercism αυτό αποθαρρύνεται.
Όταν αυτό _πρέπει_ να επιβληθεί, χρησιμοποίησε το [`Object.freeze(value)`][mdn-object-freeze].

Όπου είναι δυνατόν, η λέξη-κλειδί `readonly` της TypeScript, το `as const` ή ο γενικός τύπος `Readonly<T>` μπορούν να χρησιμοποιηθούν για να επιβάλουν την αμεταβλητότητα στατικά.
Θα μάθεις περισσότερα για αυτό το θέμα αργότερα.

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

Στην πράξη, είναι απίθανο να δεις `Object.freeze` παντού σε μια βάση κώδικα, αλλά ο κανόνας να μη μεταβάλλεις ποτέ μια τιμή `SCREAMING_SNAKE_CASE` είναι καλός κανόνας· συχνά επιβάλλεται με αυτοματοποιημένη ανάλυση, όπως ένα linter.

## Δηλώσεις συναρτήσεων

Στη TypeScript, οι μονάδες λειτουργικότητας ενσωματώνονται σε _συναρτήσεις_, συνήθως ομαδοποιώντας τις συναρτήσεις στο ίδιο αρχείο εφόσον ανήκουν μαζί.
Αυτές οι συναρτήσεις μπορούν να δέχονται παραμέτρους (ορίσματα) και μπορούν να _επιστρέφουν_ μια τιμή χρησιμοποιώντας τη λέξη-κλειδί `return`.
Οι συναρτήσεις καλούνται χρησιμοποιώντας τη σύνταξη `()`.

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

Οι παράμετροι μιας συνάρτησης συνήθως πρέπει να έχουν σχολιασμό τύπου, χρησιμοποιώντας άνω και κάτω τελεία (`:`) ακολουθούμενη από τον τύπο.
Οι τιμές επιστροφής μιας συνάρτησης μπορούν να σχολιαστούν μετά το κλείσιμο της λίστας παραμέτρων, χρησιμοποιώντας άνω και κάτω τελεία (`:`) ακολουθούμενη από τον τύπο.

Αν μια συνάρτηση δεν έχει σχολιασμό τύπου για την τιμή επιστροφής της, ο τύπος θα συμπεραθεί.

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

Εδώ ο τύπος επιστροφής συμπεράθηκε επειδή η TypeScript γνωρίζει ότι το αποτέλεσμα του `number + number` πρέπει πάντα να είναι `number`.

<!--prettier-ignore -->
~~~~exercism/note
💡 Στη TypeScript υπάρχουν _πολλοί_ διαφορετικοί τρόποι να δηλώσεις μια συνάρτηση.
Αυτοί οι άλλοι τρόποι διαφέρουν από τη χρήση της λέξης-κλειδιού `function`.
Η διαδρομή προσπαθεί να τους εισάγει σταδιακά, αλλά αν τους γνωρίζεις ήδη, χρησιμοποίησε ελεύθερα όποιον θέλεις.
Στις περισσότερες περιπτώσεις, η χρήση του ενός ή του άλλου δεν είναι καλύτερη ούτε χειρότερη.
~~~~

## Σχολιασμοί τύπων

Όπως φαίνεται στη δήλωση της συνάρτησης `add`, οι παράμετροι έχουν ρητό σχολιασμό τύπου `: number`.
Οι δηλώσεις μεταβλητών, οι ιδιότητες κλάσεων, οι δηλώσεις συναρτήσεων και άλλα υποστηρίζουν όλα σχολιασμούς τύπων.

Τόσο οι ρητοί σχολιασμοί τύπων όσο και οι συμπερασμένοι τύποι επιβάλλονται από τον ελεγκτή τύπων.

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

Αν η TypeScript δεν βρει ρητό σχολιασμό τύπου και δεν μπορεί να συμπεράνει τον τύπο, θα αναθέσει τον τύπο `any`, τον οποίο [δεν πρέπει να χρησιμοποιείς][handbook-dont-use-any].
Αργότερα θα μάθεις για τον τύπο `unknown` ως καλή εναλλακτική.

## Εξαγωγή και εισαγωγή

Οι λέξεις-κλειδιά `export` και `import` είναι ισχυρά εργαλεία που μετατρέπουν ένα συνηθισμένο αρχείο TypeScript σε [άρθρωμα TypeScript][mdn-module].
Εκτός από το ότι επιτρέπουν στον κώδικα να εκθέτει επιλεκτικά components, όπως συναρτήσεις, κλάσεις, μεταβλητές και σταθερές, ενεργοποιούν επίσης μια ολόκληρη σειρά άλλων λειτουργιών, όπως:

- [Μετονομασία εξαγωγών και εισαγωγών][mdn-renaming-modules], που σου επιτρέπει να αποφεύγεις συγκρούσεις ονομάτων,
- [Δυναμικές εισαγωγές][mdn-dynamic-imports], που φορτώνουν κώδικα κατά απαίτηση,
- [Tree shaking][blog-tree-shaking], που μειώνει το μέγεθος του τελικού κώδικα εξαλείφοντας αρθρώματα χωρίς παρενέργειες και ακόμη περιεχόμενα αρθρωμάτων _που δεν χρησιμοποιούνται_,
- Εξαγωγή [_ζωντανών δεσμεύσεων_][blog-live-bindings], που σου επιτρέπει να εξάγεις μια τιμή που μεταβάλλεται παντού όπου εισάγεται, αν μεταβληθεί η αρχική τιμή.

Ένα συγκεκριμένο παράδειγμα είναι το πώς λειτουργούν τα tests στη διαδρομή TypeScript του Exercism.
Κάθε άσκηση έχει τουλάχιστον ένα αρχείο υλοποίησης, για παράδειγμα `lasagna.ts`, και κάθε άσκηση έχει τουλάχιστον ένα αρχείο test, για παράδειγμα `lasagna.test.ts`.
Το αρχείο υλοποίησης χρησιμοποιεί το `export` για να εκθέσει το δημόσιο API και το αρχείο test χρησιμοποιεί το `import` για να αποκτήσει πρόσβαση σε αυτά, και έτσι μπορεί να ελέγξει τα αποτελέσματα της υλοποίησης.

```typescript
// file.js
export const MY_VALUE = 10

export function add(num1, num2) {
  return num1 + num2
}

// file.spec.js
import { MY_VALUE, add } from './file.js'

add(MY_VALUE, 5)
// => 15
```

<!--prettier-ignore -->
~~~~exercism/advanced
Επειδή ο μεταγλωττιστής της TypeScript _δεν ξαναγράφει τις διαδρομές των εισαγωγών_, οι εισαγωγές θα πρέπει να γράφονται χρησιμοποιώντας την επέκταση `.js` (καθώς αυτό θα προκύψει μετά τη διαμεταγλώττιση).
Ωστόσο, η επιλογή `allowImportingTsExtensions` είναι ενεργοποιημένη επειδή έχουμε μια διαδικασία που ξαναγράφει τις διαδρομές.
Αυτό επιτρέπει την εισαγωγή από `.ts` (καθώς και από `.js`).

Σε παλαιότερο κώδικα θα βρεις εισαγωγές _χωρίς επέκταση αρχείου_.
~~~~

[blog-live-bindings]: https://2ality.com/2015/07/es6-module-exports.html#es6-modules-export-immutable-bindings
[blog-tree-shaking]: https://bitsofco.de/what-is-tree-shaking/
[mdn-const]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
[mdn-dynamic-imports]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports
[mdn-let]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
[mdn-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[mdn-object-freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[mdn-primitive]: https://developer.mozilla.org/en-US/docs/Glossary/Primitive
[mdn-renaming-modules]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#Renaming_imports_and_exports
[mdn-var]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
[handbook-dont-use-any]: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#any
[handbook-js-or-ts]: https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html#learning-javascript-and-typescript
[handbook-type-inference]: https://www.typescriptlang.org/docs/handbook/type-inference.html
[wiki-mutability]: https://en.wikipedia.org/wiki/Immutable_object
[wiki-camel-case]: https://en.wikipedia.org/wiki/Camel_case
[wiki-snake-case]: https://en.wikipedia.org/wiki/Snake_case

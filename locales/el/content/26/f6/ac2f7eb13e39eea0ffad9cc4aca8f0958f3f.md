# Σχετικά

Το αντικείμενο [`Promise`][promise-docs] αντιπροσωπεύει την τελική ολοκλήρωση (ή αποτυχία) μιας ασύγχρονης λειτουργίας και την τιμή που προκύπτει από αυτήν.

<!-- prettier-ignore -->
~~~exercism/note
Αυτό είναι ένα δύσκολο θέμα για πολλούς ανθρώπους, ειδικά αν ξέρεις προγραμματισμό σε μια γλώσσα που είναι εντελώς _σύγχρονη_.
Αν νιώθεις ότι σε ξεπερνάει, ή αν θα ήθελες να μάθεις περισσότερα για την **ταυτοχρονικότητα** και τον **παραλληλισμό**, [δες (μέσω go.dev)][talk-blog] ή [δες απευθείας μέσω vimeo][talk-video] και [διάβασε τις διαφάνειες][talk-slides] της υπέροχης ομιλίας "Concurrency is not parallelism".

[talk-slides]: https://go.dev/talks/2012/waza.slide#1
[talk-blog]: https://go.dev/blog/waza-talk
[talk-video]: https://vimeo.com/49718712
~~~

## Ο κύκλος ζωής μιας υπόσχεσης

Μια `Promise` έχει τρεις καταστάσεις:

1. εκκρεμής
2. εκπληρωμένη
3. απορριφθείσα

Όταν δημιουργείται, μια υπόσχεση είναι εκκρεμής.
Κάποια στιγμή στο μέλλον μπορεί να _επιλυθεί_ ή να _απορριφθεί_.
Μόλις μια υπόσχεση επιλυθεί ή απορριφθεί μία φορά, δεν μπορεί ποτέ ξανά να επιλυθεί ή να απορριφθεί, ούτε μπορεί να αλλάξει η κατάστασή της.

Με άλλα λόγια:

1. Όταν βρίσκεται σε εκκρεμή κατάσταση, μια υπόσχεση:
   - μπορεί να μεταβεί είτε στην εκπληρωμένη είτε στην απορριφθείσα κατάσταση.
2. Όταν βρίσκεται σε εκπληρωμένη κατάσταση, μια υπόσχεση:
   - δεν πρέπει να μεταβεί σε καμία άλλη κατάσταση.
   - πρέπει να έχει μια τιμή, η οποία δεν πρέπει να αλλάξει.
3. Όταν βρίσκεται σε απορριφθείσα κατάσταση, μια υπόσχεση:
   - δεν πρέπει να μεταβεί σε καμία άλλη κατάσταση.
   - πρέπει να έχει έναν λόγο, ο οποίος δεν πρέπει να αλλάξει.

## Επίλυση μιας υπόσχεσης

Μια υπόσχεση μπορεί να επιλυθεί με διάφορους τρόπους:

```javascript
// Creates a promise that is immediately resolved
Promise.resolve(value);

// Creates a promise that is immediately resolved
new Promise((resolve) => {
  resolve(value);
});

// Chaining a promise leads to a resolved promise
somePromise.then(() => {
  // ...
  return value;
});
```

Στα παραπάνω παραδείγματα το `value` μπορεί να είναι _οτιδήποτε_, συμπεριλαμβανομένου ενός σφάλματος, του `undefined`, του `null` ή μιας άλλης υπόσχεσης.
Συνήθως θέλεις να επιλύσεις με μια τιμή που δεν είναι σφάλμα.

## Απόρριψη μιας υπόσχεσης

Μια υπόσχεση μπορεί να απορριφθεί με διάφορους τρόπους:

```javascript
// Creates a promise that is immediately rejected
Promise.reject(reason)

// Creates a promise that is immediately rejected
new Promise((_, reject) {
  reject(reason)
})

// Chaining a promise with an error leads to a rejected promise
somePromise.then(() => {
  // ...
  throw reason
})
```

Στα παραπάνω παραδείγματα το `reason` μπορεί να είναι _οτιδήποτε_, συμπεριλαμβανομένου ενός σφάλματος, του `undefined` ή του `null`.
Συνήθως θέλεις να απορρίψεις με ένα σφάλμα.

## Αλυσίδωση μιας υπόσχεσης

Μια υπόσχεση μπορεί να _συνεχιστεί_ με μια μελλοντική ενέργεια μόλις επιλυθεί ή απορριφθεί.

- Η [`promise.then()`][promise-then] καλείται μόλις επιλυθεί η `promise`
- Η [`promise.catch()`][promise-catch] καλείται μόλις απορριφθεί η `promise`
- Η [`promise.finally()`][promise-finally] καλείται μόλις η `promise` είτε επιλυθεί είτε απορριφθεί

### **then**

Κάθε υπόσχεση είναι "thenable".
Αυτό σημαίνει ότι υπάρχει μια διαθέσιμη συνάρτηση `then` που θα εκτελεστεί μόλις επιλυθεί η αρχική υπόσχεση.
Δεδομένου του `promise.then(onResolved)`, το callback `onResolved` λαμβάνει την τιμή με την οποία επιλύθηκε η αρχική υπόσχεση.
Αυτό θα επιστρέφει πάντα μια _νέα_ "αλυσιδωτή" υπόσχεση.

Η επιστροφή ενός `value` από το `then` επιλύει την "αλυσιδωτή" υπόσχεση.
Η ρίψη ενός `reason` στο `then` απορρίπτει την "αλυσιδωτή" υπόσχεση.

```javascript
const promise1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});

const promise2 = promise1.then(function (value) {
  console.log(value);
  // expected output: "Success!"

  return true;
});
```

Αυτό θα τυπώσει το `"Success!"` μετά από περίπου 1000 ms.
Η κατάσταση και η τιμή του `promise1` θα είναι `resolved` και `"Success!"`.
Η κατάσταση και η τιμή του `promise2` θα είναι `resolved` και `true`.

Υπάρχει ένα δεύτερο διαθέσιμο όρισμα που εκτελείται όταν απορριφθεί η αρχική υπόσχεση.
Δεδομένου του `promise.then(onResolved, onRejected)`, το callback `onResolved` λαμβάνει την τιμή με την οποία επιλύθηκε η αρχική υπόσχεση, ή το callback `onRejected` λαμβάνει τον λόγο για τον οποίο απορρίφθηκε η υπόσχεση.

```javascript
const promise1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);

  if (Math.random() < 0.5) {
    reject('Nope!');
  }
});

function log(value) {
  console.log(value);
  return true;
}

function shout(reason) {
  console.error(reason.toUpperCase());
  return false;
}

const promise2 = promise1.then(log, shout);
```

- Σε περίπου 1/2 των περιπτώσεων, αυτό θα τυπώσει το `"Success!"` μετά από περίπου 1000 ms.
  - Η κατάσταση και η τιμή του `promise1` θα είναι `resolved` και `"Success!"`.
  - Η κατάσταση και η τιμή του `promise2` θα είναι `resolved` και `true`.
- Σε περίπου 1/2 των περιπτώσεων, αυτό θα τυπώσει αμέσως το `"NOPE!"`.
  - Η κατάσταση και η τιμή του `promise1` θα είναι `rejected` και `Nope!`.
  - Η κατάσταση και η τιμή του `promise2` θα είναι `resolved` και `false`.

Είναι σημαντικό να καταλάβεις ότι, λόγω των κανόνων του κύκλου ζωής, όταν κάνει `reject`, το `resolve` που έρχεται ~1000ms αργότερα αγνοείται σιωπηλά, καθώς η εσωτερική κατάσταση δεν μπορεί να αλλάξει μόλις απορριφθεί ή επιλυθεί.
Είναι σημαντικό να καταλάβεις ότι η επιστροφή μιας τιμής από μια υπόσχεση την επιλύει, και η ρίψη μιας τιμής την απορρίπτει.
Όταν το `promise1` επιλυθεί και υπάρχει συνδεδεμένο `onResolved`: `then(onResolved)`, τότε αυτή η συνέχεια είναι μια νέα υπόσχεση που μπορεί να επιλυθεί ή να απορριφθεί.
Όταν το `promise1` απορριφθεί αλλά υπάρχει συνδεδεμένο `onRejected`: `then(, onRejected)`, τότε αυτή η συνέχεια είναι μια νέα υπόσχεση που μπορεί να επιλυθεί ή να απορριφθεί.

### **catch**

Μερικές φορές θέλεις να συλλάβεις σφάλματα και να συνεχίσεις μόνο όταν η αρχική υπόσχεση κάνει `reject`.
Δεδομένου του `promise.catch(onCatch)`, το callback `onCatch` λαμβάνει τον λόγο για τον οποίο απορρίφθηκε η αρχική υπόσχεση.
Αυτό θα επιστρέφει πάντα μια _νέα_ "αλυσιδωτή" υπόσχεση.

Η επιστροφή ενός `value` από το `catch` επιλύει την "αλυσιδωτή" υπόσχεση.
Η ρίψη ενός `reason` στο `catch` απορρίπτει την "αλυσιδωτή" υπόσχεση.

```javascript
const promise1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);

  if (Math.random() < 0.5) {
    reject('Nope!');
  }
});

function log(value) {
  console.log(value);
  return 'done';
}

function recover(reason) {
  console.error(reason.toUpperCase());
  return 42;
}

const promise2 = promise1.catch(recover).then(log);
```

Σε περίπου 1/2 των περιπτώσεων, αυτό θα τυπώσει το `"Success!"` μετά από περίπου 1000 ms.
Στην άλλη 1/2 των περιπτώσεων, αυτό θα τυπώσει αμέσως το `42`.

- Αν το `promise1` επιλυθεί, το `catch` παραλείπεται και φτάνει στο `then`, και τυπώνει την τιμή.
  - Η κατάσταση και η τιμή του `promise1` θα είναι `resolved` και `"Success!"`.
  - Η κατάσταση και η τιμή του `promise2` θα είναι `resolved` και `"done"`;
- Αν το `promise1` απορριφθεί, το `catch` εκτελείται, το οποίο _επιστρέφει μια τιμή_, και έτσι η αλυσίδα είναι τώρα `resolved`, και φτάνει στο `then`, και τυπώνει την τιμή.
  - Η κατάσταση και η τιμή του `promise1` θα είναι `rejected` και `"Nope!"`.
  - Η κατάσταση και η τιμή του `promise2` θα είναι `resolved` και `"done"`;

### **finally**

Μερικές φορές θέλεις να εκτελέσεις κώδικα αφού μια υπόσχεση ολοκληρωθεί, ανεξάρτητα από το αν επιλυθεί ή απορριφθεί.
Δεδομένου του `promise.finally(onSettled)`, το callback `onSettled` δεν λαμβάνει τίποτα.
Αυτό θα επιστρέφει πάντα μια _νέα_ "αλυσιδωτή" υπόσχεση.

Η επιστροφή ενός `value` από το `finally` αντιγράφει την κατάσταση και την τιμή από την αρχική υπόσχεση, αγνοώντας το `value`.
Η ρίψη ενός `reason` στο `finally` απορρίπτει την "αλυσιδωτή" υπόσχεση, αντικαθιστώντας οποιαδήποτε κατάσταση και τιμή ή λόγο από την αρχική υπόσχεση.

## Παράδειγμα

Διάφορες από τις μεθόδους μαζί:

```javascript
const myPromise = new Promise(function (resolve, reject) {
  const sampleData = [2, 4, 6, 8];
  const randomNumber = Math.round(Math.random() * 5);

  if (sampleData[randomNumber]) {
    resolve(sampleData[randomNumber]);
  } else {
    reject('Sampling did not result in a sample');
  }
});

const finalPromise = myPromise
  .then(function (sampled) {
    // If the random number was 0, 1, 2, or 3, this will be
    // reached and the number 2, 4, 6, or 8 will be logged.
    console.log(`Sampled data: ${sampled}`);
    return 'yay';
  })
  .catch(function (reason) {
    // If the random number was 4 or 5, this will be reached and
    // reason will be "An error occurred". The entire chain will
    // then reject with an Error with the reason as message.
    throw new Error(reason);
  })
  .finally(function () {
    // This will always log after either the sampled data is
    // logged or the error is raised.
    console.log('Promise completed');
  });
```

- Στις περιπτώσεις που το `randomNumber` είναι `0-3`:
  - Το `myPromise` θα επιλυθεί με την τιμή `2, 4, 6, or 8`
  - Το `finalPromise` θα επιλυθεί με την τιμή `'yay'`
  - Θα τυπωθούν δύο μηνύματα:
    - `Sampled data: ...`
    - `Promise completed`
- Στις περιπτώσεις που το `randomNumber` είναι `4-5`:
  - Το `myPromise` θα απορριφθεί με τον λόγο `'Sampling did not result in a sample'`
  - Το `finalPromise` θα απορριφθεί με τον λόγο `Error('Sampling did not result in a sample')`
  - Θα τυπωθεί ένα μήνυμα:
    - `Promise completed`
    - _σε ορισμένα περιβάλλοντα_ αυτό θα έχει ως αποτέλεσμα ένα μήνυμα `"uncaught rejected promise: Error('Sampling did not result in a sample')"`

Όπως φαίνεται παραπάνω, το `reject` λειτουργεί με μια συμβολοσειρά, και μια υπόσχεση μπορεί επίσης να απορριφθεί με ένα `Error`.

<!-- prettier-ignore -->
~~~exercism/note
Αν η αλυσίδωση υποσχέσεων ή η γενική χρήση δεν είναι ξεκάθαρη, το [tutorial στο MDN][mdn-promises] είναι μια καλή πηγή για να μελετήσεις.

[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
~~~

[promise-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[promise-finally]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally

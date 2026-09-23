# Εισαγωγή

## Λειτουργίες χαρακτήρων

Οι χαρακτήρες στη Clojure είναι πρωτογενείς τύποι `java.lang.Character`, και μπορούμε να τους χειριστούμε μέσω [διασύνδεσης][clojure-java-interop] χρησιμοποιώντας τις μεθόδους της [κλάσης Character][java-character-class]:

```clojure
(Character/isDigit \2)
;;=> true
```

## Βοηθητικές λειτουργίες συμβολοσειρών

Η Clojure συνοδεύεται από μια ισχυρή βιβλιοθήκη επεξεργασίας συμβολοσειρών, [clojure.string][clojure-str]. Αυτή είναι συχνά πιο ιδιωματική από τη διασύνδεση.

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html
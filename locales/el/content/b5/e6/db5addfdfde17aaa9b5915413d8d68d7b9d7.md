# Υποδείξεις

## 1. Υπολόγισε την ημερομηνία της επετείου του γιγαδευτερολέπτου

- Ο παγκόσμιος χρόνος είναι ένας αριθμός δευτερολέπτων από την εποχή.
- Η Common Lisp διαθέτει ένα ζεύγος συναρτήσεων που μπορούν να κωδικοποιήσουν ή να αποκωδικοποιήσουν έναν παγκόσμιο χρόνο
- Πολλαπλές τιμές από μια συνάρτηση μπορούν να συλλεχθούν σε μια λίστα με τη χρήση του κατάλληλου μάκρο.
- Αν και οι παράμετροι ζώνης ώρας των [`decode-universal-time`][hyperspec-decode-universal-time] και [`encode-universal-time`][hyperspec-encode-universla-time] είναι προαιρετικές, είναι σημαντικές. Ποιες είναι οι προεπιλεγμένες τιμές τους;

[hyperspec-decode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_dec_un.htm#decode-universal-time
[hyperspec-encode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_encode.htm#encode-universal-time

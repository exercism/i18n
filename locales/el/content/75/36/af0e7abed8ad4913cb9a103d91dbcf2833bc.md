1.  Εξοικειώσου με τις συμβάσεις που περιγράφονται στο [PEP 8][pep-8].
    Αν και δεν αποτελούν "νόμο", είναι το πρότυπο που χρησιμοποιεί το ίδιο το έργο της Python και μια εξαιρετική βάση στις περισσότερες περιπτώσεις προγραμματισμού.
2.  Διάβασε και σκέψου τις ιδέες που περιγράφονται στο [PEP 20 (γνωστό και ως "The Zen of Python")][pep-20].
    Όπως το PEP 8, δεν είναι "νόμοι", αλλά στέρεες κατευθυντήριες αρχές για καλύτερο και πιο καθαρό κώδικα Python.
3.  Προτίμησε κώδικα καθαρό και εύκολο να τον παρακολουθήσεις αντί για σχόλια. Αλλά σχολίασε οπωσδήποτε όπου χρειάζεται για λόγους σαφήνειας.
4.  Σκέψου να χρησιμοποιήσεις υποδείξεις τύπων για να κάνεις τον κώδικά σου πιο σαφή.
    Δες την [τεκμηρίωση][type-hint-docs] των υποδείξεων τύπων και [γιατί μπορεί να μη θέλεις να βάλεις υποδείξεις τύπων][type-hint-nos].
5.  Προσπάθησε να ακολουθήσεις τις οδηγίες για τα docstrings που περιγράφονται στο [PEP 257][pep-257].
    Η καλή τεκμηρίωση έχει σημασία.
6.  Απόφυγε τους [μαγικούς αριθμούς][magic-numbers].
7.  Προτίμησε το [`enumerate()`][enumerate-docs] αντί για το [`range(len())`][range-docs] σε βρόχους που χρειάζονται και θέση και στοιχείο.
8.  Προτίμησε τα [comprehensions][comprehensions] και τις [generator expressions][generators] αντί για βρόχους που προσθέτουν στοιχεία σε μια δομή δεδομένων.
    Αλλά μην [τα παρακάνεις με τα comprehensions][comprehension-overuse].
9.  Όταν ενώνεις περισσότερες από λίγες συμβολοσειρές ή συνενώνεις μέσα σε έναν βρόχο, προτίμησε το [`str.join()`][join] αντί για άλλες μεθόδους συνένωσης συμβολοσειρών.
10.  Εξοικειώσου με το πλούσιο σύνολο [ενσωματωμένων συναρτήσεων][built-in-functions] της Python και με την [Τυπική Βιβλιοθήκη][standard-lib].
     Πήγαινε [εδώ][standard-lib-overview] για μια σύντομη περιήγηση και μερικά ενδιαφέροντα σημεία.

[built-in-functions]: https://docs.python.org/3/library/functions.html
[comprehension-overuse]: https://treyhunner.com/2019/03/abusing-and-overusing-list-comprehensions-in-python/
[comprehensions]: https://treyhunner.com/2015/12/python-list-comprehensions-now-in-color/
[enumerate-docs]: https://docs.python.org/3/library/functions.html#enumerate
[generators]: https://www.pythonmorsels.com/how-write-generator-expression/
[join]: https://docs.python.org/3/library/stdtypes.html#str.join
[magic-numbers]: https://en.wikipedia.org/wiki/Magic_number_(programming)
[pep-20]: https://peps.python.org/pep-0020/
[pep-257]: https://peps.python.org/pep-0257/
[pep-8]: https://peps.python.org/pep-0008/
[range-docs]: https://docs.python.org/3/library/functions.html#func-range
[standard-lib-overview]: https://docs.python.org/3/tutorial/stdlib.html
[standard-lib]: https://docs.python.org/3/library/index.html
[type-hint-docs]: https://typing.python.org/en/latest/index.html
[type-hint-nos]: https://typing.python.org/en/latest/guides/typing_anti_pitch.html

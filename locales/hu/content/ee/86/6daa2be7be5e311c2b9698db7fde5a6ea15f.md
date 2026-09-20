# túl hosszú metódus

Érdemes lehet a következő metódus(oka)t szemantikailag jelentéssel bíró metódusok hívásaira bontani: `%{methodNames}`

A metódusban több sor kód van, mint amennyit ez a feladat általában megkíván.
Ez elfogadható lehet, de arra is utalhat, hogy a metódus túl sok munkát végez közvetlenül, és a munka egy részét más metódusokra kellene bíznia.
Igyekezz mindent egy metóduson belül ugyanazon az absztrakciós szinten tartani.
Például a ciklus elemein való végigiterálás lehet az egyik metódus feladata, míg az egyes elemek módosítása egy másiké.

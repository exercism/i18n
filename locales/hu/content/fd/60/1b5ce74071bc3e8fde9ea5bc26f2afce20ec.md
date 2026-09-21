# Utasítások

Már egy ideje a városi hivatalban dolgozol, és kifejlesztettél néhány eszközt, amelyek felgyorsítják a mindennapi munkádat, például az űrlapok kitöltését.

Most egy új kolléga csatlakozik hozzád, és rájöttél, hogy az eszközeid nem biztos, hogy maguktól érthetőek.
Sok furcsa szokás van a hivatalodban, például hogy az űrlapokat mindig nagybetűkkel kell kitölteni, és nem szabad üresen hagyni a mezőket.

Első lépésként úgy döntesz, hogy PHP-típusdeklarációkat adsz hozzá, hogy az új kollégád könnyebben belevághasson, és elkezdhesse használni az eszközeidet.

## 1. Az `Address` osztály típusainak deklarálása

Adj hozzá típusdeklarációkat az `Address` osztály minden deklarált tulajdonságához.
Minden osztálytulajdonságot stringként kell deklarálni.

## 2. A típusok deklarálása az űrlap üres értékekkel való kitöltéséhez

Adj hozzá paramétertípus-deklarációt és visszatérési típusdeklarációt a `Form` osztály `blanks` metódusához.
A metódus egy egész szám hosszúságot kap bemenetként, és az üres sor string reprezentációját adja vissza.

## 3. A típus deklarálása, amikor egy értéket külön betűkre bontunk

Adj hozzá paramétertípus-deklarációt és visszatérési típusdeklarációt a `Form` osztály `letters` metódusához.
A metódus egy stringet kap bemenetként, amely szavakat reprezentál, és betűk tömbjét adja vissza.

## 4. A típus deklarálása annak ellenőrzésekor, hogy egy érték befér-e az űrlapba

Adj hozzá paramétertípus-deklarációkat és visszatérési típusdeklarációt a `Form` osztály `checkLength` metódusához.
A metódus egy string szót és egy egész szám maximális hosszúságot kap bemenetként, és egy igaz vagy hamis értéket ad vissza.

## 5. A típus deklarálása egy cím űrlapon való formázásakor

Adj hozzá paramétertípus-deklarációt, amely a korábban frissített `Address` osztályt használja, és visszatérési típusdeklarációt a `Form` osztály `formatAddress` metódusához.
A metódus egy `Address`-t kap bemenetként, és egy formázott stringet ad vissza.

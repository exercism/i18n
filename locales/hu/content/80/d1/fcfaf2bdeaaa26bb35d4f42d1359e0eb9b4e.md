# Utasítások

Ez a feladat a naplófájlok feldolgozásával foglalkozik.

Egy nemrég lezajlott biztonsági felülvizsgálat után arra kértek, hogy tisztítsd meg a szervezet archivált naplófájljait.

A függvényeknek átadott összes string garantáltan nem nullértékű, és nem tartalmaz sem vezető, sem záró szóközt.

## 1. Azonosítsd a hibás naplósorokat

Kell némi fogalmad arról, hogy az archívumodban hány naplósor nem felel meg a jelenlegi szabványoknak.
Úgy gondolod, hogy egy egyszerű vizsgálat megmutatja, érvényes-e egy naplósor.
Ahhoz, hogy egy sor érvényesnek számítson, a következő stringek egyikével kell kezdődnie:

- [TRC]
- [DBG]
- [INF]
- [WRN]
- [ERR]
- [FTL]

Valósítsd meg az `IsValidLine` függvényt, amely `false`-t ad vissza, ha egy string érvénytelen, egyébként pedig `true`-t.

```go
IsValidLine("[ERR] A good error here")
// => true
IsValidLine("Any old [ERR] text")
// => false
IsValidLine("[BOB] Any old text")
// => false
```

## 2. Bontsd fel a naplósort

Egy új csapat csatlakozott a szervezethez, és azt tapasztalod, hogy a naplófájljaikban furcsa elválasztó választja el a „mezőket”.
Ahelyett, hogy valami értelmeset, például kettőspontot (":") használnának, olyan stringet írnak, mint a "<--->" vagy a "<=>" (mert az szebb). Valójában bármilyen stringet, amelynek az első karaktere "<", az utolsó pedig ">", és közte a következő karakterek bármilyen kombinációja állhat: "~", "\*", "=" és "-".

Valósítsd meg a `SplitLogLine` függvényt, amely egy sort kap, és olyan stringekből álló tömböt ad vissza, amelyek mindegyike egy mezőt tartalmaz.

```go
SplitLogLine("section 1<*>section 2<~~~>section 3")
// => []string{"section 1", "section 2", "section 3"},
```

## 3. Számold meg, hány sor tartalmaz `password` szöveget idézőjelek között

A csapatnak tudnia kell az idézőjelek között szereplő jelszóhivatkozásokról, hogy azokat manuálisan megvizsgálhassák.

Valósítsd meg a `CountQuotedPasswords` függvényt, amely jelzi, mekkora lehet a manuális vizsgálat várható mértéke.

Azonosítsd azokat a naplósorokat, amelyekben a "password" stringet idézőjelek veszik körül, és amelyben a kis- és nagybetűk bármilyen kombinációban szerepelhetnek.
Számolj azzal a lehetőséggel, hogy az idézőjelek között a "password" előtt és után további tartalom is lehet.
Minden sor legfeljebb két idézőjelet tartalmaz.

A rutinnak átadott sorok érvényesek is lehetnek, meg nem is, az 1. részfeladatban meghatározottak szerint.
Ugyanúgy dolgozzuk fel őket, akár érvényesek, akár nem.

```go
lines := []string{
    `[INF] passWord`, // contains 'password' but not surrounded by quotation marks
    `"passWord"`,  // count this one
    `[INF] User saw error message "Unexpected Error" on page load.`, // does not contain 'password'
    `[INF] The message "Please reset your password" was ignored by the user`, // count this one
}
// => 2
```

## 4. Távolítsd el a napló maradványait

Rájöttél, hogy a naplók valamelyik feldolgozási lépése szétszórta a naplókban az "end-of-line" szöveget, amelyet egy sorszám követ (közöttük szóköz nélkül).

Valósítsd meg a `RemoveEndOfLineText` függvényt, amely átvesz egy stringet, eltávolítja belőle az end-of-line szöveget, és egy „tiszta” stringet ad vissza.

Az end-of-line szöveget nem tartalmazó sorokat változatlanul kell visszaadni.

Csak az end-of-line stringet távolítsd el.
Ne próbáld módosítani a szóközöket.

```go
RemoveEndOfLineText("[INF] end-of-line23033 Network Failure end-of-line27")
// => "[INF]  Network Failure "
```

## 5. Címkézd meg a sorokat felhasználónevekkel

Észrevetted, hogy néhány naplósor olyan mondatot tartalmaz, amely felhasználókra utal.
Ezek a mondatok mindig tartalmazzák a `"User"` stringet, amelyet egy vagy több szóköz, majd egy felhasználónév követ.
Úgy döntesz, hogy megcímkézed ezeket a sorokat.

Valósítsd meg a `TagWithUserName` függvényt, amely feldolgozza a naplósorokat:

- Azok a sorok, amelyek nem tartalmazzák a `"User "` stringet, változatlanok maradnak.
- Azoknál a soroknál, amelyek tartalmazzák a `"User "` stringet, a sor elé írd a `[USR]` előtagot, majd a felhasználónevet.

Például:

```go
result := TagWithUserName([]string{
    "[WRN] User James123 has exceeded storage space.",
	"[WRN] Host down. User   Michelle4 lost connection.",
	"[INF] Users can login again after 23:00.",
	"[DBG] We need to check that user names are at least 6 chars long.",
})
// => []string {
//  "[USR] James123 [WRN] User James123 has exceeded storage space.",
//  "[USR] Michelle4 [WRN] Host down. User   Michelle4 lost connection.",
//  "[INF] Users can login again after 23:00.",
//  "[DBG] We need to check that user names are at least 6 chars long."
// }
```

Feltételezheted, hogy:

- A felhasználóneveket a naplóban legalább egy whitespace-karakter követi.
- Minden sorban legfeljebb egyszer fordul elő a `"User "` string.
- A felhasználónevek nem üres stringek, amelyek nem tartalmaznak whitespace-t.

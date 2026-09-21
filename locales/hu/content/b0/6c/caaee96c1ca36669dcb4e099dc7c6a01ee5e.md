# Bevezetés

Egyetlen utasítás úgy tűnhet, mintha egyetlen oszthatatlan művelet lenne, pedig korántsem az.
Vegyük például, amikor ötöt adunk egy memóriában lévő értékhez:

```x86asm
add qword [rel counter], 5
```

A háttérben a processzornak nincs módja közvetlenül a memóriához adni.
Ezt az egyetlen utasítást három kisebb lépésre bontja, amelyeket **mikroműveleteknek** nevezünk:

1. **kiolvassa** a memóriából az aktuális értéket;
2. **módosítsa** ezt az értéket egy regiszterben, ötöt hozzáadva;
3. **írja** vissza az eredményt.

```x86asm
mov rax, qword [rel counter] ; 1. load the current value
add rax, 5                   ; 2. add five
mov qword [rel counter], rax ; 3. store the result back
```

Ez egy gyakori minta, amelyet **olvasás-módosítás-írásnak (RMW)** nevezünk.

Figyeld meg, hogy az olvasás (vagy betöltés) és az írás (vagy tárolás) külön események, így időablak van közöttük.
Ezt általában nem vesszük észre, mert egyetlen magon minden utasítás garantáltan teljes egészében kifejti a hatását, mielőtt a következő elkezdődne.
Ez az időablak tehát láthatatlan, és az `add` egyetlen egységként viselkedik.

A modern processzorok azonban ritkán egymagosak, és az alkalmazások gyakran egyszerre több magon futnak, amelyek között nincs semmilyen sorrendiség.
Mivel több mag fut pontosan ugyanabban a pillanatban, egy másik mag is olvashatja vagy írhatja a `counter` értékét az időablakon belül, miután ez a mag betöltötte, de mielőtt tárolná.
Két szál ugyanazt a régi értéket tölti be, mindkettő hozzáad ötöt, és mindkettő tárolja az eredményét.
Két összeadás történt, az érték mégis csak öttel változott.
Az egyik frissítés csendben elveszett.

Ez egy **adatverseny**, és gyakori probléma a többszálú kódban.

Nem minden érték van így kitéve ennek.
Minden szálnak saját regiszterei és saját verme van, így a regiszterben tartott érték, illetve a szál vermében lévő helyi változó kizárólag ahhoz a szálhoz tartozik, és nem kerülhet adatversenybe.
Csak a szálak által megosztott memóriát, mint a fenti `counter`, kell védeni.

Az x86-64 egy sor utasítást kínál a probléma megoldására azáltal, hogy az utasítást oszthatatlanná teszi.
Ez nemcsak a feldolgozó mag számára viselkedik egyetlen egységként, hanem minden más mag számára is.
Az olyan műveletet, amely egyben marad, és amelyet egyetlen más mag sem tud kettéválasztani, **atomikusnak** nevezzük.

~~~~exercism/note
Gyakori, hogy a sok magon futó alkalmazásokat többszálúnak nevezzük.
A **szál** azonban nem ugyanaz, mint a mag.
Két szál futhat egyszerre ugyanazon a magon, egymásba fonódva, vagy párhuzamosan különböző magokon.

Az egymásba fonódó szálak már egy olvasás-módosítás-írás során is adatversenybe kerülhetnek, ha az több utasításra bomlik, mivel az operációs rendszer bármely két utasítás között válthat a szálak között.
Egy _egyetlen_ utasításon belüli időablakot viszont csak az igazi párhuzamos kód tár fel.
Mivel az operációs rendszer csak utasítások között vált szálat, soha nem egy utasításon belül, egyetlen utasítás önmagában biztonságos egyetlen magon.

Az igazi atomitást _több_ magon keresztül az alábbi utasítások biztosítják.
~~~~

## Atomikus csere

Az `xchg` utasítás két operandust cserél fel.
A céloperandus egyenlő lesz a forrásoperandus előző értékével, a forrásoperandus pedig egyenlő lesz a céloperandus előző értékével.
Fogalmilag úgy foghatjuk fel, mint két `mov` utasítást, amely egyszerre hajtódik végre.

A szokásos módon használható két regiszteroperandussal, vagy egy memóriaoperandussal és egy regiszteroperandussal:

```x86asm
mov  eax, 1
xchg dword [rdi], eax ; [rdi] = 1, eax = the old value of [rdi]
mov ecx, 2
mov edx, 3
xchg edx, ecx         ; edx = 2, ecx = 3
```

Ha memóriaoperandussal használjuk, az `xchg` _mindig_ atomikus.

~~~~exercism/caution
Az `xchg` automatikusan atomikus, ha az egyik operandus memóriabeli hely.
Ez azt is jelenti, hogy a művelet ilyenkor sokkal lassabb.

Ha nincs szükséged atomitásra, végezd a cserét egy szabad regiszteren keresztül egyszerű `mov` utasításokkal.
~~~~

## A lock előtag

A leggyakoribb módja annak, hogy egy utasítást atomikussá tegyünk x86-64-en, a `lock` előtag hozzáadása.
Ez egyetlen oszthatatlan lépéssé olvasztja össze az olvasást, a módosítást és az írást.
Ez azt jelenti, hogy a mag a teljes folyamat során kizárólagosan birtokolja a memóriát, így közben egyetlen más mag sem tudja olvasni vagy írni azt a helyet.

```x86asm
lock add qword [rel counter], 5 ; the read, the modify, and the write are one step
```

A `lock` csak akkor működik, ha a cél memória, és csak olyan utasításokon, amelyek olvassák, módosítják és írják azt a memóriát:

1. aritmetikai műveletek, például `add`, `sub`, `inc`, `dec`, `neg`;
2. bitenkénti műveletek, például `and`, `or`, `xor`, `not`;
3. a bitműveletek: `bts`, `btr`, `btc`;
4. néhány más célzott utasítás, például az `xadd` és a `cmpxchg`, amelyeket alább ismertetünk.

~~~~exercism/caution
Az, hogy egy helyet kizárólagosan birtokolunk, és minden más magot kizárunk, nem ingyen van.
Egy `lock` előtaggal ellátott művelet érezhetően lassabb a sima formájánál, és még lassabb, ha több mag verseng ugyanazért a helyért.

Ezt az előtagot azokra a memóriákra érdemes fenntartani, amelyeket várhatóan egynél több szál módosít.
Kerüld a használatát, ha a memória nincs megosztva, vagy ha csak olvassák.
~~~~

## Csere és összeadás

Egy sima `lock add` frissíti a memóriát, de eldobja a régi értéket.
Gyakran épp a régi értékre van szükség, például hogy minden szál külön sorszámot kapjon.

Az `xadd` utasítás (`x` az exchange, azaz a csere rövidítése) visszaadja az előző értéket, miközben összead.
Az összeget a célba írja, az eredeti célértéket pedig a forrásregiszterben hagyja.

```x86asm
mov  rax, 1
lock xadd qword [rdi], rax ; [rdi] = [rdi] + rax = [rdi] + 1
                           ; rax = the old value of [rdi]
```

A `lock` előtaggal ez egy atomikus **lekérés és összeadás**.
Ha sok szál futtatja ugyanazt a számlálót, minden hívás más régi értéket ad vissza.

A `lock add`-hoz hasonlóan a számláló pontosan a hívások számánál áll meg.
A `lock add`-tól eltérően azonban itt minden köztes érték is visszaadódik, mindegyik a maga hívójának.

## Összehasonlítás és csere

Az `xadd` összead, az `xchg` felülír, de egyik sem képes arra, hogy az új értéket a jelenlegitől függővé tegye, és csak akkor alkalmazza, ha a háttérben semmi sem változott.
Ezt a feltételes frissítést nyújtja a `cmpxchg`, azaz az összehasonlítás és csere, és ez a legáltalánosabb az itt tárgyalt primitívek közül.

A `cmpxchg dest, src` implicit akkumulátorként használja a `rax`-et, és összehasonlítja a `dest`-tel:

- Ha `dest == rax`, akkor `dest = src` és `ZF = 1`.
- Ha `dest != rax`, akkor `rax = dest` és `ZF = 0`.

Figyeld meg, hogy a `dest` csak akkor frissül, ha egyenlő a várt értékkel, amelyet korábban a `rax`-be töltöttünk.
Ez az egyenlőség biztosítja, hogy a `dest` még mindig azt az értéket tartalmazza, amelyből az új értéket kiszámítottuk, így az elavult olvasáson alapuló frissítés soha nem kerül alkalmazásra.
Ez teszi a `cmpxchg`-t az atomikus frissítés építőelemévé, amelyet **összehasonlítás és csere (CAS)** néven is ismerünk:

```x86asm
    mov rax, qword [rdi]          ; rax = the value we expect to find
.retry:
    lea rcx, [rax + 10]           ; rcx = the new value we want to install
    lock cmpxchg qword [rdi], rcx ; if [rdi] still equals rax, store rcx and set ZF
                                  ; otherwise reload rax with the current value, clear ZF
    jnz  .retry                   ; ZF is cleared, so another thread won the race. Recompute and retry
```

Ez az **újrapróbálkozó ciklus** a zárolásmentes frissítések szíve.
Az olvasás és az összehasonlítás és csere közötti ablak pontosan az, amikor egy másik szál közbeavatkozhat, és a `cmpxchg` ezt úgy fogja el, hogy megtagadja az elavult olvasásból számított érték tárolását.

## Memória-sorrend

Az eddigi műveletek mind egyetlen helyet érintettek.
Amikor a szálak egynél több helyen keresztül hangolják össze a működésüket, új kérdés merül fel: milyen sorrendben válnak láthatóvá az egyik szál írásai a másik számára.
A kérdésre választ adó szabályok a processzor **memória-sorrendjét** alkotják.

Az elágazásmentes kód fogalma mutatta be azt az elképzelést, hogy egy modern mag nem egyesével, lassan halad végig az utasításokon.
Egyszerre sok utasítást tart folyamatban, és előre szalad ott, ahol tud.
Ez azt jelenti, hogy egy írás később válhat láthatóvá a többi mag számára, mint amit a program sugall, miközben az utána következő utasítások már előrehaladtak.

Az x86-64 **erős memória-sorrendet** tart fenn a hétköznapi betöltések és tárolások között, így minden magon:

1. egy betöltés soha nem rendeződik át egy későbbi betöltés után;
2. egy tárolás soha nem rendeződik át egy későbbi tárolás után;
3. egy betöltés soha nem rendeződik át egy későbbi tárolás után.

Az egyetlen lehetséges átrendeződés az, amikor egy tárolás úgy tűnik, mintha egy _másik_ cím későbbi betöltése után fejeződne be.

A `lock` előtaggal ellátott utasítás, illetve a memóriaoperandusos `xchg` teljes barrier: semmi sem tűnik úgy, hogy bármelyik irányban átkerülne rajta.
Ezért elegendőek ahhoz, hogy a legtöbb helyzetben biztosítsák a teljes sorrendet.

## Pörgés és `pause`

Azokat az utasításokat, amelyek beállítanak egy jelzőbitet, miközben vissza is adják annak előző állapotát, **tesztelés és beállítás** néven ismerjük.
Ezek szolgálhatnak egy **spinlock** alapjaként, amely biztosítja, hogy egy mag kizárólagosan hozzáférjen a kód egy részéhez.

Ez a teljes algoritmus, amely az `xchg` utasítást használja egy bináris jelzőbittel:

1. A jelzőbit kezdetben `0`.
2. A zár megszerzéséhez egy mag kicseréli a jelzőbit értékét `1`-re.
3. Ha a visszaadott érték `1`, az azt jelenti, hogy a zárat egy másik mag _birtokolja_.
   Az aktuális mag ekkor vár, és újra megpróbálja megszerezni a zárat.
4. Ha a visszaadott érték `0`, az azt jelenti, hogy a zár szabad volt.
   Az `xchg` most `1`-re állította, és a többi mag addig vár, amíg ez a mag el nem engedi.
5. Amint az aktuális mag végzett a munkával, a jelzőbit `0`-ra írása elengedi a zárat.

```x86asm
acquire:
    mov  eax, 1
    xchg dword [rdi], eax ; try to take the lock; eax = its old value
    test eax, eax
    jnz  .held            ; old value was 1: someone else holds it
    ret                   ; old value was 0: the lock is ours
.held:
    pause                 ; wait before trying again
    jmp  acquire
```

A várakozó ciklusban lévő `pause` utasítás nem változtatja meg azt, amit a kód kiszámít.
Csak jelzi a processzornak, hogy ez egy pörgő várakozás.
A processzor ekkor csökkentheti a várakozó szál energiafelhasználását, és átadhatja a vezetést egy ugyanazon a magon osztozó testvérszálnak.
Egy `pause` nélküli pörgő ciklus is helyes, csak pazarló.

Amint a szál befejezi a munkáját, egy `mov`-mal végrehajtott egyszerű `0`-ás tárolással elengedheti a zárat.
Nem kell több egy `mov`-nál, mert x86-64-en a betöltések és tárolások soha nem rendeződnek át egy későbbi tárolás után.
Azt a tárolást, amely soha nem előzi meg az előtte lévő hozzáféréseket, úgy mondjuk, hogy **release-sorrenddel** rendelkezik, és x86-on minden egyszerű tárolás hordozza ezt.

~~~~exercism/note
Bármely utasítás, amely atomikusan tesztel és állít be egy memóriahelyet, használható spinlockhoz.
Például a `lock bts` használható az `xchg` helyett, hogy beállítson egy adott bitet, miközben ellenőrzi, hogy már be volt-e állítva.

Figyeld meg, hogy a jelzőbitek, például a `bts` által módosított `CF`, az `rflags` részét képezik, amely egy regiszter.
Ez azt jelenti, hogy kizárólag az adott szálhoz tartoznak.
~~~~

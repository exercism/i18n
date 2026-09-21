# Utasítások

Fedélzeti matróz vagy, és épp a rakparton pakolod át a rakományládákat. Minden részfeladat egyetlen szó, amelynek törzsében kizárólag pakoló szavak szerepelnek, számítások nélkül.

## 1. Cseréld meg a felső két ládát

Definiáld a `swap-crates` szót. Két ládát vesz le a veremről, és fordított sorrendben hagyja ott őket.

```factor
1 2 swap-crates .s
! 2
! 1
```

## 2. Távolítsd el a kizuhant ládát

Definiáld a `clear-spill` szót. Három ládát vesz le a veremről, az alsó kettőt meghagyja, a legfelsőt pedig eldobja.

```factor
1 2 3 clear-spill .s
! 1
! 2
```

## 3. Tarts meg egy másolatot az alatta lévő ládáról

Definiáld a `peek-under` szót. Két ládát vesz le a veremről, és úgy hagyja ott őket, hogy az alsó ládáról készült másolat kerül a tetejükre.

```factor
1 2 peek-under .s
! 1
! 2
! 1
```

## 4. Rendezd el a fedélzetet

Definiáld a `tidy-deck` szót. Három ládát vesz le a veremről, `x y z` sorrendben, és `z z y`-t hagy maga után: az alsó ládát eldobja, majd a legfelső láda két másolatát a középső alá teszi.

```factor
1 2 3 tidy-deck .s
! 3
! 3
! 2
```

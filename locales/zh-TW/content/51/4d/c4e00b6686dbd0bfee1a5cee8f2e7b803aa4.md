# 簡介

Factor 裡的雜湊表是*關聯式陣列*，也就是由`key/value`配對組成、查詢時間為 O(1) 的集合。它們屬於更廣泛的[`assocs`][assocs]家族。

## 雜湊表字面值

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }`是空的雜湊表。雜湊表是*可變的*，會隨著你新增和移除鍵而增長或縮小；如果你需要保留原本的雜湊表，請先`clone`。列印雜湊表會顯示其中的項目，但順序與插入順序無關，雜湊表本身是無序的。

## 讀取

`at`（位於[`assocs`][assocs]）會讀取一個值，若鍵不存在則回傳`f`：

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## 寫入

`set-at`會新增或覆寫；`delete-at`會移除；`change-at`會對目前的值執行 quotation。這三者都會*變更*內容：

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at`：累加計數的捷徑

`inc-at`（同樣位於[`assocs`][assocs]）會把某個鍵的現有值加 1，若該鍵不存在，則以 1 插入。非常適合用來計數：

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## 疊代與延遲插入

`assoc-each`會走訪每一組`( key value -- )`配對；`cache`會回傳某個鍵的值，若該鍵不存在，就用提供的 quotation 計算一次。

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache`用一個詞就完成了「查詢或建立」這個模式。當你從一連串鍵建立雜湊表，又不想在每個呼叫端處理項目不存在的情況時，它非常方便。

## 對一串鍵套用雜湊表更新

當輸入是一連串的鍵，而你想為每個鍵更新雜湊表一次時，就用`each`疊代*序列*，並使用 fried quotation `'[ _ … ]`（來自[`fry`][fry]）把雜湊表固定進迴圈主體中。例如，移除一串鍵：

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]`會捕捉堆疊上位於它上方的雜湊表，因此在每次疊代時，`each`只需要提供鍵即可。`keep`會在執行 quotation 的同時保留雜湊表，供最後的`.`使用。

## 從序列建立雜湊表

`map>assoc`（位於[`assocs`][assocs]）會把 quotation 套用到序列上，並將`( elt -- key value )`的結果收集成一個與範本型別相同的 assoc：

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## 鍵、值與配對

`keys`和`values`（位於[`assocs`][assocs]）只回傳鍵或只回傳值；`>alist`則會回傳`{ key value }`配對。

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

`keys`和`values`是一一對應的：某個位置的值，屬於相同位置的鍵。

`sort-keys`（位於[`sorting`][sorting]）會回傳依鍵排序的`{ key value }`配對：

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## 從配對回到雜湊表

`>hashtable`（位於[`hashtables`][hashtables]）是`>alist`的反操作：它會把任何 assoc（最常見的是由`{ key value }`配對組成的 alist）轉換成具有 O(1) 查詢的雜湊表。

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

當你組好或轉換了一串配對，想把它折回成雜湊表，以便依鍵查詢項目時，這很方便。

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html

# 關於

Common Lisp 和其他語言一樣，有一套規則來決定兩個物件是否「相同」。
這些規則定義了 4 個層級，每個層級都有一個負責該層級檢查的函式。
這些層級從最嚴格排到最寬鬆。

## `eq`

第一層是物件的同一性。
這種相等性由函式[`eq`][hyper-eq]檢查。
被比較的兩個物件必須是同一個物件：

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

第二層加入了數字與字元的相等性。
這種相等性由函式[`eql`][hyper-eql]檢查。
檢查的方式取決於引數的型別：

- 任何兩個`eq`的物件也必定`eql`
- 若兩個數字的型別與值都相同，它們就是`eql`
- 若兩個字元代表同一個字元，它們就是`eql`。

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

你可能會納悶，為什麼數字和字元不直接用[`eq`][hyper-eq]比較物件的同一性。
Common Lisp 標準允許實作在需要時複製數字和字元。
因此`0`和`0`可能不是[`eq`][hyper-eq]，因為它們可能是數字`0`的不同實例。

## `equal`

第三層檢查結構上的相似性。
這種相等性由[`equal`][hyper-equal]檢查。
檢查的方式取決於引數的型別：

- 符號會以[`eq`][hyper-eq]的方式比較
- 字元與數字會以`eql`的方式比較
- 若兩個 cons 的元素都是[`equal`][hyper-equal]，它們就是[`equal`][hyper-equal]，而且會遞迴地進行。
- 若兩個字串或位元向量的元素都是`eql`，它們就是[`equal`][hyper-equal]
- 其他型別的陣列會以[`eq`][hyper-eq]的方式比較
- 若兩個路徑名稱在功能上等效，它們就是[`equal`][hyper-equal]。
（對於組成路徑名稱各元件的字串，其大小寫敏感性在這裡有實作相依行為的空間。）
- 任何其他型別的物件會以[`eq`][hyper-eq]的方式比較

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

第四層，也是最寬鬆的一層，由[`equalp`][hyper-equalp]檢查。
檢查的方式取決於型別：

- 若兩個物件是[`equalp`][hyper-equalp]，則它們就是[`equalp`][hyper-equalp]
- 若兩個數字的值相同，即使型別不同，它們就是[`equalp`][hyper-equalp]
- 字元與字串的比較不分大小寫
- 若兩個 cons 的元素都是[`equalp`][hyper-equalp]，它們就是[`equalp`][hyper-equalp]，而且會遞迴地進行。
- 若兩個陣列的維度數量相同、各維度也相同，且每個元素都是[`equalp`][hyper-equalp]，它們就是[`equalp`][hyper-equalp]。
- 若兩個結構的類別與槽位都相同，而且每個槽位在兩個結構之間都是[`equalp`][hyper-equalp]，它們就是[`equalp`][hyper-equalp]。
- 若兩個雜湊表有相同的`:test`函式、有相同的鍵（以該`:test`函式比較），且這些鍵的值以[`equalp`][hyper-equalp]比較後也相同，它們就是[`equalp`][hyper-equalp]。

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## 型別專屬的函式

以上是「通用」的相等函式。
依照定義，它們適用於任何型別。
當你撰寫的通用程式碼要等到執行期間才會知道要比較的物件型別時，這會很方便。
不過，當你已經知道要比較的型別時，一般認為使用型別專屬的相等函式是「更好的風格」。
例如用`string=`而不是`equal`。
這些函式會在相關的概念中介紹與討論。

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm

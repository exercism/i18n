# 説明

地域の組合から、庭の区画の登録を管理するよう頼まれています。状態は2つの動的変数に保持されます。

- `registrations` — 現在ある人に割り当てられている`plot`タプルのベクターです。
- `next-id` — 次の登録に使う整数です。

`plot`タプルには2つのスロットがあります。

| スロット        | 型       |
| --------------- | -------- |
| `id`            | 整数     |
| `registered-to` | 文字列   |

## 1. 庭を開いて登録者を一覧表示する

`open-garden`を定義して、動的変数を初期化します。`registrations`には空のベクター、`next-id`には`1`を設定します。次に`list-registrations`を定義して、現在の区画のベクターを返します。

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. 区画を登録する

`register`を定義します。スタックから名前を取り出し、次に使えるidで新しい`plot`を作り、`registrations`ベクターに追加し、`next-id`を1つ増やして、新しい`plot`を返します。

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

区画のidは一意でなければならず、解放後も増え続けます。`next-id`が同じ値を使い回すことはありません。

## 3. 区画を解放する

`release`を定義します。idを受け取り、一致する項目を`registrations`から削除します。存在しないidを解放しても何も起こりません。

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. 登録済みの区画を取得する

`get-registration`を定義します。idを受け取り、一致する`plot`を返します。そのidの区画がなければ、シンボル`not-found`を返します。

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. 名前で区画を探す

`find-by-name`を定義します。名前を受け取り、その人に現在登録されているすべての区画のベクターを返します。

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```

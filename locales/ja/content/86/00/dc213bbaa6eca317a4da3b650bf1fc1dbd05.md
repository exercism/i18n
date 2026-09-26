# ヒント

## 全般

イベントの基本情報を載せたリーフレットを作るには、f文字列か`format()`メソッドだけを使います。

- [Pythonでの文字列フォーマット入門][str-f-strings-docs]
- [realpython.comの記事][realpython-article]

## 1. ヘッダーを大文字にする

- 文字列の`capitalize`メソッドを使って、タイトルの先頭を大文字にします。

## 2. 日付をフォーマットする

- `date`は、`f''`または`''.format()`を使って手動でフォーマットします。
- `date`は、'Month day, year'という形式で書きます。

## 3. Unicode文字をアイコンとして表示する

- `format`で表示する方法のひとつは、Unicode接頭辞`u'{}'`を使うことです。

## 4. 完成したリーフレットを表示する

- アスタリスクと文字をそろえるには、適切な[`format_spec`フィールド][formatspec-docs]を探します。
- セクション1は、先頭を大文字にした`header`です。
- セクション2は`date`です。
- セクション3はアーティストの配列で、各アーティストは同じインデックスのUnicode文字に対応しています。
- 各行は20文字にします。
- 各セクションの間に必要な空行を入れる、簡潔なコードを書きます。
- 日付が指定されていない場合は、空行に置き換えます。

```python
******************** # 20 asterisks
*                  *
*     'Header'     * # capitalized header
*                  *
* Month day, year  * # Optional date
*                  *
* Artist1       ⑴ * # Artist list from 1 to 4
* Artist2       ⑵ *
* Artist3       ⑶ *
* Artist4       ⑷ *
*                  *
********************
```

[str-f-strings-docs]: https://docs.python.org/3/reference/lexical_analysis.html#f-strings
[realpython-article]: https://realpython.com/python-formatted-output/
[formatspec-docs]: https://docs.python.org/3/library/string.html#formatspec

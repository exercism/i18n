# 説明

チェイタナは、とても人気のあるテーマパークを経営しています。
美しく手入れされた敷地のちょうど中央に、アトラクションが1つだけあります。「世界一大きなジェットコースター（TM）」です。
アトラクションはこれ1つだけですが、世界中から人々が訪れ、チェイタナのハイパーコースターに乗るために何時間も列に並びます。

この乗り物には2つの列があり、それぞれが`list`で表されます。

1. 通常の列
2. エクスプレス列（_ファストトラックとも呼ばれます_）。追加料金を払うと優先的に乗れる列です。


公園のゲストをよりよく管理するためのコードを書くよう頼まれました。
ゲスト（そして上司のチェイタナ！）が不機嫌になる前に、できるだけ早く次の関数を実装する必要があります。
よく読んでください。
タスクによっては既存の列を変更・更新するものが、また別のタスクではそのコピーを作るものが求められます。


## 1. 列に追加する

`add_me_to_the_queue()`関数を定義します。この関数は4つの引数`<express_queue>, <normal_queue>, <ticket_type>, <person_name>`を受け取り、その人の名前を追加した適切な列を返します。


1. `<ticket_type>`は`int`で、1がexpress_queue、0がnormal_queueを表します。
2. `<person_name>`は、それぞれの列に追加する人の名前（`str`）です。


```python
>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=1, person_name="RichieRich")
...
["Tony", "Bruce", "RichieRich"]

>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=0, person_name="HawkEye")
....
["RobotGuy", "WW", "HawkEye"]
```

## 2. 友達はどこにいるのでしょうか？

ある人は公園に遅れて到着しましたが、友達が待っている列に加わりたいと思っています。
しかし、友達がどこに並んでいるのか見当もつかず、電話をかけたくても電波がありません。

`find_my_friend()`関数を定義します。この関数は2つの引数`queue`と`friend_name`を受け取り、その人の名前が列の何番目にあるかを返します。


1. `<queue>`は、列に並んでいる人々の`list`です。
2. `<friend_name>`は、インデックス（列の何番目か）を探す友達の名前です。

覚えておきましょう。インデックスは左から0、右から-1で始まります。


```python
>>> find_my_friend(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], friend_name="Steve")
...
1
```


## 3. 友達のところに加えてもらえますか？

友達が見つかったので（前述のタスク2）、遅れて来た人は友達と同じ列の位置に加わりたいと思っています。
`add_me_with_my_friends()`関数を定義します。この関数は3つの引数`queue`、`index`、`person_name`を受け取ります。


1. `<queue>`は、列に並んでいる人々の`list`です。
2. `<index>`は、新しい人を追加する位置です。
3. `<person_name>`は、そのインデックスの位置に追加する人の名前です。

遅れて来た人の名前を追加した列を返します。


```python
>>> add_me_with_my_friends(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], index=1, person_name="Bucky")
...
["Natasha", "Bucky", "Steve", "T'challa", "Wanda", "Rocket"]
```

## 4. 列にいる意地悪な人

列から、押しのけたり大声を出したりして迷惑をかけている、とても意地悪な人がいると聞きました。
その厄介者を、迷惑行為のために追い出さなければなりません！


`remove_the_mean_person()`関数を定義します。この関数は2つの引数`queue`と`person_name`を受け取ります。


1. `<queue>`は、列に並んでいる人々の`list`です。
2. `<person_name>`は、追い出す必要がある人の名前です。

意地悪な人の名前を取り除いた列を返します。

```python
>>> remove_the_mean_person(queue=["Natasha", "Steve", "Eltran", "Wanda", "Rocket"], person_name="Eltran")
...
["Natasha", "Steve", "Wanda", "Rocket"]
```


## 5. 同名の人たち

他人同士がまったく同じ見た目をしているのを見たことはないかもしれませんが、他人同士がまったく同じ名前（_同名の人_）であるのは_絶対に_見たことがあるはずです！
今日は、そんな人がたくさん来ているようです。
ある特定の名前が列の中に何回出てくるのか知りたくなります。

`how_many_namefellows()`関数を定義します。この関数は2つの引数`queue`と`person_name`を受け取ります。

1. `<queue>`は、列に並んでいる人々の`list`です。
2. `<person_name>`は、列の中に複数回出てくるかもしれないと思う名前です。


`person_name`が出てくる回数を`int`として返します。


```python
>>> how_many_namefellows(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"], person_name="Natasha")
...
2
```

## 6. 最後の人を削除する

残念ながら、今日は公園が混み合っていて、通常の列の最後の人を削除する必要があります（_その人には、別の日にファストトラックで戻ってこられる引換券を渡します_）。
関数`remove_the_last_person()`を定義する必要があります。この関数は1つの引数`queue`を受け取ります。`queue`は列に並んでいる人々のリストです。

`list`を更新し、削除した人の名前も`return`する必要があります。そうすれば、その人に引換券を書けます。


```python
>>> remove_the_last_person(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
'Rocket'
```

## 7. 列のリストを並べ替える

管理上の目的で、ある列のすべての名前をアルファベット順に取得する必要があります。


`sorted_names()`関数を定義します。この関数は1つの引数`queue`（列に並んでいる人々の`list`）を受け取り、`sorted`された`list`のコピーを返します。


```python
>>> sorted_names(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
['Eltran', 'Natasha', 'Natasha', 'Rocket', 'Steve']
```

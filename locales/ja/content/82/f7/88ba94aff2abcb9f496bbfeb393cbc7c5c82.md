# アップグレード

ときどき、何かを更新していただく必要があります。

## Pharoイメージ

Pharo Exercismイメージ内のライブラリを更新する必要がある場合は、まず進行中の演習をすべて提出し、イメージを保存してから、Pharo.imageファイルとPharo.changesファイルをバックアップしておくのがよいでしょう。安全なバックアップができたら、次のコードをすべてPlaygroundで評価してください（コードを選択してmeta-gを押します）。

 ```smalltalk

 './pharo-local/iceberg/exercism' asFileReference deleteAll.
 './pharo-local/package-cache' asFileReference deleteAll.

 IceRepository reset.

 Metacello new
  baseline: 'Exercism';
  repository: 'github://exercism/pharo-smalltalk:main/releases/latest';
  onConflict: [ :ex | ex allow ];
  load.

 #ExercismManager asClass upgrade.
 ```

"ExercismTools"パッケージの変更が失われるという確認が表示されることがあります。そのときは"Load"を選択して、互換性のあるバージョンのツールが確実に使われるようにしてください。

特定のバージョンのExercismにアップグレード（またはダウングレード）したい場合は、上記のスクリプトを変更して、次のようにリポジトリのパスでバージョン番号を指定することもできます。

```smalltalk
 ...
  repository: 'github://exercism/pharo-smalltalk:<version-tag>';
 ...
 ```

`<versison-tag>`の部分には、`v0.2.3`や`master`などを指定します。

特定のバージョンを読み込んだあとは、続けて取り組みたい既存の演習を、通常の`Exercism | Fetch...`メニュー項目を使って「再取得」する必要があるかもしれません。

まれなケースですが（問題が解決しない場合）、新しいPharo.imageファイルを入手する必要があるかもしれません（一番簡単な方法は、このページの冒頭にある通常のインストール手順に従って、新しいディレクトリにPharoを再インストールすることです）。

## Pharoの演習

すでに解いたあとで、演習が新しいテストの追加や新しい知見の反映のために更新されていることに気づくこともあります。

その場合は、手持ちの演習を最新バージョンにアップグレードするかどうかを選べます。アップグレードすると、テストに通るように解答を調整する必要が出てきますが、そのあとで新しいコードを提出して、さらにレビューを受けることができます。

これは、`Exercism | View Track Progress`メニューから行えます。このメニューを選ぶと、現在のトラックの進捗がWebブラウザーで開きます。`Test suite`タブのページ下部には、より新しい演習のバージョンが検出されている場合に、`Update exercise to latest version`ボタンが表示されます。

このボタンをクリックし、さらに`Copy`ボタン（Download your solutionボックス内）をクリックすると、その値を`Exercism | Fetch new exercise`メニューの入力欄に貼り付けられます。

_注：バージョン0.2.8以降、Pharo Exercismの演習パッケージの形式が変更され、演習はExercise@<Name>という名前のトップレベルパッケージに含まれるようになりました（以前はExercism-<Name>というタグパッケージでした）。イメージをアップグレードしたあと、この旧形式の名前で表示される古い演習がある場合でも、そのまま提出できます。ただし、その演習のテストも更新する場合は、解答のクラスを、新しいテストが保存されている新しいExercise@<Name>パッケージに移動する必要があります。_

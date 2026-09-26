# 説明

この演習では、ウィンドウシステムベースのコンピューターシステムをシミュレートします。
移動したりサイズを変更したりできるウィンドウを作成します。
次の図は、このあと扱う値を表したものです。

```text
                  <--------------------- screenSize.width --------------------->

       ^          ┌────────────────────────────────────────────────────────────┐
       |          │                                                            │
       |          │         position.x, _                                      │
       |          │         position.y   \                                     │
       |          │                       \<----- size.width ----->            │
       |          │                 ^      *──────────────────────┐            │
       |          │                 |      │        title         │            │
       |          │                 |      ├──────────────────────┤            │
screenSize.height │                 |      │                      │            │
       |          │            size.height │                      │            │
       |          │                 |      │       contents       │            │
       |          │                 |      │                      │            │
       |          │                 |      │                      │            │
       |          │                 v      └──────────────────────┘            │
       |          │                                                            │
       |          │                                                            │
       v          └────────────────────────────────────────────────────────────┘
```

📣 JavaScriptの幅広いスキルを練習するために、**タスク1と2はプロトタイプ構文で、残りのタスクはクラス構文で解いてみましょう**。

## 1. ウィンドウの寸法を保存するSizeを定義する

`Size`という名前のクラス（コンストラクター関数）を定義します。
ウィンドウの現在の寸法を保存する`width`と`height`という2つのフィールドを持たせます。
コンストラクター関数は、これらのフィールドの初期値を受け取ります。
幅は1つ目の入力として、高さは2つ目の入力として渡されます。
幅と高さのデフォルト値は、それぞれ`80`と`60`です。

さらに、新しい幅と高さを入力として受け取り、新しいサイズを反映するようにフィールドを変更する`resize(newWidth, newHeight)`メソッドを定義します。

```javascript
const size = new Size(1080, 764);
size.width;
// => 1080
size.height;
// => 764

size.resize(1920, 1080);
size.width;
// => 1920
size.height;
// => 1080
```

## 2. ウィンドウの位置を保存するPositionを定義する

`Position`という名前のクラス（コンストラクター関数）を、ウィンドウの左上隅の現在の水平位置と垂直位置をそれぞれ保存する`x`と`y`という2つのフィールドとともに定義します。
コンストラクター関数は、これらのフィールドの初期値を受け取ります。
`x`の値は1つ目の入力として、`y`の値は2つ目の入力として渡されます。
どちらのフィールドもデフォルト値は`0`です。

位置(0, 0)は画面の左上隅で、右に移動するほど`x`の値が大きくなり、下に移動するほど`y`の値が大きくなります。

また、新しいxとyを入力として受け取り、新しい位置を反映するようにプロパティを変更する`move(newX, newY)`メソッドを定義します。

```javascript
const point = new Position();
point.x;
// => 0
point.y;
// => 0

point.move(100, 200);
point.x;
// => 100
point.y;
// => 200
```

## 3. ProgramWindowクラスを定義する

次のフィールドを持つ`ProgramWindow`クラスを定義します。

- `screenSize`：`width`が800、`height`が600の`Size`型の固定値を保持します
- `size`：`Size`型の値を保持します。初期値は`Size`インスタンスのデフォルト値です
- `position`：`Position`型の値を保持します。初期値は`Position`インスタンスのデフォルト値です

ウィンドウを開いたとき（作成したとき）は、最初は必ずデフォルトのサイズと位置になります。

```javascript
const programWindow = new ProgramWindow();
programWindow.screenSize.width;
// => 800

// Similar for the other fields.
```

補足：`ProgramWindow`という名前を使っているのは、ブラウザー環境にある組み込みの`Window`クラスとこのクラスを区別するためです。

## 4. ウィンドウをリサイズするメソッドを追加する

`ProgramWindow`クラスには、`resize`メソッドを含めます。
`Size`型の入力を1つ受け取り、ウィンドウを指定されたサイズにリサイズしようとします。

ただし、新しいサイズはある範囲を超えることはできません。

- 高さと幅の最小値は1です。
  1未満の高さや幅が要求された場合は、1に切り詰められます。
- 高さと幅の最大値は、ウィンドウの現在の位置によって決まります。
  ウィンドウの端を画面の端より外に出すことはできません。
  この範囲を超える値は、取りうる最大のサイズに切り詰められます。
  たとえば、ウィンドウの位置が`x` = 400、`y` = 300で、`height` = 400、`width` = 300へのリサイズが要求された場合、`y`方向に画面が足りず要求をすべて満たせないため、ウィンドウは`height` = 300、`width` = 300にリサイズされます。

```javascript
const programWindow = new ProgramWindow();

const newSize = new Size(600, 400);
programWindow.resize(newSize);
programWindow.size.width;
// => 600
programWindow.size.height;
// => 400
```

## 5. ウィンドウを移動するメソッドを追加する

リサイズ機能に加えて、`ProgramWindow`クラスには`move`メソッドも含めます。
`Position`型の入力を1つ受け取ります。
`move`メソッドは`resize`と似ていますが、サイズではなく、ウィンドウの_位置_を要求された値に調整します。

`resize`と同様に、新しい位置も一定の範囲を超えることはできません。

- `x`と`y`のどちらも、位置の最小値は0です。
- それぞれの方向の位置の最大値は、ウィンドウの現在のサイズによって決まります。
  ウィンドウの端を画面の端より外に出すことはできません。
  この範囲を超える値は、取りうる最大の値に切り詰められます。
  たとえば、ウィンドウの位置が`x` = 250、`y` = 100で、`x` = 600、`y` = 200への移動が要求された場合、`x`方向に画面が足りず要求をすべて満たせないため、ウィンドウは`x` = 550、`y` = 200に移動されます。

```javascript
const programWindow = new ProgramWindow();

const newPosition = new Position(50, 100);
programWindow.move(newPosition);
programWindow.position.x;
// => 50
programWindow.position.y;
// => 100
```

## 6. プログラムウィンドウを変更する

`ProgramWindow`インスタンスを入力として受け取り、ウィンドウを指定されたサイズと位置に変更する`changeWindow`関数を実装します。
この関数は、変更を適用したあとに、渡された`ProgramWindow`インスタンスを返します。

ウィンドウは、幅400、高さ300、位置がx = 100、y = 150になるようにします。

```javascript
const programWindow = new ProgramWindow();
changeWindow(programWindow);
programWindow.size.width;
// => 400

// Similar for the other fields.
```

# はじめに

## 用語

これまでにいくつかのコンセプトで、C++の関数を使ってきて、書いてもきました。
ここで、もう少し踏み込んだ話をしましょう。
以下のコードを見ると、よく使われる用語がひと目でわかります。
C++は空白を無視するので、各要素を1行ずつに分けて整形しています。

```cpp
// Function declaration:
bool                                              // Return type
admin_detected(string user, string password)      // Type signature
;                                                 // Don't forget the ';' for the declaration

// Function definition:
bool                                              // Return type
admin_detected                                    // Function name
(string user, string password)                    // Parameter list
{ return user == "admin" && password == "1234"; } // Function body
```
~~~~exercism/advanced
宣言は、その名前・戻り値の型・仮引数リストを持つ関数があることをコンパイラーに伝えるメモのようなものです。
定義がないと、コードは動作しません。
宣言は必須ではありませんが、関数をその定義より前に使う場合には必要になります。
宣言は、循環参照のような問題を解決したり、インターフェースと実装を分離したりするのに役立ちます。
~~~~

## `const`修飾子

値を初期化したあとに変更できないようにしたいことがあります。
C++では`const`キーワードを定数の修飾子として使います。

```cpp
const int number_of_dragon_balls{7};
number_of_dragon_balls--; // compilation error
```

~~~~exercism/note
定数は_UPPER_SNAKE_CASE_で書かれることがよくあります。
特に別の慣習がなければ、この書き方はマクロ用に取っておくのがおすすめです。
~~~~

一度設定した定数を変更しようとすると、コードはコンパイルできません。
これは意図しない変更を防ぐだけでなく、コンパイラーによる最適化の可能性も広げます。
人間にとっても、ある部分が影響を受けないとわかっていれば、コードを考えやすくなります。

`const`は関数の仮引数の修飾子としても使えます。

```cpp
string guess_number(const int& secret, const int& guess) {
    if (secret < guess) return "lower.";
    if (secret > guess) return "higher.";
    return "exact!";
}
```

関数に`const`参照を渡すと、その値が変更されないことを保証できます。
長い文字列など、コピーにコストがかかるオブジェクトでは、`const`参照をよく見かけます。
`const`修飾子の3つ目の用途は、クラスのインスタンスを変更しないメンバー関数です。

```cpp
class Stubborn {
    public:
    Stubborn(string reply) {
        response = reply;
    }
    string answer(const string& question) const {
        if (question.length() == 0) { return ""; }
        return response;
    }
    private:
    string response{};
};
```

`Stubborn`のメンバー関数`answer`は、`const string&`参照を仮引数として受け取ります。
これにより、関数に渡された元のオブジェクトのコピーを避けられます。

## 関数のオーバーロード

仮引数リストが異なれば、複数の関数に同じ名前を付けられます。
これを関数のオーバーロードと呼び、これらの関数がよく似た処理を行う場合によく使われます。

戻り値の型を除いた関数ヘッダーが、その関数の__型シグネチャ__です。
型シグネチャが変われば、別の関数になります。

`play_sound`の例には、さまざまな場面に対応するために6つの異なるオーバーロードがあります。

```cpp
// different argument types:
void play_sound(char note);         // C, D, E, ..., B
void play_sound(string solfege);    // do, re, mi, ..., ti
void play_sound(int jianpu);        // 1, 2, 3, ..., 7

// different number of arguments:
void play_sound(string solfege, double duration);

// different qualifiers:
void play_sound(vector<string>& solfege);
void play_sound(const vector<string>& solfege);
```

~~~~exercism/advanced
型シグネチャは、関数の名前、仮引数の数、それぞれの型、そして修飾子によって決まります（仮引数の名前は含まれません）。
戻り値の型は型シグネチャには含まれないので、戻り値の型だけが異なる2つの関数があると、コンパイルエラーになります。
どちらを使うべきかはっきりしないため、コンパイラーがエラーを出します。
~~~~

## デフォルト引数

関数がとても長くなり、その呼び出しの多くがほとんどの仮引数に同じ値を使うことがあります。
そうした呼び出しの繰り返しは、デフォルト引数を使えば避けられます。

```cpp
void record_new_horse_birth(string name, int weight, string color="brown-ish", string dam="Alruccaba", string sire="Poseidon");

record_new_horse_birth("Urban Sea", 130); // color will be brown, dam "Alruccabam", sire "Poseidon"
record_new_horse_birth("Highclere", 175, "off-white", "Fall Aspen");   // sire will be "Poseidon"
```

関数の宣言は定義より先に読まれることが多いので、デフォルト引数は宣言で設定するのがよいです。
ある仮引数にデフォルト値が設定されている場合、その右側にある仮引数にもすべてデフォルト値を設定する必要があります。
複雑な関数のオーバーロードは、デフォルト引数を使ってより少ない関数にまとめ直すと、保守しやすくなることがあります。

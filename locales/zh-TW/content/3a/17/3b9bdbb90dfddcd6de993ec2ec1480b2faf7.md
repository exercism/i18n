# 簡介

## 術語

你已經在幾個概念裡用過並寫過 C++ 函式。現在該來談點技術細節了。下面的程式碼片段列出了最常見的術語，方便你對照。由於 C++ 會忽略空白，這裡調整了排版，讓每個元素各佔一行。

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
宣告就像是給編譯器的一張紙條，告訴它有一個名稱、回傳型別和參數列表都長這樣的函式。
如果少了定義，程式就無法運作。
宣告是選用的，但如果你在函式定義之前就使用它，就需要先宣告。
宣告可以解決像是循環參考之類的問題，也可以用來把介面和實作分開。
~~~~

## const 修飾詞

有時你會想確保某些值在初始化之後就不能再被改變。C++ 使用 `const` 關鍵字作為常數的修飾詞。

```cpp
const int number_of_dragon_balls{7};
number_of_dragon_balls--; // compilation error
```

~~~~exercism/note
你經常會看到常數以 _UPPER_SNAKE_CASE_ 來命名。如果沒有其他慣例，建議把這種大小寫風格保留給巨集使用。
~~~~

如果你在常數變數設定之後試著修改它，程式就無法通過編譯。這有助於避免非預期的修改，同時也為編譯器帶來最佳化的空間。對人類來說，如果你知道某些部分不會受到影響，也更容易理解程式碼的運作。

你也可以把 `const` 用作函式參數的修飾詞。

```cpp
string guess_number(const int& secret, const int& guess) {
    if (secret < guess) return "lower.";
    if (secret > guess) return "higher.";
    return "exact!";
}
```

當你把 `const` 參考傳入函式時，可以確定它不會被改變。對於複製成本可能很高的物件（例如較長的字串），你經常會看到使用 `const` 參考。`const` 修飾詞的第三種用途，是用於不會改變類別實例的成員函式。

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

`Stubborn` 的成員函式 `answer` 使用 `const string&` 參考作為參數。這可以避免對傳入函式的原始物件進行複製操作。

## 函式多載

只要參數列表不同，多個函式就可以有相同的名稱。這稱為函式多載，通常用於這些函式執行非常相似的任務時。

不含回傳型別的函式標頭，就是函式的__型別簽章__。型別簽章一旦改變，就會產生一個新的函式。

`play_sound` 這個範例有六個不同的多載版本，以因應不同的情境：

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
型別簽章是由函式的名稱、參數的數量、參數的型別，以及參數的修飾詞所定義（但不包含參數的名稱）。
回傳型別明確地不屬於型別簽章的一部分，如果你有兩個只有回傳型別不同的函式，就會發生編譯錯誤。
編譯器會抱怨，因為無法確定該使用這兩者中的哪一個。
~~~~

## 預設引數

有些函式可能會變得很長，而且它的許多呼叫可能對大多數參數都使用相同的值。這些呼叫中的重複可以用預設引數來避免。

```cpp
void record_new_horse_birth(string name, int weight, string color="brown-ish", string dam="Alruccaba", string sire="Poseidon");

record_new_horse_birth("Urban Sea", 130); // color will be brown, dam "Alruccabam", sire "Poseidon"
record_new_horse_birth("Highclere", 175, "off-white", "Fall Aspen");   // sire will be "Poseidon"
```

由於函式宣告通常會在定義之前被讀到，因此它是設定預設引數更合適的地方。如果某個參數有預設值宣告，那麼它右邊的所有參數也都需要有預設值宣告。有時可以把複雜的函式多載重構成使用預設引數的較少函式，以提升可維護性。

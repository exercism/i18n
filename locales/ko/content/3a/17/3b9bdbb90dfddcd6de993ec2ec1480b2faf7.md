# 소개

## 용어

이미 몇 가지 개념에서 C++ 함수를 사용하고 작성해 봤어요.
이제 좀 더 기술적인 내용으로 들어가 볼까요.
아래 코드는 자주 쓰이는 용어들을 쉽게 참고할 수 있도록 정리한 거예요.
C++은 공백을 무시하기 때문에, 각 요소를 한 줄에 하나씩 배치하도록 서식을 바꿨어요.

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
선언은 컴파일러에게 해당 이름, 반환 타입, 매개변수 목록을 가진 함수가 있다는 것을 알려 주는 메모 같은 역할을 해요.
정의가 없으면 코드는 동작하지 않아요.
선언은 필수는 아니고, 정의보다 먼저 함수를 사용할 때 필요해요.
선언을 사용하면 순환 참조 같은 문제를 해결할 수 있고, 인터페이스와 구현을 분리하는 데에도 쓸 수 있어요.
~~~~

## const 제한자

값이 한 번 초기화된 뒤에는 바뀌지 않도록 하고 싶을 때가 있어요.
C++에서는 `const` 키워드를 상수의 제한자로 사용해요.

```cpp
const int number_of_dragon_balls{7};
number_of_dragon_balls--; // compilation error
```

~~~~exercism/note
상수는 흔히 _UPPER_SNAKE_CASE_ 형태로 작성해요.
다른 관례가 없다면 이 표기법은 매크로에 남겨 두는 것이 좋아요.
~~~~

상수 변수를 설정한 뒤에 바꾸려고 하면 코드가 컴파일되지 않아요.
이는 의도치 않은 변경을 막아 주고, 컴파일러가 최적화할 수 있는 여지도 열어 줘요.
사람 입장에서도 특정 부분이 영향을 받지 않는다는 걸 알면 코드를 이해하기가 더 쉬워요.

함수 매개변수의 제한자로도 `const`를 사용할 수 있어요.

```cpp
string guess_number(const int& secret, const int& guess) {
    if (secret < guess) return "lower.";
    if (secret > guess) return "higher.";
    return "exact!";
}
```

함수에 `const` 참조를 전달하면, 그 값이 바뀌지 않는다는 걸 확신할 수 있어요.
복사 비용이 큰 객체, 예를 들어 긴 문자열에는 `const` 참조를 자주 사용해요.
`const` 제한자의 세 번째 용도는 클래스의 인스턴스를 변경하지 않는 멤버 함수예요.

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

`Stubborn`의 멤버 함수 `answer`는 매개변수로 `const string&` 참조를 사용해요.
이렇게 하면 함수에 전달된 원본 객체를 복사하는 작업을 피할 수 있어요.

## 함수 오버로딩

매개변수 목록이 다르면 여러 함수가 같은 이름을 가질 수 있어요.
이를 함수 오버로딩이라고 하고, 보통 이런 함수들이 아주 비슷한 작업을 할 때 사용해요.

반환 타입을 제외한 함수 헤더를 함수의 __타입 시그니처__라고 해요.
타입 시그니처가 바뀌면 새로운 함수가 돼요.

`play_sound` 예제에는 다양한 상황에 맞추기 위한 여섯 가지 오버로드가 있어요.

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
타입 시그니처는 함수의 이름, 매개변수의 개수, 각 매개변수의 타입과 제한자로 정의돼요(이름은 포함되지 않아요).
반환 타입은 명시적으로 타입 시그니처의 일부가 아니며, 반환 타입만 다른 두 함수가 있으면 컴파일 오류가 발생해요.
컴파일러는 둘 중 어느 것을 사용해야 할지 명확하지 않다고 알려 줄 거예요.
~~~~

## 기본 인자

어떤 함수는 매개변수가 아주 많아질 수 있고, 그런 함수를 호출할 때 대부분의 매개변수에 같은 값을 사용하는 경우가 많아요.
이런 호출에서 반복되는 부분은 기본 인자로 피할 수 있어요.

```cpp
void record_new_horse_birth(string name, int weight, string color="brown-ish", string dam="Alruccaba", string sire="Poseidon");

record_new_horse_birth("Urban Sea", 130); // color will be brown, dam "Alruccabam", sire "Poseidon"
record_new_horse_birth("Highclere", 175, "off-white", "Fall Aspen");   // sire will be "Poseidon"
```

함수 선언은 정의보다 먼저 읽히는 경우가 많아서, 기본 인자를 설정하기에 더 좋은 위치예요.
한 매개변수에 기본값이 선언되면, 그 오른쪽에 있는 모든 매개변수에도 기본값을 선언해야 해요.
때로는 복잡한 함수 오버로드를 기본 인자를 사용한 더 적은 수의 함수로 리팩터링하면 유지보수성이 좋아져요.

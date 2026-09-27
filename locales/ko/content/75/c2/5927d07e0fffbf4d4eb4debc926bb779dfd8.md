# 소개

## 클래스

이제 C++의 핵심 패러다임 중 하나인 객체 지향 프로그래밍(OOP)으로 들어갈 시간이에요.
OOP는 `classes`를 중심으로 해요. `classes`는 관련 함수들을 함께 가진 사용자 정의 데이터 타입이에요.
기본부터 시작하고, 실러버스 트리를 따라 더 내려가면서 고급 주제들도 다뤄볼 거예요.

### 멤버

클래스는 **멤버 변수**와 **멤버 함수**를 가질 수 있어요.
이들은 **멤버 선택** 연산자 `.`로 접근해요.
`classes` 밖의 변수들과 마찬가지로, 멤버 변수는 선언할 때 값으로 초기화하는 게 좋아요.
이 값은 이 클래스로 새로 만들어지는 객체의 기본값이 돼요.

### 캡슐화와 정보 은닉

클래스는 멤버에 대한 접근을 제한할 수 있는 방법을 제공해요.
두 가지 기본 `access specifiers`는 `private`과 `public`이에요.
`private` 멤버는 클래스 밖에서 접근할 수 없어요.
`public` 멤버는 자유롭게 접근할 수 있고요.
`class`의 모든 멤버는 기본적으로 `private`이에요.
`public`으로 명시적으로 표시한 멤버만 클래스 밖에서 자유롭게 사용할 수 있어요.

### 기본 예제

`class`의 정의는 다음 예제에서 볼 수 있어요.
정의 끝에 있는 `;`를 눈여겨봐요:

```cpp
class Wizard {
  public:               // from here on all members are publicly accessible
    int cast_spell() {  // defines the public member function cast_spell
      return damage;
    }
    std::string name{}; // defines the public member variable `name`
  private:              // from here on all members are private
    int damage{5};      // defines the private member variable `damage`
};

```

클래스 안에서는 모든 멤버 변수에 접근할 수 있어요.
`cast_spell` 함수 안의 `damage`를 한번 살펴봐요.
클래스 밖에서는 `private` 멤버를 읽거나 바꿀 수 없어요:

```cpp
Wizard silverhand{};
// calling the `cast_spell` function is okay, it is public:
silverhand.cast_spell();
// => 5

// name is public and can be changed:
silverhand.name = "Laeral";

// damage is private:
silverhand.damage = 500;
 // => Compilation error
```

### 생성자

생성자는 객체를 만들 때 멤버 변수에 값을 할당할 수 있게 해줘요.
생성자는 `class`와 같은 이름을 가지고 반환 타입이 없어요.
하나의 클래스는 여러 개의 생성자를 가질 수 있어요.
모든 변수를 항상 설정할 필요가 없을 때 유용하죠.
때로는 나머지는 기본값으로 두고 `name` 변수만 바꾸고 싶을 수도 있어요.
중요한 마법사라면 damage도 바꾸고 싶을 테니, `constructors` 두 개가 필요해요.

```cpp
class Wizard {
  public:
    Wizard(std::string new_name) {
      name = new_name;
    }
    Wizard(std::string new_name, int new_damage) {
      name = new_name;
      damage = new_damage;
    }
    int cast_spell() {
      return damage;
    }
    std::string name{};
  private:
    int damage{5};
};

Wizard el{"Eleven"};       // deals  5 damage
Wizard vecna{"Vecna", 50}; // deals 50 damage
```

생성자는 주제가 크고 많은 뉘앙스를 가지고 있어요.
`class`에 `constructor`를 명시적으로 정의하지 않으면, 오직 그럴 때에만 컴파일러가 대신 그 일을 해줘요.
위의 첫 번째 예제에서 그런 일이 일어났죠.
_silverhand_ 객체는 인자를 전달하지 않고 기본 생성자를 호출해서 만들어졌어요.
모든 변수는 클래스 정의에서 명시한 값으로 설정돼요.
만약 그 정의에서 아무 값도 주지 않았다면 변수들이 초기화되지 않을 수 있고, 그러면 의도하지 않은 결과가 생길 수 있어요.

~~~~exercism/note
## 구조체

구조체는 이 언어의 원래 C 뿌리에서 왔고 C++ 자체만큼 오래됐어요.
구조체는 한 가지 중요한 예외를 빼면 `classes`와 사실상 같은 것이에요.
기본적으로 `class`의 모든 것은 `private`이에요.
반면 구조체는 별도로 정의하기 전까지는 `public`이에요.
관례적으로 `struct` 키워드는 **데이터만 담는 구조체**에 자주 사용돼요.
`class` 키워드는 특정 속성을 반드시 보장해야 하는 객체에 더 선호돼요.
이런 불변식은 `Wizard` `class`의 `damage`가 음수가 될 수 없다는 것일 수 있어요.
`damage` 변수는 private이고, damage를 바꾸는 모든 함수는 그 불변식이 유지되도록 보장할 거예요.
~~~~

# 개요

기억 부류 지정자는 변수가 메모리에 어떻게 저장되는지와 관련이 있어요. 값의 기억 기간(수명이라고도 해요)과도 밀접하게 관련되어 있죠.

## auto: 함수나 블록 스코프 변수의 기본 기억 부류

블록이나 함수 안에서 정의된 변수는 기본적으로 `auto`이기 때문에, 이 지정자를 굳이 명시적으로 쓰는 경우는 흔하지 않아요. `auto`를 자주 피하는 또 다른 이유는 C++에서 다른 의미를 가지기 때문이에요. C와 C++을 함께 사용하는 코드베이스에서는 `auto` 기억 부류 지정자를 피하는 편이 덜 혼란스러울 수 있어요. `auto` 변수의 수명은 블록에 들어갈 때 시작해서 블록을 나갈 때 끝나요. `auto` 변수는 블록에 들어갈 때 메모리가 할당되지만, _기본값은 없어요_. 예외는 가변 길이 배열(VLA)이에요. VLA의 할당은 블록 안에서 선언되거나 정의된 위치에서 이루어지고, 블록을 나갈 때 끝나요. `auto` 변수는 어떤 유효한 표현식으로든 초기화할 수 있어요.

## static: static 연결 타입과 혼동하면 안 되는 기억 부류 지정자

블록이나 함수 밖에서 정의된 변수는 파일 스코프를 가지며, 항상 static 기억 기간을 가져요. 파일 스코프란 파일 어디에서든 접근할 수 있다는 뜻이에요. static 기억은 프로그램 실행이 시작될 때부터 끝날 때까지 존재한다는 뜻이죠. 명시적으로 초기화하지 않으면, `static` 변수는 기본값인 0으로 초기화돼요. 파일 스코프 변수에 `static`이 붙으면, 그 `static`은 변수의 연결을 가리켜요. `static`이 붙은 파일 스코프 변수는 내부 연결을 가져요. 즉, 파일 안에서만 접근할 수 있어요. 변수가 함수 안에서, 또는 함수 안의 블록에서 정의되고 `static`이 붙으면, 그 변수는 `static` 기억 기간을 가져요. `static` 변수의 값은 함수나 블록을 다시 호출해도 유지돼요.

다음 예제에서는 두 개의 `static` 변수가 동작하는 모습을 볼 수 있어요. 첫 번째 `count` 변수는 `print_stuff` 함수 안에서 정의되고, 함수를 호출할 때마다 값을 유지해요. 두 번째 `count` 변수는 임의의 블록 안에서 정의되고, 그 블록 안에서 첫 번째 `count` 변수를 가려요(섀도잉해요). 두 번째 `count` 변수는 블록에 들어갈 때마다 독립적으로 값을 유지해요.

```c
#include <stdio.h>

void print_stuff(void) {
    // static variable is initialized to 0
    static int count;
    count++;
    printf("function count is %d\n", count);
    {
        // static variable is initialized to 0
        static int count;
        count++;
        printf("block count is %d\n", count);
    }
}

int main() {
    // prints
    // function count is 1
    // block count is 1
    print_stuff();
    // prints
    // function count is 2
    // block count is 2    
    print_stuff();
}
```

`static` 변수를 명시적으로 초기화할 때는 상수 표현식으로 해야 해요. 상수 표현식이란 컴파일 시점에 평가할 수 있는 표현식이에요.

## extern: 다른 번역 단위에 있는 변수에 접근하는 방법

번역 단위는 소스 파일과 그 파일이 `#include`하는 모든 파일로 이루어져요. 파일 스코프를 가진 변수를 `extern`으로 선언하고 초기화할 수도 있지만, `extern` 키워드는 보통 새로운 변수를 정의하는 데가 아니라 이미 존재하는 변수를 가리키는 데 사용해요. `extern`이 가리키는 변수는 파일 스코프를 가져야 해요. 파일 스코프에 있는 변수는 항상 `static` 기억을 가져요. 포함된 파일에 있는 변수가 이를 포함한 파일에서 접근되려면 외부 연결을 가져야 해요.

다음 예제에서는 `extern`으로 선언한 변수 `val`을 사용해서, 파일 스코프에서 정의된 `val`을 가리키도록 해요. 두 `extern` 사용 모두 다른 곳에서 정의된 변수를 참조하기 때문에 참조 선언이라고 불러요.

```c
#include <stdio.h>

void set_val() {
    // this declares val which is defined elsewhere
    extern int val;
    val += 42;
    // prints val is 42
    printf("val is %d\n", val);
}

int main() {
    set_val();
    // this declares val which is defined elsewhere
    extern int val;
    val += 42;
    // prints val is 84
    printf("val is %d\n", val);
}
// this value could be defined in another source file.
// as a variable with static storage, it is initialized to zero
int val;
```

두 `extern` 키워드를 모두 제거하면 프로그램은 다음과 비슷한 것을 출력할 수 있어요

```
val is 22038
val is 42
```

이런 출력은 `extern` 없이 한 각각의 `val` 선언이 정의 선언이며, 서로 독립적이라는 것을 보여줘요. `set_val`과 `main`에서 `val` 선언을 완전히 없애면, `set_val`과 `main`에서 `val`이 선언되지 않았다는 컴파일 오류가 발생해요.

`extern`으로 참조되는 변수가 같은 파일에 있으면, 내부 연결이나 외부 연결 중 어느 것이든 가질 수 있어요. `val`을 `static int val;`로 정의해도 `set_val`이나 `main`에서의 `val` 사용에는 영향이 없어요. 다만 컴파일하려면 그 정의를 두 함수 위로 옮겨야 해요. 하지만 `val`이 함수들 위에 정의되어 있다면, 두 함수에서 `val`을 `extern`으로 선언할 필요가 없어요.

다음은 제대로 동작해요

```c
#include <stdio.h>

// val defining declaration before the function definitions
static int val;

void set_val() {
    val += 42;
    // prints val is 42
    printf("val is %d\n", val);
}

int main() {
    set_val();
    val += 42;
    // prints val is 84
    printf("val is %d\n", val);
}
```

`static int val;`에서 `static`을 빼도 `val`은 외부 연결을 가지게 되고, `set_val`과 `main`에서 `val`은 여전히 똑같이 동작해요. 다른 소스 파일이 이 파일을 포함한다면, 그 파일은 `val`이 외부 연결을 가지고(`static`으로 선언되지 않았고) 그 파일이 `extern int val;`을 선언한 경우에만 `val`을 사용할 수 있어요.

`extern`이 가리키는 변수는 static 기억을 가질 뿐만 아니라 파일 스코프도 가져야 해요. 다음 예제는 아마 컴파일되지 않을 거예요. `val`이 `static`이긴 하지만 파일 스코프를 가지지 않기 때문이에요.

```c
#include <stdio.h>

void set_val() {
    // defined with static storage, but not in file scope
    static int val;
    val += 42;
    printf("val is %d\n", val);
}

int main() {
    set_val();
    extern int val;
    printf("val is %d\n", val);
}
```

## register: 변수 접근 속도를 높일 수도 있는 방법

변수에 `register`를 붙이면, 값을 빠르게 접근할 수 있도록 레지스터에 넣고 싶다는 프로그래머의 바람을 나타내요. `register` 변수는 함수나 블록 스코프에 있어야 한다는 점에서 `auto` 변수와 비슷해요. 값이 메모리 대신 레지스터에 들어가도록 의도되었기 때문에, 레지스터의 주소는 구할 수 없으므로 컴파일러는 그 변수의 주소에 접근하는 것을 허용하지 않아야 해요. 하지만 메모리 주소 자체는 레지스터에 넣을 수 있어요. 다음 예제가 그것을 보여줘요.

```c
#include <stdio.h>

int main() {
    int i = 42;
    register int *i_ptr = &i;
    // prints i is 42, i_ptr is 0x7ffd0c2055c4 (or some other address)
    printf("i is %d, i_ptr is %p", i, i_ptr);
}
```

register`는 본질적으로 힌트예요. 컴파일러는 이 지정자를 따를지 말지 자유롭게 선택할 수 있기 때문에, 값이 실제로 레지스터에 들어갈 수도 있고 아닐 수도 있어요.

## typedef: 사실은 기억 부류 지정자가 아닌 지정자

`typedef`가 기억 부류 지정자로 설명되는 것은 오직 문법적인 이유 때문이에요. 기억 부류 지정자는 다른 기억 부류 지정자와 함께 사용할 수 없기 때문이죠. 따라서 `typedef auto int i = 42;`는 `static auto int i = 42;`와 마찬가지로 문법에 어긋나요.

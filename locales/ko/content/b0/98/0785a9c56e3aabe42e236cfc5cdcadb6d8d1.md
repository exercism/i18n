# 지침

이 연습 문제에서는 윈도우 기반 컴퓨터 시스템을 시뮬레이션해요.
이동하고 크기를 조절할 수 있는 윈도우를 몇 개 만들어 볼 거예요.
다음 그림은 아래에서 다룰 값들을 보여줘요.

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

📣 다양한 JavaScript 실력을 연습해 보려면 **1번과 2번 과제는 프로토타입 문법으로, 나머지 과제는 클래스 문법으로 풀어 봐요**.

## 1. 윈도우의 크기를 저장할 Size 정의하기

`Size`라는 클래스(생성자 함수)를 정의해요.
이 클래스에는 윈도우의 현재 크기를 저장하는 `width`와 `height` 필드가 있어야 해요.
생성자 함수는 이 필드들의 초깃값을 받아야 해요.
너비는 첫 번째 매개변수로, 높이는 두 번째 매개변수로 전달해요.
기본 너비와 높이는 각각 `80`과 `60`이어야 해요.

또한 새로운 너비와 높이를 매개변수로 받아 새 크기가 반영되도록 필드를 바꾸는 `resize(newWidth, newHeight)` 메서드를 정의해요.

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

## 2. 윈도우의 위치를 저장할 Position 정의하기

`Position`이라는 클래스(생성자 함수)를 정의하고, 윈도우 왼쪽 위 모서리의 현재 가로 위치와 세로 위치를 각각 저장하는 `x`와 `y` 필드를 만들어요.
생성자 함수는 이 필드들의 초깃값을 받아야 해요.
`x` 값은 첫 번째 매개변수로, `y` 값은 두 번째 매개변수로 전달해요.
두 필드 모두 기본값은 `0`이어야 해요.

위치 (0, 0)은 화면의 왼쪽 위 모서리이고, 오른쪽으로 갈수록 `x` 값이 커지고 아래로 갈수록 `y` 값이 커져요.

또한 새로운 x와 y를 매개변수로 받아 새 위치가 반영되도록 속성을 바꾸는 `move(newX, newY)` 메서드도 정의해요.

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

## 3. ProgramWindow 클래스 정의하기

다음 필드를 가진 `ProgramWindow` 클래스를 정의해요:

- `screenSize`: `width`가 800이고 `height`가 600인 `Size` 타입의 고정된 값을 가져요
- `size`: `Size` 타입의 값을 가져요. 초깃값은 `Size` 인스턴스의 기본값이에요
- `position`: `Position` 타입의 값을 가져요. 초깃값은 `Position` 인스턴스의 기본값이에요

윈도우는 열릴 때(생성될 때) 항상 기본 크기와 위치로 시작해요.

```javascript
const programWindow = new ProgramWindow();
programWindow.screenSize.width;
// => 800

// Similar for the other fields.
```

참고: `ProgramWindow`라는 이름은 브라우저 환경에 내장된 `Window` 클래스와 구분하기 위해 `Window` 대신 사용해요.

## 4. 윈도우의 크기를 조절하는 메서드 추가하기

`ProgramWindow` 클래스에는 `resize` 메서드를 넣어야 해요.
`Size` 타입의 매개변수를 입력으로 받아, 지정한 크기로 윈도우 크기를 조절하려고 시도해요.

하지만 새 크기는 특정 범위를 넘을 수 없어요.

- 허용되는 최소 높이와 너비는 1이에요.
  1보다 작게 요청된 높이나 너비는 1로 잘려요.
- 최대 높이와 너비는 윈도우의 현재 위치에 따라 달라져요. 윈도우의 가장자리는 화면의 가장자리를 넘어갈 수 없어요.
  이 범위보다 큰 값은 가질 수 있는 최대 크기로 잘려요.
  예를 들어 윈도우의 위치가 `x` = 400, `y` = 300이고 `height` = 400, `width` = 300으로 크기 조절을 요청하면, 화면이 `y` 방향으로 요청을 모두 수용할 만큼 크지 않기 때문에 윈도우는 `height` = 300, `width` = 300으로 조절돼요.

```javascript
const programWindow = new ProgramWindow();

const newSize = new Size(600, 400);
programWindow.resize(newSize);
programWindow.size.width;
// => 600
programWindow.size.height;
// => 400
```

## 5. 윈도우를 이동하는 메서드 추가하기

크기 조절 기능 외에도 `ProgramWindow` 클래스에는 `move` 메서드가 있어야 해요.
`Position` 타입의 매개변수를 입력으로 받아요.
`move` 메서드는 `resize`와 비슷하지만, 크기가 아니라 윈도우의 _위치_를 요청한 값으로 조정해요.

`resize`와 마찬가지로 새 위치도 특정 한계를 넘을 수 없어요.

- `x`와 `y` 모두 최소 위치는 0이에요.
- 각 방향의 최대 위치는 윈도우의 현재 크기에 따라 달라져요.
  가장자리는 화면의 가장자리를 넘어갈 수 없어요.
  이 범위보다 큰 값은 가질 수 있는 최대 위치로 잘려요.
  예를 들어 윈도우의 크기가 `x` = 250, `y` = 100이고 `x` = 600, `y` = 200으로 이동을 요청하면, 화면이 `x` 방향으로 요청을 모두 수용할 만큼 크지 않기 때문에 윈도우는 `x` = 550, `y` = 200으로 이동해요.

```javascript
const programWindow = new ProgramWindow();

const newPosition = new Position(50, 100);
programWindow.move(newPosition);
programWindow.position.x;
// => 50
programWindow.position.y;
// => 100
```

## 6. 프로그램 윈도우 변경하기

`ProgramWindow` 인스턴스를 입력으로 받아 윈도우를 지정한 크기와 위치로 바꾸는 `changeWindow` 함수를 구현해요.
이 함수는 변경 사항을 적용한 뒤 전달받은 `ProgramWindow` 인스턴스를 반환해야 해요.

윈도우는 너비 400, 높이 300이 되고 x = 100, y = 150에 위치해야 해요.

```javascript
const programWindow = new ProgramWindow();
changeWindow(programWindow);
programWindow.size.width;
// => 400

// Similar for the other fields.
```

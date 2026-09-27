# 지침

Chaitana는 아주 인기 있는 테마파크를 운영해요.
 잘 가꾸어진 정원 한가운데에는 단 하나의 놀이기구만 있어요. 바로 세계에서 가장 큰 롤러코스터(TM)예요.
 이 하나뿐인 놀이기구인데도, 사람들은 전 세계에서 몰려와 Chaitana의 하이퍼코스터를 타기 위해 몇 시간씩 줄을 서요.

이 놀이기구에는 두 개의 줄이 있고, 각각은 `list`로 표현돼요.

1. 일반 줄
2. 익스프레스 줄(_패스트트랙_이라고도 해요). 우선 입장을 위해 추가 요금을 내는 줄이에요.


테마파크 손님들을 더 잘 관리할 수 있도록 코드를 작성해 달라는 부탁을 받았어요.
 손님들과 사장님인 Chaitana가 짜증 내기 전에, 최대한 빨리 다음 함수들을 구현해야 해요.
 꼼꼼히 읽어 봐요.
 어떤 과제는 기존 줄을 바꾸거나 갱신하라고 하고, 또 어떤 과제는 그것을 복사하라고 해요.


## 1. 줄에 추가하기

`add_me_to_the_queue()` 함수를 정의해요. 이 함수는 `<express_queue>, <normal_queue>, <ticket_type>, <person_name>` 4개의 매개변수를 받고, 해당하는 줄에 그 사람의 이름을 추가해서 반환해요.


1. `<ticket_type>`은 `int`이고, 1 == express_queue, 0 == normal_queue예요.
2. `<person_name>`은 각각의 줄에 추가할 사람의 이름(`str`)이에요.


```python
>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=1, person_name="RichieRich")
...
["Tony", "Bruce", "RichieRich"]

>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=0, person_name="HawkEye")
....
["RobotGuy", "WW", "HawkEye"]
```

## 2. 내 친구들은 어디에 있나요?

한 사람이 공원에 늦게 도착했지만, 친구들이 기다리고 있는 줄에 합류하고 싶어 해요.
 그런데 친구들이 어디에 서 있는지 전혀 모르고, 전화를 걸 휴대폰 신호도 터지지 않아요.

`find_my_friend()` 함수를 정의해요. 이 함수는 `queue`와 `friend_name` 2개의 매개변수를 받고, 그 사람의 이름이 줄에서 몇 번째에 있는지 반환해요.


1. `<queue>`는 줄에 서 있는 사람들의 `list`예요.
2. `<friend_name>`은 인덱스(줄에서의 위치)를 찾아야 하는 친구의 이름이에요.

기억해요. 인덱스는 왼쪽에서 0부터 시작하고, 오른쪽에서 -1부터 시작해요.


```python
>>> find_my_friend(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], friend_name="Steve")
...
1
```


## 3. 친구들 사이에 끼어들어도 될까요?

이제 (위의 2번 과제에서) 친구들을 찾았으니, 늦게 도착한 사람은 친구들이 있는 줄의 자리에 합류하고 싶어 해요.
`add_me_with_my_friends()` 함수를 정의해요. 이 함수는 `queue`, `index`, `person_name` 3개의 매개변수를 받아요.


1. `<queue>`는 줄에 서 있는 사람들의 `list`예요.
2. `<index>`는 새로 온 사람을 추가할 위치예요.
3. `<person_name>`은 그 위치에 추가할 사람의 이름이에요.

늦게 도착한 사람의 이름이 추가된 줄을 반환해요.


```python
>>> add_me_with_my_friends(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], index=1, person_name="Bucky")
...
["Natasha", "Bucky", "Steve", "T'challa", "Wanda", "Rocket"]
```

## 4. 줄에 있는 못된 사람

방금 줄에서 어떤 아주 못된 사람이 밀치고 소리치고 문제를 일으키고 있다는 이야기를 들었어요.
 그 못된 사람을 잘못된 행동 때문에 쫓아내야 해요!


`remove_the_mean_person()` 함수를 정의해요. 이 함수는 `queue`와 `person_name` 2개의 매개변수를 받아요.


1. `<queue>`는 줄에 서 있는 사람들의 `list`예요.
2. `<person_name>`은 쫓아내야 하는 사람의 이름이에요.

못된 사람의 이름이 빠진 줄을 반환해요.

```python
>>> remove_the_mean_person(queue=["Natasha", "Steve", "Eltran", "Wanda", "Rocket"], person_name="Eltran")
...
["Natasha", "Steve", "Wanda", "Rocket"]
```


## 5. 이름이 같은 사람들

똑같이 생긴 남남인 두 사람을 본 적은 없더라도, 이름이 똑같은 남남인 사람들은 _분명히_ 본 적이 있을 거예요(_이름이 같은 사람들_)!
 오늘은 그런 사람이 잔뜩 온 것 같아요.
  특정 이름이 줄에 몇 번 나오는지 알고 싶어요.

`how_many_namefellows()` 함수를 정의해요. 이 함수는 `queue`와 `person_name` 2개의 매개변수를 받아요.

1. `<queue>`는 줄에 서 있는 사람들의 `list`예요.
2. `<person_name>`은 줄에 한 번 이상 나올 것 같은 이름이에요.


`person_name`이 나오는 횟수를 `int`로 반환해요.


```python
>>> how_many_namefellows(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"], person_name="Natasha")
...
2
```

## 6. 마지막 사람 내보내기

안타깝게도 오늘은 공원이 너무 붐벼서 일반 줄의 마지막 사람을 내보내야 해요(_그 사람에게는 다른 날 익스프레스 줄로 다시 올 수 있는 교환권을 줄 거예요_).
 줄에 서 있는 사람들의 목록인 `queue` 1개의 매개변수를 받는 `remove_the_last_person()` 함수를 정의해야 해요.

`list`를 갱신하고, 내보낸 사람의 이름도 `return`해서 그 사람에게 교환권을 써 줄 수 있게 해야 해요.


```python
>>> remove_the_last_person(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
'Rocket'
```

## 7. 대기 줄 목록 정렬하기

관리 목적으로, 주어진 줄에 있는 모든 이름을 알파벳순으로 정렬해야 해요.


`sorted_names()` 함수를 정의해요. 이 함수는 1개의 인자 `queue`(줄에 서 있는 사람들의 `list`)를 받고, `list`의 `sorted`된 복사본을 반환해요.


```python
>>> sorted_names(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
['Eltran', 'Natasha', 'Natasha', 'Rocket', 'Steve']
```

# 분해와 다중 할당

분해는 `Array`나 `Hash` 같은 컬렉션에서 원소를 추출하는 것을 말해요.
분해한 값은 같은 문 안에서 변수에 할당할 수 있어요.

[다중 할당][multiple assignment]은 하나의 문 안에서 여러 변수에 분해된 값을 할당하는 기능이에요.
덕분에 코드를 더 간결하고 읽기 좋게 만들 수 있어요.
할당할 변수들을 쉼표로 구분해서 쓰면 되는데, 예를 들어 `first, second, third = [1, 2, 3]`처럼 쓰면 돼요.

스플랫 연산자(`*`)와 이중 스플랫 연산자(`**`)는 분해할 때 자주 사용해요.

~~~~exercism/caution
`*<variable_name>`과 `**<variable_name>`은 `*`와 `**`와 헷갈리면 안 돼요.
`*`와 `**`는 각각 곱셈과 거듭제곱에 쓰이지만, `*<variable_name>`과 `**<variable_name>`은 조합 연산자와 분해 연산자로 쓰여요.
~~~~

## 다중 할당

다중 할당을 사용하면 한 줄에서 여러 변수에 값을 할당할 수 있어요.
값을 구분하려면 쉼표 `,`를 사용해요:

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

다중 할당은 하나의 데이터 타입에만 국한되지 않아요:

```irb
>> x, y, z = 1, "Hello", true
=> [1, "Hello", true]
>> x
=> 1
>> y
=> 'Hello'
>> z
=> true
```

다중 할당은 **배열**의 원소를 서로 바꾸는 데 사용할 수 있어요.
이 방식은 [정렬 알고리즘][sorting algorithms]에서 아주 흔히 쓰여요.
예를 들어 볼까요?

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
이것은 "병렬 할당"이라고도 하며, 임시 변수를 만들지 않아도 되게 해줘요.
~~~~

값보다 변수가 더 많으면, 남는 변수에는 `nil`이 할당돼요:

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## 분해

Ruby에서는 [**배열**/**해시**의 원소를 분해][decompose]해서 각각 다른 변수에 담을 수 있어요.
**배열** 안의 값은 인덱스 순서대로 자리 잡고 있으므로, 변수에도 같은 순서로 풀어 담아요:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

필요하지 않은 값이 있으면 `_`를 사용해서 "수집했지만 사용하지 않음"을 나타낼 수 있어요:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### 깊은 분해

**배열** 안에 있는 **배열**(중첩 배열이라고도 해요)에서 값을 분해해서 할당하는 것은 얕은 분해와 같은 방식으로 동작하지만, 값의 맥락이나 위치를 분명히 하기 위해 [구분된 분해 표현식(`()`)][delimited decomposition expression]이 필요해요:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

중첩된 **배열**의 일부만 깊게 풀어낼 수도 있어요:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

분해에서 변수의 위치가 잘못되었거나 값의 개수가 맞지 않으면 **구문 오류**가 발생해요:

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

여기서 직접 실험해 보면, 오른쪽에 있는 값이 아니라 첫 번째 패턴이 기준을 정한다는 걸 알게 될 거예요.
이 구문 오류는 데이터 구조와는 상관이 없어요.

### 단일 스플랫 연산자(`*`)로 배열 분해하기

[**배열**을 분해][decompose]할 때 스플랫 연산자(`*`)를 사용해서 "남은" 값들을 잡을 수 있어요.
이 방법이 **배열**을 잘라내는 것보다 더 명확해요(어떤 상황에서는 잘라내는 쪽이 덜 읽기 좋거든요).
예를 들어, 첫 번째 원소를 추출하고 나머지 값을 첫 번째 원소가 없는 새 **배열**에 할당할 수 있어요:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

**배열**의 처음과 끝에 있는 값을 추출하면서 가운데 값들을 모두 하나로 묶을 수도 있어요:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

깊은 분해에서도 `*`를 사용할 수 있어요:

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### `Hash` 분해하기

**해시**를 분해하는 것은 **배열**을 분해하는 것과 조금 달라요.
**해시**를 풀어내려면 먼저 **배열**로 변환해야 해요.
그렇게 하지 않으면 분해되지 않아요:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

`Hash`를 **배열**로 변환하려면 `to_a` 메서드를 사용하면 돼요:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

키를 풀어내고 싶다면 `keys` 메서드를 사용하면 돼요:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

값을 풀어내고 싶다면 `values` 메서드를 사용하면 돼요:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## 조합

조합은 여러 값을 하나의 **배열**로 묶어서 변수에 할당하는 기능이에요.
값을 _분해_해서 변경한 다음, 그 결과를 다시 변수로 _조합_하고 싶을 때 유용해요.
**배열**이나 **해시** 두 개 이상을 병합할 수도 있게 해줘요.

### 스플랫 연산자(`*`)로 배열 조합하기

**배열**을 조합하는 것은 스플랫 연산자(`*`)로 할 수 있어요.
이 연산자는 모든 값을 하나의 **배열**로 묶어요.

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### 이중 스플랫 연산자(`**`)로 해시 조합하기

해시를 조합할 때는 이중 스플랫 연산자(`**`)를 사용해요.
이 연산자는 한 해시의 모든 **키**/**값** 쌍을 다른 해시로 묶어 넣거나, 두 해시를 하나로 합쳐요.

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## 메서드와 함께 스플랫 연산자(`*`)와 이중 스플랫 연산자(`**`) 사용하기

### 메서드 매개변수로 조합하기

임의 개수의 인자를 받는 메서드를 만들 때는 메서드 정의에서 [`*arguments`][arguments]나 [`**keyword_arguments`][keyword arguments]를 사용할 수 있어요.
`*arguments`는 임의 개수의 위치 (키워드가 아닌) 인자를 묶는 데 사용되고,
`**keyword_arguments`는 임의 개수의 키워드 인자를 묶는 데 사용돼요.

`*arguments` 사용 예:

```irb
# This method is defined to take any number of positional arguments
# (Using the single line form of the definition of a method.)

>> def my_method(*arguments)= arguments

# Arguments given to the method are packed into an array

>> my_method(1, 2, 3)
=> [1, 2, 3]

>> my_method("Hello")
=> ["Hello"]

>> my_method(1, 2, 3, "Hello", "Mars")
=> [1, 2, 3, "Hello", "Mars"]
```

`**keyword_arguments` 사용 예:

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

정의한 메서드에 키워드 인자를 위한 매개변수(`**keyword_arguments`나 `<key_word>: <value>`)가 하나도 없으면, 키워드 인자는 해시로 묶여서 마지막 매개변수에 할당돼요.

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

`*arguments`와 `**keyword_arguments`는 함께 조합해서 사용할 수도 있어요:

```ruby
def my_method(*arguments, **keyword_arguments)
  p arguments.sum
  for (key, value) in keyword_arguments.to_a
    p key.to_s + " = " + value.to_s
  end
end


my_method(1, 2, 3, a: 1, b: 2, c: 3)
6
"a = 1"
"b = 2"
"c = 3"
```

`*arguments` 앞뒤에 인자를 써서 특정 위치의 인자를 지정할 수도 있어요.
이는 배열을 분해하는 것과 같은 방식으로 동작해요.

~~~~exercism/caution
인자는 정해진 순서대로 구성해야 해요:

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

이 순서를 따르지 않으면 오류가 발생해요.
~~~~

```ruby
def my_method(a, b, *arguments)
  p a
  p b
  p arguments
end

my_method(1, 2, 3, 4, 5)
1
2
[3, 4, 5]
```

`*arguments` 앞뒤에 위치 인자를 쓸 수 있어요:

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

위치 인자와 \*arguments, 키워드 인자, \*\*keyword_arguments 모두를 함께 조합할 수도 있어요:

```irb
>> def my_method(first, *many, last, a:, **keyword_arguments)
     p first
     p many
     p last
     p a
     p keyword_arguments
     end

>> my_method(1, 2, 3, 4, 5, a: 6, b: 7, c: 8)
1
[2, 3, 4]
5
6
{:b => 7, :c => 8}
```

인자를 잘못된 순서로 쓰면 오류가 발생해요:

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### 메서드 호출로 분해하기

스플랫 연산자(`*`)를 사용해서 **배열**에 담긴 인자를 메서드 호출로 풀어낼 수 있어요:

```ruby
def my_method(a, b, c)
  p c
  p b
  p a
end

numbers = [1, 2, 3]
my_method(*numbers)
3
2
1
```

이중 스플랫 연산자(`**`)를 사용해서 **해시**에 담긴 인자를 메서드 호출로 풀어낼 수도 있어요:

```ruby
def my_method(a:, b:, c:)
  p c
  p b
  p a
end

numbers = {a: 1, b: 2, c: 3}
my_method(**numbers)
3
2
1
```

[arguments]: https://docs.ruby-lang.org/en/master/syntax/methods_rdoc.html#label-Array-2FHash+Argument
[keyword arguments]: https://docs.ruby-lang.org/en/master/syntax/methods_rdoc.html#label-Keyword+Arguments
[multiple assignment]: https://docs.ruby-lang.org/en/master/syntax/assignment_rdoc.html#label-Multiple+Assignment
[sorting algorithms]: https://en.wikipedia.org/wiki/Sorting_algorithm
[decompose]: https://docs.ruby-lang.org/en/master/syntax/assignment_rdoc.html#label-Array+Decomposition
[delimited decomposition expression]: https://riptutorial.com/ruby/example/8798/decomposition

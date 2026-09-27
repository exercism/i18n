# 소개

## Access Behaviour

Elixir는 코드 _Behaviour_를 사용해, 공통된 범용 인터페이스를 제공하면서도 각 모듈이 그 인터페이스를 구체적으로 구현할 수 있게 해줘요. 그중 대표적인 예가 바로 _Access Behaviour_예요.

_Access Behaviour_는 키 기반 데이터 구조에서 값을 가져오기 위한 공통 인터페이스를 제공해요. _Access Behaviour_는 맵과 키워드 리스트에 대해 구현되어 있는데, 감을 잡을 수 있도록 맵에서의 사용법을 살펴봐요. _Access Behaviour_는 맵이 있으면 그 뒤에 _대괄호_를 붙이고, 키를 사용해 그 키에 연결된 값을 가져올 수 있다고 정의해요.

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

데이터 구조에 키가 없으면 `nil`이 반환돼요. 이 때문에 의도하지 않은 동작이 생길 수 있는데, 오류를 발생시키지 않기 때문이에요. 참고로 `nil` 자체도 Access Behaviour를 구현하고 있어서, 어떤 키에 대해서도 항상 `nil`을 반환해요.

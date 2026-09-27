# 지침

DNA 연구실에서 연구 데이터를 압축해 저장 공간을 절약할 여러 방법을 연구해 왔어요. 한 동료가 DNA 데이터를 이진 표현으로 변환하자고 제안해요:

| 핵산 | 코드  |
| ------------ | ----- |
| Adenine      |  `00` |
| Cytosine     |  `01` |
| Guanine      |  `10` |
| Thymine      |  `11` |

이 방법이 필요한 데이터 저장 비용을 줄일 수 있지만, 사람이 읽기 어려워질 수 있다는 점을 곰곰이 생각해 봐요. 절감 효과를 측정하기 위해 데이터를 인코딩하고 디코딩하는 모듈을 작성하기로 해요.

## 1. 핵산을 이진 값으로 인코딩하기

`encode_nucleotide`를 구현해 뉴클레오타이드를 받고 인코딩된 코드의 정수 값을 반환해요.

```gleam
encode_nucleotide(Cytosine)
// -> 1
// (which is equal to 0b01)
```

## 2. 이진 값을 핵산으로 디코딩하기

`decode_nucleotide`를 구현해 인코딩된 코드의 정수 값을 받고 뉴클레오타이드를 반환해요.

```gleam
decode_nucleotide(0b01)
// -> Ok(Cytosine)
```

## 3. DNA 배열 인코딩하기

`encode`를 구현해 뉴클레오타이드 배열을 받고 인코딩된 데이터의 비트 배열을 반환해요.

```gleam
encode([Adenine, Cytosine, Guanine, Thymine])
// -> <<27>>
```

## 4. DNA 비트 배열 디코딩하기

`decode`를 구현해 핵산을 나타내는 비트 배열을 받고 디코딩된 데이터를 뉴클레오타이드 배열로 반환해요.

```gleam
decode(<<27>>)
// -> Ok([Adenine, Cytosine, Guanine, Thymine])
```

# 소개

Factor의 해시테이블은 *연관 배열*이에요. `key/value` 쌍을 모아 둔 집합이고, 조회는 O(1)로 이루어져요. 더 넓은 [`assocs`][assocs] 계열에 속해요.

## 해시테이블 리터럴

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }`는 빈 해시테이블이에요. 해시테이블은 *변경 가능*해서, 키를 넣고 지울 때마다 커졌다 작아졌다 해요. 원본을 그대로 두고 싶다면 먼저 `clone`을 해요. 해시테이블을 출력하면 항목이 보이지만, 그 순서가 삽입 순서와 같지는 않아요. 해시테이블에는 순서가 없어요.

## 읽기

`at`은 ([`assocs`][assocs]에 있어요) 값을 읽고, 키가 없으면 `f`를 반환해요:

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## 쓰기

`set-at`은 값을 넣거나 덮어쓰고, `delete-at`은 지우고, `change-at`은 현재 값에 쿼테이션을 실행해요. 세 단어 모두 *변경*을 일으켜요:

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## 개수 세기 지름길, `inc-at`

`inc-at`은 ([`assocs`][assocs]에도 있어요) 키에 해당하는 기존 값에 1을 더하고, 키가 없으면 1로 넣어요. 개수를 셀 때 딱 좋아요:

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## 반복과 지연 삽입

`assoc-each`는 모든 `( key value -- )` 쌍을 순회하고, `cache`는 키에 해당하는 값을 반환하는데, 키가 없으면 주어진 쿼테이션으로 값을 한 번 계산해요.

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache`는 "조회하거나, 없으면 만들기" 패턴을 한 단어에 담은 거예요. 키가 계속 흘러 들어오는 상황에서 해시테이블을 만들면서, 호출할 때마다 항목이 없는 경우를 처리하고 싶지 않을 때 편리해요.

## 키 시퀀스 전체에 해시테이블 갱신 적용하기

입력이 키 시퀀스이고 키마다 해시테이블을 한 번씩 갱신하고 싶다면, `each`로 *시퀀스*를 순회하면서 프라이 쿼테이션 `'[ _ … ]`([`fry`][fry])을 사용해 해시테이블을 루프 본문에 넣어요. 예를 들어 키 목록을 지울 때는 이렇게 해요:

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]`는 스택에서 자기 위에 있는 해시테이블을 붙잡아 두기 때문에, `each`는 반복할 때마다 키만 넘겨주면 돼요. `keep`은 마지막 `.`을 위해 해시테이블을 남겨 둔 채로 쿼테이션을 실행해요.

## 시퀀스에서 해시테이블 만들기

`map>assoc`은 ([`assocs`][assocs]에 있어요) 시퀀스에 쿼테이션을 매핑하고, `( elt -- key value )` 결과를 exemplar와 같은 타입의 assoc으로 모아요:

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## 키, 값, 쌍

`keys`와 `values`는 ([`assocs`][assocs]에 있어요) 키만, 또는 값만 반환하고, `>alist`는 `{ key value }` 쌍을 반환해요.

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

`keys`와 `values`는 순서가 맞아요. 어떤 위치의 값은 같은 위치의 키에 대응해요.

`sort-keys`는 ([`sorting`][sorting]에 있어요) `{ key value }` 쌍을 키 기준으로 정렬해서 반환해요:

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## 쌍에서 다시 해시테이블로

`>hashtable`은 ([`hashtables`][hashtables]에 있어요) `>alist`의 역방향이에요. 어떤 assoc이든, 대개 `{ key value }` 쌍으로 이루어진 alist를, O(1) 조회가 가능한 해시테이블로 바꿔요.

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

쌍 목록을 모으거나 변형한 뒤, 다시 해시테이블로 접어서 키로 항목을 조회하고 싶을 때 편리해요.

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html

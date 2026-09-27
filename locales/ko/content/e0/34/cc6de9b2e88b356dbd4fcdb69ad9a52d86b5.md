# 추가 지침

## 프로젝트 구조

* `src`에는 연습 문제의 풀이가 들어 있어요.
* `spec`에는 연습 문제용 테스트가 들어 있어요.

## 테스트 실행

올바른 디렉터리(즉, `src`와 `spec`이 들어 있는 곳)에 있다면 `crystal spec`을 실행해 해당 연습 문제의 테스트를 실행할 수 있어요:

```bash
$ pwd
/Users/johndoe/Code/exercism/crystal/hello-world

$ ls
GETTING_STARTED.md README.md          spec               src

$ crystal spec
```

그러면 `spec` 디렉터리에 있는 모든 테스트 파일이 실행돼요.

각 테스트 파일에서 첫 번째 테스트를 제외한 모든 테스트는 건너뛰도록 되어 있어요.

테스트 하나를 통과하면, `pending`을 `it`으로 바꿔 다음 테스트의 건너뛰기를 해제할 수 있어요.

## 풀이 제출하기

풀이를 제출할 때는 `src` 디렉터리에 있는 소스 파일을 반드시 제출해야 해요:

```bash
$ exercism submit src/hello_world.cr
```

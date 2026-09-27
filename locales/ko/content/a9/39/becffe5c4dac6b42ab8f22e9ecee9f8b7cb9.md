# JSON 파일 포맷하기

Exercism 트랙 저장소에는 다양한 JSON 파일이 있어요. 예를 들어 다음과 같아요.

- 트랙 `config.json` 파일
- 각 개념마다 `.meta/config.json` 파일과 `links.json` 파일
- 각 개념 연습 문제나 실습 연습 문제마다 `.meta/config.json` 파일

이 파일들은 Exercism 전체에서 일관된 포맷을 따르면 더 읽기 쉬워요. 그래서 configlet에는 트랙의 JSON 파일을 정해진 형식으로 다시 작성해 주는 `fmt` 명령이 있어요.

`fmt` 명령은 다음 파일들을 포맷해요.

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## 사용법

`fmt` 명령은 연습 문제의 'meta/config.json' 파일을 포맷해요.

```
configlet [global-options] fmt [command-options]

Global options:
  -h, --help                   Show this help message and exit
      --version                Show this tool's version information and exit
  -t, --track-dir <dir>        Specify a track directory to use instead of the current directory
  -v, --verbosity <verbosity>  The verbosity of output. Allowed values: q[uiet], n[ormal], d[etailed]

Options for fmt:
  -e, --exercise <slug>        Only operate on this exercise
  -u, --update                 Prompt to write formatted files
  -y, --yes                    Auto-confirm the prompt from --update
```

옵션 없이 `configlet fmt`를 실행하면 트랙에 아무 변경도 가하지 않고, 모든 개념 연습 문제와 실습 연습 문제의 `.meta/config.json` 파일과 트랙 `config.json` 파일의 포맷을 검사해요.

포맷된 연습 문제 `.meta/config.json` 파일이 아직 없는 경로 목록을 출력하려면 다음과 같이 해요. 포맷된 config 파일이 없는 연습 문제가 하나라도 있으면 0이 아닌 종료 코드로 끝나요.

```shell
configlet fmt
```

포맷된 config 파일을 작성하라는 안내를 받으려면 `--update` 옵션(줄여서 `-u`)을 추가해요.

```shell
configlet fmt --update
```

대화형 확인 없이 포맷된 config 파일을 작성하려면 `--yes` 옵션(줄여서 `-y`)을 추가해요.

```shell
configlet fmt --update --yes
```

하나의 연습 문제에만 작업하려면 `--exercise` 옵션(줄여서 `-e`)을 사용해요.
예를 들어 `prime-factors` 연습 문제의 포맷된 config 파일을 대화형 확인 없이 작성하려면 다음과 같이 해요.

```shell
configlet fmt -uy -e prime-factors
```

JSON 파일을 작성할 때 `configlet fmt`는 다음과 같이 동작해요.

- 키/값 쌍을 정해진 순서대로 작성해요.

- 들여쓰기로 공백 두 칸을 사용해요.

- JSON 배열의 각 항목과 JSON 객체의 각 키를 각각 별도의 줄에 작성해요.

- 선택 사항이면서 값이 비어 있는 키의 키/값 쌍은 제거해요.
  예를 들어 `"source": ""`는 제거돼요.

- 실습 연습 문제의 config 파일에서는 `"test_runner": true`를 제거해요.
  `test_runner`는 선택 키예요. 명세에 따르면 `test_runner` 키를 생략하면 값이 `true`인 것으로 간주해요.

- JSON 객체에 같은 키 이름을 가진 키/값 쌍이 여러 개 있으면 마지막 하나만 남겨요.

연습 문제의 `.meta/config.json` 파일에서 정해진 키 순서는 다음과 같아요.

```text
- authors
- [contributors]
- files
  - solution
  - test
  - exemplar           (Concept Exercises only)
  - example            (Practice Exercises only)
  - [editor]
  - [invalidator]
- [language_versions]
- [forked_from]        (Concept Exercises only)
- [icon]               (Concept Exercises only)
- [test_runner]        (Practice Exercises only)
- blurb
- [source]
- [source_url]
- [custom]
```

여기서 대괄호는 감싼 키가 선택 사항임을 나타내요.

`configlet fmt`는 트랙 수준 `config.json` 파일에 있는 연습 문제에만 동작해요.
따라서 트랙에 새 연습 문제를 구현하면서 그 `.meta/config.json` 파일을 포맷하고 싶다면, 먼저 그 연습 문제를 트랙 수준 `config.json` 파일에 추가해 주세요.
연습 문제를 아직 사용자에게 공개할 준비가 되지 않았다면 `status` 값을 `wip`로 설정해 주세요.

configlet이 종료될 때 확인한 모든 config 파일이 포맷되어 있으면 종료 코드는 0이고, 그렇지 않으면 1이에요.

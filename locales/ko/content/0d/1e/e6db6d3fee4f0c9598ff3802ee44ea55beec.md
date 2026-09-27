# 소개

## 파일

파일을 다루는 함수는 `File` 모듈에서 제공해요.

파일 전체를 읽으려면 `File.read/1`을 사용해요. 파일에 쓰려면 `File.write/2`를 사용해요.

`File.write/2`로 파일에 쓸 때마다 파일 디스크립터가 열리고 새로운 Elixir [프로세스][exercism-processes]가 생성돼요. 이런 이유로, 루프 안에서 `File.write/2`를 사용해 파일에 쓰는 것은 피해야 해요.

대신 `File.open/2`로 파일을 열 수 있어요. `File.open/2`의 두 번째 인자는 모드 목록인데, 파일을 읽기용으로 열지 쓰기용으로 열지 지정할 수 있어요.

`File.open/2`는 파일을 다루는 프로세스의 PID를 반환해요. 파일을 읽고 쓰려면 `IO` 모듈의 함수를 사용하고, 이 PID를 IO 장치로 넘겨줘요.

파일 작업을 마치면 `File.close/1`으로 파일을 닫아요.

`File` 모듈의 앞서 언급한 모든 함수에는 오류 튜플을 반환하는 대신 오류를 발생시키는 `!` 변형도 있어요 (예: `File.read!/1`). 파일이 없거나 권한이 없는 등의 오류를 처리할 생각이 없다면 이 변형을 사용해요.

[exercism-processes]: https://exercism.org/tracks/elixir/concepts/processes

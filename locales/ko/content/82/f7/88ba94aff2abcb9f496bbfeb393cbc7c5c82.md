# 업그레이드

때때로 무언가를 업데이트해야 할 수 있어요.

## Pharo 이미지

Pharo Exercism 이미지의 라이브러리를 업데이트해야 한다면, 진행 중인 연습 문제를 모두 제출하고 이미지를 저장한 뒤 Pharo.image와 Pharo.changes 파일을 백업해 두는 게 좋아요. 안전하게 백업했다면, Playground에서 다음 코드를 모두 평가(선택한 뒤 meta-g를 눌러요)해요:

 ```smalltalk

 './pharo-local/iceberg/exercism' asFileReference deleteAll.
 './pharo-local/package-cache' asFileReference deleteAll.

 IceRepository reset.

 Metacello new
  baseline: 'Exercism';
  repository: 'github://exercism/pharo-smalltalk:main/releases/latest';
  onConflict: [ :ex | ex allow ];
  load.

 #ExercismManager asClass upgrade.
 ```

“ExercismTools” 패키지의 변경 사항을 잃게 된다는 안내가 나올 수 있는데, 이때는 호환되는 버전의 도구를 확보할 수 있도록 “Load”를 선택해야 해요.

특정 버전의 Exercism으로 업그레이드(또는 다운그레이드)해야 한다면, 위 스크립트에서 저장소 경로를 다음과 같이 바꿔 특정 버전 번호를 지정할 수도 있어요:

```smalltalk
 ...
  repository: 'github://exercism/pharo-smalltalk:<version-tag>';
 ...
 ```

여기서 `<versison-tag>`는 `v0.2.3`이나 `master` 같은 값이 될 수 있어요.

특정 버전을 로드한 뒤에는, 계속 작업하려는 기존 연습 문제를 평소처럼 `Exercism | Fetch...` 메뉴 항목으로 “다시 가져와야” 할 수도 있어요.

드문 경우지만(그리고 문제가 계속된다면) 새 Pharo.image 파일이 필요할 수 있어요(가장 쉬운 방법은 이 페이지 위쪽의 일반 설치 안내를 따라 새 디렉터리에 Pharo를 다시 설치하는 거예요).

## Pharo 연습 문제

이미 문제를 푼 뒤에, 새로운 테스트가 추가되거나 새로운 내용이 반영되어 연습 문제가 업데이트된 경우를 발견할 수도 있어요.

이런 경우에는 연습 문제를 최신 버전으로 업그레이드할 수 있어요. 그러면 테스트를 통과하도록 풀이를 조정해야 할 수도 있고, 조정한 코드를 다시 제출해서 추가 검토를 받을 수 있어요.

`Exercism | View Track Progress` 메뉴를 사용하면 돼요. 이 메뉴는 현재 트랙 진행 상황을 웹 브라우저로 열어 줘요. `Test suite` 탭의 페이지 아래쪽에, 더 새로운 연습 문제 버전이 감지되면 `Update exercise to latest version` 버튼이 있어요.

이 버튼을 누르고 (Download your solution 상자에 있는) `Copy` 버튼을 누르면, 그 값을 `Exercism | Fetch new exercise` 메뉴 프롬프트에 붙여넣을 수 있어요.

_참고: 버전 0.2.8부터 Pharo Exercism의 연습 문제 패키지 형식이 바뀌어서, 연습 문제가 Exercise@<Name>이라는 최상위 패키지에 나타나요(Exercism-<Name>이라는 태그 패키지 대신에요). 이미지를 업그레이드했는데 이전 패키지 이름 형식으로 나타나는 오래된 연습 문제가 있다면 여전히 제출할 수 있어요. 하지만 연습 문제 테스트까지 업데이트한다면, 새로운 테스트가 저장된 Exercise@<Name> 패키지로 풀이 클래스를 옮겨야 해요._

# 테스트

MacOS/Linux에서는 다음을 실행해 주세요:

```sh
$ chmod +x gradlew
```

테스트는 다음 명령으로 실행해요:

```sh
$ ./gradlew test
```

> Windows에서는 `gradlew.bat` 파일을 사용해요

## 건너뛴 테스트

첫 번째 테스트가 통과하면, 다른 테스트 앞에 붙은 `@Ignore` 애너테이션을 주석으로 처리하거나 제거하면서 계속해요.
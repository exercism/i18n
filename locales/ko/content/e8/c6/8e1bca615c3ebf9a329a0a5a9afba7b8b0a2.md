# 모범 사례

## 공식 모범 사례를 따라요

[Dockerfile 모범 사례](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) 공식 문서에는 Dockerfile을 개선하는 방법에 대한 유용한 내용이 많이 담겨 있어요.

## 성능

무엇보다 성능을 우선해서 최적화해야 해요(특히 테스트 러너의 경우).
그래야 툴링이 최대한 빠르게 실행되고 시간 초과가 발생하지 않아요.

### 측정하기

실행 시간을 측정하는 것은 툴링의 성능을 파악하는 아주 좋은 방법이에요.
변경한 뒤뿐만 아니라 _변경하기 전에도_ 실행 시간을 측정하는 습관을 들여요.
어떤 변경이 성능을 개선할 거라고 "확신"이 들어도 실행 시간은 꼭 측정해야 해요.

#### 스크립트

가능하다면 성능을 자동으로 측정하는 스크립트를 만들어요(_벤치마킹_이라고도 해요).
아주 유용한 명령줄 도구로 [hyperfine](https://github.com/sharkdp/hyperfine)이 있지만, 툴링에 가장 잘 맞는 것을 자유롭게 사용해도 좋아요.

최근 트랙 툴링 저장소에서는 다음 두 스크립트를 사용할 수 있어요:

1. `./bin/benchmark.sh`: 트랙 툴링 코드 벤치마킹 ([소스 코드](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark.sh))
2. `./bin/benchmark-in-docker.sh`: 트랙 툴링 Docker 이미지 벤치마킹 ([소스 코드](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark-in-docker.sh))

```exercism/note
이 파일들이 없는 트랙 툴링 저장소에서 작업하고 있다면, 위의 소스 링크를 이용해 저장소로 복사해도 좋아요.
```

```exercism/caution
벤치마킹 스크립트는 툴링의 성능을 가늠하는 데 도움이 돼요.
다만 Exercism의 프로덕션 서버에서는 성능이 더 낮은 경우가 많다는 점을 기억해요.
```

### 다양한 베이스 이미지로 실험해 보기

Ubuntu 대신 Alpine처럼 서로 다른 베이스 이미지를 실험해 보면서 어느 쪽이 (훨씬) 더 나은 성능을 내는지 확인해 봐요.
성능이 비슷하다면 더 작은 이미지를 선택해요.

### 내부 네트워크 사용해 보기

`none` 대신 `internal` 네트워크를 사용했을 때 성능이 좋아지는지 확인해 봐요.
자세한 내용은 [네트워크 문서](/docs/building/tooling/docker#network)를 참고해요.

### 실행 시점 명령보다 빌드 시점 명령을 선호해요

트랙 툴링은 다음 단계를 실행하는, 일회성의 짧게 유지되는 Docker 컨테이너를 실행해요.

1. Docker 컨테이너가 생성돼요.
2. 올바른 인자로 Docker 컨테이너가 실행돼요.
3. Docker 컨테이너가 제거돼요.

따라서 2단계에서 실행되는 코드는 _툴링이 실행될 때마다 매번_ 실행돼요.
그래서 2단계에서 실행되는 코드의 양을 줄이는 것이 성능을 개선하는 좋은 방법이에요.
방법 중 하나는 코드를 _실행 시점_에서 _빌드 시점_으로 옮기는 거예요.
실행 시점 코드는 툴링이 실행될 때마다 매번 실행되지만, 빌드 시점 코드는 (Docker 이미지가 빌드될 때) 한 번만 실행돼요.

빌드 시점 코드는 GitHub Actions 워크플로의 일부로 한 번 실행돼요.
따라서 빌드 시점에 실행되는 코드가 (상대적으로) 느려도 괜찮아요.

#### 예: 라이브러리 미리 컴파일하기

Haskell 테스트 러너에서 테스트를 실행할 때는 몇 가지 베이스 라이브러리가 컴파일되어 있어야 해요.
테스트 실행이 매번 새로운 컨테이너에서 이루어지기 때문에, 이 컴파일이 _테스트를 실행할 때마다 매번_ 이루어졌어요!
이를 피하기 위해 [Haskell 테스트 러너의 Dockerfile](https://github.com/exercism/haskell-test-runner/blob/5264c460054649fc672c3d5932c2f3cb082e2405/Dockerfile)에는 다음 두 명령이 있어요:

```dockerfile
COPY pre-compiled/ .
RUN stack build --resolver lts-20.18 --no-terminal --test --no-run-tests
```

먼저 `pre-compiled` 디렉터리를 이미지로 복사해요.
이 디렉터리는 테스트 연습 문제로 구성되어 있고, 실제 연습 문제가 의존하는 것과 같은 베이스 라이브러리에 의존해요.
그다음 이 디렉터리에서 테스트를 실행하는데, 이는 실제 연습 문제에서 테스트를 실행하는 방식과 비슷해요.
테스트를 실행하면 베이스가 컴파일되지만, 차이점은 이것이 _빌드 시점_에 일어난다는 거예요.
따라서 만들어지는 Docker 이미지는 베이스 라이브러리가 이미 컴파일된 상태가 돼요.
즉 _실행 시점_에는 컴파일이 필요 없어서 실행 속도가 (훨씬) 빨라져요.

#### 예: 바이너리 미리 컴파일하기

일부 언어는 코드를 미리 컴파일하거나 실행 시점에 컴파일할 수 있어요.
이는 빌드 시점과 실행 시점 사이의 트레이드오프이고, 다시 말하지만 우리는 성능을 이유로 빌드 시점 실행을 선호해요.

[C# 테스트 러너의 Dockerfile](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile)이 이 방식을 사용하는데, 코드를 (실행 시점에) 즉시 컴파일하는 대신 테스트 러너를 미리(빌드 시점에) 바이너리로 컴파일해요.
따라서 실행 시점에 해야 할 작업이 줄어들어 성능을 높이는 데 도움이 돼요.

## 크기

이미지의 크기를 줄이도록 노력해야 해요. 그러면 다음과 같은 이점이 있어요:

- 배포가 더 빨라져요
- 비용을 줄여줘요
- 각 컨테이너의 시작 시간이 개선돼요

### 다양한 배포판 사용해 보기

배포판 이미지마다 크기가 달라요.
예를 들어 `alpine:3.20.2` 이미지는 `ubuntu:24.10` 이미지보다 **열 배** 작아요:

```
REPOSITORY   TAG       SIZE
alpine       3.20.2    8.83MB
ubuntu       24.10     101MB
```

일반적으로 Alpine 기반 이미지가 가장 작은 이미지에 속하기 때문에, 많은 툴링 이미지가 Alpine을 기반으로 해요.

### 슬림 이미지 사용해 보기

일부 이미지에는 특별한 "slim" 변형이 있는데, 여기서는 일부 기능이 제거되어 이미지 크기가 더 작아요.
예를 들어 `node:20.16.0-slim` 이미지는 `node:20.16.0` 이미지보다 **다섯 배** 작아요:

```
REPOSITORY   TAG            SIZE
node         20.16.0        1.09GB
node         20.16.0-slim   219MB
```

"slim" 변형이 더 작은 이유는 기능이 더 적기 때문이에요.
이미지에 추가 기능이 필요 없을 수도 있는데, 그렇다면 "slim" 변형 사용을 고려해 봐요.

### 불필요한 요소 제거하기

이미지 크기를 줄이는 뻔하지만 아주 좋은 방법은 필요 없는 것을 모두 제거하는 거예요.
예를 들어 다음과 같은 것들이 있어요:

- 바이너리를 빌드한 뒤 더 이상 필요 없는 소스 파일
- Docker 이미지와 다른 아키텍처를 대상으로 하는 파일
- 문서

#### 패키지 관리자 파일 제거하기

대부분의 Docker 이미지는 추가 패키지를 설치해야 하는데, 보통 패키지 관리자를 통해 이루어져요.
이런 패키지는 _빌드 시점_에 설치해야 해요(_실행 시점_에는 인터넷 연결을 사용할 수 없기 때문이에요).
따라서 패키지 관리자의 캐시/기록 파일은 추가 패키지를 설치한 뒤 제거해야 해요.

##### apk

`apk` 패키지 관리자를 사용하는 배포판(예: Alpine)은 `apk add`로 패키지를 설치할 때 `--no-cache` 플래그를 사용해야 해요:

```dockerfile
RUN apk add --no-cache curl
```

##### apt-get/apt

`apt-get`/`apk` 패키지 관리자를 사용하는 배포판(예: Ubuntu)은 패키지를 설치한 _뒤에_, 같은 `RUN` 명령 안에서 `apt-get autoremove -y`와 `rm -rf /var/lib/apt/lists/*` 명령을 실행해야 해요:

```dockerfile
RUN apt-get update && \
    apt-get install curl -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
```

### 멀티 스테이지 빌드 사용하기

Docker에는 [멀티 스테이지 빌드](https://docs.docker.com/build/building/multi-stage/)라는 기능이 있어요.
이를 이용하면 Dockerfile을 별도의 _스테이지_로 나눌 수 있고, 마지막 스테이지만 최종 Docker 이미지에 포함돼요(나머지는 마지막 스테이지를 빌드하도록 돕기 위해서만 존재해요).
각 스테이지를 그 자체로 작은 Dockerfile이라고 생각해도 돼요. 스테이지마다 서로 다른 베이스 이미지를 사용할 수 있어요.

멀티 스테이지 빌드는 Dockerfile에서 _오직_ 빌드 시점에만 필요한 패키지를 설치해야 할 때 특히 유용해요.
이 경우 Dockerfile의 일반적인 구조는 다음과 같아요:

1. 새 스테이지를 정의해요(이 스테이지를 "build" 스테이지라고 불러요).
   이 스테이지는 _오직_ 빌드 시점에만 사용돼요.
2. 필요한 추가 패키지를 ("build" 스테이지에) 설치해요.
3. 추가 패키지가 필요한 명령을 ("build" 스테이지 안에서) 실행해요.
4. 새 스테이지를 정의해요(이 스테이지를 "runtime" 스테이지라고 불러요).
   이 스테이지가 최종 Docker 이미지를 구성하고 실행 시점에 실행돼요.
5. 3단계에서 ("build" 스테이지에서) 실행한 명령의 결과를 이 스테이지("runtime" 스테이지)로 복사해요.

이렇게 구성하면 추가 패키지는 "build" 스테이지에만 설치되고 "runtime" 스테이지에는 설치되지 않으므로, 최종적으로 만들어지는 Docker 이미지에 포함되지 않아요.

#### 예: 파일 다운로드하기

Fortran 테스트 러너는 파일을 다운로드하기 위해 `curl`이 필요해요.
하지만 실행 시점 이미지에는 `curl`이 필요 _없어서_, 멀티 스테이지 빌드에 딱 맞는 사례예요.

먼저 [Dockerfile](https://github.com/exercism/fortran-test-runner/blob/783e228d8449143d2040e68b95128bb791833a27/Dockerfile)에서 ("build"라는 이름의) 스테이지를 정의하고, 여기에 `curl` 패키지를 설치해요.
그다음 curl을 사용해 그 스테이지로 파일을 다운로드해요.

```dockerfile
FROM alpine:3.15 AS build

RUN apk add --no-cache curl

WORKDIR /opt/test-runner
COPY bust_cache .

WORKDIR /opt/test-runner/testlib
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/testlib/CMakeLists.txt
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/testlib/TesterMain.f90

WORKDIR /opt/test-runner
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/config/CMakeLists.txt
```

Dockerfile의 두 번째 부분에서는 새 스테이지를 정의하고, `COPY` 명령으로 다운로드한 파일을 "build" 스테이지에서 자신의 스테이지로 복사해요:

```dockerfile
FROM alpine:3.15

RUN apk add --no-cache coreutils jq gfortran libc-dev cmake make

WORKDIR /opt/test-runner
COPY --from=build /opt/test-runner/ .

COPY . .
ENTRYPOINT ["/opt/test-runner/bin/run.sh"]
```

##### 예: 라이브러리 설치하기

Ruby 테스트 러너는 필요한 라이브러리(gem)를 설치하기 전에 `git`, `openssh`, `build-base`, `gcc`, `wget` 패키지가 설치되어 있어야 해요.
[Dockerfile](https://github.com/exercism/ruby-test-runner/blob/e57ed45b553d6c6411faeea55efa3a4754d1cdbf/Dockerfile)은 (`build`라는 이름의) 스테이지로 시작해서 해당 패키지를 (`apk add`로) 설치한 다음, (`bundle install`로) 의존성을 설치해요:

```dockerfile
FROM ruby:3.2.2-alpine3.18 AS build

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh build-base gcc wget git

COPY Gemfile Gemfile.lock .

RUN gem install bundler:2.4.18 && \
    bundle config set without 'development test' && \
    bundle install
```

그다음 최종 Docker 이미지를 구성할 스테이지를 정의해요.
이 스테이지는 이전 스테이지가 설치한 의존성을 설치하지 _않고_, 대신 `COPY` 명령으로 설치된 라이브러리를 build 스테이지에서 자신의 스테이지로 복사해요:

```dockerfile
FROM ruby:3.2.2-alpine3.18

RUN apk add --no-cache bash

WORKDIR /opt/test-runner

COPY --from=build /usr/local/bundle /usr/local/bundle

COPY . .

ENTRYPOINT [ "sh", "/opt/test-runner/bin/run.sh" ]
```

```exercism/note
[C# 테스트 러너의 Dockerfile](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile)도 비슷한 방식을 사용하는데, 이 경우에는 build 스테이지에서 라이브러리를 설치하는 데 필요한 추가 패키지가 미리 설치된 기존 Docker 이미지를 사용할 수 있어요.
```

## 테스트

### 통합 테스트 사용하기

단위 테스트도 매우 유용할 수 있지만, [통합 테스트](https://en.wikipedia.org/wiki/Integration_testing) 작성에 집중하는 것을 권장해요.
통합 테스트의 가장 큰 장점은 프로덕션에서 툴링이 어떻게 실행되는지를 더 잘 검증해 주고, 따라서 툴링 구현에 대한 확신을 높여 준다는 거예요.

#### Docker 사용하기

프로덕션 환경을 가장 잘 흉내 내려면, 통합 테스트는 _프로덕션 환경처럼_ 툴링을 실행해야 해요.
즉 Docker 이미지를 빌드한 다음, 빌드한 이미지를 솔루션에서 실행해 출력을 검증해요.

#### 골든 테스트 사용하기

통합 테스트는 [골든 테스트](https://ro-che.info/articles/2017-12-04-golden-tests)로 정의하는 것이 좋아요. 골든 테스트는 기대하는 출력을 파일에 저장해 두는 테스트예요.
툴링의 출력도 파일이기 때문에, 트랙 툴링 통합 테스트에 딱 맞아요.

##### 예: 테스트 러너

솔루션에서 테스트 러너를 실행하면 출력은 `results.json` 파일이에요.
그러면 이 파일을 "정상 동작하는" (즉 "기대하는") 출력 파일(`expected_results.json`)과 비교해서 테스트 러너가 의도한 대로 동작하는지 확인할 수 있어요.

## 안전

안전은 우리가 툴링을 실행하는 데 Docker 컨테이너를 사용하는 주된 이유예요.

### 공식 이미지 선호하기

[Docker Hub](https://hub.docker.com/)에는 많은 Docker 이미지가 있지만, [공식 이미지](https://hub.docker.com/search?q=&image_filter=official)를 사용해 봐요.
공식 이미지는 관리되고 있어서 안전하지 않을 가능성이 (훨씬) 적어요.

### 버전 고정하기

빌드가 안정적으로 유지되도록(즉, 갑자기 깨지지 않도록) 하려면 베이스 이미지를 항상 특정 태그로 고정해야 해요.
즉, 다음과 같이 하는 대신:

```dockerfile
FROM alpine:latest
```

다음과 같이 사용해요:

```dockerfile
FROM alpine:3.20.2
```

후자를 사용하면 빌드가 항상 같은 버전을 사용해요.

### 비권한 사용자로 실행하기

기본적으로 많은 이미지가 root 권한을 가진 사용자로 실행돼요.
비권한 사용자로 실행하는 것을 고려해 봐요.

```dockerfile
FROM alpine

RUN groupadd -r myuser && useradd -r -g myuser myuser

# RUN <COMMANDS THAT REQUIRE ROOT USER, E.G. INSTALLING PACKAGES>

USER myuser
```

### 패키지 저장소를 최신 버전으로 업데이트하기

(거의) 항상 최신 버전을 설치하는 것이 좋아요

```dockerfile
RUN apt-get update && \
    apt-get install curl
```

### 읽기 전용 파일 시스템 지원하기

우리는 Docker 파일을 읽기 전용 파일 시스템을 사용해 작성하는 것을 권장해요.
쓰기 가능하다고 가정해도 되는 디렉터리는 다음과 같아요:

- 솔루션 디렉터리(두 번째 인자로 전달돼요)
- 출력 디렉터리(세 번째 인자로 전달돼요)
- `/tmp` 디렉터리

```exercism/caution
현재 우리 프로덕션 환경은 읽기 전용 파일 시스템을 강제하지 _않지만_, 앞으로는 그렇게 될 수도 있어요.
이런 이유로 새 테스트 러너/분석기/리프리젠터의 기본 템플릿은 읽기 전용 파일 시스템으로 시작해요.
읽기 전용 파일에서는 제대로 동작하게 만들 수 없다면, (지금은) 쓰기 가능한 파일 시스템을 가정해도 좋아요.
```

# 소개

Coq은 프로그래밍 언어이면서 동시에 논리 체계예요. [커리-하워드 대응](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence)을 바탕으로 하고 있죠.
의미 있는 논리 체계가 되기 위해, Coq은 어떤 프로그램을 작성하든 반드시 종료된다는 것이 보장되도록 설계됐어요.
그래서 Coq은 범용으로 쓰이는 일은 드물고, 대신 *수학의 이론*을 전개하고 *검증된 프로그램*을 작성할 수 있게 해줘요.

Coq은 대화형 증명 보조기이기도 해요.
정리를 자동으로 풀어 주지는 않지만, 전술을 이용해 사용자가 증명을 만들어 가도록 도와줘요.
전술 언어(Ltac)는 그 자체로 하나의 언어이고, 증명의 일부를 자동화할 수 있게 해줘요.
잘 작성된 증명 스크립트는 산문으로 쓴 비형식적 증명과 비슷해요.

Coq을 활용하는 주요 응용/연구 분야는 다음과 같아요:

* 수학 (정수론, 집합론, 논리 이론, 계산 가능성 이론, 대수학, 기하학, ...)
* 프로그래밍 언어 (컴파일러, 실행 모델, 컴파일러 최적화, 타입 시스템, ...)
* 검증된 알고리즘 (알고리즘의 정확성과 종료 여부) 및 범용 언어(보통 Ocaml이나 Haskell)로의 추출

주목할 만한 Coq 개발 사례로는 다음이 있어요:

* [4색 문제](https://madiot.fr/coq100/#32)의 기계 검증 증명
* 검증된 C 컴파일러인 [CompCert](http://compcert.inria.fr/compcert-C.html)

Coq에 관심이 있지만 아직 배우지 않았다면, [Software Foundations](https://softwarefoundations.cis.upenn.edu/) 시리즈로 시작하는 것이 좋다고들 해요.
특히 처음 몇 장("IndProp"까지)을 보면 더 흥미로운 개념과 이론을 다루기 전에 필요한 기본기를 다질 수 있어요.
[다른 자료들](https://coq.inria.fr/documentation)도 흥미롭게 볼 수 있을 거예요.

Coq과 Coq을 이용한 개발에 관한 이야기는 주로 [Reddit /r/coq](https://www.reddit.com/r/Coq/)와 [Discourse](https://coq.discourse.group/latest)에서 나눠요.
질문이 있다면 [StackOverflow](https://stackoverflow.com/questions/tagged/coq?sort=newest&pageSize=50)에서 도움을 받을 수도 있어요. 질문에 "coq" 태그를 붙이는 것도 잊지 마세요.
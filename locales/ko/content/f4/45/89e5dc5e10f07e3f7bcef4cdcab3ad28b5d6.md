# 중요한 파일이 변경되지 않았을 때의 워크플로

연습 문제를 수정하는 트랙 PR이 병합되면, 학생들이 게시한 최신 풀이가 _모두_ 다시 테스트돼요.
인기 있는 연습 문제라면 이 작업에는 _엄청나게_ 많은 비용이 들어요(극단적인 예로, Python Hello World의 경우 테스트 실행이 7만 번에 달해요!).

이 워크플로는 PR의 변경 사항이 풀이의 재테스트를 유발하는지 확인하고, 그렇다면 PR을 _그대로_ 병합했을 때의 위험을 설명하는 댓글을 남겨요.
풀이를 다시 테스트하지 않고 PR을 병합하는 방법도 알려줘요.

자세한 내용은 [불필요한 테스트 실행 유발 피하기](https://exercism.org/docs/building/tracks#h-avoiding-triggering-unnecessary-test-runs) 문서를 확인해 봐요.

## 출처

워크플로는 `.github/workflows/no-important-files-changed.yml` 파일에 정의되어 있어요.

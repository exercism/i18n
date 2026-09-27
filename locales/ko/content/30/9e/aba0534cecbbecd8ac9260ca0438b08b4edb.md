# 안내 추가

## Rust의 병렬 문자 빈도

Rust의 동시성에 대해 더 알아보려면 다음을 참고해요:

- [동시성](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

## 보너스

이 연습 문제에는 순차 구현을 기준으로 삼는 벤치마크도 포함되어 있어요. 내 풀이를 벤치마크와 비교해 볼 수 있어요. 입력 크기가 다를 때 각각의 성능이 어떻게 달라지는지 관찰해 봐요. 동시성 프로그래밍 기법으로 벤치마크를 뛰어넘을 수 있을까요?

이 글을 쓰는 시점에서 test::Bencher는 불안정하고 *nightly* Rust에서만 사용할 수 있어요. Cargo로 벤치마크를 실행해요:

```
cargo bench
```

rustup.rs를 사용하고 있다면:

```
rustup run nightly cargo bench
```

- [벤치마크 테스트](https://doc.rust-lang.org/stable/unstable-book/library-features/test.html)

nightly Rust에 대해 더 알아보려면:

- [Nightly Rust](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [Rust nightly 설치하기](https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust)

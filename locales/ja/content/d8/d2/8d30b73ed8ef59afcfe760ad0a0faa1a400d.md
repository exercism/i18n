# ヒント

## 1. ロボットの向きを合わせる
- 操作を実行する順番が重要です。
- ベクトルのベクトルを行列に変換する方法は、いくつかあります。
- 行列を作るのに役立つアイデアとして、内包表記、`for`ループ、[`hcat`][hcat-ref]、[`reshape`][reshape-ref]、[`stack`][stack-ref]などがあります。

## 2. ロボットを回転させる
- 行列を回転させる方法については、「はじめに」を参照してください。
- 必要なのは、単純な行列の積だけです。

## 3. 正しい向きになっているか確認する
- 向きを示すのは、行列の*2番目*の列だということを覚えておきましょう。
- これは内積で確認できます。
- ベクトルを正規化するとよいでしょう。
- 浮動小数点の誤差がある場合は、向きが[およそ][isapprox-ref]`~1e-7`程度に等しければ十分です。
- 次の等式が役立つかもしれません。`x⋅y = ||x||*||y||cos(θ)`（ここで[`||x|| = norm(x)`][norm-ref]）

## 4. ロボットの機体座標
- とても単純なことですが、要素ごとの演算が重要です。
- 向きを表す行列は、原点から伸びる3つの位置ベクトルとみなせることを覚えておきましょう。

[hcat-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.hcat
[reshape-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.reshape
[stack-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.stack
[isapprox-ref]: https://docs.julialang.org/en/v1/base/math/#Base.isapprox
[norm-ref]: https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/#LinearAlgebra.norm

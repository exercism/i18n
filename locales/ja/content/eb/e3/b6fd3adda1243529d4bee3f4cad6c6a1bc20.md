# ヒント

## 全般

- この演習はどの部分もビット演算が土台になっています。
  - Exercismの[学習シラバス][concept-bitwise-operations]では、やさしく導入を説明しています。
  - [ビット演算子][ref-bitwise-operators]はJuliaのマニュアルに一覧があります。
  - `Base`には、[count_ones()][count_ones]や[trailing_zeros()][trailing_zeros]をはじめ、ビット関連の便利な関数がそろっています。
- テストは型について細かく指定しようとはしていませんが、この演習で扱うのは符号なしバイトなので、[`UInt8`][uint8]の値は比較的考えやすい型です。
  - 引数と戻り値は`Vector{UInt8}`です。
  - `UInt8`の値は、ビットマスクや途中の値に便利です。
- 10進数は気が散るだけなので、`UInt8`のリテラルには16進数（`0xFF`）や2進数（`0b11111111`）を使いましょう。
  - [`bitstring()`][bitstring]関数は、人間が読める2進数の形式で出力してくれるので、デバッグに役立ちます。
- 生のメッセージは8ビットのまとまりの配列として届き、それを上位ビット側に7ビットのまとまり、最下位ビットにパリティビットを置く形に変換する必要があります。
  - 必要なビットを取り出すには、`&`や`|`を使ったビットマスクを使います。
  - 左シフト（`<<`）と論理右シフト（`>>>`）の演算子が重要です。
  - あふれたビットを次の処理に引き継ぐ方法を考えましょう。
  - 引き継ぐビットがあると、入力のバイトをそれぞれ独立に扱うのは難しくなるので、高階関数で何とかしようとするより、ループ（あるいは再帰）のほうが簡単でしょう。
  - エンコードされたメッセージは、1バイトにつき1ビットのパリティビットを確保するため、生のメッセージより長く（バイト数が多く）なるのが普通です。


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring

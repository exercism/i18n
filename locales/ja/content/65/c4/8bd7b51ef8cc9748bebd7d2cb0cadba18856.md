# はじめに

## Access Behaviour

Elixirでは、コードの_Behaviour_を使って、共通の汎用的なインターフェースを提供しながら、それを実装するモジュールごとに固有の実装を行えるようにしています。そのようなよくある例のひとつが_Access Behaviour_です。

_Access Behaviour_は、キーを基にしたデータ構造からデータを取り出すための共通のインターフェースを提供します。_Access Behaviour_はマップとキーワードリストに対して実装されていますが、ここではマップでの使い方を見て、その雰囲気をつかんでみましょう。_Access Behaviour_では、マップがあるとき、そのあとに_角括弧_を続けてキーを書くと、そのキーに対応する値を取り出せると定められています。

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

データ構造の中にそのキーが存在しない場合、`nil`が返ります。これはエラーを発生させないため、意図しない動作の原因になることがあります。なお、`nil`自体もAccess Behaviourを実装しており、どんなキーに対しても常に`nil`を返します。

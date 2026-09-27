# Introdução

## Access Behaviour

O Elixir recorre a _Behaviours_ no código para disponibilizar interfaces genéricas comuns e, ao mesmo tempo, facilitar implementações específicas para cada módulo que os implementa. Um desses exemplos comuns é o _Access Behaviour_.

O _Access Behaviour_ disponibiliza uma interface comum para obter dados de uma estrutura de dados baseada em chaves. O _Access Behaviour_ está implementado para mapas e listas de palavras-chave, mas vamos ver como se usa com mapas para perceberes melhor como funciona. O _Access Behaviour_ determina que, quando tens um mapa, podes escrever a seguir a ele _parênteses retos_ e usar a chave para obter o valor associado a essa chave.

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

Se a chave não existir na estrutura de dados, é devolvido `nil`. Isto pode dar origem a comportamento indesejado, porque não lança um erro. Repara que o próprio `nil` implementa o Access Behaviour e devolve sempre `nil` para qualquer chave.

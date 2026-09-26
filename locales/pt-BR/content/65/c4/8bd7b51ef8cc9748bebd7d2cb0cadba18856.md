# Introdução

## Access Behaviour

O Elixir usa _Behaviours_ no código para oferecer interfaces genéricas comuns e, ao mesmo tempo, permitir implementações específicas para cada módulo que os implementa. Um exemplo comum disso é o _Access Behaviour_.

O _Access Behaviour_ oferece uma interface comum para recuperar dados de uma estrutura de dados baseada em chaves. Ele é implementado para mapas e listas de palavras-chave, mas vamos ver como ele é usado com mapas para você entender melhor. O _Access Behaviour_ define que, quando você tem um mapa, pode escrever _colchetes_ logo depois dele e usar a chave para recuperar o valor associado a essa chave.

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

Se a chave não existir na estrutura de dados, `nil` é retornado. Isso pode gerar comportamentos indesejados, porque nenhum erro é lançado. Repare que o próprio `nil` implementa o Access Behaviour e sempre retorna `nil` para qualquer chave.

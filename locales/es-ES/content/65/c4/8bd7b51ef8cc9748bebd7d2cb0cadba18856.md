# Introducción

## El comportamiento Access

Elixir utiliza los _Behaviours_ para proporcionar interfaces genéricas comunes y, a la vez, facilitar implementaciones específicas para cada módulo que los implementa. Un ejemplo común de esto es el _Access Behaviour_.

El _Access Behaviour_ proporciona una interfaz común para obtener datos de una estructura de datos basada en claves. El _Access Behaviour_ está implementado para mapas y listas de palabras clave, pero veamos cómo se usa con los mapas para hacernos una idea. El _Access Behaviour_ especifica que, cuando tienes un mapa, puedes escribir a continuación unos _corchetes_ y usar la clave para obtener el valor asociado a esa clave.

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

Si la clave no existe en la estructura de datos, se devuelve `nil`. Esto puede dar lugar a un comportamiento no deseado, ya que no lanza un error. Ten en cuenta que `nil` también implementa el Access Behaviour y siempre devuelve `nil` para cualquier clave.

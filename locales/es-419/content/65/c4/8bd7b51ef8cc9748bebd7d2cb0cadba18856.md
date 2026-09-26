# Introducción

## Comportamiento Access

Elixir usa los _comportamientos_ en el código para proporcionar interfaces genéricas comunes y, al mismo tiempo, facilitar implementaciones específicas para cada módulo que los implemente. Un ejemplo común de esto es el _comportamiento Access_.

El _comportamiento Access_ proporciona una interfaz común para obtener datos de una estructura de datos basada en claves. El _comportamiento Access_ está implementado para mapas y listas de palabras clave, pero veamos su uso con los mapas para que te hagas una idea. El _comportamiento Access_ especifica que cuando tienes un mapa, puedes escribir _corchetes (`[]`)_ después de él y luego usar la clave para obtener el valor asociado a esa clave.

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

Si la clave no existe en la estructura de datos, se devuelve `nil`. Esto puede ser una fuente de comportamiento no deseado, porque no lanza un error. Ten en cuenta que `nil` en sí mismo implementa el comportamiento Access y siempre devuelve `nil` para cualquier clave.

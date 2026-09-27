# Instrucciones

En este ejercicio vas a simular un sistema informático basado en ventanas.
Crearás algunas ventanas que se pueden mover y redimensionar.
La siguiente imagen es representativa de los valores con los que trabajarás a continuación.

```text
                  <--------------------- screenSize.width --------------------->

       ^          ┌────────────────────────────────────────────────────────────┐
       |          │                                                            │
       |          │         position.x, _                                      │
       |          │         position.y   \                                     │
       |          │                       \<----- size.width ----->            │
       |          │                 ^      *──────────────────────┐            │
       |          │                 |      │        title         │            │
       |          │                 |      ├──────────────────────┤            │
screenSize.height │                 |      │                      │            │
       |          │            size.height │                      │            │
       |          │                 |      │       contents       │            │
       |          │                 |      │                      │            │
       |          │                 |      │                      │            │
       |          │                 v      └──────────────────────┘            │
       |          │                                                            │
       |          │                                                            │
       v          └────────────────────────────────────────────────────────────┘
```

📣 Para practicar tu amplia variedad de habilidades con JavaScript, **intenta resolver las tareas 1 y 2 con sintaxis de prototipos y las tareas restantes con sintaxis de clases**.

## 1. Define Size para almacenar las dimensiones de la ventana

Define una clase (función constructora) llamada `Size`.
Debe tener dos campos, `width` y `height`, que almacenan las dimensiones actuales de la ventana.
La función constructora debe aceptar valores iniciales para estos campos.
La anchura se proporciona como primer parámetro y la altura como segundo.
La anchura y la altura predeterminadas deben ser `80` y `60`, respectivamente.

Además, define un método `resize(newWidth, newHeight)` que recibe una nueva anchura y altura como parámetros y cambia los campos para reflejar el nuevo tamaño.

```javascript
const size = new Size(1080, 764);
size.width;
// => 1080
size.height;
// => 764

size.resize(1920, 1080);
size.width;
// => 1920
size.height;
// => 1080
```

## 2. Define Position para almacenar la posición de una ventana

Define una clase (función constructora) llamada `Position` con dos campos, `x` e `y`, que almacenan la posición horizontal y vertical actuales, respectivamente, de la esquina superior izquierda de la ventana.
La función constructora debe aceptar valores iniciales para estos campos.
El valor de `x` se proporciona como primer parámetro y el de `y` como segundo.
El valor predeterminado debe ser `0` para ambos campos.

La posición (0, 0) es la esquina superior izquierda de la pantalla, con los valores de `x` que aumentan a medida que te mueves hacia la derecha y los valores de `y` que aumentan a medida que te mueves hacia abajo.

Define también un método `move(newX, newY)` que recibe nuevos parámetros x e y y cambia las propiedades para reflejar la nueva posición.

```javascript
const point = new Position();
point.x;
// => 0
point.y;
// => 0

point.move(100, 200);
point.x;
// => 100
point.y;
// => 200
```

## 3. Define una clase ProgramWindow

Define una clase `ProgramWindow` con los siguientes campos:

- `screenSize`: contiene un valor fijo de tipo `Size` con `width` 800 y `height` 600
- `size` : contiene un valor de tipo `Size`; el valor inicial es el valor predeterminado de la instancia de `Size`
- `position` : contiene un valor de tipo `Position`; el valor inicial es el valor predeterminado de la instancia de `Position`

Cuando se abre (crea) la ventana, siempre tiene el tamaño y la posición predeterminados al principio.

```javascript
const programWindow = new ProgramWindow();
programWindow.screenSize.width;
// => 800

// Similar for the other fields.
```

Nota: se usa el nombre `ProgramWindow` en lugar de `Window` para diferenciar la clase de la clase `Window` integrada que existe en los entornos de navegador.

## 4. Añade un método para redimensionar la ventana

La clase `ProgramWindow` debe incluir un método `resize`.
Debe aceptar como entrada un parámetro de tipo `Size` e intentar redimensionar la ventana al tamaño especificado.

Sin embargo, el nuevo tamaño no puede superar ciertos límites.

- La altura o la anchura mínimas permitidas son 1.
  Las alturas o anchuras solicitadas menores que 1 se recortarán a 1.
- La altura y la anchura máximas dependen de la posición actual de la ventana; los bordes de la ventana no pueden superar los bordes de la pantalla.
  Los valores mayores que estos límites se recortarán al mayor tamaño que puedan tomar.
  Por ejemplo, si la posición de la ventana está en `x` = 400, `y` = 300 y se solicita un redimensionado a `height` = 400, `width` = 300, la ventana se redimensionaría a `height` = 300, `width` = 300, ya que la pantalla no es lo suficientemente grande en la dirección `y` para acomodar por completo la solicitud.

```javascript
const programWindow = new ProgramWindow();

const newSize = new Size(600, 400);
programWindow.resize(newSize);
programWindow.size.width;
// => 600
programWindow.size.height;
// => 400
```

## 5. Añade un método para mover la ventana

Además de la funcionalidad de redimensionado, la clase `ProgramWindow` también debe incluir un método `move`.
Debe aceptar como entrada un parámetro de tipo `Position`.
El método `move` es similar a `resize`; sin embargo, este método ajusta la _posición_ de la ventana al valor solicitado, en lugar del tamaño.

Al igual que con `resize`, la nueva posición no puede superar ciertos límites.

- La posición más pequeña es 0 tanto para `x` como para `y`.
- La posición máxima en cualquier dirección depende del tamaño actual de la ventana.
  Los bordes no pueden superar los bordes de la pantalla.
  Los valores mayores que estos límites se recortarán al mayor tamaño que puedan tomar.
  Por ejemplo, si el tamaño de la ventana está en `x` = 250, `y` = 100 y se solicita un movimiento a `x` = 600, `y` = 200, la ventana se movería a `x` = 550, `y` = 200, ya que la pantalla no es lo suficientemente grande en la dirección `x` para acomodar por completo la solicitud.

```javascript
const programWindow = new ProgramWindow();

const newPosition = new Position(50, 100);
programWindow.move(newPosition);
programWindow.position.x;
// => 50
programWindow.position.y;
// => 100
```

## 6. Cambia una ventana de programa

Implementa una función `changeWindow` que acepta como entrada una instancia de `ProgramWindow` y cambia la ventana al tamaño y la posición especificados.
La función debe devolver la instancia de `ProgramWindow` que se pasó después de aplicar los cambios.

La ventana debe tener una anchura de 400, una altura de 300 y estar situada en x = 100, y = 150.

```javascript
const programWindow = new ProgramWindow();
changeWindow(programWindow);
programWindow.size.width;
// => 400

// Similar for the other fields.
```

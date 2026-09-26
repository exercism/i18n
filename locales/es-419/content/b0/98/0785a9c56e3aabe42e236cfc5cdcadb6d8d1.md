# Instrucciones

En este ejercicio, vas a simular un sistema de computadora basado en ventanas.
Vas a crear algunas ventanas que se pueden mover y cambiar de tamaño.
La siguiente imagen es representativa de los valores con los que vas a trabajar a continuación.

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

📣 Para practicar tu amplio rango de habilidades de JavaScript, **intenta resolver las tareas 1 y 2 con sintaxis de prototipos y las tareas restantes con sintaxis de clases**.

## 1. Define Size para guardar las dimensiones de la ventana

Define una clase (función constructora) llamada `Size`.
Debe tener dos campos, `width` y `height`, que almacenan las dimensiones actuales de la ventana.
La función constructora debe aceptar valores iniciales para estos campos.
El ancho se proporciona como primer parámetro y la altura como segundo.
El ancho y la altura predeterminados deben ser `80` y `60`, respectivamente.

Además, define un método `resize(newWidth, newHeight)` que reciba un nuevo ancho y una nueva altura como parámetros y cambie los campos para reflejar el nuevo tamaño.

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

## 2. Define Position para guardar la posición de una ventana

Define una clase (función constructora) llamada `Position` con dos campos, `x` y `y`, que almacenan la posición horizontal y vertical actuales, respectivamente, de la esquina superior izquierda de la ventana.
La función constructora debe aceptar valores iniciales para estos campos.
El valor de `x` se proporciona como primer parámetro y el valor de `y` como segundo.
El valor predeterminado debe ser `0` para ambos campos.

La posición (0, 0) es la esquina superior izquierda de la pantalla, donde los valores de `x` aumentan a medida que te mueves a la derecha y los valores de `y` aumentan a medida que te mueves hacia abajo.

También define un método `move(newX, newY)` que reciba nuevos parámetros x e y y cambie las propiedades para reflejar la nueva posición.

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

Nota aparte: el nombre `ProgramWindow` se usa en lugar de `Window` para diferenciar la clase de la clase `Window` integrada que existe en los entornos de navegador.

## 4. Agrega un método para cambiar el tamaño de la ventana

La clase `ProgramWindow` debe incluir un método `resize`.
Debe aceptar como argumento un parámetro de tipo `Size` e intentar cambiar el tamaño de la ventana al tamaño especificado.

Sin embargo, el nuevo tamaño no puede exceder ciertos límites.

- La altura o el ancho mínimo permitido es 1.
  Las alturas o los anchos solicitados menores que 1 se recortarán a 1.
- La altura y el ancho máximos dependen de la posición actual de la ventana; los bordes de la ventana no pueden sobrepasar los bordes de la pantalla.
  Los valores mayores que estos límites se recortarán al mayor tamaño que puedan alcanzar.
  Por ejemplo, si la posición de la ventana es `x` = 400, `y` = 300 y se solicita un cambio de tamaño a `height` = 400, `width` = 300, entonces la ventana se cambiaría a `height` = 300, `width` = 300, ya que la pantalla no es lo suficientemente grande en la dirección `y` para acomodar completamente la solicitud.

```javascript
const programWindow = new ProgramWindow();

const newSize = new Size(600, 400);
programWindow.resize(newSize);
programWindow.size.width;
// => 600
programWindow.size.height;
// => 400
```

## 5. Agrega un método para mover la ventana

Además de la funcionalidad de cambiar el tamaño, la clase `ProgramWindow` también debe incluir un método `move`.
Debe aceptar como argumento un parámetro de tipo `Position`.
El método `move` es similar a `resize`; sin embargo, este método ajusta la _posición_ de la ventana al valor solicitado, en lugar del tamaño.

Al igual que con `resize`, la nueva posición no puede exceder ciertos límites.

- La posición más pequeña es 0 tanto para `x` como para `y`.
- La posición máxima en cualquier dirección depende del tamaño actual de la ventana.
  Los bordes no pueden sobrepasar los bordes de la pantalla.
  Los valores mayores que estos límites se recortarán al mayor tamaño que puedan alcanzar.
  Por ejemplo, si el tamaño de la ventana está en `x` = 250, `y` = 100 y se solicita un movimiento a `x` = 600, `y` = 200, entonces la ventana se movería a `x` = 550, `y` = 200, ya que la pantalla no es lo suficientemente grande en la dirección `x` para acomodar completamente la solicitud.

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

Implementa una función `changeWindow` que acepte como argumento una instancia de `ProgramWindow` y cambie la ventana al tamaño y la posición especificados.
La función debe devolver la instancia de `ProgramWindow` que se pasó después de aplicar los cambios.

La ventana debe tener un ancho de 400, una altura de 300 y estar posicionada en x = 100, y = 150.

```javascript
const programWindow = new ProgramWindow();
changeWindow(programWindow);
programWindow.size.width;
// => 400

// Similar for the other fields.
```

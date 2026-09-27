# Instruções

Neste exercício, vais simular um sistema informático baseado em janelas.
Vais criar algumas janelas que podem ser movidas e redimensionadas.
A imagem seguinte é representativa dos valores com que vais trabalhar abaixo.

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

📣 Para praticares a tua vasta gama de competências em JavaScript, **tenta resolver as tarefas 1 e 2 com sintaxe de protótipos e as tarefas restantes com sintaxe de classes**.

## 1. Define Size para armazenar as dimensões da janela

Define uma classe (função construtora) chamada `Size`.
Deve ter dois campos, `width` e `height`, que armazenam as dimensões atuais da janela.
A função construtora deve aceitar valores iniciais para estes campos.
A largura é fornecida como primeiro parâmetro e a altura como segundo.
Os valores predefinidos da largura e da altura devem ser `80` e `60`, respetivamente.

Além disso, define um método `resize(newWidth, newHeight)` que recebe uma nova largura e altura como parâmetros e altera os campos para refletir o novo tamanho.

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

## 2. Define Position para armazenar a posição de uma janela

Define uma classe (função construtora) chamada `Position` com dois campos, `x` e `y`, que armazenam a posição horizontal e vertical atual, respetivamente, do canto superior esquerdo da janela.
A função construtora deve aceitar valores iniciais para estes campos.
O valor de `x` é fornecido como primeiro parâmetro e o valor de `y` como segundo.
O valor predefinido deve ser `0` para ambos os campos.

A posição (0, 0) é o canto superior esquerdo do ecrã; os valores de `x` aumentam à medida que te deslocas para a direita e os valores de `y` aumentam à medida que te deslocas para baixo.

Define também um método `move(newX, newY)` que recebe novos parâmetros x e y e altera as propriedades para refletir a nova posição.

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

## 3. Define uma classe ProgramWindow

Define uma classe `ProgramWindow` com os seguintes campos:

- `screenSize`: contém um valor fixo do tipo `Size` com `width` 800 e `height` 600
- `size` : contém um valor do tipo `Size`; o valor inicial é o valor predefinido da instância de `Size`
- `position` : contém um valor do tipo `Position`; o valor inicial é o valor predefinido da instância de `Position`

Quando a janela é aberta (criada), tem sempre o tamanho e a posição predefinidos no início.

```javascript
const programWindow = new ProgramWindow();
programWindow.screenSize.width;
// => 800

// Similar for the other fields.
```

Nota à parte: o nome `ProgramWindow` é usado em vez de `Window` para distinguir a classe da classe `Window` incorporada que existe em ambientes de navegador.

## 4. Adiciona um método para redimensionar a janela

A classe `ProgramWindow` deve incluir um método `resize`.
Deve aceitar um parâmetro de entrada do tipo `Size` e tentar redimensionar a janela para o tamanho especificado.

No entanto, o novo tamanho não pode exceder certos limites.

- A altura ou largura mínima permitida é 1.
  Alturas ou larguras pedidas inferiores a 1 serão limitadas a 1.
- A altura e a largura máximas dependem da posição atual da janela; as bordas da janela não podem ultrapassar as bordas do ecrã.
  Os valores superiores a estes limites serão limitados ao maior tamanho que podem assumir.
  Por exemplo, se a posição da janela estiver em `x` = 400, `y` = 300 e for pedido um redimensionamento para `height` = 400, `width` = 300, a janela será redimensionada para `height` = 300, `width` = 300, uma vez que o ecrã não é suficientemente grande na direção `y` para acomodar totalmente o pedido.

```javascript
const programWindow = new ProgramWindow();

const newSize = new Size(600, 400);
programWindow.resize(newSize);
programWindow.size.width;
// => 600
programWindow.size.height;
// => 400
```

## 5. Adiciona um método para mover a janela

Além da funcionalidade de redimensionamento, a classe `ProgramWindow` também deve incluir um método `move`.
Deve aceitar um parâmetro de entrada do tipo `Position`.
O método `move` é semelhante ao `resize`; no entanto, este método ajusta a _posição_ da janela para o valor pedido, em vez do tamanho.

Tal como acontece com o `resize`, a nova posição não pode exceder certos limites.

- A posição mínima é 0, tanto para `x` como para `y`.
- A posição máxima em qualquer direção depende do tamanho atual da janela.
  As bordas não podem ultrapassar as bordas do ecrã.
  Os valores superiores a estes limites serão limitados ao valor máximo que podem assumir.
  Por exemplo, se o tamanho da janela estiver em `x` = 250, `y` = 100 e for pedida uma deslocação para `x` = 600, `y` = 200, a janela será movida para `x` = 550, `y` = 200, uma vez que o ecrã não é suficientemente grande na direção `x` para acomodar totalmente o pedido.

```javascript
const programWindow = new ProgramWindow();

const newPosition = new Position(50, 100);
programWindow.move(newPosition);
programWindow.position.x;
// => 50
programWindow.position.y;
// => 100
```

## 6. Altera uma janela de programa

Implementa uma função `changeWindow` que recebe uma instância de `ProgramWindow` como entrada e altera a janela para o tamanho e a posição especificados.
A função deve devolver a instância de `ProgramWindow` que foi recebida, depois de as alterações terem sido aplicadas.

A janela deve ficar com uma largura de 400 e uma altura de 300 e ser posicionada em x = 100, y = 150.

```javascript
const programWindow = new ProgramWindow();
changeWindow(programWindow);
programWindow.size.width;
// => 400

// Similar for the other fields.
```

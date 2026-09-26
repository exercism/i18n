# Instruções

Neste exercício, você vai simular um sistema de computador baseado em janelas.
Você vai criar algumas janelas que podem ser movidas e redimensionadas.
A imagem a seguir é representativa dos valores com os quais você vai trabalhar abaixo.

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

📣 Para praticar sua ampla variedade de habilidades em JavaScript, **tente resolver as tarefas 1 e 2 com sintaxe de protótipo e as tarefas restantes com sintaxe de classe**.

## 1. Defina `Size` para armazenar as dimensões da janela

Defina uma classe (função construtora) chamada `Size`.
Ela deve ter dois campos, `width` e `height`, que armazenam as dimensões atuais da janela.
A função construtora deve aceitar valores iniciais para esses campos.
A largura é fornecida como primeiro parâmetro e a altura como segundo.
A largura e a altura padrão devem ser `80` e `60`, respectivamente.

Além disso, defina um método `resize(newWidth, newHeight)` que recebe uma nova largura e uma nova altura como parâmetros e altera os campos para refletir o novo tamanho.

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

## 2. Defina `Position` para armazenar a posição de uma janela

Defina uma classe (função construtora) chamada `Position` com dois campos, `x` e `y`, que armazenam a posição horizontal e vertical atuais, respectivamente, do canto superior esquerdo da janela.
A função construtora deve aceitar valores iniciais para esses campos.
O valor de `x` é fornecido como primeiro parâmetro e o valor de `y` como segundo.
O valor padrão deve ser `0` para ambos os campos.

A posição (0, 0) é o canto superior esquerdo da tela, com os valores de `x` aumentando conforme você se move para a direita e os valores de `y` aumentando conforme você se move para baixo.

Defina também um método `move(newX, newY)` que recebe novos parâmetros x e y e altera as propriedades para refletir a nova posição.

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

## 3. Defina uma classe `ProgramWindow`

Defina uma classe `ProgramWindow` com os seguintes campos:

- `screenSize`: guarda um valor fixo do tipo `Size` com `width` 800 e `height` 600
- `size`: guarda um valor do tipo `Size`; o valor inicial é o valor padrão da instância de `Size`
- `position`: guarda um valor do tipo `Position`; o valor inicial é o valor padrão da instância de `Position`

Quando a janela é aberta (criada), ela sempre tem o tamanho e a posição padrão no início.

```javascript
const programWindow = new ProgramWindow();
programWindow.screenSize.width;
// => 800

// Similar for the other fields.
```

Observação: o nome `ProgramWindow` é usado em vez de `Window` para diferenciar a classe da classe `Window` nativa que existe em ambientes de navegador.

## 4. Adicione um método para redimensionar a janela

A classe `ProgramWindow` deve incluir um método `resize`.
Ele deve aceitar um parâmetro do tipo `Size` como entrada e tentar redimensionar a janela para o tamanho especificado.

No entanto, o novo tamanho não pode ultrapassar certos limites.

- A altura ou largura mínima permitida é 1.
  Alturas ou larguras solicitadas menores que 1 serão limitadas a 1.
- A altura e a largura máximas dependem da posição atual da janela; as bordas da janela não podem passar das bordas da tela.
  Valores maiores que esses limites serão limitados ao maior tamanho que podem assumir.
  Por exemplo, se a posição da janela estiver em `x` = 400, `y` = 300 e for solicitado um redimensionamento para `height` = 400, `width` = 300, a janela seria redimensionada para `height` = 300, `width` = 300, pois a tela não é grande o suficiente na direção `y` para acomodar totalmente a solicitação.

```javascript
const programWindow = new ProgramWindow();

const newSize = new Size(600, 400);
programWindow.resize(newSize);
programWindow.size.width;
// => 600
programWindow.size.height;
// => 400
```

## 5. Adicione um método para mover a janela

Além da funcionalidade de redimensionamento, a classe `ProgramWindow` também deve incluir um método `move`.
Ele deve aceitar um parâmetro do tipo `Position` como entrada.
O método `move` é semelhante ao `resize`, mas ajusta a _posição_ da janela para o valor solicitado, em vez do tamanho.

Assim como em `resize`, a nova posição não pode ultrapassar certos limites.

- A menor posição é 0 tanto para `x` quanto para `y`.
- A posição máxima em qualquer direção depende do tamanho atual da janela.
  As bordas não podem passar das bordas da tela.
  Valores maiores que esses limites serão limitados ao maior tamanho que podem assumir.
  Por exemplo, se o tamanho da janela estiver em `x` = 250, `y` = 100 e for solicitada uma movimentação para `x` = 600, `y` = 200, a janela seria movida para `x` = 550, `y` = 200, pois a tela não é grande o suficiente na direção `x` para acomodar totalmente a solicitação.

```javascript
const programWindow = new ProgramWindow();

const newPosition = new Position(50, 100);
programWindow.move(newPosition);
programWindow.position.x;
// => 50
programWindow.position.y;
// => 100
```

## 6. Altere uma janela de programa

Implemente uma função `changeWindow` que aceita uma instância de `ProgramWindow` como entrada e altera a janela para o tamanho e a posição especificados.
A função deve retornar a instância de `ProgramWindow` que foi passada, depois de aplicadas as alterações.

A janela deve receber uma largura de 400, uma altura de 300 e ser posicionada em x = 100, y = 150.

```javascript
const programWindow = new ProgramWindow();
changeWindow(programWindow);
programWindow.size.width;
// => 400

// Similar for the other fields.
```

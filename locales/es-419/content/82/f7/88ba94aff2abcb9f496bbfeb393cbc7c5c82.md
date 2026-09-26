# Cómo actualizar

De vez en cuando puede que necesitemos que actualices algo.

## Imagen de Pharo

Si necesitas actualizar las librerías de tu imagen de Pharo para Exercism, lo mejor es asegurarte de haber enviado los ejercicios que tengas en curso, haber guardado tu imagen y luego haber respaldado los archivos Pharo.image y Pharo.changes. Una vez que tengas un respaldo seguro, evalúa (selecciona y presiona meta-g) todo el siguiente código en un Playground:

 ```smalltalk

 './pharo-local/iceberg/exercism' asFileReference deleteAll.
 './pharo-local/package-cache' asFileReference deleteAll.

 IceRepository reset.

 Metacello new
  baseline: 'Exercism';
  repository: 'github://exercism/pharo-smalltalk:main/releases/latest';
  onConflict: [ :ex | ex allow ];
  load.

 #ExercismManager asClass upgrade.
 ```

Es posible que se te pregunte sobre perder los cambios del paquete «ExercismTools», y en ese caso debes elegir «Load» para asegurarte de tener una versión compatible de las herramientas.

Si alguna vez necesitas actualizar (o volver a una versión anterior) a una versión específica de Exercism, también puedes modificar el script anterior para especificar un número de versión concreto cambiando la ruta del repositorio así:

```smalltalk
 ...
  repository: 'github://exercism/pharo-smalltalk:<version-tag>';
 ...
 ```

Donde `<versison-tag>` podría ser algo como: `v0.2.3` o `master`

Una vez que hayas cargado una versión específica, también puede que necesites «volver a obtener» los ejercicios existentes en los que quieras seguir trabajando, usando el elemento de menú habitual `Exercism | Fetch...`.

En situaciones poco frecuentes (y si sigues teniendo problemas), es posible que necesites obtener un archivo Pharo.image nuevo (la forma más sencilla es volver a instalar Pharo en un directorio nuevo siguiendo las instrucciones de instalación habituales que están al inicio de esta página).

## Ejercicios de Pharo

A veces también puede ocurrir que un ejercicio se haya actualizado para agregar nuevas pruebas o para reflejar nuevos hallazgos, después de que ya lo hayas resuelto.

En esos casos, puedes optar por actualizar tu copia del ejercicio a la última versión, lo que significa que es posible que tengas que ajustar tu solución para que las pruebas pasen, y luego puedes enviar tu nuevo código para que se revise.

Puedes hacerlo usando el menú `Exercism | View Track Progress`, que abrirá un navegador web con el progreso de tu track actual. En la pestaña `Test suite`, al final de la página, hay un botón `Update exercise to latest version` si se ha detectado una versión más reciente del ejercicio.

Si haces clic en este botón y luego en el botón `Copy` (en el cuadro «Download your solution»), puedes pegar ese valor en el cuadro de diálogo que abre el menú `Exercism | Fetch new exercise`.

_NOTA: a partir de la versión 0.2.8, el formato de los paquetes de ejercicios en Pharo Exercism cambió, de modo que los ejercicios aparecen en un paquete de nivel superior llamado: Exercise@<Name> (en lugar de un paquete de etiqueta llamado Exercism-<Name>). Si actualizas tu imagen y tienes ejercicios antiguos que aparecen en ese formato de nombres de paquete anterior, todavía puedes enviarlos, pero si además actualizas la prueba del ejercicio tendrás que mover las clases de tu solución al nuevo paquete Exercise@<Name>, donde se guardó la nueva prueba._

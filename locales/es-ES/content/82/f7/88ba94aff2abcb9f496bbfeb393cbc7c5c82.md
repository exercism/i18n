# Actualización

De vez en cuando puede que necesitemos que actualices algo.

## Imagen de Pharo

Si necesitas actualizar las bibliotecas de tu imagen de Pharo para Exercism, lo mejor es asegurarte de haber enviado los ejercicios que tengas en curso, haber guardado tu imagen y, después, haber hecho una copia de seguridad de los archivos Pharo.image y Pharo.changes. Una vez tengas una copia de seguridad, evalúa (selecciona y pulsa meta-g) todo el código siguiente en un Playground:

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

Es posible que se te pregunte si quieres perder los cambios del paquete «ExercismTools»; en ese caso, elige «Load» para asegurarte de tener una versión compatible de las herramientas.

Si alguna vez necesitas actualizar (o volver a una versión anterior) a una versión concreta de Exercism, también puedes modificar el script anterior para indicar un número de versión específico cambiando la ruta del repositorio del siguiente modo:

```smalltalk
 ...
  repository: 'github://exercism/pharo-smalltalk:<version-tag>';
 ...
 ```

Donde `<versison-tag>` puede ser algo como `v0.2.3` o `master`

Una vez hayas cargado una versión concreta, es posible que también tengas que «volver a descargar» los ejercicios que ya tengas y con los que quieras seguir trabajando, usando la opción de menú habitual `Exercism | Fetch...`.

En situaciones poco frecuentes (y si sigues teniendo problemas), puede que necesites obtener un archivo Pharo.image nuevo (la forma más sencilla es volver a instalar Pharo en un directorio nuevo siguiendo las instrucciones de instalación habituales que aparecen al principio de esta página).

## Ejercicios de Pharo

A veces también puede ocurrir que un ejercicio se haya actualizado para añadir nuevas pruebas o para reflejar nuevas ideas, después de que ya lo hayas resuelto.

En estos casos, puedes optar por actualizar tu copia del ejercicio a la última versión, lo que significa que es posible que tengas que ajustar tu solución para que pasen las pruebas, y después podrás enviar tu nuevo código para que se revise.

Puedes hacerlo usando el menú `Exercism | View Track Progress`, que abrirá un navegador web con el progreso de tu track. En la pestaña `Test suite`, en la parte inferior de la página, hay un botón `Update exercise to latest version` si se ha detectado una versión más reciente del ejercicio.

Si haces clic en este botón y en el botón `Copy` (en el cuadro Download your solution), podrás pegar ese valor en el cuadro de diálogo del menú `Exercism | Fetch new exercise`.

_NOTA: a partir de la versión 0.2.8, el formato de los paquetes de ejercicios de Pharo Exercism cambió, de modo que los ejercicios aparecen en un paquete de nivel superior llamado Exercise@<Name> (en lugar de un paquete de etiqueta llamado Exercism-<Name>). Si actualizas tu imagen y tienes ejercicios antiguos que aparecen con este formato de nombres de paquete anterior, todavía puedes enviarlos, pero si además actualizas la prueba del ejercicio, tendrás que mover las clases de tu solución al nuevo paquete Exercise@<Name>, donde se ha guardado la nueva prueba._

# zPopUp

Una librería lijera para crear pop-up fácil de editar y utilizar.

## Instalación

Debes descargar los archivos e incluirlos en el projecto.

``` html
<!--zPopUp stylesheet-->
<link rel="stylesheet" href="zPopUp.css">
```

``` html
<!--zPopUp stylesheet-->
<script src="zPopUp.js"></script>
```

## Uso

Para crear un nuevo zPopUp tenes que crear una nueva instancia del objeto.

``` javascript
let miPopUp = new zPopUp();
```

zPopUp recibe como parámetro un objeto ocional donde se puede configurar varios aspectos.

``` javascript
{
  title, //El título del pop-up ||Def: 'zPopUp Title'
  headerIcon, //Icono que se muestra a la izquierda del título ||Def: null
  headerBorder, //Borde debajo del header ||Def: true
  showFooter, //Renderiza el footer ||Def: true
  footerBorder, //Borde encima del footer ||Def: true
  backColor, //Color asignado a la parte de atrás del pop-up'rgba(0,0,0,.4)'
  popUpBackground, //Color de fondo del pop-up ||Def: null => blanco
  color, //Color que se utiliza para fondo de los botones e indicadores ||Def: null => #a88fcf
  accentColor, //Color que se utiliza para fondo de los botones e indicadores activos ||Def: null => #792d83
  buttonTextColor, //Color que del texto de los botones e indicadores ||Def: null => blanco
  showOkButton, //Renderiza el boton de confirmación ||Def: true
  okButtonText, //Asigna el texto para el botón de confirmación ||Def: null => 'OK'
  showCancelButton, //Renderiza el boton de cancelación ||Def: true
  cancelButtonText, //Asigna el texto para el botón de cancelación ||Def: null => 'CANCEL'
  showNextButton, //Renderiza el boton de siguiente ||Def: false
  nextButtonText, //Asigna el texto para el botón de siguiente ||Def: null => '>'
  showPrevButton, //Renderiza el boton de anterior ||Def: false
  prevButtonText, //Asigna el texto para el botón de cancelación ||Def: null => '<'
  indicatorType, //Asigna el tipo de indicador a utilizar ||Opciones: 'none'* | 'dot' | 'dash' | 'number'
  indicatorPosition, //Asigna la posición del indicador ||Opciones: 'header'* | 'footer'
  htmlPages, //Recibe un array con las páginas a agregar al body del pop-up ||Def: []
  html, //Recibe un string conteniendo el html a agregar al body del pop-up ||Def: ''
  width, //Asigna el ancho del pop-up ||Def: null => 500px
  zIndex, //Asigna el z-index para el contenedor del pop-up ||Def: null => '999999'
  outsideClick, //Define el comportamiento del click realizado fuera del área del pop-up ||Opciones: 'exit'* | 'none'
  customClass, //Recibe un string y lo asigna como clase al div body del pop-up ||Def: ''
}
```

**Ejemplo básico:**

``` javascript
let miPopUp = new zPopUp({
  title: 'Prueba de popup!!',
  headerIcon: 'correct',
  html:`<h3>Mi primer zPopUp!</h3>
        <p>Esto es un párrafo dentro del pop-up.</p>`,
  showCancelButton: false,
});
miPopUp.show();
```
**Resultado:**
![Ejemplo de pop-up](/assets/doc/pp-demo1.png)

## Funciones disponibles

Existen algunas funciones disponibles que permiten modificar o agregar nuevo comportamiento al pop-up, 
todas están disponibles luego de creada la instancia del nuevo objeto zPopUp:
* [setTitle()](#settitle)
* [setTitleIcon()](#settitleicon)
* [show()](#show)
* [Funciones before](#funciones-before)
  * [onBeforeConfirm()](#onbeforeconfirm)
  * [onBeforeCancel()](#onbeforecancel)
  * [onBeforeClose()](#onbeforeclose)
* ..más se agregarán a futuro

### setTitle()

Recibe un parámetro del tipo `string` y permite modificar el título posterior a la creación del pop-up.
``` javascript
miPopUp.setTitle('Nuevo título para miPopUp');
```
Utilidad:
* Títulos dinámicos
* Menos parámetros en el constructor

### setTitleIcon()

Recibe un parámetro del tipo `string` y permite modificar el icono a la izquierda (por defecto) del título posterior a la creación del pop-up.
``` javascript
miPopUp.setTitleIcon('info');
```
**Parámetros válidos:** `'correct' | 'wrong' | 'comment' | 'danger' | 'info' | 'mail' | 'pin'`

**Utilidad:**
* Iconos dinámicos
* Menos parámetros en el constructor


### show()

Esta función va a mostrar el pop-up en pantalla
``` javascript
miPopUp.show();
```
**Utilidad:**
* Visualizar el pop-up


### Funciones before

Las funciones before recibn un parámetro que puede ser un `boolean` o una `function`.

##### Parametro: `boolean`

En caso de que se envíe un `true` el pop-up se cerrará, sin embargo si se envía un `false` el pop-up se mantendrá visible

##### Parametro: `function`

En el caso que el parámetro pasado sea una función la misma se ejecutará previo a la secuencia de acción 
que corresponda a cada función (confirma, cancelar o cerrar) del pop-up.

Es muy útil para agregar funciones validadoras de contenido, recolectar la informacíon que contenía el pop-up (si corresponde).

**Es necesario** que la función retorne un valor `boolean` ya que el mismo será evaluado como en el [caso anterior](#parametro-boolean).

#### onBeforeConfirm()

Esta función se ejecuta inmediatamente después de que el usuario realice un click al botón de confirmación.
``` javascript
miPopUp.onBeforeConfirm({
  const nombre = document.getElementById('input-nombre'); //input mostrado en el pop-up para que el usuario complete con su nombre
  if (nombre && nombre.value !== '') {
    alert(`Tu nombre es: ${nombre.value}`);
    return true; //hará que se cierre el pop-up
  }
  else {
    alert('Tienes que ingresar tu nombre');
    return false; //mantendrá el pop-up visible
  }
});
```
Utilidad:
* Recolección de información
* Envío de datos
* Consulta
* Validación
* Etc...



#### onBeforeCancel()

Esta función se ejecuta inmediatamente después de que el usuario realice un click al botón de cancelación.
``` javascript
miPopUp.onBeforeCancel({
  document.cookie = "acepta-cookies = no; expires=Thu, 31 Dec 2022 23:59:59 UTC"; //registra la cancelación del pop-up
  return true; //cierra el pop-up
});
```
Utilidad:
* Confirmación de salida
* Registrar la cancelación del pop-up

#### onBeforeClose()

Esta función se ejecuta inmediatamente después de que el usuario realice un click al botón de cerrar (X) o fuera del pop-up si está configurada esta opción.

Entendiendo que es un evento diferente salir del pop-up que cancelarlo se generan dos oportunidades de manejarlo.
``` javascript
miPopUp.onBeforeClose({
	if (confirm("Seguro deseas salir?") === true) {
		return true; //Si el usuario confirmo la salida se cerrará el pop-up
	} else {
		return false; //Caso contrario se mantendrá abierto
	}
});
```
Utilidad:
* Confirmación de salida
* Registrar la acción de cerrar el pop-up

## Road-Map

El plan es que se puedan agregar más de una página al pop-up y que se pueda visualizar con indicadores.

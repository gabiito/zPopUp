# zPopUp

Una librería lijera para crear pop-up fácil de editar y utilizar (trabajo en proceso...).

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

zPopUp recibe como parámetro un objeto opcional donde se puede configurar varios aspectos.

``` javascript
{
  accentColor, 
  //Recibe un string, color que se utiliza para fondo de los botones e indicadores activos ||Def: null => #792d83
  backColor, 
  //Recibe un string, color asignado a la parte de atrás del pop-up ||Def: 'rgba(0,0,0,.4)'
  buttonTextColor, 
  //Recibe un string, color que del texto de los botones e indicadores ||Def: null => blanco
  cancelButtonText, 
  //Recibe un string,se asigna el texto para el botón de cancelación ||Def: null => 'CANCEL'
  color, 
  //Recibe un string, color que se utiliza para fondo de los botones e indicadores ||Def: null => #a88fcf
  customClass, 
  //Recibe un string y lo asigna como clase al div body del pop-up ||Def: ''
  headerBorder, 
  //Recibe un boolean, activa el borde del header ||Def: true
  headerIcon, 
  //Recibe un string, icono que se muestra a la izquierda del título ||Def: null
  html, 
  //Recibe un string, conteniendo el html a agregar al body del pop-up ||Def: ''
  htmlPages, 
  //Recibe un array de strings, conteniendo las páginas a agregar al body del pop-up ||Def: []
  lastPageButtonText, 
  //Recibe un string, asigna el texto para el botón de última página ||Def: null => 'FINISH'
  mainFont, 
  //Recibe un string y lo asigna como fuente principal al pop-up ||Def: null    
  nextButtonText, 
  //Recibe un string, se asigna el texto para el botón de siguiente ||Def: null => '>'
  okButtonText, 
  //Recibe un string, se asigna el texto para el botón de confirmación ||Def: null => 'OK'
  outsideClick, 
  //Recibe un string, define el comportamiento del click realizado fuera del área del pop-up ||Opciones: 'close' | 'none' Def: 'close'
  popUpBackground, 
  //Recibe un string, color de fondo del pop-up ||Def: null => #fff
  prevButtonText, 
  //Recibe un string, asigna el texto para el botón de anterior ||Def: null => '<'
  showCancelButton, 
  //Recibe un boolean, renderiza el boton de cancelación ||Def: true
  showFooter, 
  //Recibe un boolean, renderiza el footer ||Def: true
  showNextButton, 
  //Recibe un boolean, renderiza el boton de siguiente ||Def: false
  showOkButton, 
  //Recibe un boolean, renderiza el boton de confirmación ||Def: true
  showPrevButton, 
  //Recibe un boolean, renderiza el boton de anterior ||Def: false
  title, 
  //Recibe un string, es el título del pop-up ||Def: 'zPopUp Title'
  width, 
  //Recibe un string, asigna el ancho del pop-up. Debe especificar unidad! ||Def: null => 500px
  zIndex, 
  //Recibe un número ó string, se asigna el z-index para el contenedor del pop-up ||Def: null => '999999'
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

## Funciones públicas disponibles

Existen algunas funciones disponibles que permiten modificar o agregar nuevo comportamiento al pop-up, 
todas están disponibles luego de creada la instancia del nuevo objeto zPopUp:

* [addPage()](#addPage)
* [show()](#show)
* [hide()](#hide)
* [remove()](#remove)
* [Funciones before](#funciones-before)
  * [onBeforeConfirm()](#onbeforeconfirm)
  * [onBeforeCancel()](#onbeforecancel)
  * [onBeforeNext()](#onbeforenext)
  * [onBeforePrev()](#onbeforeprev)
  * [onBeforeClose()](#onbeforeclose)
* [setTitle()](#settitle)
* [setTitleIcon()](#settitleicon)
* [setButtonText()](#setButtonText)
* [getPageID()](#getPageID)
* [getPageCount()](#getPageCount)
* [showAlert()](#showAlert)
* [showSpinner()](#showSpinner)
* [hideSpinner()](#hideSpinner)
* [avaibleIcons()](#avaibleIcons)

### addPage(html)
Recibe un parámetro del tipo `string` que contiene el html a agregar. 

Es importante entender que siempre lo agrega al final, como última página.

Si se encuentra viendo la última página, se cambia el boton de finalizar por el de siguiente.
``` javascript
mipopup.addPage('<h3>Mi segunda página</h3>');
```
**Utilidad:**
* Agregar una página al final del pop-up.
* Agregar páginas de forma dinámica.

### show()

Esta función va a mostrar el pop-up en pantalla. Si es la primera ejecución, se agega el pop-up al DOM.

``` javascript
miPopUp.show();
```
**Utilidad:**
* Visualizar el pop-up

### hide()

Esta función va a ocultar el pop-up en pantalla. No lo quita del DOM.

``` javascript
miPopUp.hide();
```
**Utilidad:**
* Ocultar el pop-up

### remove()

Esta función quita el pop-up del DOM. No ejecuta la función hide, por ende no se visualiza la animación.

``` javascript
miPopUp.remove();
```
**Utilidad:**
* Eliminar el pop-up del DOM.

### Funciones before

Las funciones before reciben un parámetro que puede ser un `boolean` o una `function`.

Son evaluadas antes de cada evento, por lo que pueden ser utilizadas para modificar el comportamiento del pop-up.

##### Recibiendo como parámetro un: `boolean`

En caso de que se envíe un `true` el evento se ejecutará, sin embargo si se envía un `false` el evento no se ejecutará. 
Funcionamiento similar al preventDefault.
##### Recibiendo como parámetro una: `function`

En el caso que el parámetro pasado sea una función la misma se ejecutará antes de cada evento. 

Es muy útil para agregar funciones validadoras de contenido, recolectar la informacíon que contenía el pop-up (si corresponde).

**Es necesario** que la función retorne un valor `boolean` ya que el mismo será evaluado como en el [caso anterior](#parametro-boolean).

#### onBeforeConfirm()

Acción que se ejecuta antes de que se propague el evento de confirmación.

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

Acción que se ejecuta antes de que se propague el evento de cancelación.

``` javascript
miPopUp.onBeforeCancel({
  document.cookie = "acepta-cookies = no; expires=Thu, 31 Dec 2022 23:59:59 UTC"; //registra la cancelación del pop-up
  return true; //cierra el pop-up
});
```
Utilidad:
* Confirmación de salida
* Registrar la cancelación del pop-up

#### onBeforeNext()

Acción que se ejecuta antes de que se propague el evento de renderizar la siguiente página. 

Únicamente se ejecuta si: 
* El pop-up tiene más de una página.
* El botón siguiente está habilitado.
* La página actual no es la última.

``` javascript
let datos = {};
miPopUp.onBeforeNext({
  const nombre = document.getElementById('input-nombre'); //input mostrado en el pop-up para que el usuario complete con su nombre
  if (nombre && nombre.value !== '') {
    datos.nombre = nombre.value; //persiste la información en el objeto
    return true; //se avanza a la siguiente página
  }
  else {
    alert('Tienes que ingresar tu nombre');
    return false; //mantendrá el pop-up en la página actual
  }
});
```

**Utilidad:**
* Recolección de información
* Envío de datos
* Consulta
* Validación
* Etc...

#### onBeforePrev()

Acción que se ejecuta antes de que se propague el evento de renderizar la página anterior.

Únicamente se ejecuta si:
* El pop-up tiene más de una página.
* El botón anterior está habilitado.
* La página actual no es la primera.

``` javascript

miPopUp.onBeforePrev({
  if (confirm('Al volver atrás perderás los datos ingresados ¿Estás seguro?')) {
    return true; //se retrocede a la página anterior
  }
  else {
    return false; //mantendrá el pop-up en la página actual
  }
});
```

**Utilidad:**
* Recolección de información
* Envío de datos
* Consulta
* Validación
* Etc...

#### onBeforeClose()

Acción que se ejecuta antes de que se propague el evento de cierre.

**Aclaración:**

Entendiendo que es un evento diferente salir del pop-up que cancelarlo se generan dos oportunidades de control.
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

### setTitle(title)

Recibe un parámetro del tipo `string` y permite modificar el título posterior a la creación del pop-up.
``` javascript
miPopUp.setTitle('Nuevo título para miPopUp');
```
Utilidad:
* Títulos dinámicos
* Menos parámetros en el constructor

### setTitleIcon(titleIcon)

Recibe un parámetro del tipo `string` y permite modificar el icono a la izquierda (por defecto) del título posterior a la creación del pop-up.
``` javascript
miPopUp.setTitleIcon('info');
```
**Parámetros válidos:** `'correct' | 'wrong' | 'comment' | 'danger' | 'info' | 'mail' | 'pin'`

**Utilidad:**
* Iconos dinámicos
* Menos parámetros en el constructor

### setButtonText(button, text)

Recibe dos parámetros del tipo `string`, el primero es el nombre del botón y el segundo es el texto que se mostrará en el botón.
``` javascript
miPopUp.setButtonText('btn-next', 'Siguiente');
```

**Parámetros válidos:** `'btn-confirm' | 'btn-cancel' | 'btn-next' | 'btn-prev'`

**Utilidad:**
* Botones con textos dinámicos

### getPageID()

Devuelve el ID de la página actual.
``` javascript
let paginaActual = miPopUp.getPageID();
```

**Utilidad:**
* Identificar la página actual

### getPageCount()

Devuelve el número de páginas del pop-up.
``` javascript
let numeroPaginas = miPopUp.getPageCount();
```

**Utilidad:**
* Identificar el número total de páginas

### showAlert(message, {title, icon})

Recibe un `string` y un `object` opcional, que puede contener un título y un icono. 

Genera una alerta a modo pop-up, dentro del mismo pop-up.

``` javascript
miPopUp.showAlert('Esto es una alerta', {
  title: 'Título de la alerta',
  icon: 'info'
});
```

**Utilidad:**
* Alertas

### showSpinner()

Muestra un spinner dentro del mismo pop-up.

``` javascript
miPopUp.showSpinner();
```

**Utilidad:**
* Spinner
* Cargando
* Etc...

### hideSpinner()

Oculta el spinner.

``` javascript
miPopUp.hideSpinner();
```

**Utilidad:**
* Spinner
* Carga terminada
* Etc...

### availableIcons()

Devuelve un array con los códigos de iconos disponibles.

``` javascript
Resultado:  [
              'correct', 
              'wrong', 
              'comment', 
              'danger', 
              'info', 
              'mail', 
              'pin', 
              'btn-next', 
              'btn-prev'
            ]
```

**Utilidad:**
* Conocer los iconos disponibles
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

#### Ejemplo básico

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
![Ejemplo de pop-up](/assets/doc/pp-demo1.png)

## Funciones disponibles

Existen algunas funciones disponibles que permiten modificar o agregar nuevo comportamiento al pop-up:
* [show()](#show)

#### show()

``` javascript
miPopUp.show();
```

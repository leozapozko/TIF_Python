// Codigo para eliminar los registros -------------------------------
const btns = document.querySelectorAll('a');
btns.forEach((btn) => {
  btn.addEventListener('click', e => {
    //alert(e.target.id);
    //console.log((e.target.id))

    var elem=e.target.id.toString(); 
    var urlid="http://localhost:5000//libros/" + elem
    //alert(urlid);

    fetch(urlid, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            alert('El registro fue eliminado con éxito');
            location.reload();
          } else {
            alert('Error al eliminar el registro');
          }
        })
        .catch(error => {
          console.error('Error de red:', error);
        });
  });
});
//------------------------------------------------------------------

// Codigo para modificar un registro -------------------------------
// Primero se detecta que boton de edit se presiono
//y se obtiene el numero y nombre del modal para llamarlo
const botons = document.querySelectorAll('button');
botons.forEach((btn) => {
  btn.addEventListener('click', e => {
    //alert(e.target.id);
    //console.log((e.target.id))
    var elem=e.target.id.toString(); 
    var urlid="http://localhost:5000//libros/" + elem
    //alert(urlid);

    var formName="myForm-modal" + elem
    //alert(formName);


    // Codigo para la ventana modal que se abre
    document.getElementById(formName).addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma convencional
        // Resto del código aquí
        //Obtén los datos del formulario:
    var form = document.getElementById(formName);    // Obtén el formulario
    var formData = new FormData(form);            // Crea un objeto FormData con los datos del formulario
    var jsonData = {};                            // Crea un objeto vacío para almacenar los datos JSON
    
    // Agrega cada campo del formulario al objeto jsonData
    for (var [key, value] of formData.entries()) {
        jsonData[key] = value;
    }
    //Convierte los datos en formato JSON:
    var jsonString = JSON.stringify(jsonData);
    
    //Envía los datos JSON al servidor:
    //Puedes usar varias técnicas como fetch, XMLHttpRequest, o alguna biblioteca como axios o jQuery.ajax para enviar los datos JSON al servidor. Aquí se muestra un ejemplo utilizando fetch:
    
    fetch(urlid, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonString
    })
        .then(response => response.json())
        .then(data => {
            alert("El registro fue modificado");
            location.reload();
            //console.log('Respuesta del servidor:', data);
            // Resto del código después de recibir la respuesta del servidor
        })
        .catch(error => {
            console.error('Error:', error);
            // Resto del código para manejar errores
        });
    });

 }) })
//------------------------------------------------------------------

// Codigo para agregar un nuevo registro ----------------------------
//Escucha el evento de envío del formulario:
document.getElementById("myForm").addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma convencional
    // Resto del código aquí
    //Obtén los datos del formulario:
var form = document.getElementById("myForm");    // Obtén el formulario
var formData = new FormData(form);            // Crea un objeto FormData con los datos del formulario
var jsonData = {};                            // Crea un objeto vacío para almacenar los datos JSON

// Agrega cada campo del formulario al objeto jsonData
for (var [key, value] of formData.entries()) {
    jsonData[key] = value;
}
//Convierte los datos en formato JSON:
var jsonString = JSON.stringify(jsonData);

//Envía los datos JSON al servidor:
//Puedes usar varias técnicas como fetch, XMLHttpRequest, o alguna biblioteca como axios o jQuery.ajax para enviar los datos JSON al servidor. Aquí se muestra un ejemplo utilizando fetch:
fetch('http://localhost:5000//libros', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: jsonString
})
    .then(response => response.json())
    .then(data => {
        alert("El nuevo libro fue agregado correctamente");
        location.reload();
        form.reset()
        console.log('Respuesta del servidor:', data);
        // Resto del código después de recibir la respuesta del servidor
    })
    .catch(error => {
        console.error('Error:', error);
        // Resto del código para manejar errores
    });
});
//------------------------------------------------------------------

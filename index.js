/* DOMContentLoaded */
/* evento DOMContentLoaded para asegurar que el script se ejecute después de que el DOM se haya cargado completamente. */

document.addEventListener("DOMContentLoaded", ()=>{

const bodyTablaContactos = document.querySelector ("#body-tabla-contactos")
const formCrearContactos = document.querySelector("#form-crear-contactos")
const selectProvincias = document.querySelector("#nuevo-provincia")
let provinciasArray = [];
/* FUNCION PARA OBTENER LOS DATOS DE NUESTRA API USANDO AXIOS */
const fetchProvincias = async ()=>{
  try {
    const respuesta = await axios.get (`https://g14music.alwaysdata.net/provincias/`)
    const provincias = respuesta.data
   
    /*iterar sobre los datos y agregar los nuevos */
    provincias.forEach (provincia=>{
      const option = document.createElement("option");
      option.text = provincia.nombre;
      option.value = provincia.id;
      selectProvincias.add(option);
    })
    return provincias;
  } catch (error) {
    console.error("Error al obtener los post",error)
  }
}  
 
fetchProvincias()

/* FUNCION PARA OBTENER LOS DATOS DE NUESTRA API USANDO AXIOS */
const fetchContactos = async ()=>{
try {
    const respuesta = await axios.get (`https://g14music.alwaysdata.net/contactos/`)
/*     console.log(respuesta); */
   const contactos = respuesta.data
   //limpiar la tabla antes de agregar nuevos datos
   bodyTablaContactos.innerHTML="";

/*    iterar sobre los datos y agregar los nuevos */
contactos.forEach (contacto=>{


//crear una nueva fila
const fila = document.createElement("tr")
//crear las celdas para el titulo , contenido y acciones.
const celdaNombre = document.createElement("td")
const celdaApellido = document.createElement("td")
const celdaMail = document.createElement("td")
const celdaProvincia = document.createElement("td")
const celdaAcciones = document.createElement("td")

// asignar el contenido a las celdas
celdaNombre.textContent = contacto.nombre
celdaApellido.textContent = contacto.apellido
celdaMail.textContent = contacto.mail
const obtengoProvincia = async () => {
 
  try {
   
    const respuesta = await axios.get (`https://g14music.alwaysdata.net/provincias/${contacto.provincia}`)
    celdaProvincia.textContent = respuesta.data.nombre
  } catch (error) {
    console.log("Error al obtener Provincia " + error)
  }}
  obtengoProvincia()


// crear boton de eliminar
const botonEliminar = document.createElement("button")
botonEliminar.textContent = "Eliminar"
botonEliminar.setAttribute('class', 'btn btn-danger mb-2');
botonEliminar.addEventListener("click",()=>{borrarContacto(contacto.id)}) 

// crear el boton de editar
const botonEditar = document.createElement("button")
botonEditar.textContent = "Editar"
botonEditar.setAttribute('class', 'btn btn-warning mb-2');
botonEditar.addEventListener("click", ()=>{
  /*   redirigir a la pagina de edicion con el id del post en la URL */
window.location.href = `edit.html?id=${contacto.id}`
})
// agregar los botones a la celda de acciones
celdaAcciones.appendChild(botonEliminar)
celdaAcciones.appendChild(botonEditar)

// agregar las celdas a la fila
fila.appendChild(celdaNombre)
fila.appendChild(celdaApellido)
fila.appendChild(celdaMail)
fila.appendChild(celdaProvincia)
fila.appendChild(celdaAcciones)

//agregar la fila al cuerpo de la tabla
bodyTablaContactos.appendChild(fila)

})
} catch (error) {
    console.error("Error al obtener los post",error)
}
}

// la funcion para eliminar un contacto
const borrarContacto = async(id)=>{
await axios.delete (`https://g14music.alwaysdata.net/contactos/${id}`)
//recargamos la lista de contactos despues de eliminar
fetchContactos()
}

//funcion para crear un nuevo contacto
formCrearContactos.addEventListener("submit",async function (event){
  event.preventDefault();
  const nuevoContacto = {
    nombre:document.querySelector("#nuevo-nombre").value ,
    apellido:document.querySelector("#nuevo-apellido").value ,
    mail:document.querySelector("#nuevo-mail").value ,
    provincia:document.querySelector("#nuevo-provincia").value
  };
  try {
    await axios.post(`https://g14music.alwaysdata.net/contactos/`,nuevoContacto)
    //limpiar el formulario
    formCrearContactos.reset()
    //recargamos la lista de contactos despues de crear uno nuevo
    fetchContactos()
  } catch (error) {
    console.error("Error al postear",error)
  }
})

//llamar a la funcion para obtener y mostrar los contactos al cargar la pagina
fetchContactos()
})

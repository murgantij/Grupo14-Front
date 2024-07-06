
document.addEventListener("DOMContentLoaded",()=>{
    //obtener el formulario de edicion
    const formulario = document.querySelector("#formEditarContacto")
    const selectProvincias = document.querySelector("#nuevo-provincia")
    // obtenemos los parametros de la URL
    const formEditarContactos = document.querySelector("#form-editar-contactos")
    const parametrosURL = new URLSearchParams(window.location.search)
    const IdContacto =parametrosURL.get('id')

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
        console.error("Error al obtener el contacto ",error)
      }
    }  
     
    fetchProvincias()

    // funcnion parta obtener los datos del contacto x ID

    const fetchContacto = async (id) =>{
        try {
            const respuesta = await axios.get (`https://g14music.alwaysdata.net/contactos/${id}`)
            /*     console.log(respuesta); */
            const contacto = respuesta.data
            // asignar los valores obtenidos a los campos del formulario
            document.querySelector("#nuevo-nombre").value = contacto.nombre
            document.querySelector("#nuevo-apellido").value = contacto.apellido
            document.querySelector("#nuevo-mail").value = contacto.mail
            document.querySelector("#nuevo-provincia").value = contacto.provincia

        } catch (error) {
            console.error('Error al obtener el post:', error);
        }
    }

    //llamar a la funcion para obtener el contacto
if (IdContacto){
    fetchContacto(IdContacto)
}

//funcion para editar un contacto
formEditarContactos.addEventListener("submit",async function (event){
    event.preventDefault();
    const nuevoContacto = {
      nombre:document.querySelector("#nuevo-nombre").value ,
      apellido:document.querySelector("#nuevo-apellido").value ,
      mail:document.querySelector("#nuevo-mail").value ,
      provincia:document.querySelector("#nuevo-provincia").value
    };
    try {
      await axios.put(`https://g14music.alwaysdata.net/contactos/${IdContacto}`,nuevoContacto)
      //limpiar el formulario
      window.location = "./index.html"
      formEditarContactos.reset()
      //recargamos la lista de contactos despues de crear uno nuevo
      fetchContacto(IdContacto)
    } catch (error) {
      console.error("Error al actualizar ",error)
    }
  })

  formEditarContactos.addEventListener("reset",async function (event){
       window.location = "./index.html"
     
  })


})
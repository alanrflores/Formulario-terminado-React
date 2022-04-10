import { useState } from "react"
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid';
import { useFormulario } from "./hooks/useFormulario";
//Hacemos una destructuracion agregando a agregaTodo , para no poner props.agregarTodo!
const Formulario = ({agregarTodo}) => {
//Despues de crear la maqueta formulario, primero tenemos que hacer nuestro useState
//Segundo con el onChange nosotros hacemos la relacion.
//Cuando sea un state muy grande aveces conviene separarlos
//Todos los input tienen que tener un name
  const initialState = {
   nombre: "",
   descripcion: "",
   //estado: por defecto es pendiente
   estado: "pendiente",
   //prioridad: por defecto es false
   prioridad: false,
  };
//Ahora utilizamos un hooks useState
//Recibe el initialState
//El primer parametro recibe , lo que vos quieras llamarlo
//El segundo es el modificador con set se utiliza como convencion

//const [todo, setTodo] = useState(initialState);
//Ahora podemos hacer la relacion en cada uno de nuestros value.
//Desestructuracion para llamarlas en el value y asi relacionarlos en cada input

//como es un array lo que devuelvo , necesito traelo como array
//recibe el initialState y devuelve inputs,handleChange, reset
//y de los inputs voy a sacar el nombre, descripcion, estado, prioridad.
   const [inputs, handleChange, reset] = useFormulario(initialState)

   const {nombre, descripcion, estado, prioridad} = inputs;

//Activar y validar el formulario
   const handleSubmit = (e) => {
       e.preventDefault()
      
//Si el usuario deja esa cosa en blanco nos va a salir error
       if(!nombre.trim()){
//focus -- me marca donde tiene que escribir le da enfoque
        e.target[0].focus();
        Swal.fire({
            title: 'Error!',
            text: 'No deje espacios en blanco ',
            icon: 'error',
          });
//return -- si entra al if que se reinicie y no lea lo de abajo
        return;
       }
       if(!descripcion.trim()){
           e.target[1].focus();
           Swal.fire({
            title: 'Error!',
            text: 'No deje la descripcion en blanco ',
            icon: 'error',
          });
          return;
       }
       Swal.fire({
        title: 'Exito!',
        text: 'Tarea enviada',
        icon: 'success',
       
      });

      agregarTodo({
         nombre: nombre,
         descripcion: descripcion,
         estado: estado === "pendiente" ? false : true,
         prioridad: prioridad,
//Podemos utilizar una libreria externa, por que cuando guardemos cosas en la base de datos te devuelve
//un id automatico.
//Date.now nos devuelve un numero desde 1970 al minuto actual por lo tanto no se puede repetir 
         //id: Date.now()
         id:uuidv4(),
      });
//Se reinicia
      reset();

       
   };



//Evento onSubmit que va a activar el formulario.
  return (
    <>
        <h2>Formulario</h2>

        <form onSubmit={handleSubmit}>
            <input 
               type="text"
               className="form-control mb-2"
               name="nombre"
               placeholder="Ingrese todo nombre"
               value={nombre}
               onChange={handleChange}


            />
            <textarea
               className="form-control mb-2"
               placeholder="Ingrese descripcion"
               name="descripcion"
               value={descripcion}
               onChange={handleChange}
            />

            <select 
               name="estado" 
               className="form-control mb-2"
               value={estado}
               onChange={handleChange}
            >
                <option value="pendiente">Pendiente</option>
                <option value="completado">Completado</option>
            </select>

            <div className="form-check">
               <input 
                  className="form-check-input" 
                  type="checkbox"
                  name="prioridad" 
                  //En el form-check el value es checked
                  checked={prioridad} 
                  id="flexCheckDefault"
                  onChange={handleChange}
                  />
               <label 
                  className="form-check-label" 
                  htmlFor="flexCheckDefault"
               >
                   Prioritario
               </label>
            </div>
            <button type="submit" className="btn btn-primary">Agregar</button>
                
        </form>
    </>
  )
}

export default Formulario
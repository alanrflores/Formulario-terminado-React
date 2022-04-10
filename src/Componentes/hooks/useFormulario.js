import { useState } from "react"

//Inicializo con el initialState del formulario vacio y adentro utilizo el useState
export const useFormulario = (initialState = {}) => {
//En este return voy a devolver todos mis metodos
//Quiero evitar escribir handleChange --
 const [inputs, setInputs] = useState(initialState)

//Inventamos un metodo handleChange.
//Recibe un evento de la relacion del input con el valor y su propiedad correspondiente
//usamos una destructuracion
//Un hook no es nada mas que una funcion
const handleChange = (e) => {
    const {name, value, checked, type} = e.target
//Traemos el valor anterior (OLD)-Para que no se pierdan las propiedades mismas, mantenemos los valores del 
//inicialState, pero donde lo llamamos en el setTodo lo vamos a modificar
//Usamos parentesis ({}) por que tiene que devolver algo implicito para devolver un objeto
//Vamos a copiar lo que venga de old con spreadoperation(...) y las propiedades dinamicas son las que vamos
// a utilizar con este name.

     setInputs((old)=> ({
     ...old,
     //en caso de que sea type checkbox, colocamos el valor checked, en caso contrario devuelve value.
     [name]: type === "checkbox" ? checked : value,
    }));
};
//Utilizamos el metodo reset, no recibe nada
const reset = () => {
    setInputs(initialState)
}
//y que me retorne un array de.. para poder limpiar el formulario
  return [inputs, handleChange, reset];
}

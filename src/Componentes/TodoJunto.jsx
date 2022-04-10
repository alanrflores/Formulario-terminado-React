import React from 'react'
import Todo from './Todo'
//recibo como props
const TodoJunto = ({todo, eliminarTodo, editarTodo}) => {
//Desestructuracion para no utilizar el todo.nombre y solo nombrar lo que esta dentro de llaves.

    const {id, nombre, descripcion, estado, prioridad} = todo;
//onClick cuando necesitamos pasarle parametros necesita una funcion de flecha, si no se activa solo sin hacer
//click
  return (
           <li className="list-group-item d-flex justify-content-between align-items-start">
             <div className="ms-2 me-auto">
             <div className="fw-bold">
                 {nombre} ({estado ? "Finalizado" : "Pendiente"})
            </div>
               <p>{descripcion}</p>
             <div>
                 <button className="btn btn-danger me-2" onClick={()=> eliminarTodo(id)}>Eliminar</button>
                 <button className="btn btn-warning" onClick={()=> editarTodo(id)}>Editar</button>
             </div>
             </div>
             <span className="badge bg-primary rounded-pill">
                  {prioridad && "Prioritario"}
             </span>
           </li>
  )
}

export default TodoJunto 
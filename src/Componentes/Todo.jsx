import { useEffect, useState } from "react";
import Formulario from "./Formulario"
import TodoJunto from "./TodoJunto";

const Todo = () => {
//Array de tareas por que queremos empujar el "todo" a este componente
//Colocamos "todos" por que es un array que va a contener objetos
//De alguna hay que hacer un metodo que agregue estos "Todos"

const [todos, setTodos] = useState([]);
//useEffect -- recibe una funcion de flecha, si le paso los corchetes de abajo se renderiza 1 sola vez.
useEffect(() => {
//Si existe la llave(key), voy a decir que el setTodos van a ser lo que viene del localStorage, lo parseamos
//Solo se ejecuta una vez, cuando se renderiza mi componente
 if(localStorage.getItem('todos')){
     setTodos(JSON.parse(localStorage.getItem('todos')))
 };
},[]);

//Esto se va a ejecutar, cada vez que se cambie los "todos" o modifica, los guardamos en el localStorage
useEffect(()=>{
 localStorage.setItem("todos", JSON.stringify(todos))
}, [todos]);

//agregarTodo -- como hay una comunicacion entre componentes, lo podemos enviar como props.
const agregarTodo = (todo) => {
//como es un array, utilizamos el spreat op. hacemos una copia del old y mandamos el nuevo "todo"
  //console.log(todo);
  setTodos((old) => [...old, todo]);
};
//Este eliminarTodo lo vamos a pasar a TodoJunto para que lo active y lo saque del array useState ([])
const eliminarTodo = (id) => {
//filter devuelve un array-
//quiero filtrar cuando el item.id sea distinto al id que paso en el parametro
  setTodos((old) => old.filter(item => item.id !== id))
};
//Guardar este array en editarTodos recorro los todos , y pregunto si coincide el id que pinchamos en el boton
//Voy a devolver un objeto de la copia del item pero el estado lo voy a cambiar a lo que estaba. 
//En caso que no coincida va a devolver el item.
const editarTodo = id => {
    const editarTodos = todos.map(item => (
        item.id === id ? {...item, estado: !item.estado} : item
    ))

    setTodos(editarTodos)
};

//Esta es una forma de activar un componente hijo que es el que esta dentro de return, que esta recibiendo un 
//metodo. Y se van a guardar los "todos" o el unico todo que esta en el otro componente.
//y el componente padre es lo de arriba.
//Ese agregarTodo una vez que hicimos las validaciones en el componente formulario, lo enviamos.

//Para recorrer los "todos" utilizamos el map. que nos devuelve otro array , por eso tenemos que poner ()
//por que nos devuelve algo explicitamente
//Fundamental agregar una key a cada item
  return (
    <>
        <Formulario agregarTodo={agregarTodo} />
        <ul className="list-group list-group-numbered mt-4">
        {todos.map((item) => (
             <TodoJunto 
                   key={item.id} 
                   todo={item} 
                   eliminarTodo={eliminarTodo}
                   editarTodo={editarTodo} />
            ))}
        </ul>
    </>
  );
};

export default Todo
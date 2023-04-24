import React, { useEffect, useState } from "react";

//create your first component

const Home = () => {
  const urlApi = "https://express-blog-xa7v.onrender.com/todo/users/aguilar";

  const [tareas, setTareas] = useState([]);
  const [tareaName, setTareaName] = useState("");
  const handleTareaChange = (event) => {
    setTareaName(event.target.value);
  };

  //Obtener tareas del Api

  const getTareas = async () => {
    try {
      const response = await fetch(urlApi,
        { headers: { "Content-Type": 'application/json' } }
      );
      const data = await response.json();
      setTareas(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Actualizar tareas
  const updateTareas = async (tareas) => {
    try {
      const response = await fetch(
        urlApi,
        { method: "PUT", headers: { "Content-Type": 'application/json' }, body: JSON.stringify(tareas) }
      );
      getTareas();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTareas();
  }, []);

  const handleAddEnter = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      const newTarea = {
        label: tareaName,
        done: true
      };
      const newTareas = [...tareas, newTarea];
      updateTareas(newTareas);
      setTareaName("");
    }
  };
  const handleAddClick = () => {
    const newTarea = {
      label: tareaName,
      done: true
    };
    const newTareas = [...tareas, newTarea];
    updateTareas(newTareas);
    setTareaName("");
  };

  const handleRemove = (tareaindex) => {
    if(tareas.length === 1) {
      updateTareas([{label:"no-mostrar", done:true}])
      return
    }
    updateTareas(tareas.filter((item, index) => index != tareaindex));
  };
  console.log(tareas);
  return (
    <div className="d-flex justify-content-center">
      <div className="text-center w-50">
        <h1 className="text-center mt-5">TASK LIST</h1>
        <div className="card m-5 ">
          <div className="card-header">
            <input
              type="text"
              placeholder="New task"
              onChange={(event) => handleTareaChange(event)}
              onKeyDown={(event) => handleAddEnter(event)}
              value={tareaName}
            />
            <button className="boton1" onClick={() => handleAddClick()}>Add me</button>
          </div>
          <div className="card-body">
            {tareas.length === 0 && <p>There are no task</p>}
            <ul className="list-group list-group-flush ">
              {tareas.map((tarea, index) => {
                if(tarea.label !=="no-mostrar"){
                  return (
                    <li
                      className="list-group-item d-flex justify-content-between"
                      key={`${tarea.label}-${index}`}
                    >
                      <p>{tarea.label}</p>
                      <button
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => handleRemove(index)}
                      ></button>
                    </li>
                  );
                }
                
              })}
            </ul>
          </div>
          <div className="card-footer d-flex justify-content-center">{tareas.length > 1 ? `${tareas.length - 1} item left`: "No Task"} </div>
          <div className="d-flex justify-content-center">
              <button className="boton1 col-2" onClick={() => updateTareas([{label:"no-mostrar", done:true}])}>All Delete</button>
          </div>   
        </div>
      </div>
    </div>
  );
};

export default Home;

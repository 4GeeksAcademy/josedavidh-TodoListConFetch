import { useEffect, useState } from 'react';

const initialStateTask = {
    label: "",
    is_done: false
}

const urlBase = 'https://playground.4geeks.com/todo'

const ToDoList = () => {

    const [task, setTask] = useState(initialStateTask)
    const [taskList, setTaskList] = useState([])

    const HandleChange = (event) => {
        setTask({
            ...task,
            label: event.target.value
        })
    }

    const createUser = async () => {
        try {
            const response = await fetch(`${urlBase}/users/jose`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([])
            })
    
            if (response.ok) {
                console.log("Usuario creado correctamente")
            } else if (response.status === 400) {
                console.log("El usuario ya existe")
            } else {
                console.log("Error al crear el usuario")
            }
        } catch (error) {
            console.log("Error creando el usuario:", error)
        }
    };

    const saveTask = async (event) => {

        if (event.key == "Enter") {
               try{
                const response = await fetch(`${urlBase}/todos/jose`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(task)
                })

                if(response.ok) {
                    getAllTask()
                    setTask(initialStateTask)
                }

               } catch (error) {
                console.log(error)
               }
            }
    }

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`${urlBase}/todos/${id}`, {
                method: "DELETE",
            })
            if (response.ok) {
                getAllTask()
            }

        } catch (error) {

        }
    }

    const deleteAllTasks = async () => {
        try {
            const response = await fetch(`${urlBase}/users/jose`, {
                method: "DELETE"
            })

            if (response.ok) {
                setTaskList([])
            } else {
                console.log("Error erasing all tasks")
            }

        } catch (error) {
            console.log("Error erasing all tasks", error)

        }
    }

    const getAllTask = async () => {
        try {
            const response = await fetch(`${urlBase}/users/jose`)
            const data = await response.json()

            if(response.ok) {
                setTaskList(data.todos)
            }
            if (response.status == 404){

            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const init = async () => {
            await createUser()
            await getAllTask()
        };
        init()
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-7 col-lg-6">
                    <h1 className="display-1 text-center" style={{ color: "rgb(235, 211, 212)" }}>To Do's</h1>
                    <div className="border border-bottom-0">
                        <form
                            onSubmit={(event) => event.preventDefault()}>
                            <input
                                type="text"
                                className=""
                                name="label"
                                placeholder="Enter a the task"
                                value={task.label}
                                onChange={HandleChange}
                                onKeyDown={saveTask}
                            />
                        </form>

                        <ul>
                            {
                                taskList.map((item, index) => {
                                    return (
                                        <li key={item.id}>
                                            {item.label}
                                            <span>
                                                <i onClick={() => deleteTask(item.id)}>x</i>
                                            </span>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                        <span className="all-task-info">
                            {
                                `${taskList.length} item left`
                            }
                        </span>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <button type="button" className="btn btn-primary" onClick={deleteAllTasks}>Erase all tasks</button>
                </div>
            </div>
        </div>
    )
}

export default ToDoList;
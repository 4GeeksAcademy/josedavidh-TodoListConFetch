import { useState } from 'react';

const initialStateTask = {
    task: "",
    isDone: false
}

const Home = () => {

    const [task, setTask] = useState(initialStateTask)
    const [taskList, setTaskList] = useState([])

    const HandleChange = (event) => {
        setTask({
            ...task,
            task: event.target.value
        })
    }

    const saveTask = (event) => {
        if (event.key == "Enter") {
            setTaskList((prev) => [...prev, task])
            setTask(initialStateTask)
        }
    }

    const deleteTask = (id) => {
        setTaskList((prev) => prev.filter((_, index) => id != index))
    }

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
                                name="task"
                                placeholder="Enter a the task"
                                value={task.task}
                                onChange={HandleChange}
                                onKeyDown={saveTask}
                            />
                        </form>

                        <ul>
                            {
                                taskList.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item.task}
                                            <span>
                                                <i onClick={() => deleteTask(index)}>x</i>
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
            </div>
        </div>
    )
}

export default Home;
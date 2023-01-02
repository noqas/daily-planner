import {React, useState} from 'react'
import {nanoid} from 'nanoid'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import TaskForm from './components/TaskForm'
import Task from './components/Task'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [showDeleteAlert, setshowDeleteAlert] = useState(false)
  const [editMode, setEditMode] = useState(false)

  function handleOnChange(event) {
    setInput(event.target.value)
  }

  function editTask() {
    setTasks(prevTasks => prevTasks.map(prevTask => {
        if (prevTask.isInEditMode) {
          return {
            ...prevTask,
            taskDescription: input,
            isDone: false,
            isInEditMode: false
          }
        } else {
          return prevTask
        }
      }))
  }

  function createNewTask() {
    setTasks(prevTasks => {
        return [
          ...prevTasks,
          {
            id: nanoid(),
            taskDescription: input,
            isDone: false,
            isInEditMode: false
          }
        ]
      })
    }
    
    function handleTaskList(event) {
      event.preventDefault()
      
      if(editMode) {
        editTask()
        setEditMode(false)
      } else {
        createNewTask(event)
      }

      clearVariables(event)
  }

  function completeTask(id) {
    setTasks(prevTasks => prevTasks.map(prevTask => {
      if(prevTask.id === id) {
        return {
          ...prevTask,
          isDone: !prevTask.isDone
        }
      } else {
        return prevTask
      }
    }))

    setshowDeleteAlert(false)
  }

  function deleteTask(id) {
    setshowDeleteAlert(false)
    return setTasks(tasks.filter(task => task.id !== id))
  }

  function deleteAllTasks() {
    if(tasks.length > 1 || (tasks.length && tasks[0].isDone)) {
      setTasks([])
      setshowDeleteAlert(false)
    } else {
      setshowDeleteAlert(true)
    }
  }

  function clearVariables(event) {
    event.target.form.elements.input.value = ''
    setInput('')
    setshowDeleteAlert(false)
  }

  function prepareTaskToBeEdited(id) {
    setEditMode(!editMode)

    setTasks(prevTasks => prevTasks.map(prevTask => {
      if (prevTask.id === id) {
        return {
          ...prevTask,
          isInEditMode: !prevTask.isInEditMode
        }
      } else {
        return prevTask
      }
    }))
  }

  
  return (
    <Container className='w-75'>
      <Card body bg='light' border='secondary' className='mt-5'>
        <h1 className='text-center'>Daily Planner</h1>

        <TaskForm 
          input={input}
          handleOnChange={handleOnChange} 
          handleTaskList={handleTaskList}
          deleteAllTasks={deleteAllTasks}
          editMode={editMode}
        />

        <Task
          tasks={tasks}
          completeTask={completeTask}
          deleteTask={deleteTask}
          showDeleteAlert={showDeleteAlert}
          prepareTaskToBeEdited={prepareTaskToBeEdited}
        />
      </Card>
    </Container>
  );
}
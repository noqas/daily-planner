import React from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

export default function Task(props) {

    const taskElements = props.tasks.map(task => (

        <Card body bg='light' border='dark' key={task.id} className='mb-2'>
            <div className='d-flex align-items-center justify-content-between'>
                <h5 className={task.isDone ? 'text-decoration-line-through text-break' : 'text-decoration-none text-break'}>{task.taskDescription}</h5>
                <div>
                    <span 
                        role='button' 
                        onClick={() => props.prepareTaskToBeEdited(task.id)}>{task.isInEditMode && <span className='text-muted fw-lighter'>Edit mode: 🔛 </span>}
                    ✏️</span>

                    {task.isDone ? 
                        <span role='button' onClick={() => props.completeTask(task.id)}>✅</span> :
                        <span role='button' onClick={() => props.completeTask(task.id)}>⬜</span>
                    }
                    <span role='button' onClick={() => props.deleteTask(task.id)}>🗑️</span>
                </div>
            </div>
        </Card>
    ))

    const allDoneTasks = props.tasks.every(task => {return task.isDone})

    return(
        <Container className='w-50'>
            {props.showDeleteAlert && 
                <Alert key='danger' variant='danger' className='mb-5'>❗ Add at least 2 tasks before deleting.</Alert>
            }

            {(taskElements.length > 0 && allDoneTasks) && 
                <Card.Title className='d-flex justify-content-center mt-5'>🎉 You have completed all your tasks for today! 🎉</Card.Title>
            }

            {taskElements.length ? 
                <p className='mt-5'>{taskElements}</p> : 
                <Card.Title className='d-flex justify-content-center mt-5'>Start adding your to-do's to keep them in track. 💪</Card.Title>
            }
        </Container>
    )
}
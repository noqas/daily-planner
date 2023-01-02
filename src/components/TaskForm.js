import React from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


export default function TaskForm(props) {
    return(
        <Container className='w-50'>
            <form onSubmit={props.handleTaskList}>
                <InputGroup className='mb-3'>
                    <InputGroup.Text>📝</InputGroup.Text>
                    <Form.Control
                        placeholder='What do I need to do today?'
                        onChange={props.handleOnChange}
                        name='input'
                        value={props.input}
                        maxLength='18'
                    />
                </InputGroup>

                <div className='d-flex justify-content-center align-items-center gap-2 text-center mb-2'>
                    <Button className='w-50'
                        variant='primary' 
                        onClick={props.handleTaskList}
                        disabled={!props.input}
                    >
                    {props.editMode ? 'Edit' : 'Add'} task</Button>
                    <Button className='w-50'
                        variant='danger' 
                        onClick={props.deleteAllTasks}
                    >
                    Delete all tasks</Button>
                </div>
            </form>
        </Container>
    )
}
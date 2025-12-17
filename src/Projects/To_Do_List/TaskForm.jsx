import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function TaskForm({addTask}) {
    
    let addData=(event)=>{
        event.preventDefault();
        let title=document.getElementById("title").value ;
        let description=document.getElementById("description").value ;
        addTask({title:title,description:description,statue:'notyet'})
        document.getElementById("title").value=''
        document.getElementById("description").value=''
    }
  let taskform=(
    <Card className="shadow-sm border-light p-3 mt-3 text-center">
      <Card.Body>
        <Card.Title className="mb-3 text-primary">Add New Task</Card.Title>
        <Form onSubmit={addData}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
                id="title"
              type="text"
              placeholder="Enter task title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
                id="description"
              type="text"
              placeholder="Enter task description"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add Task
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  
  )
  return taskform
} 


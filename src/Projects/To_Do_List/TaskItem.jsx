
import Card from 'react-bootstrap/Card';
import TaskStatue from './TaskStatue';

export default function TaskItem(props){
    const {title,description,statue}=props
   
    const isDone = statue === 'done'
    const cardStyle = {
        width: '18rem',
        backgroundColor: isDone ? '#f5f5f5' : undefined,
        opacity: isDone ? 0.6 : 1,
    }

    return (
      <Card style={cardStyle} className="mb-3">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          
          <TaskStatue status={statue} onChange={props.onStatusChange} />
        </Card.Body>
      </Card>
    )
}
import TaskItem from "./TaskItem"

export default function TaskList(props){
    const {tasks}=props
    return (
        <div className="tasks">
            {
                tasks.map((task, index) => (
                    <TaskItem 
                        key={index}
                        title={task.title}
                        description={task.description}
                        statue={task.statue}
                        onStatusChange={(newStatus) => props.onStatusChange(index, newStatus)}
                    />
                ))
            }
        </div>
    )
}
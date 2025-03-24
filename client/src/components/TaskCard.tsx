
interface Task {
    title: string;
    description: string;
    dueDate: string;
  }

interface TaskCardProps {
    task: Task;
  }
  
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    return (
      <div className="bg-gray-100 p-3 rounded-lg mb-2">
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
      </div>
    );
  };
  
  export default TaskCard;

interface Task {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
  }

interface TaskCardProps {
    task: Task;
  }
  
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(); // Format the date to a more readable format
  };

  // Helper function to get the priority color
  const priorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "High":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg mb-4 transition-all hover:shadow-xl">
      <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
      <p className="text-gray-600 mt-2">{task.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">Due: {formatDate(task.dueDate)}</p>
      </div>
      <div className="mt-2 flex items-center">
        <p className={`text-sm font-medium ${priorityColor(task.priority)}`}>
          Priority: {task.priority}
        </p>
      </div>
    </div>
    );
  };
  
  export default TaskCard;
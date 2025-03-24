import { Header, TaskCard, AddTask } from '../components';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}

const Home = () => {
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      title: 'Finish React Project',
      description: 'Complete the React app with state management and routing.',
      dueDate: '2025-03-30T23:59:59Z',
      priority: 'High',
      status: 'To Do',
    },
    {
      title: 'Bug Fixing in API',
      description: 'Fix the bug in the API causing 500 errors.',
      dueDate: '2025-03-25T23:59:59Z',
      priority: 'Medium',
      status: 'In Progress',
    },
    {
      title: 'Write Unit Tests',
      description: 'Write unit tests for the new features implemented in the app.',
      dueDate: '2025-03-28T23:59:59Z',
      priority: 'Low',
      status: 'Completed',
    },
    {
      title: 'Write Unit Tests again',
      description: 'Write unit tests for the new features implemented in the app.',
      dueDate: '2025-03-28T23:59:59Z',
      priority: 'Low',
      status: 'Completed',
    },
  ]);

  const statuses = ['To Do', 'In Progress', 'Completed'];

  // Filter tasks by status
  const filterTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  // Handle Drag & Drop
  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    // If task is dropped outside a valid droppable or dropped in the same place
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1); // Remove task from source

    // Update task status if moved between columns
    movedTask.status = destination.droppableId; // Use the droppableId directly

    // Insert task at the new position in the destination column
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  return (
    <>
      {createTaskModalOpen && <AddTask />}
      <div className="bg-gray-400 h-screen mx-auto">
        <Header />
        <div className="p-4 flex flex-col gap-2 md:m-2 md:mx-5 mx-2 rounded-lg justify-center items-center mb-5 bg-white/55">
          <h2 className="font-bold text-2xl text-gray-800">My Task Board</h2>
          <button
            onClick={() => setCreateTaskModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            + Add Task
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col md:flex-row md:justify-evenly gap-4 px-4">
            {statuses.map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-white/80 p-4 rounded-lg shadow-lg w-full md:w-1/3"
                  >
                    <h3 className="text-xl font-semibold text-gray-700 mb- 3">{status}</h3>
                    <div className="space-y-4">
                      {filterTasksByStatus(status).map((task, index) => (
                        <Draggable key={task.title} draggableId={task.title} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

export default Home;
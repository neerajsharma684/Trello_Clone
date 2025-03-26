import { Header, TaskCard, AddTask } from '../components';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { getTasks, updateTask } from '../services/Task';

interface Task {
  _id: string;
  Title: string;
  Description: string;
  Status: string;
  DueDate: string;
  Priority: string;
}

const Home = () => {
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
      console.log('Tasks:', res.data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const statuses = ['To Do', 'In Progress', 'Completed'];

  const handleDragEnd = async (result: any) => {
  const { source, destination } = result;

  if (!destination) return;

  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return;
  }

  const newTasks = Array.from(tasks);

  const [movedTask] = newTasks.splice(source.index, 1);

  movedTask.Status = destination.droppableId;

  try {
    await updateTask(movedTask._id, { Status: movedTask.Status });
    console.log('Task status updated successfully');
  } catch (error) {
    console.error('Failed to update task status:', error);
  }

  newTasks.splice(destination.index, 0, movedTask);

  const sortedTasks = newTasks.sort(
    (a, b) => new Date(a.DueDate).getTime() - new Date(b.DueDate).getTime()
  );

  setTasks(sortedTasks);
};

  const filterTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.Status === status);
  };

  return (
    <>
      {createTaskModalOpen && <AddTask />}
      <div className="bg-gray-200 h-screen mx-auto">
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
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">{status}</h3>
                    <div className="space-y-4">
                      {filterTasksByStatus(status).map((task, index) => (
                        <Draggable 
                          key={task._id} 
                          draggableId={task._id} 
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard 
                                task={{
                                  _id: task._id, 
                                  title: task.Title, 
                                  description: task.Description, 
                                  dueDate: task.DueDate, 
                                  priority: task.Priority
                                }} 
                              />
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
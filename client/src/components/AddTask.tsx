import { useState } from "react";
import { addTask } from "../services/Task";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Task {
  Title: string;
  Description: string;
  DueDate?: string;
  Priority: "Low" | "Medium" | "High";
  Status: "To Do" | "In Progress" | "Completed";
  User: string | undefined;
}

const AddTask = () => {
  const userID = useSelector((state: RootState) => state.user.user?._id);
  const [formData, setFormData] = useState<Task>({
    Title: "",
    Description: "",
    Status: "To Do",
    DueDate: "",
    Priority: "Low",
    User: userID,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Task added:", formData);
    try {
      const res = await addTask(formData);
      console.log("Task added:", res);
      window.location.reload();
    } catch (error) {
      console.error("Error adding task:", error);
      
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg mx-4">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add New Task
        </h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <input
            type="text"
            name="Title"
            placeholder="Task Title"
            value={formData.Title}
            onChange={handleChange}
            required
            className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Description */}
          <textarea
            name="Description"
            placeholder="Task Description"
            value={formData.Description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Due Date */}
            <label htmlFor="DueDate" className="text-gray-600">
                Due Date
            </label>
          <input
            type="date"
            name="DueDate"
            value={formData.DueDate || ""}
            onChange={handleChange}
            className="w-full p-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Priority */}
            <label htmlFor="Priority" className="text-gray-600">
                Priority
            </label>
          <select
            name="Priority"
            value={formData.Priority}
            onChange={handleChange}
            className="w-full p-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {/* Status */}
            <label htmlFor="Status" className="text-gray-600">
                Status
            </label>
          <select
            name="Status"
            value={formData.Status}
            onChange={handleChange}
            className="w-full p-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 w-full rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Add Task
          </button>

          {/* Close Button */}
          <button
            type="button"
            className="bg-red-500 text-white p-3 w-full rounded-lg font-semibold hover:bg-red-600 transition"
            onClick={() => window.location.reload()}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

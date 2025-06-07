
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Check, Clock, AlertTriangle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type TaskItem = {
  id: number | string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
};

interface TaskListProps {
  tasks: TaskItem[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks: initialTasks }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(initialTasks);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', dueDate: '', priority: 'medium' as 'high' | 'medium' | 'low' });
  
  // Update local tasks when props change
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);
  
  const handleAddTask = () => {
    if (newTask.title.trim() === '') return;
    
    const newTaskItem = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      priority: newTask.priority
    };
    
    setTasks([...tasks, newTaskItem]);
    setNewTask({ title: '', dueDate: '', priority: 'medium' });
    setShowAddTask(false);
  };
  
  const handleMarkComplete = (taskId: string | number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  const handleViewAllTasks = () => {
    navigate('/tasks');
  };
  return (
    <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-slate-900 font-sf-pro">Upcoming Tasks</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="hover:bg-mokm-purple-100 hover:text-mokm-purple-600 transition-colors"
            onClick={() => setShowAddTask(!showAddTask)}
          >
            {showAddTask ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showAddTask && (
          <div className="mb-6 p-4 bg-white/50 rounded-xl border border-mokm-purple-200/50 animate-fade-in">
            <h4 className="text-sm font-medium text-mokm-purple-700 mb-3">Add New Task</h4>
            <div className="space-y-3">
              <div>
                <input 
                  type="text" 
                  placeholder="Task title" 
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-mokm-purple-400 focus:ring-1 focus:ring-mokm-purple-400"
                />
              </div>
              <div className="flex space-x-2">
                <input 
                  type="date" 
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  className="flex-grow px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-mokm-purple-400 focus:ring-1 focus:ring-mokm-purple-400"
                />
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value as 'high' | 'medium' | 'low'})}
                  className="px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-mokm-purple-400 focus:ring-1 focus:ring-mokm-purple-400"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="flex justify-end pt-2">
                <Button 
                  onClick={handleAddTask}
                  disabled={!newTask.title.trim()}
                  className="bg-gradient-to-r from-mokm-purple-500 to-mokm-pink-500 hover:from-mokm-purple-600 hover:to-mokm-pink-600 text-white font-medium text-xs py-1 px-3 rounded-lg"
                >
                  Add Task
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {tasks.length === 0 && !showAddTask ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-sf-pro text-lg">No upcoming tasks</p>
            <p className="text-sm text-slate-400 mt-2 font-sf-pro">Your tasks will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task, index) => {
              // Determine if task is overdue
              const today = new Date();
              const dueDate = new Date(task.dueDate);
              const isOverdue = dueDate < today && task.priority === 'high';
              const isDueSoon = dueDate.getTime() - today.getTime() < 172800000; // 48 hours
              
              return (
                <div 
                  key={task.id} 
                  className={`p-4 rounded-xl border transition-all duration-300 animate-fade-in delay-${index * 100} relative
                    ${isOverdue 
                      ? 'border-red-300/50 bg-red-50/30' 
                      : isDueSoon && task.priority === 'high'
                      ? 'border-amber-300/50 bg-amber-50/30'
                      : 'border-white/20 hover:border-mokm-purple-300/50 hover:bg-white/20'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 pr-2">
                      <button 
                        onClick={() => handleMarkComplete(task.id)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center border
                          ${isOverdue 
                          ? 'border-red-400 hover:bg-red-100' 
                          : 'border-mokm-purple-400 hover:bg-mokm-purple-100'}`}
                      >
                        <Check className="h-3 w-3 text-mokm-purple-500 opacity-0 hover:opacity-100" />
                      </button>
                      <p className="text-sm font-medium text-slate-900 font-sf-pro">{task.title}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      task.priority === 'high' ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-700' :
                      task.priority === 'medium' ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700' :
                      'bg-gradient-to-r from-green-100 to-green-200 text-green-700'
                    } font-sf-pro`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center text-xs font-sf-pro">
                      {isOverdue ? (
                        <span className="flex items-center text-red-600">
                          <AlertTriangle className="h-3 w-3 mr-1" /> Overdue: {task.dueDate}
                        </span>
                      ) : isDueSoon ? (
                        <span className="flex items-center text-amber-600">
                          <Clock className="h-3 w-3 mr-1" /> Soon: {task.dueDate}
                        </span>
                      ) : (
                        <span className="flex items-center text-slate-500">
                          <Calendar className="h-3 w-3 mr-1" /> Due: {task.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {tasks.length > 0 && (
          <div className="flex justify-end mt-4">
            <Button 
              variant="link"
              size="sm"
              onClick={handleViewAllTasks}
              className="text-xs text-mokm-purple-600 hover:text-mokm-purple-800"
            >
              View All Tasks
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;

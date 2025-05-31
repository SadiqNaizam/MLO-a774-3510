import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: '1', description: 'Review and make sure nothing slips through cracks', dueDate: '15 Sep, 2021', completed: false },
  { id: '2', description: 'Send meeting invites for sales upcampaign', dueDate: '20 Sep, 2021', completed: true },
  { id: '3', description: 'Weekly closed sales won checking with sales team', dueDate: '24 Sep, 2021', completed: false },
  { id: '4', description: 'Add notes that can be viewed from the individual view', dueDate: '27 Sep, 2021', completed: false },
  { id: '5', description: 'Move stuff to another page', dueDate: '27 Sep, 2021', completed: true },
  { id: '6', description: 'Prepare presentation for Q4 results', dueDate: '01 Oct, 2021', completed: false },
  { id: '7', description: 'Follow up with key client X', dueDate: '03 Oct, 2021', completed: false },
  { id: '8', description: 'Update CRM with latest interactions', dueDate: '05 Oct, 2021', completed: true },
  { id: '9', description: 'Plan strategy for new product launch', dueDate: '10 Oct, 2021', completed: false },
  { id: '10', description: 'Team brainstorming session for new features', dueDate: '12 Oct, 2021', completed: false },
];

interface TasksWidgetProps {
  className?: string;
}

const TasksWidget: React.FC<TasksWidgetProps> = ({ className }) => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

  const handleTaskToggle = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const remainingTasksCount = tasks.length - completedTasksCount;

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>My Tasks</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="default" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-0">
        <div className="px-6 pb-4 text-sm text-muted-foreground">
          {remainingTasksCount} of {tasks.length} remaining
        </div>
        <ScrollArea className="flex-grow h-[250px] px-6">
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-3 pb-3 border-b last:border-b-0">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleTaskToggle(task.id)}
                  className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    "flex-grow text-sm font-medium leading-none",
                    task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'
                  )}
                >
                  {task.description}
                </label>
                <span className={cn(
                  "text-xs text-muted-foreground whitespace-nowrap",
                  task.completed && 'line-through'
                  )}>
                  {task.dueDate}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TasksWidget;

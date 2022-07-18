import { Check, Trash } from "phosphor-react";

interface Task {
		text: string;
		done: boolean;
	}

interface TaskItemProps {
		task: Task,
		onEditTaskStatus: (task: Task) => void;
		onDeleteTask: (task: Task) => void;
}

export function TaskItem({task, onEditTaskStatus, onDeleteTask} : TaskItemProps) {
	return (
		<div key={task.text} className='min-h-20 mb-4 justify-between rounded-lg bg-gray-500 w-full gap-3 p-4 flex'>
			<div className='h-8 w-8 flex justify-center items-center p-1'>
				{!task.done ? (
						<div onClick={() => onEditTaskStatus(task)} className='border-2 rounded-full border-blue h-6 w-6 hover:bg-blue hover:bg-opacity-30 hover:border-blueDark cursor-pointer' />
				) : (
						<div onClick={() => onEditTaskStatus(task)} className=' justify-center items-center flex rounded-full bg-purpleDark h-6 w-6 hover:bg-purple cursor-pointer'>
							<Check size={14}  />
						</div>
				)}
			</div>
			<span className={`${task.done && 'line-through'}`}>
				{task.text}
			</span>
			<div onClick={() => onDeleteTask(task)} className='h-8 w-8 flex justify-center items-center p-1 hover:bg-gray-400 rounded cursor-pointer hover:fill-danger hover:text-danger'>
				<Trash size={20} className='hover:fill-danger fill-gray-300' />
			</div>
		</div>
	)
}
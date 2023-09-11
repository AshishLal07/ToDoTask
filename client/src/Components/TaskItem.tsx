import { Task } from './TaskSource';
import { FaTimes } from 'react-icons/fa';
import { useTask } from './TaskSource';

const TaskItem = ({ task }: { task: Task }) => {
	const { onDelete, OnToggleReminder } = useTask();

	return (
		<div
			className={`task ${task.reminder ? 'reminder' : ''}`}
			onDoubleClick={() => {
				OnToggleReminder(task.id);
			}}
		>
			<h3>
				{task.text}
				<FaTimes
					onClick={() => onDelete(task.id)}
					style={{ color: 'red' }}
				></FaTimes>
			</h3>
		</div>
	);
};

export default TaskItem;

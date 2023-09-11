import TaskItem from './TaskItem';
import { useTask } from './TaskSource';

const TaskList = () => {
	const { tasks } = useTask();
	return (
		<div>
			{tasks.map((t) => (
				<TaskItem key={t.id} task={t}></TaskItem>
			))}
		</div>
	);
};

export default TaskList;

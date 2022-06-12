import React from 'react';
import { ITodoItem } from '../../../types/TodoItem';

export const TodoItem: React.FC<ITodoItem> = ({
	title,
	completed,
}: ITodoItem) => {
	return (
		<div className={completed ? 'todo-item-completed' : 'todo-item'}>
			{title}
		</div>
	);
};

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoListState } from '../../../store/todo/reducer';
import { TodoActionTypes } from '../../../store/todo/types';
import { TodoItem } from './Item';

export const TodoItems: React.FC = () => {
	const todos = useSelector<TodoListState, TodoListState['todos']>(
		(state) => state.todos
	);
	const mode = useSelector<TodoListState, TodoListState['mode']>(
		(state) => state.mode
	);

	const dispatch = useDispatch();

	const handleTodoToggle = (id: number) => {
		dispatch({ type: TodoActionTypes.TOGGLE_TODO, payload: id });
	};

	const getTodosByMode = () => {
		return mode === 'all'
			? todos
			: todos.filter((x) => {
					if (mode === 'completed') return x.completed;
					return !x.completed;
			  });
	};

	return (
		<div className='items-wrapper'>
			{getTodosByMode().map((todo) => (
				<div
					key={todo.id}
					onClick={() => {
						handleTodoToggle(todo.id);
					}}
				>
					<TodoItem {...todo} />
				</div>
			))}
		</div>
	);
};

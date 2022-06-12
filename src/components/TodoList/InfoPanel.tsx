import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoListState } from '../../store/todo/reducer';
import { TodoActionTypes } from '../../store/todo/types';

export const TodoInfoPanel: React.FC = () => {
	const todos = useSelector<TodoListState, TodoListState['todos']>(
		(state) => state.todos
	);
	const mode = useSelector<TodoListState, TodoListState['mode']>(
		(state) => state.mode
	);

	const dispatch = useDispatch();

	const handleModeChange = (value: 'all' | 'active' | 'completed') => {
		dispatch({ type: TodoActionTypes.CHANGE_MODE, payload: value });
	};

	const handleClearCompleted = () => {
		dispatch({ type: TodoActionTypes.REMOVE_COMPLETED });
	};

	const activeCount = todos.filter((x) => x.completed === false).length;

	return (
		<div className='info-panel-wrapper'>
			<div>{activeCount} items left</div>
			<div style={{ display: 'flex' }}>
				<button
					className={
						'text-button info-panel-mode' +
						(mode === 'all' ? ' active-mode' : '')
					}
					onClick={() => handleModeChange('all')}
				>
					All
				</button>
				<button
					className={
						'text-button info-panel-mode' +
						(mode === 'active' ? ' active-mode' : '')
					}
					onClick={() => handleModeChange('active')}
				>
					Active
				</button>
				<button
					className={
						'text-button info-panel-mode' +
						(mode === 'completed' ? ' active-mode' : '')
					}
					onClick={() => handleModeChange('completed')}
				>
					Completed
				</button>
			</div>
			<div>
				<button className='text-button' onClick={() => handleClearCompleted()}>
					Clear completed
				</button>
			</div>
		</div>
	);
};

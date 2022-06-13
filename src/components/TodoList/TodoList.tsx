import React from 'react';
import '../../assets/css/List.css';
import { TodoInfoPanel } from './InfoPanel';
import { TodoInput } from './Input';
import { TodoItems } from './Items/Items';

export const TodoListComponent = () => {
	return (
		<div className='list-wrapper'>
			<TodoInput />
			<TodoItems />
			<TodoInfoPanel />
		</div>
	);
};

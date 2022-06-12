import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { TodoActionTypes } from '../../store/todo/types';

const getRandomId = () => {
	const min = 0;
	const max = 100000000;
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const TodoInput: React.FC = () => {
	const dispatch = useDispatch();

	const inputRef = useRef<HTMLInputElement>(null);

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' && inputRef.current !== null) {
			inputRef.current.value = inputRef.current.value.trim();

			if (inputRef.current.value) {
				dispatch({
					type: TodoActionTypes.ADD_TODO,

					payload: {
						id: getRandomId(),
						title: inputRef.current.value,
						completed: false,
					},
				});
			}

			inputRef.current.value = '';
		}
	};

	return (
		<div>
			<input
				ref={inputRef}
				className='input-wrapper'
				placeholder='What needs to be done?'
				onKeyDown={(e) => handleKeyDown(e)}
			/>
		</div>
	);
};

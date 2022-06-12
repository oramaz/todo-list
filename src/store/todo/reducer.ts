import { AnyAction } from 'redux';
import { ITodoItem } from '../../types/TodoItem';
import { TodoActionTypes } from './types';

export interface TodoListState {
	todos: ITodoItem[];
	mode: 'all' | 'active' | 'completed';
}

const initialState: TodoListState = {
	todos: [],
	mode: 'all',
};

export const todoReducer = (
	state: TodoListState = initialState,
	action: AnyAction
) => {
	switch (action.type) {
		case TodoActionTypes.ADD_TODO: {
			return { ...state, todos: [action.payload, ...state.todos] };
		}
		case TodoActionTypes.REMOVE_COMPLETED: {
			return { ...state, todos: [...state.todos.filter((x) => !x.completed)] };
		}
		case TodoActionTypes.TOGGLE_TODO: {
			const newTodos = [...state.todos];
			newTodos.find((x) => x.id === action.payload)!.completed = !newTodos.find(
				(x) => x.id === action.payload
			)!.completed;
			return { ...state, todos: newTodos };
		}
		case TodoActionTypes.CHANGE_MODE: {
			return { ...state, mode: action.payload };
		}
		default:
			return state;
	}
};

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import {
	initialState,
	todoReducer,
	TodoListState,
} from '../store/todo/reducer';
import { TodoListComponent } from '../components/TodoList/TodoList';
import { TodoActionTypes } from '../store/todo/types';

const renderWithRedux = (store: any) => {
	const component = (
		<Provider store={store}>
			<TodoListComponent />
		</Provider>
	);
	return render(component);
};

afterEach(cleanup);

describe('Todo store tests', () => {
	let store: any;

	beforeEach(() => {
		store = createStore(todoReducer);
	});

	describe('check initial store state', () => {
		it('todo list state', () => {
			expect(store.getState().todos.length).toBe(0);
		});

		it('mode state', () => {
			expect(store.getState().mode).toBe('all');
		});
	});

	describe('check store state actions', () => {
		it('add todo action', () => {
			store.dispatch({
				type: TodoActionTypes.ADD_TODO,
				payload: { id: 1, title: 'Test code', completed: false },
			});

			expect(store.getState().todos.length).toBe(1);
			expect(store.getState().todos[0].title).toBe('Test code');
			expect(store.getState().todos[0].completed).toBe(false);
		});

		it('mode state action', () => {
			store.dispatch({
				type: TodoActionTypes.ADD_TODO,
				payload: { id: 1, title: 'Test code', completed: false },
			});

			renderWithRedux(store);

			fireEvent.click(screen.getByTestId('all-mode'));
			expect(screen.queryByText('Test code')).toBeInTheDocument();

			fireEvent.click(screen.getByTestId('completed-mode'));
			expect(screen.queryByText('Test code')).not.toBeInTheDocument();

			fireEvent.click(screen.getByTestId('active-mode'));
			expect(screen.queryByText('Test code')).toBeInTheDocument();
		});

		it('toggle todo action', () => {
			store.dispatch({
				type: TodoActionTypes.ADD_TODO,
				payload: { id: 1, title: 'Test code', completed: false },
			});

			renderWithRedux(store);

			fireEvent.click(screen.getByText('Test code'));
			expect(store.getState().todos[0].completed).toBe(true);

			fireEvent.click(screen.getByText('Test code'));
			expect(store.getState().todos[0].completed).toBe(false);
		});

		it('remove completed todos action', () => {
			store.dispatch({
				type: TodoActionTypes.ADD_TODO,
				payload: { id: 1, title: 'Test code', completed: false },
			});

			store.dispatch({
				type: TodoActionTypes.ADD_TODO,
				payload: { id: 2, title: 'Watch film', completed: false },
			});

			renderWithRedux(store);

			fireEvent.click(screen.getByText('Test code'));

			fireEvent.click(screen.getByText('Clear completed'));
			expect(store.getState().todos.length).toBe(1);

			fireEvent.click(screen.getByText('Watch film'));
			fireEvent.click(screen.getByText('Clear completed'));

			expect(store.getState().todos.length).toBe(0);
		});
	});
});

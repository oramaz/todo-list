import React from 'react';
import './assets/css/App.css';
import { LogoComponent } from './components/Logo';
import { TodoListComponent } from './components/TodoList/TodoList';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
	return (
		<Provider store={store}>
			<div className='App-wrapper'>
				<LogoComponent />
				<TodoListComponent />
			</div>
		</Provider>
	);
}

export default App;

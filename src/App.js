import React from 'react';
import { Provider } from 'react-redux';
import injectReactTapPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NotesList from './components/notes-list/notes-list.jsx';
import { store } from './redux/store.js';

import s from './App.css';

injectReactTapPlugin();

// app container
const App = (props) => (
	<Provider store={store}>
		<MuiThemeProvider>
				<div className={s.appContainer}>
					<NotesList />
				</div>
		</MuiThemeProvider>
	</Provider>
);

export default App;

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';

import NotesDuck from './ducks/notes.js';
import { enTranslation } from '../locales/en-translation.js';
import { csTranslation } from '../locales/cs-translation.js';

// The `combineReducers` is not neccesary here.
// But it's a good practice for further extension.

const translationsObject = {
	en: enTranslation,
	cs: csTranslation
};

const combineDucks = (...ducks) => combineReducers(
    ducks.reduce((root, duck) => (
        { ...root, [duck.name]: duck.reducer }
), { i18n: i18nReducer }));

const initialState = {};

const rootReducer = combineDucks(
	NotesDuck
);

const reduxDevToolExtension = window.devToolsExtension ? window.devToolsExtension() : f => f;

export const store = createStore(
	rootReducer,
	initialState,
	compose(applyMiddleware(reduxThunk), reduxDevToolExtension)
);
syncTranslationWithStore(store)
store.dispatch(loadTranslations(translationsObject));
// default EN
store.dispatch(setLocale('en'));
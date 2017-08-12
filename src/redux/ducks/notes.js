import buildConstants from '../buildConstants.js';
import { notesService } from '../../services/notes.js';

/**
 * Success or failure of specific action is not implemented via any notifications.
 * Only success of actions is supposed.
 * Reducer, actions and selectors is implemented via ducks (see link below).
 * https://github.com/erikras/ducks-modular-redux
 */
const NotesDuck = {
	name: 'Notes'
};

const initialState = {
    notes: [],
    creatingEntity: false,
    newTitle: '',
    entityInEdit: {}
};

const actionTypes = {
	notes: {
        setNotes: 'SET_NOTES',
        isCreatingNewNote: 'CREATE_NOTE',
        setNewTitle: 'SET_NEW_TITLE',
        addToNotes: 'ADD_TO_NOTES',
        setEntityInEdit: 'SET_ENTITY_IN_EDIT',
        setEditTitle: 'SET_ENTITY_IN_EDIT_TITLE'
	}
};

/**
 * generating unique actions
 */
const actions = buildConstants(actionTypes);

NotesDuck.reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.notes.setNotes:
			return {
                ...initialState,
                notes: action.data
            };

        case actions.notes.isCreatingNewNote:
            return {
                ...state,
                creatingEntity: action.bool
            };

        case actions.notes.setNewTitle:
            return {
                ...state,
                newTitle: action.title
            };

        case actions.notes.addToNotes:
            return {
                ...initialState,
                notes: [
                    ...state.notes,
                    action.note
                ]
            };

        case actions.notes.setEntityInEdit:
            return {
                ...state,
                entityInEdit: action.entity
            };

        case actions.notes.setEditTitle:
            return {
                ...state,
                entityInEdit: {
                    ...state.entityInEdit,
                    title: action.title
                }
            };

        default: 
            return state;
	}
};

NotesDuck.setNotes = (data) => ({
    type: actions.notes.setNotes,
    data
});

NotesDuck.fetchNotes = () => (dispatch) => {
    notesService.getNotes().then(data => {
        dispatch(NotesDuck.setNotes(data));
    });
};

NotesDuck.isCreatingNewNote = (bool) => ({
    type: actions.notes.isCreatingNewNote,
    bool
});

NotesDuck.setNewTitle = (title) => ({
    type: actions.notes.setNewTitle,
    title
});

NotesDuck.addToNotes = (note) => ({
    type: actions.notes.addToNotes,
    note
});

NotesDuck.addNote = (title) => (dispatch, getState) => {
    notesService.createNewNote(title).then((note) => {
        const notes = NotesDuck.getNotes(getState());

        if (!!notes.find(note => note.id === note.id)) {
            note.id = notes[notes.length - 1].id + 1;
            note.title = title;
        }
        dispatch(NotesDuck.addToNotes(note));
    });
};

NotesDuck.deleteNote = (noteId) => (dispatch, getState) => {
    notesService.deleteNote(noteId).then(data => {
        const notes = NotesDuck.getNotes(getState());
        dispatch(NotesDuck.setNotes(notes.filter(note => note.id !== noteId)));
    });
};

NotesDuck.setEditNote = (note) => ({
    type: actions.notes.setEntityInEdit,
    entity: note
});

NotesDuck.setEditTitle = (title) => ({
    type: actions.notes.setEditTitle,
    title
});

NotesDuck.editNote = (noteToEdit) => (dispatch, getState) => {
    notesService.editNote(noteToEdit).then(editedNote => {
        const notes = NotesDuck.getNotes(getState()).map(note => {
            if (note.id === noteToEdit.id) {
                return {
                    ...note,
                    // from endpoint is comming same data all the time
                    // to see your changes in UI replace 
                    // `title: editedNote.title` to `title: noteToEdit.title`
                    // title: editedNote.title,
                    title: noteToEdit.title
                };
            }
            return note;
        });
        dispatch(NotesDuck.setNotes(notes));
    });
};

const getOwnState = state => state[NotesDuck.name];
NotesDuck.getNotes = (state) => getOwnState(state).notes;
NotesDuck.getSelectedNotes = (state) => getOwnState(state).selectedNotes;
NotesDuck.creatingNewEntity = (state) => getOwnState(state).creatingEntity;
NotesDuck.getNewTitle = (state) => getOwnState(state).newTitle;
NotesDuck.getEditEntity = (state) => getOwnState(state).entityInEdit;

export default NotesDuck;
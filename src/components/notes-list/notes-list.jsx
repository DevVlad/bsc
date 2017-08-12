import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import NotesDuck from '../../redux/ducks/notes.js';
import Modal from '../dialog/modal.jsx';
import LanguageSelector from '../language-selector/language-selector.jsx';

import s from './notes-list.css';

/**
 * List of notes and list of possible actions.
 */
class NotesList extends Component {
    componentWillMount() {
        this.props.dispatch(NotesDuck.fetchNotes());
    }

    addNote = () => {
        this.props.dispatch(NotesDuck.isCreatingNewNote(true));
    }

    editNote(note) {
        this.props.dispatch(NotesDuck.setEditNote(note));
    }

    deleteNote(noteId) {
        this.props.dispatch(NotesDuck.deleteNote(noteId));
    }

    getOperations(note) {
        return (
            <div className={s.Operations}>
                <IconButton
                    id={`edit-note-${note.id}`}
                    onTouchTap={() => this.editNote(note)}
                    touch={true}
                >
                    <EditIcon hoverColor="blue"/>
                </IconButton>
                <IconButton
                    id={`delete-note-${note.id}`}
                    onTouchTap={() => this.deleteNote(note.id)}
                    touch={true}
                >
                    <DeleteIcon hoverColor="red"/>
                </IconButton>
            </div>
        );
    }

    render() {
        return (
            <div className={s.NotesList}>
                <FloatingActionButton
                    id="add-button"
                    className={s.AddNoteButton}
                    onTouchTap={this.addNote}
                >
                    <ContentAdd />
                </FloatingActionButton>
                <LanguageSelector className={s.LanguageSelector}/>
                <Paper className={s.Paper} zDepth={2}>
                    <Table
                        selectable={false}
                    >
                        <TableHeader
                            displaySelectAll={false}
                        >
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>{I18n.t('noteTitle')}</TableHeaderColumn>
                                <TableHeaderColumn>{I18n.t('operations')}</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} stripedRows deselectOnClickaway={false}>
                            {this.props.notes.map(note => (
                                <TableRow
                                    key={note.id}
                                    striped={note.id % 2 === 0}
                                >
                                    <TableRowColumn>{note.id}</TableRowColumn>
                                    <TableRowColumn id={`note-${note.id}`}>{note.title}</TableRowColumn>
                                    <TableRowColumn>{this.getOperations(note)}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Modal/>
            </div>
        );
    }
}

export default connect(
(state) => ({
    notes: NotesDuck.getNotes(state),
    selectedNotes: NotesDuck.getSelectedNotes(state),
    lang: state.i18n.locale
}))(NotesList);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import NotesDuck from '../../redux/ducks/notes.js';

/**
 * Via this component Modal is handled edit and creation of notes.
 */

class Modal extends Component {
  handleClose = () => {
    const { dispatch } = this.props;

    if (this.props.isCreatingNewEntity) {
      dispatch(NotesDuck.isCreatingNewNote(false));
    } else {
        dispatch(NotesDuck.setEditNote({}));
    }
  };

  handleChange = ({ target }) => {
    const { isCreatingNewEntity, dispatch } = this.props;

    if (isCreatingNewEntity) {
        dispatch(NotesDuck.setNewTitle(target.value));
    } else {
        dispatch(NotesDuck.setEditTitle(target.value));
    }
  }

  handleConfirm = (evt) => {
    evt.preventDefault();
    const { isCreatingNewEntity, dispatch, newTitle, entityInEdit } = this.props;

    if (isCreatingNewEntity) {
      dispatch(NotesDuck.addNote(newTitle));
    } else if (entityInEdit.id) {
      dispatch(NotesDuck.editNote(entityInEdit));
    }
  }

  render() {
    const { isCreatingNewEntity, newTitle, entityInEdit } = this.props;
    const open = isCreatingNewEntity || !!entityInEdit.id;
    const title = isCreatingNewEntity ? newTitle : entityInEdit.title;

    const actions = [
      <FlatButton
        label={I18n.t('cancel')}
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={I18n.t(isCreatingNewEntity ? 'createNote' : 'editNote')}
        primary={true}
        id="create-note"
        disabled={!title}
        onTouchTap={this.handleConfirm}
      />,
    ];

    return (
        <Dialog
            title={I18n.t(isCreatingNewEntity ? 'createNoteTitle' : 'editNoteTitle')}
            actions={actions}
            open={open}
            onRequestClose={this.handleClose}
        >
          <form onSubmit={this.handleConfirm}>
            <TextField
              fullWidth
              name="title"
              floatingLabelText={I18n.t(isCreatingNewEntity ? 'createPlaceholder' : 'editPlaceholder')}
              value={title}
              onChange={this.handleChange}
            />
          </form>
        </Dialog>
    );
  }
}

export default connect(
(state, props) => ({
    ...props,
    isCreatingNewEntity: NotesDuck.creatingNewEntity(state),
    newTitle: NotesDuck.getNewTitle(state),
    entityInEdit: NotesDuck.getEditEntity(state)
})
)(Modal);
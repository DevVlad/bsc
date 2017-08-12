import superagent from 'superagent';

/**
 * Notes Service is handling all requests
 */
const notesEndPoint = 'https://private-anon-1c6b62c426-note10.apiary-mock.com/notes';

export const notesService = {
    getNotes: () => new Promise((res) => superagent
        .get(notesEndPoint)
        .then(({ body }) => res(body))
        .catch(err => console.error(err))
    ),

    createNewNote: (title = '') => new Promise((res) => superagent
        .post(notesEndPoint)
        .send({ title })
        .set('Accept', 'application/json')
        .then(({ body }) => res(body))
        .catch(err => console.error(err))
    ),

    deleteNote: (noteId = null) => new Promise((res) => superagent
        .delete(`${notesEndPoint}/${noteId}`)
        .then((data) => res(data))
        .catch(err => console.error(err))
    ),

    editNote: (note) => new Promise((res) => superagent
        .put(`${notesEndPoint}/${note.id}`)
        .set('Content-Type', 'application/json')
        .send({ title: note.title })
        .then(({ body }) => res(body))
        .catch(err => console.error(err))
    )
};
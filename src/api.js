import uuidv4 from 'uuid/v4';
const BASE_URL = 'https://googlekeep.herokuapp.com/api';


const mockDatabase = {
  notes: {

  }
};

// const fetchJSON = (url, option) => {
//   return fetch(`${BASE_URL}${url}`, {
//     ...option,
//     headers: {
//       'content-type': 'application/json',
//     } 
//   })
//   .then(response => {
//     if(!response.ok) {
//       throw new Error('error');
//     }

//     return response.json();
//   });
// }

const successHandler = (data) => {
  return Promise.resolve(data)
}

const mapToArray = data => {
  const keys = Object.keys(data);
  return keys.map(key => {
    return data[key];
  })
}

const fetchJSON = (url, option) => {
  // add default method GET
  option = {
    method: 'GET',
    ...option
  }

  // MOCK SERVER HANDLER
  // get notes
  if (url === '/notes' && option.method === 'GET') {
    const notes = mapToArray(mockDatabase.notes);
    return successHandler(notes);
  }

  // add note
  if (url === '/notes' && option.method === 'POST') {
    const note = JSON.parse(option.body);
    const randomId = uuidv4();
    mockDatabase.notes[randomId] = {
      ...note,
      id: randomId
    };

    return successHandler(note);
  }

  // update note
  if (url.indexOf('/notes') > -1 && option.method === 'PUT') {
    const note = JSON.parse(option.body);
    mockDatabase.notes[note.id] = {
      ...note,
    };

    return successHandler(note);
  }

  // delete note
  if (url.indexOf('/notes') > -1 && option.method === 'DELETE') {
    const noteId = url.split('/notes/')[1];
    delete mockDatabase.notes[noteId];

    return successHandler({ status: 'OK' });
  }
}

export const getNotes = () => {
  return fetchJSON('/notes');
}

export const getNote = noteId => {
  return fetchJSON(`/notes/${noteId}`);
}

export const addNote = note => {
  return fetchJSON('/notes', {
    method: 'POST',
    body: JSON.stringify(note),
  });
}

export const updateNote = note => {
  return fetchJSON(`/notes/${note.id}`, {
    method: 'PUT',
    body: JSON.stringify(note),
  });
}

export const deleteNote = note => {
  return fetchJSON(`/notes/${note.id}`, {
    method: 'DELETE',
  });
}

export const login = (username, password) => {
  return fetchJSON('/auth', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    })
  });
}

export const register = (username, password) => {
  return fetchJSON('/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    })
  });
}
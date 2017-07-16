import uuidv4 from 'uuid/v4';
const BASE_URL = 'https://google-keep.herokuapp.com/api';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImlhdCI6MTUwMDEwOTIxNCwiZXhwIjoxNTAwMTEyODE0fQ.EkE7nqENZknZyk1V2YkYMqUTkUNycEE5qJCKdpP97p8'

const fetchJSON = (url, option) => {
  return fetch(`${BASE_URL}${url}`, {
    ...option,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
    } 
  })
  .then(response => {
    if(!response.ok) {
      throw new Error('error');
    }

    return response.json();
  });
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

export const login = (email, password) => {
  return fetchJSON('/auth', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    })
  });
}

export const register = (username, password, email) => {
  return fetchJSON('/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      email,
    })
  });
}
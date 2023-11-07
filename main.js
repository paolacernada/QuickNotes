const app = {
  data: {
    url: "http://localhost:3000/notes/",
    notes: []
  },

  getNotes: function() {
    fetch(this.data.url)
    .then(r => r.json())
    .then(response => {
      this.data.notes = response;
      this.generateNotesHTML();
    });
  },

  createNote: function(note) {
    fetch(this.data.url, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(note)
    })
    .then(r => r.json())
    .then(newNote => {
      this.data.notes.push(newNote);
      this.generateNotesHTML();
    });
  },

  updateNote: function(id, updatedNote) {
    fetch(this.data.url + id, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updatedNote)
    })
    .then(r => r.json())
    .then(updatedNote => {
      const index = this.data.notes.findIndex(note => note.id === parseInt(id));
      if (index !== -1) {
        this.data.notes[index] = updatedNote;
      }
      this.generateNotesHTML();
    });
  },

  deleteNote: function(noteId) {
    fetch(this.data.url + noteId, {
      method: 'DELETE'
    })
    .then(() => {
      this.data.notes = this.data.notes.filter(note => note.id !== parseInt(noteId));
      this.generateNotesHTML();
    })
  },

  displayEditForm: function(noteId) {
    const note = this.data.notes.find(n => n.id === parseInt(noteId));
    if (!note) return;
    
    let form = document.getElementById('editForm');
    form.querySelector('input[type="text"]').value = note.title;
    form.querySelector('textarea').value = note.body;
    form.classList.remove('hidden');
    form.dataset.id = note.id;
  },

  generateNotesHTML: function() {
    const container = document.getElementById('container');
    container.innerHTML = '';
    this.data.notes.forEach(note => {
      const lastUpdated = note.updatedAt ? formatDate(new Date(note.updatedAt)) + ' at ' + formatTime(new Date(note.updatedAt)) : 'Never';
      container.innerHTML += `
        <div class="noteCard">
          <div class="noteHeader" id="noteTitle">${note.title}</div>
          <div>${note.body}</div><br>
          <div id="date">Last updated: <br>${lastUpdated}</div>
          <button class="editdeletebutton"onclick="app.displayEditForm(${note.id})">EDIT</button>
          <button class="deleteButton editdeletebutton" data-id=${note.id}>DELETE</button>
        </div>
      `;
    });
    this.addEventListeners();
  },

  addEventListeners: function() {
    let deleteButtons = document.querySelectorAll(".deleteButton");
    deleteButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.deleteNote(button.dataset.id);
      });
    });

    let editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let id = editForm.dataset.id;
      let updatedNote = {
        title: editForm.querySelector('input[type="text"]').value,
        body: editForm.querySelector('textarea').value,
        updatedAt: new Date().toISOString()
      };
      this.updateNote(id, updatedNote);
      editForm.classList.add('hidden');
    });
  },

  main: function() {
    this.getNotes();
    let createForm = document.getElementById('createForm');
    if (createForm) {
      createForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let newNote = {
          title: createForm.querySelector('input[name="title"]').value,
          body: createForm.querySelector('textarea[name="body"]').value,
          updatedAt: new Date().toISOString()
        };
        this.createNote(newNote);
        createForm.reset();
      });
    }
  }
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

app.main();

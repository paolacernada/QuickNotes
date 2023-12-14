# QuickNotes: Dynamic AJAX Note-Taking App

## Introduction
Welcome to QuickNotes, my personal project showcasing a dynamic, AJAX-powered note-taking application. It's a sleek and user-friendly platform for managing your notes, inspired by the simplicity and efficiency of modern apps with a retro look.

## Getting Started
First things first, let's get the app running on your machine:

```bash
npm install
cp sample-db.json db.json
npm start
```

After running these commands, your app will be live at `http://localhost:8080`, and the notes API can be accessed at `http://localhost:3000/notes/`.

## Features
- **Create, View, Edit, Delete**: Manage your notes effortlessly.
- **Real-Time Data Interaction**: Using Ajax for seamless CRUD operations.
- **Inspired by Google Keep**: A familiar yet unique design, making note-taking enjoyable and efficient.

## Using the Notes API
Interacting with the API is straightforward:

- **Get All Notes**: `GET http://localhost:3000/notes/`
- **Add a New Note**: 
  ```javascript
  fetch('http://localhost:3000/notes/', {
    method: 'POST', 
    headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify({"title": "New Note", "body": "Note Content"})
  })
  .then(r => r.json())
  .then(data => console.log(data))
  ```
- **Edit a Note**: `PATCH http://localhost:3000/notes/:id`
- **Delete a Note**: `DELETE http://localhost:3000/notes/:id`

## Conclusion
QuickNotes is more than just a project; it's a reflection of my journey in web development, emphasizing clean design and efficient functionality. Feel free to explore, fork, and contribute to this project!

Happy Note-Taking!

import { useState } from "react";
import Notes from "./components/Notes";
import AddNote from "./components/AddNote";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "A Ball on the swinger",
    },
    {
      id: 2,
      text: "A storm coming from the west",
    },
  ]);

  function handleAddNote(content) {
    const newNote = {
      id: notes.length + 1,
      text: content,
    };
    setNotes((notes) => [...notes, newNote]);
  }

  return (
    <div>
      <AddNote onAddNote={handleAddNote} />
      <div style={{ position: "relative", margin: "10px", height: "20px" }}>
        <Notes notes={notes} setNotes={setNotes} />
      </div>
    </div>
  );
}

export default App;

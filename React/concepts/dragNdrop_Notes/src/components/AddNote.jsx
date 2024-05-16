import { useState } from "react";

function AddNote({ onAddNote }) {
  const [content, setContent] = useState("");

  function handleClick() {
    onAddNote(content);
    setContent("");
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <input
          type="text"
          placeholder="Add a new note"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          style={{
            border: "1px solid black",
            padding: "2px",
            marginLeft: "6px",
          }}
          onClick={handleClick}
        >
          Add Note
        </button>
      </div>
    </div>
  );
}

export default AddNote;

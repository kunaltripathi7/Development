import { createRef, useEffect, useRef } from "react";
import Note from "./Note";

function determineNewPosition() {
  const maxX = window.innerWidth - 250;
  const maxY = window.innerHeight - 250;
  return {
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * maxY),
  };
}

function Notes({ notes = [], setNotes = () => {} }) {
  const noteRefs = useRef([]);
  // getting the notes from local storage -> side effect -> useEffect
  useEffect(
    function () {
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const updatedNotes = notes.map((note) => {
        const savedNote = savedNotes.find((curr) => curr.id === note.id);
        if (savedNote) {
          return { ...note, position: savedNote.position };
        } else {
          const position = determineNewPosition();
          return { ...note, position };
        }
      });
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    },
    [notes.length] // find a way to stop the loop........
  );

  // why refs -> cuz we need to manipulate position from this compo cuz we need all notes to check that.
  function handleDragStart(e, note) {
    const noteRef = noteRefs.current[note.id].current;
    const rect = noteRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    // client x -> gives the postion of the click happened from the left, whereas rect.left gives the positon to the left edge of the rectangle. so offsetX gives the diff to the left edge of rectangle & the click position
    const startPos = note.position;

    // why attaching event listeners on drag cuz otherwise they will fire off unnecessarily -> optimised
    // why attaching in document -> cuz we need to track the event in whole document.

    function handleMouseMove(e) {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    }

    function handleMouseUp() {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };
      // overlap check
      if (checkOverLap(note.id)) {
        noteRef.style.left = `${startPos.x}px`;
        noteRef.style.top = `${startPos.y}px`;
      } else {
        updateNotePosition(note.id, newPosition);
      }
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function updateNotePosition(id, newPosition) {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, position: newPosition } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }

  function checkOverLap(id) {
    const currentNoteRef = noteRefs.current[id].current;
    const currentRect = currentNoteRef.getBoundingClientRect();
    return notes.some((note) => {
      if (note.id === id) return false; // Skip the current note
      const otherNoteRef = noteRefs.current[note.id].current; // Corrected to use note.id for other notes
      const otherRect = otherNoteRef.getBoundingClientRect();

      // overlap func......
      const overlap = !(
        currentRect.right < otherRect.left ||
        currentRect.left > otherRect.right ||
        currentRect.bottom < otherRect.top ||
        currentRect.top > otherRect.bottom
      );
      return overlap;
    });
  }

  return (
    <div>
      {notes.map((note) => (
        <Note
          content={note.text}
          key={note.id}
          initialPos={note.position}
          ref={
            noteRefs.current[note.id]
              ? noteRefs.current[note.id]
              : (noteRefs.current[note.id] = createRef()) // creating a new ref automatically
          }
          onMouseDown={(e) => handleDragStart(e, note)}
        />
      ))}
    </div>
  );
}

export default Notes;

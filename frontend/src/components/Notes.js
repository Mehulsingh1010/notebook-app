import React from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
const Notes = () => {
  const context = useContext(NoteContext);
   // eslint-disable-next-line 
  const { notes, setNotes } = context;
  return (
    <div className="row">
      <h2 className="py-5">Your existing notes :</h2>
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note}/>
      })}
    </div>
  );
};

export default Notes;

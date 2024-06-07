// NoteState.js
import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6660978b4a99c1bfcc8a866f",
      user: "665ed0d47d5bbeed0a78062f",
      title: "New title for note",
      description: "New description for adding a new note",
      tag: "personal",
      Date: "2024-06-05T16:51:23.055Z",
      __v: 0,
    },
    {
      _id: "66622c350cecc1df30b1c4ff",
      user: "665ed0d47d5bbeed0a78062f",
      title: "New title for note2",
      description: "New description for adding a new note",
      tag: "personal",
      Date: "2024-06-06T21:37:57.746Z",
      __v: 0,
    },
    {
      _id: "6660978b4a99c1bfcc8a866f",
      user: "665ed0d47d5bbeed0a78062f",
      title: "New title for note",
      description: "New description for adding a new note",
      tag: "personal",
      Date: "2024-06-05T16:51:23.055Z",
      __v: 0,
    },
    {
      _id: "66622c350cecc1df30b1c4ff",
      user: "665ed0d47d5bbeed0a78062f",
      title: "New title for note2",
      description: "New description for adding a new note",
      tag: "personal",
      Date: "2024-06-06T21:37:57.746Z",
      __v: 0,
    },
    {
      _id: "6660978b4a99c1bfcc8a866f",
      user: "665ed0d47d5bbeed0a78062f",
      title: "New title for note",
      description: "New description for adding a new note",
      tag: "personal",
      Date: "2024-06-05T16:51:23.055Z",
      __v: 0,
    },
    {
      _id: "66622c350cecc1df30b1c4ff",
      user: "665ed0d47d5bbeed0a78062f",
      title: "New title for note2",
      description: "New description for adding a new note",
      tag: "personal",
      Date: "2024-06-06T21:37:57.746Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

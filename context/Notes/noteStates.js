import { useState } from "react";
import noteContext from "./noteContext";

const NoteState= (props)=>{
    const notesInitial=[
        {
          "_id": "621ce494c8e41ee98b7a7191",
          "user": "6213604b5e3bc9525ff97a6e",
          "title": "SmollPP",
          "description": "Mayn mahh d sooo smoll, imma contour it to make it look big",
          "tags": "DeepTalks!  iRONYatPeak",
          "date": "2022-02-28T15:04:52.841Z",
          "__v": 0
        },
        {
          "_id": "621ce4c0c8e41ee98b7a7193",
          "user": "6213604b5e3bc9525ff97a6e",
          "title": "hello",
          "description": "dead guy on a stick",
          "tags": "DeeppppTalks! ",
          "date": "2022-02-28T15:05:36.275Z",
          "__v": 0
        },
        {
          "_id": "621d0a64e68aa2ae92ccfb1d",
          "user": "6213604b5e3bc9525ff97a6e",
          "title": "dr8unk",
          "description": "dead guy on a stick",
          "tags": "Deedfvalks! ",
          "date": "2022-02-28T17:46:12.904Z",
          "__v": 0
        },
        {
          "_id": "621d0a70e68aa2ae92ccfb1f",
          "user": "6213604b5e3bc9525ff97a6e",
          "title": "ded",
          "description": "dead guy on a stick",
          "tags": "Dedtalks! ",
          "date": "2022-02-28T17:46:24.271Z",
          "__v": 0
        }
      ]
    const [notes,setnotes] = useState(notesInitial)

    //Add a note
    const addNote=(title,description,tags)=>{
      console.log(description)
      const note={
        "_id": "621d0a70e68aa2a5e92ccfb1f",
        "user": "6213604b5e3bc95254ff97a6e",
        "title": title,
        "description": description,
        "tags": tags,
        "date": "2022-02-28T17:46:24.271Z",
        "__v": 0
      };
      setnotes(notes.concat(note))
    }
    //Delete a note
    const deleteNote=(id)=>{
      const newNote=notes.filter(()=>{return notes._id!==id})
      setnotes(newNote);
    }
    //Edit a Note
    const editNote=()=>{
      
    }

    return(
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState
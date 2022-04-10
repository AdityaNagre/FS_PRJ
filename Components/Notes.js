import React, { useContext } from 'react'
import noteContext from '../context/Notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

function Notes() {
  const note=useContext(noteContext)
  const {notes, addNote}= note;

  return (
    <>
    <AddNote/>
    <div className="container my-3">
        <h2>Your Notes</h2>
        <div className="row">
        {notes.map((noteshow)=>{
          return <div className="col-md-4 my-3" key={noteshow._id}><Noteitem  noteshow={noteshow}/></div>
        })}</div>
    </div>
    </>
  )
}

export default Notes



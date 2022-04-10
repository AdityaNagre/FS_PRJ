import React,{ useContext } from 'react'
import noteContext from '../context/Notes/noteContext';

function Noteitem(props) {
  const note=useContext(noteContext)
  const {deleteNote} =note;
  
  return (
    <div className="card">
    <div className="card-body">
      <h5 className="card-title">{props.noteshow.title}</h5>
      <p className="card-text">{props.noteshow.description.length<=45?props.noteshow.description:props.noteshow.description.slice(0,42)}...</p>
      <i className="fa-solid fa-pen-to-square mx-2"></i>
      <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(notes._id)}}></i>
    </div>
  </div>
  )
}

export default Noteitem
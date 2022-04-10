import React,{ useContext,useState } from 'react'
import noteContext from '../context/Notes/noteContext';

const AddNote = () => {
    const note=useContext(noteContext)
    const {addNote}= note;
    const [inote, setinote] = useState({title: "", description: "", tags: "default"})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(inote.title,inote.description,inote.tags)
    }
    const handleChange=(e)=>{
      if(e.target.name==='title'){
        setinote({
          title: e.target.value,
          description: inote.description
        })
      }
      else{
        setinote({
          description: e.target.value,
          title: inote.title
        })
      }
    }
  return (
    <div>
        <h2>Add a Note</h2>
        <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' onChange={handleChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label" >Description</label>
          <input type="text" className="form-control" id="description" name='description' onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
    </div>
  )
}

export default AddNote
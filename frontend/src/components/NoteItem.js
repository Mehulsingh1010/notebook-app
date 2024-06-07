import React from "react";
import { TiDelete } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";

const NoteItem = (props) => {
  const { note } = props;
  return <div className="col-md-3">
    

    <div className="card my-3" >
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text"> {note.description}  </p>
    <TiDelete size={25}/>  <FaEdit size={20} />


    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  </div>
</div>

  </div>;
};

export default NoteItem;

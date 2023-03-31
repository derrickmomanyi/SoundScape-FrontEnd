import React from 'react'
import {  useState } from "react";
import "../css/CommentForm.css"

function Comment( { songVideoComment, handleDeleteComment, onUpdateComment, users } ) {
    const { id, body, user } = songVideoComment
    const [show, setShow] = useState(false)
    const [edit, setEdit] = useState(body)

    function handleShow() {
        setShow(!show)
    }

    function handleChange(e) {
        setEdit(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/song_video_comments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ body:edit }),
        })
        .then(res => res.json())
        .then(updatedComment => onUpdateComment(updatedComment))
        setEdit(body)
        setShow(!show)
    }

    let displayComments
    
    users && users.id === user.id ? 
        displayComments = 
        <div className={'display-comments'}>
            <button className={'fa-regular fa-pen-to-square'} onClick={handleShow}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></button>
            <button className='fa-regular fa-trash-can' onClick={() =>handleDeleteComment(id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></button>
            <form className={show ? "display" : "hide"} onSubmit={handleSubmit}>
                <textarea className="editInput" type='text' required id='name' name='name' onChange={handleChange} value={edit}/>
                <button className={'fa-regular fa-square-check'} type='submit'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg></button>
            </form>
         </div>
        : displayComments = null

    return(
        <div >
            <div className='individualComments'>
                <div className={show ? "hide" : "display"}> 
                    <p>By {user.username}</p>          
                    <p>{body}</p>
                </div>
        
                {displayComments}
            </div> 

        </div>
    )
} 

export default Comment;
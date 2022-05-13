import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split" //allows for adjustable split between page
import {nanoid} from "nanoid"  //helps to create unique ids

export default function App() {
    //State declaration
    const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || [])  //get the notes we previously wrote or start with a new array. Lazy state initializaiton
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )  //store the active note, initialized as the notes[0].id or nothing depending if notes[0] is defined


    //React reruns the entire function, even though it doesnt revert the state
    //Therefore, our initial state defenition may effect performance
    //Can be an expensive call
    //We can do a lazy state initializaiton so it gets called only once
    const [state, setState] = React.useState(() => console.log("State initializaiton"))

    //local storage is outside react! Use a side effect for everytime notes array changes
    React.useEffect(() => {
        //USING OUR LOCAL STORAGE: PROVIDE A KEY AND SERILIZED VERSION OF THE DATA YOU WANT SAVED
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes])

    function deleteNote(event, noteId) {
        event.stopPropagation(); //this will stop the clicking of the delete button to also select the note
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId)); //filter the notes array so that the note with the specified id is tossed
    }

    //function that creates a new note, adds it to the notes in state and sets the current note to the new one
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    //function that updates the contents of the current note only in state
    //does it in a way that the recently updated notes shows up first
    function updateNote(text) {
        setNotes(oldNotes => {
            let newNotes = [];
            for (let i = 0; i < oldNotes.length; i++){
                const oldNote = oldNotes[i];
                if (oldNote.id === currentNoteId){
                    newNotes.unshift({...oldNote, body: text});
                } else{
                    newNotes.push(oldNote);
                }
            }

            return newNotes;
        })
        
    }
    
    //finds what note you are currently on
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {
            notes.length > 0
            ?
            //if more than one note, create the editor view
            //Split allows the changable split view
            //Sidebar will contain all the notes and ability to create new note
            //Editor will have the current note open and the ability to update it
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            //No notes created yet
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}

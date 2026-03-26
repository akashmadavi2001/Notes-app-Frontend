import React, { useEffect, useState } from 'react'
import "./Notes.css"
import axios from 'axios';

export default function Notes() {
    const [notesData, setNotesData] = useState([]);
    const [notes, setNotes] = useState("");
    const [active, setActive] = useState(true);

    const loader = async () => {
        await axios
            .get("http://localhost:8080/notes")
            .then((res) => setNotesData(res.data))
    };

    useEffect(() => {
        loader();
    }, []);

    const saveNote = async () => {
        await axios
            .post("http://localhost:8080/notes", {
                note: notes,
            })
            .then((res) => setNotesData([...notesData, res.data]))
        setNotes("");
    }

    const deleteNotes = async (id) => {
        await axios
            .delete(`http://localhost:8080/notes/${id}`)
            .then(() => setNotesData(notesData.filter((noted) => noted.id !== id)))
    }

    const [noteId, setNoteId] = useState("");

    const updataNotes = async () => {
        await axios
            .put(`http://localhost:8080/notes/${noteId}`, {
                note: notes,
            })
            .then((res) => setNotesData([...notesData, res.data]))
        setNotes("");
        loader();
    }

    return (
        <div className='notes'>
            {active ?
                <form action={saveNote} className="intNotes">
                    <textarea
                        name="notes"
                        id="notes"
                        placeholder='Enter your notes'
                        maxLength={100}
                        value={notes}
                        required
                        onChange={(e) => setNotes(e.target.value)}>
                    </textarea>
                    <br />
                    <button>Save</button>
                </form>
                :
                <form action={() => { updataNotes(); setActive(!active) }} className="intNotes">
                    <textarea
                        name="notes"
                        id="notes"
                        placeholder='Edit your notes'
                        maxLength={100}
                        value={notes}
                        required
                        onChange={(e) => setNotes(e.target.value)}>
                    </textarea>
                    <br />
                    <button>Save</button>
                </form>}
            {notesData.map((noteD) =>
                <div key={noteD.id} className='note'>
                    <p>{noteD.note}</p>
                    <div className='btn'>
                        <button onClick={() => { setNoteId(noteD.id); setActive(!active); }}>Edit</button>
                        <button onClick={() => deleteNotes(noteD.id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    )
}

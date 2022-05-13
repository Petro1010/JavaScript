import React from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"

export default function Editor({ currentNote, updateNote }) {
    //takes in the currentNote and updateNote function as props

    //set up the state which contains the selectedTab (can be write or preview)
    const [selectedTab, setSelectedTab] = React.useState("write")

    //set up the markdown converter
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  

    return (
        <section className="pane editor">
            <ReactMde
                value={currentNote.body  /* value of the editor is whatever is written in the note body */}
                onChange={updateNote /* When the text changes update it accordingly */}
                selectedTab={selectedTab /* Built into react mde */}
                onTabChange={setSelectedTab /* Built into react mde */}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    )
}
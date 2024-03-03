import React, { useState } from 'react'
import { Editor } from '@monaco-editor/react'

function CodeEditorWindow(props) {
    const { onChange, language, code, theme } = props

    const [userInput, setUserInput] = useState(code || " ")
    
    const onChangeEditor = (val) => {
        setUserInput(val)
        onChange("code", val)
    }
    return (
        <div className='overlay rounded-md overflow-hidden w-full h-full shadow-4xl'>
            <Editor
                height={"85vh"}
                width={"100%"}
                language={language || "javascript"}
                value={userInput}
                theme={theme}
                defaultValue=''
                onChange={onChangeEditor}
            />
        </div>
    )
}

export default CodeEditorWindow
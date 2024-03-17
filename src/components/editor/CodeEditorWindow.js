import React, { useState } from 'react'
import { Editor } from '@monaco-editor/react'
import { Grid } from '@mui/material'

function CodeEditorWindow(props) {
    const { onChange, language, code, theme } = props

    const [userInput, setUserInput] = useState(code || " ")
    
    const onChangeEditor = (val) => {
        setUserInput(val)
        onChange("code", val)
    }
    return (
        <Grid item xs={12} style={{width:'100%'}}>
            <Editor
                height={"78vh"}
                width={"100%"}
                language={language || "javascript"}
                value={userInput}
                theme={theme}
                defaultValue=''
                onChange={onChangeEditor}
            />
        </Grid>
    )
}

export default CodeEditorWindow
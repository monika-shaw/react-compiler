import React from 'react'
import {ToastContainer} from 'react-toastify'
import CodeEditorWindow from './CodeEditorWindow'

function Landing() {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
            <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
            <div className="flex flex-row">
                <div className="px-4 py-2">
                    {/* <LanguagesDropdown onSelectChange={onSelectChange} /> */}
                </div>
                <div className="px-4 py-2">
                    {/* <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} /> */}
                </div>
            </div>
            <div className="flex flex-row space-x-4 items-start px-4 py-4">
                <div className="flex flex-col w-full h-full justify-start items-end">
                    <CodeEditorWindow
                        code={"code"}
                        onChange={"onChange"}
                        language={"language?.value"}
                        theme={"theme.value"}
                    />
                </div>
            </div>
        </>

    )
}

export default Landing
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import CodeEditorWindow from './CodeEditorWindow'
import LanguagesDropdown from './LanguagesDropdown'
import ThemeDropdown from './ThemeDropdown';
import { defineTheme } from '../../utils/defineTheme';
import { languageOptions } from '../constants/languageOptions';
import CustomInput from './CustomInput';
import { classnames } from '../../utils/general';
import OutputDetails from './OutputDetails';
import OutputWindow from './OutputWindow';
import useKeyPress from '../../hooks/useKeyPress';
import axios from "axios";
import { Grid } from '@mui/material';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import monacoThemes from "monaco-themes/themes/themelist";
const javascriptDefault = `// some comment`;

function Landing() {
    const [code, setCode] = useState(javascriptDefault);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [theme, setTheme] = useState({ value: "oceanic-next", label: "Oceanic Next" });
    const [language, setLanguage] = useState(languageOptions[0]);

    const onSelectChange = (event) => {
        console.log("selected Option...", event.target.value);
        setLanguage(languageOptions.find(data => data.id === event.target.value))
    };

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");
    const handleCompile = () => {
        setProcessing(true);
        const formData = {
            language_id: language.id,
            source_code: btoa(code),
            stdin: btoa(customInput),
        };
        const options = {
            method: "POST",
            url: process.env.REACT_APP_RAPID_API_URL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
            data: formData,
        };
        axios
            .request(options)
            .then(function (response) {
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                setProcessing(false);
                console.log(error);
            });
    };

    const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
        };
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            if (statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token)
                }, 2000)
                return
            } else {
                setProcessing(false)
                setOutputDetails(response.data)
                showSuccessToast(`Compiled Successfully!`)
                //console.log('response.data', response.data)
                return
            }
        } catch (err) {
            console.log("err", err);
            setProcessing(false);
            showErrorToast();
        }
    };

    const onChange = (action, data) => {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };
    async function handleThemeChange(event) {
        const selectedThemeId = event.target.value;
        for (const [themeId, themeName] of Object.entries(monacoThemes)) {
            if (themeId === selectedThemeId) {
                await defineTheme(themeId);
                setTheme({ value: themeId, label: themeName });
                break;
            }
        }
    }

    useEffect(() => {
        defineTheme("oceanic-next").then((_) =>
            setTheme({ value: "oceanic-next", label: "Oceanic Next" })
        );
    }, []);

    useEffect(() => {
        if (enterPress && ctrlPress) {
            console.log("enterPress", enterPress);
            console.log("ctrlPress", ctrlPress);
            handleCompile();
        }
    }, [ctrlPress, enterPress]);

    const showSuccessToast = (msg) => {
        // toast.success(msg || `Compiled Successfully!`, {
        //     position: "top-right",
        //     autoClose: 1000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        // });
    };
    const showErrorToast = (msg, timer) => {
        toast.error(msg || `Something went wrong! Please try again.`, {
            position: "top-right",
            autoClose: timer ? timer : 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    return (
        <>
            <Grid item xs={12}>
                <Grid container item xs={12}>
                    <Grid item xs={8} style={{ background: 'black', color: 'white', padding: '1rem' }}>Code Bee</Grid>
                    <Grid item xs={4} style={{ background: 'black', color: 'white', padding: '1rem' }}>Logo</Grid>
                </Grid>

                <Grid container item xs={12}>
                    <Grid container item xs={4}>
                        <Grid item xs={6}>
                            <LanguagesDropdown onSelectChange={onSelectChange} language={language?.id} />
                        </Grid>
                        <Grid item xs={6}>
                            <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                        </Grid>
                    </Grid>
                    <Grid item xs={8}></Grid>
                </Grid>

                <Grid container item xs={12}>
                    <Grid container item xs={8}>
                        <CodeEditorWindow
                            code={code}
                            onChange={onChange}
                            language={language?.value}
                            theme={theme.value}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <OutputWindow outputDetails={outputDetails} />
                        <CustomInput
                            customInput={customInput}
                            setCustomInput={setCustomInput}
                        />
                        <button
                            onClick={handleCompile}
                            disabled={!code}
                            className={classnames(
                                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                                !code ? "opacity-50" : ""
                            )}
                        >
                            {processing ? "Processing..." : "Compile and Execute"}
                        </button>
                        {outputDetails && <OutputDetails outputDetails={outputDetails} />}
                    </Grid>
                </Grid>

            </Grid>
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
        </>

    )
}

export default Landing
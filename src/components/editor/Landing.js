import React, { useEffect, useState } from 'react'
import { ToastContainer , toast} from 'react-toastify'
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
const javascriptDefault = `// some comment`;

function Landing() {
    const [code, setCode] = useState(javascriptDefault);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [theme, setTheme] = useState("cobalt");
    const [language, setLanguage] = useState(languageOptions[0]);

    const onSelectChange = (sl) => {
        console.log("selected Option...", sl);
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
    function handleThemeChange(th) {
        const theme = th;
        console.log("theme...", theme);

        if (["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme);
        } else {
            defineTheme(theme.value).then((_) => setTheme(theme));
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
        <Grid>
            <Grid container item xs={12}>
                <Grid item xs={8} style={{background:'black', color:'white', padding:'1rem'}}>Code Bee</Grid>
                <Grid item xs={4} style={{background:'black', color:'white', padding:'1rem'}}>Logo</Grid>
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
            <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
            <div className="flex flex-row">
                <div className="px-4 py-2">
                    <LanguagesDropdown onSelectChange={onSelectChange} />
                </div>
                <div className="px-4 py-2">
                    <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                </div>
            </div>
            <div className="flex flex-row space-x-4 items-start px-4 py-4" >
                <div className="flex flex-col w-full h-full justify-start items-end"style={{width:'40%', height:'10vh'}}>
                    <CodeEditorWindow
                        code={code}
                        onChange={onChange}
                        language={language?.value}
                        theme={theme.value}
                    />
                </div>
                <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
                    <OutputWindow outputDetails={outputDetails} />
                    <div className="flex flex-col items-end">
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
                    </div>
                    {outputDetails && <OutputDetails outputDetails={outputDetails} />}
                </div>
            </div>
        </>

    )
}

export default Landing
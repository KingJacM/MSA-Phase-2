import React from "react";
import "./Upload.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useState} from "react";
import { Alert } from "react-bootstrap";
import { AxiosRequestConfig, AxiosRequestHeaders} from "axios";


export default function Upload() {

  
  const hiddenFileInput = React.useRef<any|null>(null);
  const [file, uploadFile] = useState<AxiosRequestConfig<FormData>|null|any>(null);
  const [submitted, updateSubmission] = useState<any|null>(null);
  const [loading, SetLoading] = useState(false);

  async function handleSubmit() {
    const formdata = new FormData();
    formdata.append("file", file[0]);

    const headers:AxiosRequestHeaders = { "Content-Type": file[0].type };
    SetLoading(true);
    
    axios.post("http://localhost:8000/files", formdata, headers)
      .then(function (response: { data: string; }) {
        console.log(response)
        let msg = "";
        
        msg = response.data;
        

        updateSubmission(msg);
        SetLoading(false);
      });
    }
    
  

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    uploadFile(e.target.files);
  }

  function handleUpload() {
    hiddenFileInput.current.click();
  }

  return (
    
    <>
    <div className="note">
    <h3>The simple Web app uses Google Speech API to convert FLC files to text</h3>
    1. Find a audio file from <a href="https://audio-samples.github.io/">https://audio-samples.github.io/</a>
    <br></br>
    2. convert to .FLC using any converter (eg. <a href="https://cloudconvert.com/mp3-to-flac">https://cloudconvert.com/mp3-to-flac</a>)
    <br></br>
    3. Select file, Upload and wait patiently
    <h4>Note: the file size will be limited, try with smaller size files to start with</h4>
    
    </div>
    
      <div className="uploader-holder">
        <div className="uploader">
          <i className="fa-solid fa-file-lines"></i>
          <input
            className="center"
            type="file"
            // accept="application/pdf"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            onChange={(e) =>handleChange(e)}
            id="file-input"
          ></input>
          {file != null && file[0].name}
          <Button
            disabled={loading}
            className="select_button"
            id="select_button"
            onClick={handleUpload}
          >
            Select File
          </Button>
          <Button
            disabled={loading}
            className="upload-button"
            id="upload_button"
            onClick={handleSubmit}
          >
            Upload File
          </Button>

          
          <div className="uploader-footer">Accepts formats: .flac</div>
        </div>
      </div>
      <br></br>
      <div id="alert" className="text-center mb-4">
        {submitted != null && <Alert variant="info">{submitted}</Alert>}
      </div>

      <p style={{textAlign:"center"}}>Credit to https://github.com/KingJacM<br></br>For NZMSA purpose</p>
    </>
  );
}
  

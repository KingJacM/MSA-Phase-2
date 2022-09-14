import React from "react";
import "./Upload.css";
import { Button, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { useState} from "react";
import { Alert } from "react-bootstrap";
import { AxiosRequestConfig, AxiosRequestHeaders} from "axios";


export default function Upload() {

  
  const hiddenFileInput = React.useRef<any|null>(null);
  const [file, uploadFile] = useState<AxiosRequestConfig<FormData>|null|any>(null);
  const [submitted, updateSubmission] = useState<any|null>(null);
  const [loading, SetLoading] = useState(false);
  const [singleProgress, setSingleProgress] = useState(0);

  async function handleSubmit() {
    const bar = document.getElementById("progress-bar");
    const formdata = new FormData();
    formdata.append("file", file[0]);

    const headers:AxiosRequestHeaders = { "Access-Control-Allow-Origin":"*", "Content-Type": file[0].type};
    SetLoading(true);

    
    
    axios.post("https://speechtotextapplication320220810130715.azurewebsites.net/api/SpeechToText", formdata, {headers,onUploadProgress: (progressEvent) => {
      const progress = (progressEvent.loaded / progressEvent.total) * 90;
      setSingleProgress(progress);
    },})
      .then(function (response: { data: string; }) {
        console.log(response)
        let msg = "";
        
        msg = response.data;
        

        updateSubmission(msg);
        setSingleProgress(100);
        SetLoading(false);
      });
    }
    
  // const singleFileOptions = {
  //     onUploadProgress: (progressEvent) => {
  //         const {loaded, total} = progressEvent;
  //         const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
  //         setSingleProgress(percentage);
  //     }
  // }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    uploadFile(e.target.files);
    setSingleProgress(0);
  }

  function handleUpload() {
    hiddenFileInput.current.click();
  }

  return (
    
    <>
    <div className="note">
    <h3>The simple Web app uses Google Speech API to convert FLC/MP3 files to text</h3>
    1. Find a audio file from <a href="https://audio-samples.github.io/">https://audio-samples.github.io/</a>
  
    <br></br>
    2. Select file, Upload and wait patiently
    <h4>Note: the file size will be limited to 60 seconds</h4>
    
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

          
          <div className="uploader-footer">Accepts formats: .mp3 .flac</div>
        </div>
      </div>
      <div style={{width:"50vw",margin:"auto", marginTop:50}} id="progress" >
        <ProgressBar now={singleProgress} label={`${singleProgress}%`} animated />
      </div>
      <br></br>
      <div id="alert" className="text-center mb-4">
        {submitted != null && <Alert variant="info">{submitted}</Alert>}
      </div>

      <p style={{textAlign:"center"}}>Credit to https://github.com/KingJacM<br></br>For NZMSA purpose</p>
    </>
  );
}
  

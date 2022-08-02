from fastapi import UploadFile, File

# Imports the Google Cloud client library
from google.cloud import speech

async def speechToText(file: UploadFile ,file_name: str,file_type:str):

    try:
        f = await file.read()
        print(file_name)
        client = speech.SpeechClient.from_service_account_file("oceanic-bindery-356922-689632b5ff9d.json")
        


        audio = speech.RecognitionAudio(content=f)

        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.FLAC,
            # sample_rate_hertz=16000,
            language_code="en-US",
        )

        # Detects speech in the audio file
        response = client.recognize(config=config, audio=audio)
        str = ""
        for result in response.results:
            str+= result.alternatives[0].transcript
        return str
    except:
        print
        return "Something went wrong"
               
    
        
        
    


    

   

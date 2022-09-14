# MSA-Phase-3

check out live: https://fanciful-rolypoly-70164c.netlify.app/

# 1. Get Started
The Google Speech-to-Text API requires a server side backend to run. Therefore a python FastAPI is created in order to assist.
> update: In Phase-3, the frontend will be calling the Azure deployed .NET backend with axios, hence FastAPI is no longer needed.

**Frontend React**: just navigate to `speech` folder and run `npm install` and `npm start`

~~Backend Fast API~~:
1. `pip install fastapi'
2. `pip install google-cloud-speech'
3. `python -m uvicorn main:app --reload`

If step 3 fails, a set up of python virtual enviroment maybe needed (venv folder is also uploaded to github)
refer to https://fastapi.tiangolo.com/tutorial/ if any error regarding FastApi

### A json key file is needed for verifying API usage, contact me if needed.
> update: no longer needed

# 2. Features
UI Scalability with window size ✔

Mobile first development (using media query breakpoints, etc) ✔

Progressive Web App (PWA) functionality w/ clear use of the service worker ✔
- The app is able to run offline (returns information page)

API connection to your own API that is cloud hosted  ✔ 

At least one fluid animation  ✔ 
- Upload progress bar assisted by Axios - **sometimes the bar may freeze but would jump to 100% once finished**


# 3. Important notes
google-cloud-speech now supports FLAC and mp3 with Phase 3 update using GoogleCloud's beta library. API only supports files < 60 seconds

If there's any problems on running, start an issue.

**Last Warning: due to account type used for Google Cloud and Azure, some services may no longer be maintained and have the possibility of being disabled in the future**

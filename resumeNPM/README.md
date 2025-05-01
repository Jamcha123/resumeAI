# resume-creator

resume-creator npm is a npm package for creating or improving CVs and Resumes

you have to first get a openai api secret
openai site: https://platform.openai.com

Get Started: 

    1. npm i resume-creator

    2. import resumeAI from 'resumeai' // import it, it still called resumeAI 

    3. const init = new resumeAI() // initialize it

function list: 

    1. await init.improve_resume(openai_secret, {"file_name": "The the PDF CV filename", "word_limit": "word limit of the CV"})

    2. await init.create_resume(openai_secret, {"CV_about": "Enter a CV topic like IT or service", "word_limit": "word limit of the CV"})

you have to use await since the functions are promises 

web app: https://resume-ai.org

Git repo: https://github.com/Jamcha123/resumeAI

You have to be patient 
hope you like it 
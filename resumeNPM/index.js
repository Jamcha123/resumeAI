import fs from 'fs'
import OpenAI from 'openai'
import {fileURLToPath} from 'url'
import {dirname} from 'path'


export default class resumeAI{
    async improve_resume(openai_secret, options={"file_name": "1234", "word_limit": "1234"}){
        const ai = new OpenAI({apiKey: openai_secret})

        if(Number.isInteger(options["word_limit"]) === false){
            throw new Error(options["word_limit"] + " is not an integer")
        }

        const __filename = fileURLToPath(import.meta.url)
        const __dirname = dirname(__filename)

        const files = fs.readdirSync(__dirname, "utf-8")
        let active = false
        files.forEach((e) => {
            if(e.toString() == options["file_name"]){
                active = true
            }
        })
        if(active === false){
            throw new Error(options["file_name"] + " is not in the dictionary")
        }

        const file = await ai.files.create({
            file: fs.createReadStream(options["file_name"].toString(), "utf-8"), 
            purpose: "user_data"
        })

        const response = await ai.responses.create({
            model: "gpt-4o",
            input: [
                {
                    role: "user", 
                    content: [
                        {type: "input_file", file_id: file.id}, 
                        {type: "input_text", text: "improve this CV using " + options["word_limit"].toString()}
                    ]
                }
            ]
        })
        fs.createWriteStream("improved.pdf", "utf-8").write(response.output_text)
        return "a improved CV called improved.pdf is created"

    }
    async create_resume(openai_secret, options={"CV_about": "1234", "word_limit": "1234"}){
        const ai = new OpenAI({apiKey: openai_secret})

        if(Number.isInteger(options["word_limit"]) === false){
            throw new Error(options["word_limit"] + " is not an integer")
        }
        
        const response = await ai.chat.completions.create({
            model: "gpt-4o", 
            messages: [
                {
                    role: "user", 
                    content: [
                        {type: "text", text: "write a CV about " + options["CV_about"].toString() + " in around " + options["word_limit"].toString()}
                    ]
                }
            ]
        })
        fs.createWriteStream("cv.pdf", "utf-8").write(response.choices[0].message["content"])
        return "cv.pdf is created"
    }    

}
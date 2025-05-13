import * as functions from 'firebase-functions'
import OpenAI from 'openai'
import admin from 'firebase-admin'

const ai = new OpenAI({
    apiKey: ""
})

export const web_resume = functions.https.onRequest({cors: true}, async (req, res) => {
    const text = req.query.text
    const words = req.query.words

    const response = await ai.chat.completions.create({
        model: "gpt-4o", 
        messages: [
            {
                role: "user", 
                content: [
                    {type: "text", text: "write a CV that wil get you hired about " + text.toString() + " in " + words.toString() + " words"}
                ]
            }
        ]
    })
    res.status(200).send(response.choices[0].message["content"].toString())
    return res.end()
})

admin.initializeApp()
export const api_resume = functions.https.onRequest({cors: true}, async (req, res) => {
    const topic = req.query.topic; 
    const words = req.query.words

    const response = await ai.chat.completions.create({
        model: "gpt-4.1", 
        messages: [
            {
                role: "user", 
                content: [
                    {
                        type: "text", 
                        text: "write a short CV about " + topic + " that HR loves in " + words + ", please", 
                    }
                ]
            }
        ]
    })
    const results = response.choices[0].message["content"]
    res.status(200).send(results)
    return res.end()
})
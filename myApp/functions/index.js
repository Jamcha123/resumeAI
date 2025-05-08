import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import OpenAI from 'openai'

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
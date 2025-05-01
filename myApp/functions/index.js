import functions from 'firebase-functions'
import OpenAI from 'openai'

const ai = new OpenAI({
    apiKey: ""
})

export const reader = functions.https.onRequest({cors: true}, async (req, res) => {
    const file = req.query.file
    const length = req.query.length
    const response = await ai.chat.completions.create({
        model: "gpt-4o", 
        messages: [
            {
                role: "user", 
                content: [
                    {
                        type: "text", 
                        text: "impove this short CV like in " + Number.parseInt(length) + " words " + file + ", please"
                    }
                ]
            }
        ]
    })
    res.status(200).send(response.choices[0].message["content"])
    return res.end()
})
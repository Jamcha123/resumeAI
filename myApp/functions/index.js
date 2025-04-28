import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import OpenAI from 'openai/index.mjs'
import Stripe from 'stripe'
import fs from 'fs'

const ai = new OpenAI({
    apiKey: ""
})

export const fileRead = functions.https.onRequest({cors: true}, async (req, res) => {
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
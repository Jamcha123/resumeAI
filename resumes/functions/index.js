import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import ModelClient from '@azure-rest/ai-inference'
import {AzureKeyCredential} from '@azure/core-auth'
import axios from 'axios'
import Stripe from 'stripe'
import fs from 'fs'

dotenv.config()
admin.initializeApp()

admin.firestore().settings({
    databaseId: "resume-ai",
    ignoreUndefinedProperties: true
})
const client = new ModelClient("https://aistudioaiservices308224805493.services.ai.azure.com/models", new AzureKeyCredential(process.env["AZURE"]))

const stripe = new Stripe(process.env["STRIPE"])

let link = "https://www.googleapis.com/customsearch/v1?key=" + process.env["SEARCH"] + "&cx=b6cc731b86e3f442c&q="

const items = async (text) => {
    const response = await client.path("/chat/completions").post({
        body: {
            model: "DeepSeek-V3-0324", 
            messages: [
                { role:"system", content: "You are a helpful assistant." },
                { role:"user", content: text }
            ],
            max_tokens: 2048,
            temperature: 0.1,
            top_p: 0.5,
        }
    })
    return response.body.choices[0].message.content
}

export const checkout = functions.https.onRequest({cors: true}, async (req, res) => {
    const {user, amount} = req.query
    const {uid} = (await admin.auth().getUser(user)).toJSON()

    if(uid == undefined){
        return res.status(400).send(user + " uid not found")
    }
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price: "price_1RyqS8BJFXFW6fU3FsEk3uKV", 
            quantity: Number.parseInt(amount)
        }],
        automatic_tax: {enabled: true}, 
        mode: "payment", 
        success_url: "https://more-usage-lug4hmfaaa-uc.a.run.app?user=" + uid + "&amount=" + amount, 
        cancel_url: "https://resume-ai.org"
    })
    res.redirect(301, session.url)
})

export const more_usage = functions.https.onRequest({cors: true}, async (req, res) => {
    const {user, amount} = req.query
    const {uid} = (await admin.auth().getUser(user)).toJSON()

    if(uid == undefined){
        return res.status(400).send(user + " uid not found")
    }

    const {balance} = (await admin.firestore().collection("usage").doc(uid).get()).data()
    let target = (Number.parseInt(balance * 100) + Number.parseInt(Number.parseInt(amount) * 100)) / 100
    const obj = {}
    obj["balance"] = target
    await admin.firestore().collection("usage").doc(uid).set(obj)

    res.redirect(301, "https://resume-ai.org")
})

export const resume = functions.https.onRequest({cors: true}, async (req, res) => {
    const {user, company, role, cv} = req.query
    link += company

    const {uid} = (await admin.auth().getUser(user)).toJSON()
    if(uid == undefined){
        return res.status(400).send(user + " is not an user")
    }
    const webby = (await axios.get(link))["data"]
    let ans = ""
    
    webby["items"].forEach((e) => {
        ans += e["title"] + " " + e["snippet"] + "\n"
    })

    const target = await items("adapt this CV: " + cv + " to this job role: " + role + " at this company: " + ans)
    return res.status(200).send(target)

})

export const info = functions.https.onRequest({cors: true}, async (req, res) => {
    const {user, company} = req.query
    link += company

    const {uid} = (await admin.auth().getUser(user)).toJSON()
    if(uid == undefined){
        return res.status(400).send(user + " is not an user")
    }
    const webby = (await axios.get(link))["data"]
    let ans = ""
    webby["items"].forEach((e) => {
        ans += e["title"] + " " + e["snippet"] + "\n"
    })
    return res.status(200).send(await items("summarize this text " + ans + ", just some quick facts on the company, please"))
})


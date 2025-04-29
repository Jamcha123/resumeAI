import { useState, useEffect, useRef } from 'react'
import {motion} from 'framer-motion'
import axios from 'axios';
import './App.css'
import './fire.js'

function AddResume(){
  useEffect(() => {
    const forms = document.getElementById("form"); 
    const file = document.getElementById("resume"); 
    const length = document.getElementById("lines")

    forms.addEventListener("submit", async (e) => {
      e.preventDefault()
      const reader = new Promise((resolve) => {
        const data = new Blob([file.files[0]])
        const fr = new FileReader()
        fr.onload = (e1) => {
          const targets = e1.target.result
          resolve(targets)
        }
        fr.readAsText(data)
      })
      const readData = await reader

      const link = "https://reader-xofmanudfa-uc.a.run.app?file=" + readData + "&length=" + length.value; 
      const getData = await axios.get(link)
      
      const newFile = document.createElement("a")
      newFile.href = URL.createObjectURL(new Blob([getData["data"]]))
      newFile.download = "improved.docx"
      newFile.click()
    })
  })
  return(
    <form action="" method="get" id="form" className="relative w-[40em] h-[20em] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
      <div className="flex flex-col align-middle justify-evenly text-center min-h-[fit-content] min-w-[100%]">
        <div className="flex flex-row align-middle justify-evenly text-center min-h-[8em] min-w-[100%]">
          <input type="number" name="lines" id="lines" required placeholder="enter number of words  " className="relative cursor-pointer bg-slate-900 w-[20em] h-[4em] m-auto p-[0] text-center text-xl text-white" />
        </div>
        <div className="flex flex-row align-middle justify-evenly text-center min-h-[fit-content] min-w-[100%]">
          <input type="file" required name="resume" id='resume' className="relative cursor-pointer w-[12em] h-[4em] m-auto p-[0] text-center text-xl text-white " />
        </div>
        <div className="flex flex-row align-middle justify-evenly text-center min-h-[fit-content] min-w-[100%]">
          <label htmlFor="resume" className="relative cursor-pointer w-[12em] h-[4em] m-auto p-[0] text-center text-xl text-white underline underline-offset-2">
            Enter your CV
          </label>
        </div>
      </div>
      <div className="flex flex-row align-middle justify-evenly text-center min-h-[5em] min-w-[100%]  ">
        <motion.button initial={{scale: 1}} whileHover={{scale: 0.9}} whileTap={{scale: 1.1}} className="relative w-[20em] h-[3em] m-auto p-[0] bg-slate-500 text-white text-xl cursor-pointer  ">
          Improve CV
        </motion.button>
      </div>
      <div className="flex flex-col mt-[10%] align-middle justify-center text-center min-h-[fit-content] min-w-[100%] ">
        <div className="flex flex-row mt-[0%] align-middle justify-center text-center min-h-[fit-content] min-w-[100%] ">
          <h1 className="text-2xl text-white mt-[0%]">ResumeAI - A CV improver</h1>
        </div>
        <div className="flex flex-row mt-[0%] align-middle justify-center text-center min-h-[fit-content] min-w-[100%] ">
          <h1 className="text-2xl text-white">ResumeAI only takes .pdf and .txt</h1>
        </div>
        <div className="flex flex-row mt-[0%] align-middle justify-center text-center min-h-[fit-content] min-w-[100%] ">
          <h1 className="text-2xl text-white mt-[0%]">Be patient, AI can take some time</h1>
        </div>
      </div>
    </form>
  )
}
export default function App(){
  return(
    <div className="flex flex-col align-middle justify-center text-center min-h-[100%] min-w-[100%] ">
      <AddResume></AddResume>
    </div>
  )
}
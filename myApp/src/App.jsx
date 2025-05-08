import { useState, useEffect, useRef } from 'react'
import {motion} from 'framer-motion'
import axios from 'axios';
import './App.css'
import './fire.js'

function AddNavBar(){
  return(
    <nav className="fixed w-[100%] h-[fit-content] m-auto p-[0] top-[0%] z-[200] bg-transparent ">
      <ul className="flex flex-row align-middle justify-evenly text-start relative w-[100%] m-auto p-[0] h-[2em] ">
        <li className="text-xl underline underline-offset-2 text-white"><a href="#0">Landing Page</a></li>
        <li className="text-xl underline underline-offset-2 text-white"><a href="#1">ResumeAI creator</a></li>
        <li className="text-xl underline underline-offset-2 text-white"><a href="#2">ResumeAI API</a></li>
      </ul>
    </nav>
  )
}
export default function App(){
  useEffect(() => {
    const form1 = document.getElementById("form1")
    const words = document.getElementById("words")
    const topic = document.getElementById("topic")

    form1.addEventListener("submit", async (e) => {
      e.preventDefault()
      const link = "http://127.0.0.1:5001/resumeai-2fc2a/us-central1/web_resume?text=" + topic.value + "&words=" + words.value
      const webby = await axios.get(link)

      const file = document.createElement("a")
      file.href = URL.createObjectURL(new Blob([webby["data"]]))
      file.download = "resume.txt"
      file.click()
    })
  })
  return(
    <div className="relative w-[100%] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center  ">
      <AddNavBar></AddNavBar>
      <section className="relative w-[100%] h-[100vh] m-auto p-[0] bg-transparent overflow-hidden flex flex-col align-middle justify-center text-center ">
        <div className="relative w-[100%] h-[50%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center ">
          <div className="relative w-[fit-content] md:w-[50%] h-[150%] z-[100] md:translate-x-[-40%] translate-y-[20%] bg-transparent m-auto p-[0] flex flex-col align-middle justify-center text-center ">
            <div className="flex flex-row align-middle justify-center md:justify-start md:ml-[5%] text-start relative w-[100%] m-auto p-[0] min-h-[5em] overflow-hidden ">
              <motion.h1 initial={{translateX: -100 + "%", translateY: -100 + "%"}} whileInView={{translateX: 0 + "%", translateY: 0 + "%"}} transition={{type: "spring", duration: 2}} className="text-2xl text-black">ResumeAI</motion.h1>
            </div>
            <div className="flex flex-row align-middle justify-center md:justify-start md:ml-[10%] text-start relative w-[100%] m-auto p-[0] min-h-[5em] overflow-hidden ">
              <motion.h1 initial={{translateX: -100 + "%", translateY: -100 + "%"}} whileInView={{translateX: 0 + "%", translateY: 0 + "%"}} transition={{type: "spring", duration: 2}} className="text-2xl text-black">Generating CVs</motion.h1>
            </div>
            <div className="flex flex-row align-middle justify-center md:justify-start md:ml-[15%] text-start relative w-[100%] m-auto p-[0] min-h-[5em] overflow-hidden ">
              <motion.h1 initial={{translateX: -100 + "%", translateY: -100 + "%"}} whileInView={{translateX: 0 + "%", translateY: 0 + "%"}} transition={{type: "spring", duration: 2}} className="text-2xl text-white md:text-black">Disclaimer: Be patient, takes time</motion.h1>
            </div>
            <div className="flex flex-col md:flex-row align-middle justify-center md:justify-start md:ml-[20%] text-start relative w-[100%] m-auto p-[0] h-[12em] md:h-[5em] overflow-hidden">
              <motion.button onClick={() => {window.location.href = "/#1"}} initial={{scale: 1}} whileHover={{scale: 0.9}} whileTap={{scale: 1.1}} transition={{type: "spring", duration: 1}} className="relative w-[80%] md:w-[40%] h-[4em] m-auto p-[0] cursor-pointer bg-gradient-to-tr from-slate-500 via-slate-600 to-slate-700 rounded-xl text-white text-xl underline underline-offset-2 " >
                ResumeAI
              </motion.button>
              <motion.button onClick={() => {window.location.href = "/#2"}} initial={{scale: 1}} whileHover={{scale: 0.9}} whileTap={{scale: 1.1}} transition={{type: "spring", duration: 1}} className="relative w-[80%] md:w-[40%] h-[4em] m-auto p-[0] cursor-pointer bg-gradient-to-tr from-slate-500 via-slate-600 to-slate-700 rounded-xl text-white text-xl underline underline-offset-2 " >
                The Resume API
              </motion.button>
            </div>
          </div>
        </div>
        <div className="relative w-[170%] h-[200%] m-auto p-[0] bg-sky-800 rotate-z-[-10deg] translate-x-[-20%] md:translate-x-[-20%] translate-y-[20%] md:translate-y-[30%] ">
        </div>
      </section>
      <section id="1" className="relative w-[100%] h-[50vh] m-auto p-[0] overflow-hidden flex flex-col align-middle justify-center bg-sky-800 text-center">
        <div className="flex flex-col align-middle justify-center text-center min-h-[10vh] min-w-[100%] ">
          <h1 className="text-3xl text-white ">ResumeAI</h1>
          <p className="text-xl text-white">
            The longer the Resume, the longer it takes
          </p>
        </div>
        <div className="flex flex-col align-middle justify-center text-center min-h-[40vh] min-w-[30%] relative m-auto p-[0] ">
          <form action="" method="get" id="form1" className="relative w-[100%] h-[75%] m-auto p-[0] flex flex-col align-middle justify-center text-center  ">
            <input type="number" required min={1} id="words" placeholder="How many words for CV" className="relative w-[100%] h-[3em] m-auto p-[0] bg-slate-500 text-center text-white text-xl " />
            <input type="text" required id="topic" placeholder="enter a CV job topic e.g doctor" className="relative w-[100%] h-[3em] m-auto mt-[5%] p-[0] bg-slate-500 text-center text-white text-xl " />
            <motion.input initial={{scale: 1}} whileHover={{scale: 0.9}} whileTap={{scale: 1.1}} type="submit" id="submit" value="generate CV" className="relative mt-[5%] w-[100%] h-[3em] m-auto p-[0] bg-slate-700 text-center text-white text-xl cursor-pointer" />
          </form>
        </div>
      </section>
      <section id="2" className="relative w-[100%] h-[100vh] m-auto p-[0] overflow-hidden flex flex-col align-middle justify-center bg-sky-800 text-center">

      </section>
    </div>
  )
}

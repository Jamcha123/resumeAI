import { useState, useEffect, useRef } from 'react'
import {color, motion} from 'framer-motion'
import axios from 'axios';
import './App.css'
import './fire.js'
import copy from './assets/copy.png'
import git from './assets/github.png'
import google from './assets/google.png'
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const config = {
  apiKey: "AIzaSyAHSF2tc71BuMiZbdAC5Yw2kZz1LX61yLE",
  authDomain: "resumeai-2fc2a.firebaseapp.com",
  projectId: "resumeai-2fc2a",
  storageBucket: "resumeai-2fc2a.firebasestorage.app",
  messagingSenderId: "152728544431",
  appId: "1:152728544431:web:1bac8097c7f1551de2e05a",
  measurementId: "G-ZCRJFZRSXP"
}
const app = initializeApp(config)

const auth = getAuth(app)

const google1 = new GoogleAuthProvider()

const git1 = new GithubAuthProvider()


export default function App(){
  useEffect(() => {
    const form1 = document.getElementById("form1")
    const words = document.getElementById("words")
    const topic = document.getElementById("topic")

    form1.addEventListener("submit", async (e) => {
      e.preventDefault()
      const link = "https://web-resume-xofmanudfa-uc.a.run.app?text=" + topic.value + "&words=" + words.value
      const webby = await axios.get(link)

      const file = document.createElement("a")
      file.href = URL.createObjectURL(new Blob([webby["data"]]))
      file.download = "resume.txt"
      file.click()
    })
    onAuthStateChanged(auth, async (user) => {
      if(user != null){
        document.getElementById("developer_portal").style.display = "flex"
        const link = "https://api-resume-xofmanudfa-uc.a.run.app/?topic=corrupt%20poiltician&words=40"
        document.getElementById("link").href = link
      }else{

        document.getElementById("developer_portal").style.display = "flex"
      }
    })
  })
  return(
    <div className="relative w-[100%] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center  ">
      <section id="0" className="relative w-[100%] h-[100vh] m-auto p-[0] bg-transparent overflow-hidden flex flex-col align-middle justify-center text-center ">
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
      <section id="2" className="relative w-[100%] min-h-[75vh] max-h-[fit-content] mt-[0%] m-auto p-[0] overflow-hidden flex flex-col align-middle justify-center bg-sky-800 text-center">
        <h1 className="text-2xl text-white mt-[10%] ">ResumeAI developer API</h1>
        <div id="developer_portal" className="flex flex-col align-middle justify-center text-center relative w-[100%] h-[20%] m-auto p-[0] bg-transparent">
          <div className="relative w-[50%] h-[40%] m-auto p-[0] flex flex-col align-middle justify-center text-center bg-transparent">
            <div className="relative w-[100%] h-[5vh] m-auto p-[0] bg-gray-800 flex flex-row align-middle justify-center text-center ">
              <div className="relative w-[90%] h-[100%] m-auto p-[0] flex flex-col align-middle justify-center text-center ">
                <div className="relative w-[100%] h-[75%] m-auto p-[0] flex flex-row align-middle justify-center text-center ">
                  <div className="relative w-[50%] h-[100%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-end text-end ">
                    <a className="text-violet-400 text-xl underline underline-offset-4  " id="link">API link</a>
                  </div>
                  <div className="relative w-[15%] h-[100%] m-auto p-[0] bg-transparent "></div>
                </div>
              </div>
              <div className="relative w-[10%] h-[100%] m-auto p-[0] flex flex-col align-middle justify-center text-center ">
                <div className="relative w-[100%] h-[100%] m-auto p-[0] flex flex-row align-middle justify-center text-center ">
                  <motion.img id="copied" className="cursor-pointer" onClick={onAuthStateChanged(auth, (user) => {window.navigator.clipboard.writeText("https://api-resume-xofmanudfa-uc.a.run.app/?topic=corrupt%20poiltician&words=40")})} whileHover={{scale: 1.1}} whileTap={{scale: 0.5}} initial={{scale: 0.75}} src={copy} width={50 + "%"} height={100 + "%"} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

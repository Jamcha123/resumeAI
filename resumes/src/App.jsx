import { useState, useRef, useEffect } from 'react'
import './App.css'
import {motion} from 'framer-motion'
import axios from 'axios'
import $ from 'jquery'
import {BarController, BarElement, CategoryScale, Chart as ChartJS, LinearScale} from 'chart.js/auto'
import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'
import { createUserWithEmailAndPassword, deleteUser, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

ChartJS.register(BarController, BarElement, LinearScale, CategoryScale)
const config = {
  apiKey: "key",
  authDomain: "cv-ai-e2d4d.firebaseapp.com",
  projectId: "cv-ai-e2d4d",
  storageBucket: "cv-ai-e2d4d.firebasestorage.app",
  messagingSenderId: "664144563505",
  appId: "1:664144563505:web:04db036e951d1b84d2f410",
  measurementId: "G-XZ70SZXB1Y"
}

const app = initializeApp(config)

const appcheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider("6LeSEa0rAAAAAMQI5UtTTweeFZfkcRBKzurLaO4e"), 
  isTokenAutoRefreshEnabled: true
})

const auth = getAuth(app)
auth.useDeviceLanguage()

const github = new GithubAuthProvider()

const google = new GoogleAuthProvider()

onAuthStateChanged(auth, (user) => {
  if(user == null){
    signInAnonymously(auth)
    console.log("user, not found")
  }else{
    console.log("user, logged in")
  }

})

const db = getFirestore(app, "resume-ai")

function AddNavbar(){
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user != null){
        if(user.isAnonymous == true){
          console.log(user.isAnonymous)
          document.getElementById("logout").style.display = "none"
          document.getElementById("login").style.display = "flex"
          document.getElementById("anon").style.display = "flex"
          document.getElementById("logged").style.display = "none"
        }else{
          document.getElementById("login").style.display = "none"
          document.getElementById("logout").style.display = "flex"
          document.getElementById("anon").style.display = "none"
          document.getElementById("logged").style.display = "flex"
        }
      }else{
        document.getElementById("anon").style.display = "none"
        document.getElementById("logged").style.display = "none"
      }
    })
  })
  return(
    <nav className="fixed w-[100%] m-auto h-[5em] top-[0%] p-[0] bg-slate-800 z-[99] flex flex-row align-middle justify-center text-center ">
      <ul className="relative w-[75%] h-[100%] flex flex-row align-middle justify-start text-start ">
        <div className="relative w-[10em] h-[100%] m-auto ml-0 mr-0 p-[0] bg-slate-900 flex flex-col align-middle justify-center text-center  ">
          <li className='text-xl text-white underline underline-offset-2 transition-all duration-100 hover:scale-[1.1] active:scale-[0.9] '><a href="#item1">CV adapter</a></li>
        </div>
        <div className="relative w-[10em] h-[100%] m-auto ml-0 mr-0 p-[0] bg-slate-900 flex flex-col align-middle justify-center text-center ">
          <li className='text-xl text-white underline underline-offset-2 transition-all duration-100 hover:scale-[1.1] active:scale-[0.9] '><a href="#item2">Search Info</a></li>
        </div>
        <div className="relative w-[10em] h-[100%] m-auto ml-0 mr-0 p-[0] bg-slate-900 flex flex-col align-middle justify-center text-center ">
          <li className='text-xl text-white underline underline-offset-2 transition-all duration-100 hover:scale-[1.1] active:scale-[0.9] '><a href="#item3">Billing</a></li>
        </div>
      </ul>
      <ul className="relative w-[25%] h-[100%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-end text-end ">
        <div id='login' className="relative w-[100%] h-[100%] m-auto ml-0 mr-0 p-[0] bg-slate-900 flex flex-row text-center align-middle justify-center  ">
          <motion.a onClick={() => {deleteUser(auth.currentUser).then((value) => {window.location.href = "/login.html"}).catch((err) => {alert(err)})}} initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} className='relative w-[50%] h-[50%] m-auto p-[0] bg-transparent cursor-pointer underline underline-offset-2 text-white text-2xl text-center '>
            Login Now
          </motion.a>
        </div>
        <div id='logout' className="relative w-[100%] h-[100%] m-auto ml-0 mr-0 p-[0] bg-slate-900 flex flex-col align-middle justify-center ">
          <motion.a onClick={(e) => {e.preventDefault(); signOut(auth).then((value) => {window.location.reload()})}} initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} className='relative w-[100%] h-[50%] m-auto p-[0] bg-transparent cursor-pointer underline underline-offset-2 text-white text-2xl text-center '>
            Logout
          </motion.a>
        </div>
      </ul>
    </nav>
  )
}
let myChart = null
export default function App(){
  async function AddData(balance, id){
    if(myChart){
      myChart.clear()
      myChart.destroy()
    }
    let total = Math.ceil(balance)
    let left = balance
    let usage = Number.parseFloat((Number.parseInt(total * 100) - Number.parseInt(left * 100)) / 100)

    document.getElementById("total").innerText = "Total Balance: $" + total
    document.getElementById("left").innerText = "Balance Left: $" + left
    document.getElementById("usage").innerText = "Usage: $" + usage

    const ctx = document.getElementById(id)
    myChart = new ChartJS(ctx, {
      type: "bar", 
      data: {
        labels: ["Total Balance", "Balance Left", "Usage"],
        datasets: [{
          label: "Balance",
          data: [total, left, usage],
          backgroundColor: ["green", "lime", "blue"]
        }]
      }
    })
    return "data"
  }
  useEffect(() => {
    (async () => {
      const form1 = document.getElementById("form1")
      const company = document.getElementById("company")
      const role = document.getElementById("role")
      const cv = document.getElementById("cv")

      form1.addEventListener("submit", async (e) => {
        e.preventDefault()
        onAuthStateChanged(auth, async (user) => {
          if(user == null){
            alert("need to be logged in")
            return
          }

          const file = cv.files[0]
          const items = new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = (j) => {
              const results = j.target.result
              resolve(results)
            }
            reader.readAsText(file)
          })
          const data = await items

          const link = "https://resume-lug4hmfaaa-uc.a.run.app?user=" + user.uid + "&company=" + company.value + "&role=" + role.value + "&cv=" + data
          const webby = await axios.get(link)

          let x = document.createElement("a")
          x.href = URL.createObjectURL(new Blob([webby["data"]]))
          x.download = "/resume.docx"
          x.click()

          let usage = (await getDoc(doc(db, "/usage/" + user.uid))).get("balance")
          let num = Number.parseFloat((Number.parseInt(usage * 100) - 5) / 100)
          
          const obj = {}
          obj["balance"] = num
          await setDoc(doc(db, "/usage/" + user.uid), obj)
        })
      })

      const form2 = document.getElementById("form2")
      const company_info = document.getElementById("company_info")
      form2.addEventListener("submit", async (e) => {
        e.preventDefault()
        onAuthStateChanged(auth, async (user) => {
          if(user == null){
            alert("need to be logged in")
            return
          }

          const link = "https://info-lug4hmfaaa-uc.a.run.app?user=" + user.uid + "&company=" + company_info.value
          const webby = await axios.get(link)

          $("#info").empty()
          let x = document.createElement("p")
          x.innerText = webby["data"]
          x.classList.add("info")
          document.getElementById("info").appendChild(x)

          let usage = (await getDoc(doc(db, "/usage/" + user.uid))).get("balance")
          let num = Number.parseFloat((Number.parseInt(usage * 100) - 5) / 100)
          
          const obj = {}
          obj["balance"] = num
          await setDoc(doc(db, "/usage/" + user.uid), obj)
        })
      })

      let num = 0
      let canvas = document.createElement("canvas")
      canvas.setAttribute("id", "bg" + num.toString())
      document.getElementById("charts").appendChild(canvas)

      onAuthStateChanged(auth, async (user) => {
        let usage = (await getDoc(doc(db, "/usage/" + user.uid))).get("balance")
        if(usage == undefined){
          await setDoc(doc(db, "/usage/" + user.uid), {
            balance: 1
          })
        }
        usage = (await getDoc(doc(db, "/usage/" + user.uid))).get("balance")
        await AddData(usage, "bg" + num.toString())
      })
      window.addEventListener("resize", async (e) => {
        e.preventDefault()
        $("#charts").empty()

        num += 1

        let x = document.createElement("canvas")
        x.setAttribute("id", "bg" + num.toString())
        document.getElementById("charts").appendChild(x)

        onAuthStateChanged(auth, async (user) => {
          if(user != null){
            let usage = (await getDoc(doc(db, "/usage/" + user.uid))).get("balance")
            await AddData(usage, "bg" + num.toString())
          }
        })
      })
      const form3 = document.getElementById("form3")
      const amount = document.getElementById("amount")
      form3.addEventListener("submit", async (e) => {
        e.preventDefault()
        onAuthStateChanged(auth, (user) => {
          if(user.isAnonymous === true){
            alert("No anonymous logins, you have to login at the top right corner")
            return
          }
          const link = "https://checkout-lug4hmfaaa-uc.a.run.app?user=" + user.uid + "&amount=" + amount.value
          window.location.href = link
        })
      })
    })()
  })
  return(
    <div className="relative w-[100%] h-[300vh] m-auto p-[0] bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800  flex flex-col align-middle justify-center text-center ">
      <AddNavbar></AddNavbar>
      <div className="relative w-[100%] h-[300vh] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
        <section id='item1' className="relative w-[100%] h-[100vh] translate-y-[0%] min-h-[100vh] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
          <div className="relative w-[100%] m-auto p-[0] mb-[5%] h-[fit-content] flex flex-row align-middle justify-center text-center bg-transparent ">
            <h1 id='anon' className='text-2xl text-white flex flex-col align-middle justify-center text-center'>You using an anonymous login<br /><p className='text-xl mt-[2%]'>You receive $1 free credit</p></h1>
            <h1 id='logged' className='text-2xl text-white flex flex-col align-middle justify-center text-center'>You are logged in<br /><p className='text-xl mt-[2%]'>You receive $1 free credit</p></h1>
          </div>
          <form action="" method='get' id='form1' className='relative rounded-md w-[75%] md:w-[50%] lg:w-[40%] h-[fit-content] m-auto mt-0 p-[0] bg-slate-600 flex flex-col align-middle '>
            <div className="relative w-[100%] h-[8vh] m-0 mb-0 mt-[1%] p-[0] rounded-t-md bg-slate-700 flex flex-col align-middle justify-center text-center text-xl text-white  ">
              <h1 className='text-2xl text-white flex flex-col align-middle justify-center text-center '>CV Adapter</h1>
              <h1 className='text-xl text-white flex flex-col align-middle justify-center text-center '>Costs $0.10 per CV</h1>
            </div>
            <input required id='company' type="text" placeholder='enter a company' className='relative w-[100%] h-[8vh] m-0 mb-0 mt-[1%] p-[0] bg-slate-700 flex flex-row align-middle justify-center text-center text-xl text-white '  />
            <input required id='role' type="text" placeholder='enter a job role' className='relative w-[100%] h-[8vh] m-0 mb-0 mt-[1%] p-[0] bg-slate-700 flex flex-row align-middle justify-center text-center text-xl text-white '  />
            <div className="relative w-[100%] h-[5vh] m-0 mb-0 mt-[1%] p-[0] bg-slate-700 flex flex-row align-middle justify-start text-start text-xl text-white  ">
              <h1 className='text-xl text-white flex flex-col align-middle justify-center text-center ml-[3%] '>Enter Your CV</h1>
            </div>
            <input id='cv' required type="file" className='relative w-[100%] cursor-pointer h-[8vh] m-0 mb-0 mt-[1%] p-[0] bg-slate-700 flex flex-row align-middle justify-center text-center text-xl text-white '  />
            <motion.input initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} type="submit" value="generate a new CV for the job " className='relative w-[100%] rounded-b-md underline underline-offset-2 cursor-pointer h-[8vh] m-0 mb-0 mt-[1%] p-[0] bg-slate-800 flex flex-row align-middle justify-center text-center text-xl text-white '  />
          </form>
        </section>
        <section id='item2' className="relative w-[100%] h-[100vh] translate-y-[0%] min-h-[100vh] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
          <form action="" method='get' id='form2' className='relative w-[75%] md:w-[50%] rounded-md lg:w-[40%] h-[fit-content] m-auto p-[0] bg-slate-600 flex flex-col align-middle'>
            <div className="relative w-[100%] h-[8vh] rounded-t-md m-0 mb-0 mt-[1%] p-[0] bg-slate-700 flex flex-col align-middle justify-center text-center text-xl text-white">
              <h1 className="text-xl text-white flex flex-col align-middle justify-center text-center ">Search And Summarize Company info</h1>
              <h1 className="text-xl text-white flex flex-col align-middle justify-center text-center ">Costs $0.05 Per Company Search</h1>
            </div>
            <div id='info' className="relative w-[100%] h-[50vh] overflow-y-auto overflow-x-hidden rounded-t-md m-0 mb-0 mt-[1%] p-[0] bg-slate-700 flex flex-col align-middle"></div>
            <input required type="text" id='company_info' placeholder='enter a company' className='relative w-[100%] h-[8vh] m-0 mb-0 mt-[1%] p-[0] bg-slate-700 flex flex-row align-middle justify-center text-center text-xl text-white '  />
            <motion.input initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} type="submit" value="Generate A Summary" className='relative rounded-b-md underline underline-offset-2 cursor-pointer w-[100%] h-[8vh] m-0 mb-0 mt-[1%] p-[0] bg-slate-800 flex flex-row align-middle justify-center text-center text-xl text-white '  />
          </form>
        </section>
        <section id='item3' className="relative w-[100%] h-[100vh] translate-y-[0%] min-h-[100vh] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
          <div className="relative w-[75%] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center">
            <div id='charts' className="relative w-[100%] h-[40%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
            </div>
            <div className="relative w-[100%] h-[60%] m-auto p-[0] bg-transparent flex flex-col align-middle ">
              <div className="relative w-[100%] h-[15em] md:h-[5em] m-0 mt-[2%] p-[0] bg-transparent flex flex-col md:flex-row align-middle justify-evenly text-center ">
                <h1 id='total' className="text-xl text-green-500">Total Balance: </h1>
                <h1 id='left' className="text-xl text-lime-500">Balance Left: </h1>
                <h1 id='usage' className="text-xl text-blue-500">Usage: </h1>
              </div>
              <form action="" method='get' id='form3' className="relative w-[50%] h-[5em] m-0 mt-[2%] ml-auto mr-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center">
                <input type="number" required id='amount' min={1} className='relative w-[75%] h-[100%] m-auto p-[0] bg-slate-700 flex flex-row align-middle text-center justify-center text-xl text-white ' placeholder='Add A Amount Here'  />
                <motion.input initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} type="submit" id='submit' value="Buy More" className='relative w-[25%] cursor-pointer underline underline-offset-2 h-[100%] m-auto p-[0] bg-slate-600 flex flex-row align-middle text-center justify-center text-xl text-white' />
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

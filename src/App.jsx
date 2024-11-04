import { useState, useEffect, useRef } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faRotateRight } from '@fortawesome/free-solid-svg-icons'

import Snackbar from '@mui/material/Snackbar';
import { Slide } from '@mui/material'
import Alert from '@mui/material/Alert';

function App() {

  const [length, setLength] = useState(5)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [copy, setCopy] = useState(false)
  const [reset, setReset] = useState(false)

  const passwordGenerator = () => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }

  const passwordRef = useRef(null)
  const rotateRef = useRef(null)

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(() => {
    document.title = "PassKit"
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])

  return (

    <div
      id='height'
      className="rounded-lg px-4 py-3 text-orange-500 bg-gray-800">
      <h1
        id='font-size'
        className="text-orange-500 text-center mb-3 font-extrabold text-xl">
        PassKit
      </h1>

      <div
        id="input"
        className="flex rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          className="outline-none w-full py-1 px-3 font-semibold"
          value={showPassword ? password : '*'.repeat(password.length)}
          readOnly
          ref={passwordRef} />

        <button
          className='bg-white outline-none pr-2'
          onClick={() => {
            setShowPassword(!showPassword)
          }}
        >
          {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
        </button>

        <button
          onClick={() => {
            copyPasswordToClipboard();
            setCopy(true)
          }}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 rounded-r-lg'>
          Copy
        </button>

        <Snackbar
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={copy}
          autoHideDuration={2500}
          onClose={() => setCopy(false)}
        >
          <Alert
            severity="success"
            variant="filled"
          >
            Password is copied !!!
          </Alert>
        </Snackbar>

        <button
          className='ml-3 hover:text-orange-400 '

          onClick={() => {
            setReset(true)
            passwordGenerator();

            rotateRef.current.style.transform = 'rotate(180deg)';

            setTimeout(() => {
              rotateRef.current.style.transform = 'rotate(0deg)'
            }, 190);

          }}
        >
          <FontAwesomeIcon
            ref={rotateRef}
            icon={faRotateRight} />
        </button>

        <Snackbar
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={reset}
          autoHideDuration={1000}
          onClose={() => setReset(false)}
        >
          <Alert
            severity="success"
            variant="filled"
          >
            Password is reset !!!
          </Alert>
        </Snackbar>

      </div>

      <div
        id="attributes"
        className='flex gap-x-2'>

        <div
          id="attributes"
          className='flex gap-x-1'>

          <input
            type="range"
            min={5}
            max={25}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(Number(e.target.value))}
          />

          <label >
            Length: {length}
          </label>

        </div>

        <div
          className='flex gap-x-1'>

          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed(prev => !prev)}
          />

          <label>
            Number
          </label>

        </div>

        <div
          className='flex items-center gap-x-1'>

          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />

          <label>
            Character
          </label>

        </div>

      </div>

    </div >


  )
}

export default App

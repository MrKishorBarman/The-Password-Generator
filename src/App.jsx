import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  const [length, setLength] = useState(5)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
  
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  })

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(() => {
    document.title = "The Password Generator"
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])


  const passwordRef = useRef(null)



  return (

    <div
      className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 text-orange-500 bg-gray-800">

      <h1
        className="text-white text-center my-3">
        Password Generator
      </h1>

      <div
        className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef} />

        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
          Copy
        </button>

      </div>


      {/* <div className='flex text-sm gap-x-2'> */}
        <div className='flex items-center gap-x-1'>

          <div
            className='flex items-center gap-x-1'>

            <input
              type="range"
              min={3}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
              />

            <label >
              Length: {length}
            </label>

          </div>

          <div
            className='flex items-center gap-x-1'>

            <input
              type="checkbox"
              defaultChecked={numberAllowed}
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
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />

            <label>
              Character
            </label>

          </div>

        </div>

      </div>


      )
}

      export default App
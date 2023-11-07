import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import toolkit from '@reduxjs/toolkit'
import { diff } from 'json-diff-ts';


const app = express()

import { URL } from 'url';

const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

const port = process.env.SERVER_PORT || '3003'

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const initialState = { value: 0 }
export function counterReducer(state = initialState, action: toolkit.Action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'counter/increment') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1
    }
  }
  // otherwise return the existing state unchanged
  return state
}


export const store = toolkit.configureStore({
  reducer: counterReducer,
})

app.post('/performAction', (req,res)=> {
  console.log(req.body)
  
  const oldState = store.getState()
  store.dispatch(req.body)
  const newState = store.getState()
  const diffs = diff(oldState, newState)

  console.log(diffs)

  res.send(diffs)
}) 

app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

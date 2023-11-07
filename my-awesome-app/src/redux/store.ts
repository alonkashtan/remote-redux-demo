import { configureStore } from '@reduxjs/toolkit'
import { counterReducer, applyPatchReducer } from './reducer'
import { applyPatch } from './actions'

const store = configureStore({
  reducer: applyPatchReducer,
  middleware: [
    store => next => async action => {
      if (action.type != 'patch') {
         const response = await fetch(window.location.protocol + "//" + window.location.host + "/performAction", {
          method: "POST",
          body: JSON.stringify(action),
          headers: {
            "Content-Type": "application/json",
          }
        }).then(resonse=>resonse.json())
        console.log(applyPatch(response))
        return next(applyPatch(response))
      }
    }
  ]
})

export default store

export const storeNoMiddleware = configureStore({
  reducer: counterReducer,
})
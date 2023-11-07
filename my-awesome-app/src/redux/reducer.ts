import { Action, PayloadAction, combineReducers } from '@reduxjs/toolkit'
import { applyChangeset, Changeset } from 'json-diff-ts';

const initialState = { value: 0 }

export function counterReducer(state = initialState, action: Action) {
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

export function applyPatchReducer(state = initialState, action: PayloadAction<Changeset>) {
    if (action.type === 'patch') {
        console.log('Applying patch: ', action.payload)
        return applyChangeset(state, action.payload)
    }
    // otherwise return the existing state unchanged
    return state
  }

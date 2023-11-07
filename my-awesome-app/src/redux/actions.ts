import { Action, PayloadAction } from "@reduxjs/toolkit"

export function incrementCounter() : Action {
    return {
        type: "counter/increment"
    }
}

export function applyPatch(patch: object) : PayloadAction<object> {
    return {
        type: "patch",
        payload: patch
    }
}
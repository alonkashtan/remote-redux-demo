import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './styles.css'
import { incrementCounter } from '../../redux/actions';

function App() {
  const dispatch = useDispatch();
  const selector = useSelector(state=>state)

  return (
    <div className="App">
      <div className="header regular">{'{ Desktop Menu }' + JSON.stringify(selector)}</div>
      <div className="header small">{'{ Mobile Menu }'}</div>
      <div className="content">Make something awesome</div>
      <button onClick={()=>dispatch(incrementCounter())}>Press me</button>
    </div>
  )
}

export default App
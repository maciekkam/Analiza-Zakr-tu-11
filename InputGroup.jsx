import React from 'react'

const InputGroup = ({title, value, set, unit}) => {
  return (
    <div className='flexbox flex-col'>
    <label className='label'>
      <span className='label-text'>{title}</span>
    </label>
    <label className='input-group'>
      <input
      className='input input-bordered'
      type="number" 
      value = {value}
      onChange={(e) => set(e.target.value)} 
      />
      <span> {unit} </span>
    </label>
  </div>
  )
}

export default InputGroup
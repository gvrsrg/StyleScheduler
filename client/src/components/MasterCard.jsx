import React from 'react'
import Master from './Master'
import SlotList from './SlotList'

export default function MasterCard(master) {
  //console.log("master:"+master)
  return (
    <div>
      <h2>Master:</h2>
      <Master master={master} />
      <SlotList master={master} />

    </div>
  )
}

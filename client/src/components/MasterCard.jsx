import React from 'react'
import Master from './Master'
import SlotList from './SlotList'

export default function MasterCard(master) {
  return (
    <div>
      <Master master={master} />
      <SlotList master={master} />

    </div>
  )
}

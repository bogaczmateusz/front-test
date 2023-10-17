import React from 'react'

const GridItem = ({image, name}) => {
  return (
    <div className="w-[33.333333%] text-center">
        <img src={image} alt={name} className="block mx-auto w-auto h-[300px]" />
        <h3 className="py-3">{name}</h3>
    </div>
  )
}

export default GridItem
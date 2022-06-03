import React from 'react'

export default function Footer() {

const style = {
    backgroundColor: "var( --secondary-color)",
    color:"white",
    position: "fixed",
    bottom: 0,
    height: "fit-content",
    width: "100vw",
    textAlign : "center",
    padding:"4px"
}

  return (
    <div style={style} >
        Ecommerce 2022 
    </div>
  )
}

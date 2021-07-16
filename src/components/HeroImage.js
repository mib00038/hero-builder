import React from "react"
import Paper from "@material-ui/core/Paper"
import brokenImage from "broken-image.png"

const HeroImage = ({ name, imageUrl, isActive }) => {
  const handleImgOnError = (e) => e.target.src = brokenImage

  return (
    <Paper square elevation={isActive ? 6 : 1} className='pointer image-paper' style={{ maxHeight: 340, maxWidth: 'max-content' }}>
      <img
        aria-label={name}
        src={imageUrl}
        className='h-100 b--blue obj-fit-cover'
        onError={handleImgOnError}
        width={340}
      />
    </Paper>
  )
}

export default HeroImage
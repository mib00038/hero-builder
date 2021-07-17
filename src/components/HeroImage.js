import React from "react"
import Paper from "@material-ui/core/Paper"
import brokenImage from "broken-image.png"
import placeholder from "placeholder.png"

import cx from "classnames"
import ProgressiveImage from "react-progressive-graceful-image";

const HeroImage = ({ name, imageUrl, isActive, width= 340 }) => {
  const handleImgOnError = (e) => e.target.src = brokenImage

  return (
    <Paper
      square
      elevation={isActive ? 6 : 1}
      className={cx('pointer image-paper w-max-content', { 'active-paper' : isActive } )}
      style={{ maxHeight: 340 }}
    >
      <ProgressiveImage src={imageUrl} placeholder={placeholder} onError={handleImgOnError}>
        {(src) => (
          <img
            className={cx('h-100 b--blue obj-fit-cover')}
            {...{ src, placeholder, width }}
            aria-label={name}
          />
        )}
      </ProgressiveImage>
    </Paper>
  )
}

export default HeroImage
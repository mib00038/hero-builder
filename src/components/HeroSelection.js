import React, { useEffect } from "react"
import { MAIN_URL } from "App"
import Grid from "@material-ui/core/Grid"
import cx from 'classnames'
import produce from "immer"
import HeroImage from "components/HeroImage"

const getGridSizes = (totalItems) => {
  switch (totalItems) {
    case 2:
      return {lg: 6, md: 6}
    case 3:
      return {lg: 4, md: 4}
    default:
      return {lg: 3, md: 4}
  }
}

const HeroSelection  = ({ heroes, setHeroes, hero, setHero, isMobile }) => {
  const { md, lg } = getGridSizes(heroes.length)

  useEffect(() => {
    return () => setHeroes([])
  }, [setHeroes])

  return (
    <div className='mh4'>
      <Grid container className='w-100 justify-center h-100 bg-white' spacing={4}>
        {heroes.map((_hero) => {
          const {name, id, image} = _hero
          const isActive = hero.id === id
          const imageUrl = MAIN_URL.concat(image)
          const handleOnClick = () => {
            setHero(produce(_hero, draft => {
              draft.imageUrl = imageUrl
            }))
          }

          return (
            <Grid
              key={id}
              item
              xs={12} sm={6} md={md} lg={lg}
              className='flex flex-column justify-center'
              onClick={handleOnClick}
              style={{maxWidth: 340}}
            >
              <h1
                className={cx(
                  'tc f2 fw5 ttu',
                  {'blue-ribbon': id === hero.id},
                  {'f3 mb1': isMobile},
                  {'mb3': !isMobile}
                )}
              >
                {name}
              </h1>
              <HeroImage {...{ name, imageUrl, isActive }} />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default HeroSelection
import React, { useEffect } from "react"
import { MAIN_URL } from "App"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import brokenImage from 'broken-image.png'
import cx from 'classnames'
import produce from "immer"


const HeroSelection  = ({ heroes, setHeroes, hero, setHero }) => {
  useEffect(() => {
    return () => setHeroes([])
  }, [setHeroes])

  return (
    <div className='mh4'>
      <Grid container className='w-100 justify-center h-100 bg-white' spacing={4}>
        {heroes.map((_hero) => {
          const {name, id, image} = _hero
          const imageUrl = MAIN_URL.concat(image)
          const handleOnClick = () => {
            setHero(produce(_hero, draft => {
              draft.imageUrl = imageUrl
            }))
          }
          const handleImgOnError = (e) => e.target.src = brokenImage

          return (
            <Grid
              key={id}
              item
              xs={12} sm={6} md={4} lg={3}
              className='flex flex-column justify-center'
              onClick={handleOnClick}
              style={{maxWidth: 300}}
            >
              <h1
                className={cx(
                  'tc f2 fw5 ttu mb3',
                  {'blue-ribbon': id === hero.id}
                )}
              >
                {name}
              </h1>
              <Paper square elevation={hero.id === id ? 6 : 1} className='pointer image-paper'>
                <img
                  aria-label={name}
                  src={imageUrl}
                  className='w-100 h-100 b--blue cover'
                  onError={handleImgOnError}
                />
              </Paper>

            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default HeroSelection
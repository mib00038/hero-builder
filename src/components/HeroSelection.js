import React, { useEffect } from "react"
import { MAIN_URL } from "App"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import brokenImage from 'broken-image.png'

const HeroSelection  = ({ heroes, setHeroes, hero, setHero }) => {
  useEffect(() => {
    return () => setHeroes([])
  }, [setHeroes])

  return (
    <Grid container className='w-100 justify-center' spacing={4}>
      {heroes.map((_hero) => {
        const { name, id, image } = _hero
        const handleOnClick = () => setHero(_hero)
        const handleImgOnError = (e) => e.target.src = brokenImage

        return (
          <Grid
            key={id}
            item
            xs={12} sm={6} md={4} lg={3}
            className='flex flex-column justify-center'
            onClick={handleOnClick}
          >
            <h1 className='tc f2 fw5 ttu mb3'>{name}</h1>
            <Paper square elevation={hero.id === id ? 6: 1}>
              <img
                aria-label={name}
                src={MAIN_URL.concat(image)}
                className='w-100 h-100 b--blue cover'
                onError={handleImgOnError}
              />
            </Paper>

          </Grid>
        )
      })}
    </Grid>
  )
}

export default HeroSelection
import React from "react"
import useSkills from "hooks/useSkills"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import SkillSlider from "components/SkillSlider"
import cx from 'classnames'

const SkillCustomization = ({ hero, setHero }) => {
  const { skills } = hero
  const { pointsRemaining, handleSkillChange } = useSkills({ hero, setHero })

  return (
    <Container maxWidth='sm'>
      <div className='flex flex-wrap w-100'>
        <h1 className='fw5 w-100 flex flex-wrap items-center justify-center'>
          Remaining: <div style={{ minWidth: '3rem' }} className={cx('mh2 tr')}>{pointsRemaining}</div> points
        </h1>
        {skills.map(({name, points = 0}, index) => (
          <Grid container key={name} className='mb2'>
            <Grid item>
              <h4 className='mb0 b'>{name}</h4>
            </Grid>
            <Grid item xs={12}>
              <SkillSlider  {...{ name, points , index, handleSkillChange }} />
            </Grid>
          </Grid>
        ))}
      </div>
    </Container>
  )
}

export default SkillCustomization
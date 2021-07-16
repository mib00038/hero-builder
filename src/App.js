import React, {useEffect, useState} from 'react'
import Container from '@material-ui/core/Container'
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import 'App.css'
import cx from "classnames"
import HeroSelection from "components/HeroSelection"
import SkillCustomization from "components/SkillCustomization"
import ViewResult from "components/ViewResult"
import isEmpty from "lodash/isEmpty"

export const MAIN_URL = 'https://frontend-interview-hero-63u64o32qq-uk.a.run.app'
const HEROES = '/heroes'
const START_STEP = 0

const steps = [{
  stepLabel: 'Class',
  pageTitle: 'Create Your Hero'
}, {
  stepLabel: 'Skills',
  pageTitle: 'Fine Tune Your Skills'
}, {
  stepLabel: 'Result',
  pageTitle: 'Your Hero is Ready!'
}]

const App = () => {
  const [step, setStep] = useState(0)
  const [heroes, setHeroes] = useState([])
  const [hero, setHero] = useState({})

  useEffect(() => {
    if (step === START_STEP) {
      fetch(MAIN_URL.concat(HEROES))
        .then(resp => resp.json())
        .then(data => setHeroes(data.heroes))
    }
  }, [step])

  return (
    <Container maxWidth='md' className='bg-white vh-100'>
      <div className='flex flex-wrap h-100'>
        <div className='w-100 relative'>
          <Grid container className='w-100 mt4 tc'>
            {steps.map(({ stepLabel }) => {
              const isActive = stepLabel === steps[step].stepLabel

              return (
                <Grid
                  item
                  xs={4}
                  key={stepLabel}
                  className={cx({'activeStep': isActive})}
                >
                  <h1 className={cx('fw5 mb0 pb2', {'blue-ribbon': isActive})}>
                    {stepLabel}
                  </h1>
                </Grid>
              )
            })}
          </Grid>
          <h1 className='w-100 tc mt5 f2'>
            {steps[step].pageTitle}
          </h1>
          <MainContent {...{ step, heroes, setHeroes, hero, setHero }} />
          <div className='flex justify-between w-100 pa5'>
            <div className='ma4 absolute bottom-0 left-2'>
              <Button
                color='primary'
                variant='contained'
                className='ma4 absolute bottom-0 left-2'
                onClick={() => {
                  setStep(0)
                  setHero({})
                }}
                disabled={step === 0}
                classes={{label: 'ttc f4'}}
              >
                Reset
              </Button>
            </div>
            <div className='ma4 absolute bottom-0 right-2'>
              <Button
                color='primary'
                variant='contained'
                onClick={() => setStep(step => step + 1)}
                disabled={isEmpty(hero)}
                classes={{label: 'ttc f4'}}
              >
                {step === 0 ? 'Next' : 'Finish'}
              </Button>
            </div>
          </div>
        </div>

      </div>
    </Container>
  );
}

const MainContent = ({ step, heroes, setHeroes, hero, setHero }) => {
  switch (step) {
    case 0:
      return <HeroSelection {...{ heroes, setHeroes, hero, setHero }} />
    case 1:
      return <SkillCustomization {...{ hero, setHero }} />
    case 2:
      return <ViewResult />
    default:
      console.error('Unrecognized step', { step })
      return null
  }
}

export default App

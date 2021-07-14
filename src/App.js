import React, {useEffect, useState} from 'react'
import Container from '@material-ui/core/Container'
// import * as Progress from '@radix-ui/react-progress'
// import { styled } from "@stitches/react"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import 'App.css'
import cx from "classnames"
import HeroSelection from "components/HeroSelection";
import SkillCustomization from "components/SkillCustomization";
import ViewResult from "components/ViewResult";

const URL = 'https://frontend-interview-hero-63u64o32qq-uk.a.run.app'
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

  useEffect(() => {
    if (step === START_STEP) {
      fetch(URL.concat(HEROES))
        .then(resp => resp.json())
        .then(data => setHeroes(data))
    }
  }, [step])

  useEffect(() => {
    console.log({ heroes })
  }, [heroes])
  
  return (
    <Container maxWidth='lg' className='vh-100'>
      <div className='flex flex-column justify-between h-100'>
        <div className='w-100'>
          <Grid container direction='row' className='w-100 mt4 tc'>
            {steps.map(({ stepLabel }) => {
              const isActive = stepLabel === steps[step].stepLabel

              return (
                <Grid
                  item
                  xs={4}
                  key={stepLabel}
                  className={cx({'activeStep': isActive})}
                >
                  <h2 className={cx('fw5 mb0 pb2', {'dark-blue': isActive})}>
                    {stepLabel}
                  </h2>
                </Grid>
              )
            })}
          </Grid>
          <h1 className='w-100 tc mt5'>
            {steps[step].pageTitle}
          </h1>
        </div>
        <MainContent {...{ step }} />
        <div className='flex justify-between mb5 mh4'>
          <Button
            color='primary'
            variant='contained'
            onClick={() => setStep(0)}
            disabled={step === 0}
          >
            Reset
          </Button>
          <Button
            color='primary'
            variant='contained'
            onClick={() => setStep(step => step + 1)}
            disabled={step === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </Container>
  );
}

const MainContent = ({ step }) => {
  switch (step) {
    case 0:
      return <HeroSelection />
    case 1:
      return <SkillCustomization />
    case 2:
      return <ViewResult />
    default:
      console.error('Unrecognized step', { step })
      return null
  }


}
export default App;

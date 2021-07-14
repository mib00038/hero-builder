import React, {useEffect, useState} from 'react'
import Container from '@material-ui/core/Container'
// import * as Progress from '@radix-ui/react-progress'
// import { styled } from "@stitches/react"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import 'App.css'
import cx from "classnames"

// const URL = 'https://frontend-interview-hero-63u64o32qq-uk.a.run.app'
// const HEROES = '/heroes'

const steps = ['Class', 'Skills', 'Result']

const App = () => {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState()

  useEffect(() => {
    setProgress(Math.round(step * 100/steps.length))
  }, [step])

  return (
    <Container maxWidth='lg' className='vh-100'>
      <div className='flex flex-column justify-between h-100'>
        <div className='w-100'>
          <Grid container direction='row' className='w-100 mt4 tc'>
            {steps.map((stepName) => (
              <Grid
                item
                xs={4}
                key={stepName}
                className={cx({'activeStep': stepName === steps[step - 1]})}
              >
                <h2 className='fw5 mb0 pb2'>{stepName}</h2>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className='flex justify-between mb5 mh4'>
          <Button
            color='primary'
            variant='contained'
            onClick={() => setStep(1)}
            disabled={step === 1}
          >
            Reset
          </Button>
          <Button
            color='primary'
            variant='contained'
            onClick={() => setStep(step => step + 1)}
            disabled={step === steps.length}
          >
            Next
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default App;

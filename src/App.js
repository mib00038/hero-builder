import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import 'App.css'
import HeroSelection from "components/HeroSelection"
import SkillCustomization from "components/SkillCustomization"
import ViewResult from "components/ViewResult"
import ButtonControls from "components/ButtonControls"
import StepHeader from "components/StepHeader"
import cx from 'classnames'
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Divider from "@material-ui/core/Divider"

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    if (step === START_STEP) {
      fetch(MAIN_URL.concat(HEROES))
        .then(resp => resp.json())
        .then(data => setHeroes(data.heroes))
    }
  }, [step])

  return (
    <Container maxWidth='md' className='bg-white'>
      <div className={cx('vh-100 ph0 flex flex-column justify-between', {'ph2': !isMobile})}>
        <section className={cx({ 'pb6': isMobile })}>
          <StepHeader {...{ steps, step }} />
          <PageTitle {...{ steps, step, isMobile }} />
          <MainContent {...{ step, heroes, setHeroes, hero, setHero, isMobile }} />
        </section>
        <div className={cx({'mt4': !isMobile}, {'fixed bottom-0 left-0 w-100 bg-white': isMobile})}>
          <Divider variant='fullWidth' className={cx({ 'dn': !isMobile })} classes={{root: 'divider-root'}}/>
          <ButtonControls {...{ step, setStep, hero, setHero, isMobile }} />
        </div>
      </div>
    </Container>
  );
}

const PageTitle = ({ steps, step, isMobile }) => (
  <h1 className={cx('w-100 tc mt5 f2', {'mb6': !isMobile}, { 'mb5': isMobile } )}>
    {steps[step].pageTitle}
  </h1>
)

const MainContent = ({ step, heroes, setHeroes, hero, setHero, isMobile }) => {
  switch (step) {
    case 0:
      return <HeroSelection {...{ heroes, setHeroes, hero, setHero }} />
    case 1:
      return <SkillCustomization {...{ hero, setHero }} />
    case 2:
      return <ViewResult {...{ hero, isMobile }} />
    default:
      console.error('Unrecognized step: ', step)
      return null
  }
}

export default App

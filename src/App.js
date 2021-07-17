import React, { useEffect, useState } from 'react'
import 'App.css'
import HeroSelection from "components/HeroSelection"
import SkillCustomization from "components/SkillCustomization"
import ViewResult from "components/ViewResult"
import ButtonControls from "components/ButtonControls"
import StepHeader from "components/StepHeader"
import Container from '@material-ui/core/Container'
import useTheme from "@material-ui/core/styles/useTheme"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Divider from "@material-ui/core/Divider"
import cx from 'classnames'

export const HERO_URL = 'https://frontend-interview-hero-63u64o32qq-uk.a.run.app'
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
      fetch(HERO_URL.concat(HEROES))
        .then(resp => resp.json())
        .then(data => setHeroes(data.heroes))
    }
  }, [step])

  return (
    <Container maxWidth='lg' className='bg-white h-100'>
      <div className={cx('ph0 h-100 flex flex-column justify-between', { 'ph2': !isMobile })}>
        <section className={cx({ 'pb6': isMobile })}>
          <header>
            <StepHeader {...{ steps, step, isMobile }} />
          </header>
          <main>
            <PageTitle {...{ steps, step, isMobile }} />
            <MainContent {...{ step, heroes, setHeroes, hero, setHero, isMobile }} />
          </main>
        </section>
        <footer className={cx({'mt4': !isMobile}, { 'fixed bottom-0 left-0 w-100 bg-white': isMobile })}>
          <Divider variant='fullWidth' className={cx({ 'dn': !isMobile })} classes={{ root: 'divider-root' }}/>
          <ButtonControls {...{ step, setStep, hero, setHero, isMobile }} />
        </footer>
      </div>
    </Container>
  );
}

const PageTitle = ({ steps, step, isMobile }) => (
  <h1 className={cx('w-100 tc f2', {'mb6 mt5 ': !isMobile}, { 'mt4 mb4 f3': isMobile } )}>
    {steps[step].pageTitle}
  </h1>
)

const MainContent = ({ step, heroes, setHeroes, hero, setHero, isMobile }) => {
  switch (step) {
    case 0:
      return <HeroSelection {...{ heroes, setHeroes, hero, setHero, isMobile }} />
    case 1:
      return <SkillCustomization {...{ hero, setHero, isMobile }} />
    case 2:
      return <ViewResult {...{ hero, isMobile }} />
    default:
      console.error('Unrecognized step: ', step)
      return null
  }
}

export default App

import React, {useEffect, useState} from 'react'
import Container from '@material-ui/core/Container'
import 'App.css'
import HeroSelection from "components/HeroSelection"
import SkillCustomization from "components/SkillCustomization"
import ViewResult from "components/ViewResult"
import ButtonControls from "components/ButtonControls"
import StepHeader from "components/StepHeader";

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
          <StepHeader {...{ steps, step }} />
          <PageTitle {...{ steps, step }} />
          <MainContent {...{ step, heroes, setHeroes, hero, setHero }} />
          <ButtonControls {...{ step, setStep, hero, setHero }} />
        </div>

      </div>
    </Container>
  );
}

const PageTitle = ({ steps, step }) => (
  <h1 className='w-100 tc mt5 f2'>
    {steps[step].pageTitle}
  </h1>
)

const MainContent = ({ step, heroes, setHeroes, hero, setHero }) => {
  switch (step) {
    case 0:
      return <HeroSelection {...{ heroes, setHeroes, hero, setHero }} />
    case 1:
      return <SkillCustomization {...{ hero, setHero }} />
    case 2:
      return <ViewResult {...{ hero }} />
    default:
      console.error('Unrecognized step: ', step)
      return null
  }
}

export default App

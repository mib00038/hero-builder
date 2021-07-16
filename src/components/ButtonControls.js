import Button from "@material-ui/core/Button";
import isEmpty from "lodash/isEmpty";
import React from "react";

const ButtonControls = ({ step, setStep, hero, setHero }) => {
  return (
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
      {step < 2 && (
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
      )}
    </div>
  )
}

export default ButtonControls
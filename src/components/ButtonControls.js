import React from "react"
import Button from "@material-ui/core/Button"
import isEmpty from "lodash/isEmpty"
import cx from "classnames"

const ButtonControls = ({ step, setStep, hero, setHero }) => {
  return (
    <div className='flex justify-between w-100 pv4 mt0'>
      <div className='ml3'>
        <Button
          color='primary'
          variant='contained'
          onClick={() => {
            setStep(0)
            setHero({})
          }}
          disabled={step === 0}
          className=''
          classes={{label: 'ttc f4', containedPrimary: 'button-control'}}
        >
          Reset
        </Button>
      </div>
      <div className={cx('mr3', {'dn': step === 2})}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => setStep(step => step + 1)}
          disabled={isEmpty(hero)}
          classes={{label: 'ttc f4', containedPrimary: 'button-control'}}
        >
          {step === 0 ? 'Next' : 'Finish'}
        </Button>
      </div>
    </div>
  )
}

export default ButtonControls
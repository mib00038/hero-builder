import React from "react"
import Grid from "@material-ui/core/Grid"
import cx from "classnames"

const StepHeader = ({ steps, step, isMobile }) => (
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
          <h1 className={cx('fw5 mb0 pb2', {'blue-ribbon': isActive}, {'f4': isMobile})}>
            {stepLabel}
          </h1>
        </Grid>
      )
    })}
  </Grid>
)

export default StepHeader
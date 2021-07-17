import React from "react"
import HeroImage from "components/HeroImage"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import cx from 'classnames'

const ViewResult = ({ hero: { name, imageUrl, skills }, isMobile }) => (
  <Container maxWidth={isMobile ? 'xs' : 'md'}>
    <Grid container spacing={2} wrap='wrap-reverse' justifyContent='center'>
      <Grid item className={cx('flex justify-end', { 'justify-center w-100': isMobile } )}>
        <HeroImage {...{ name, imageUrl }} isActive width={isMobile ? 340 : 300} />
      </Grid>
      <Grid item className={cx({'w-100 flex flex-wrap justify-start w-100' : isMobile })}>
        <h1
          className={cx(
            'ttu f2 fw5 mt0 ml3 ribbon-blue',
            { 'ml3': !isMobile },
            { 'w-100 tl mb0 ml4': isMobile }
          )}
        >
          {name}
        </h1>
        <ul className={cx('list pl0', {'ml2': isMobile})}>
          {skills.map(({ points, name }) => {
            return (
              <li className='flex f4' key={name}>
                <div className='mr2 tr w3'>{`${points}%`}</div>
                <span>{name}</span>
              </li>
            )
          })}
        </ul>
      </Grid>
    </Grid>
  </Container>
)

export default ViewResult
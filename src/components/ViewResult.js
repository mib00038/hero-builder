import React from "react"
import HeroImage from "components/HeroImage"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import cx from 'classnames'

const ViewResult = ({ hero: { name, imageUrl, skills, isActive }, isMobile }) => (
  <Container maxWidth={isMobile ? 'xs' : 'md'}>
    <Grid container spacing={4} wrap='wrap-reverse'>
      <Grid item xs={12} sm={6} className={cx('flex justify-end', { 'justify-center': isMobile } )}>
        <HeroImage {...{ name, imageUrl, isActive }} />
      </Grid>
      <Grid item xs={12} sm={6} className={cx({'w-100 flex flex-wrap justify-start' : isMobile })}>
        <h1
          className={cx(
            'ttu f2 fw5 ml3 mt0',
            {'w-100 tl ml4 mb0': isMobile}
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
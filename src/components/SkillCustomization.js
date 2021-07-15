import React from "react"
import Slider from "@material-ui/core/Slider"
import useSkills from "hooks/useSkills"

const SkillCustomization = ({ hero, setHero }) => {
  const { skills } = hero
  const { pointsRemaining, handleChange } = useSkills({ hero, setHero })

  return (
    <div className='flex flex-wrap w-100'>
      <h3>{`Remaining: ${pointsRemaining} points`}</h3>
      {skills.map(({name, points = 0}, index) => (
        <Slider
          key={name}
          value={points}
          onChange={handleChange(index)}
          aria-labelledby="continuous-slider"
        />
      ))}
    </div>
  )
}

export default SkillCustomization
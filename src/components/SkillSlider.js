import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import MuiSlider from "@material-ui/core/Slider"


const Slider = withStyles({
  root: {
    color: '#6558F5'
  },
  track: {
    height: 6,
    borderRadius: 8,
  },
  thumb: {
    height: 18,
    width: 18,
    marginTop: -6,
    marginLeft: -6
  },
  rail: {
    height: 6,
    borderRadius: 8,
  },
})(MuiSlider);

const SkillSlider = ({ name, points, index, handleSkillChange }) => (
  <Slider
    name={name}
    value={points}
    onChange={handleSkillChange(index)}
    aria-labelledby="continuous-slider"
    classes={{thumb: 'slider-thumb'}}
  />
)

export default SkillSlider
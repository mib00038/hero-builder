import {useEffect, useState} from "react";
import produce from "immer";

export const MAX_TOTAL_POINTS = 100

const useSkills = ({ hero, hero: { skills }, setHero }) => {
  const [skillIndexTouched, setSkillIndexTouched] = useState()
  const [totalPoints, setTotalPoints] = useState(0)
  const [pointsRemaining, setPointsRemaining] = useState(MAX_TOTAL_POINTS)
  const [adjustIndex, setAdjustIndex] = useState(0)

  const handleChange = (index) => (evt, val) => {
    setSkillIndexTouched(index)
    setHero(produce(hero, draft => {
      draft.skills[index].points = val
    }))
  }

  // onMount: initialize each skill with 0 points
  useEffect(() => {
    setHero(prev => produce(prev, draft => {
      draft.skills.forEach(skill => skill.points = 0)
    }))
  }, [setHero])

  useEffect(() => {
    const totalPoints = skills.reduce((acc, cur) => acc + cur.points, 0)
    setTotalPoints(totalPoints)

    if (totalPoints > MAX_TOTAL_POINTS) {
      const newSkills = produce(skills, draft => {
        if (adjustIndex !== skillIndexTouched && draft[adjustIndex].points > 0) {
          draft[adjustIndex].points = draft[adjustIndex].points - 1
        }
        setAdjustIndex(prev => prev === skills.length - 1 ? 0 : prev + 1)
      })

      setHero(prev => produce(prev, draft => {
        draft.skills = newSkills
      }))
    }
  }, [setHero, skills, adjustIndex, skillIndexTouched])

  useEffect(() => {
    const remainingPoints = Math.max(0, MAX_TOTAL_POINTS - totalPoints)
    setPointsRemaining(remainingPoints)
  }, [totalPoints])


  return { pointsRemaining, handleChange }
}

export default useSkills
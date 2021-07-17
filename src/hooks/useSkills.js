import {useEffect, useState} from "react";
import produce from "immer";

export const MAX_TOTAL_POINTS = 100

const useSkills = ({ hero, hero: { skills }, setHero }) => {
  const [skillIndexTouched, setSkillIndexTouched] = useState()
  const [totalPoints, setTotalPoints] = useState(0)
  const [pointsRemaining, setPointsRemaining] = useState(MAX_TOTAL_POINTS)
  const [adjustIndex, setAdjustIndex] = useState(0)

  const handleSkillChange = (index) => (evt, val) => {
    setSkillIndexTouched(index)
    setHero(produce(hero, draft => {
      draft.skills[index].points = val
    }))
  }

  useEffect(() => {
    const totalPoints = skills.reduce((acc, cur) => acc + cur.points, 0)
    setTotalPoints(totalPoints)

    if (totalPoints > MAX_TOTAL_POINTS) {
      const newSkills = produce(skills, draft => {
        let adjustPoints = totalPoints - MAX_TOTAL_POINTS
        let index = adjustIndex

        do {

          if (index !== skillIndexTouched && draft[index].points > 0) {
            draft[index].points = draft[index].points - 1
            adjustPoints--
          }

          index = index === skills.length - 1 ? 0 : index + 1

        } while (adjustPoints)

        setAdjustIndex(index)

      })

      setHero(prev => produce(prev, draft => {
        draft.skills = newSkills
      }))
    }
  }, [skills, setHero, adjustIndex, skillIndexTouched])

  useEffect(() => {
    const remainingPoints = Math.max(0, MAX_TOTAL_POINTS - totalPoints)
    setPointsRemaining(remainingPoints)
  }, [totalPoints])

  return { pointsRemaining, handleSkillChange }
}

export default useSkills
import { useState } from "react"
import StarRating from "./StarRating"


const StarTest = () => {
    const [defaultStarRating, setDefaultStarRating] = useState(0)
  return (
      <div>
          <StarRating
              maxRating={10}
              color="green"
              defaultStar={setDefaultStarRating}
          />

          <p>This is {defaultStarRating} {defaultStarRating <= 1 ? "star" : "stars"} rated</p>
    </div>
  )
}

export default StarTest
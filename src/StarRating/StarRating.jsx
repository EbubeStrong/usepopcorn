/* eslint-disable */
import { useState } from "react";
import PropTypes from "prop-types";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flexStart",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  //   gap: "8px",
};

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 30,
  className = "",
  messages = [],
  defaultStar,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const textStyle = {
    color: color,
    fontSize: `${size / 1.2}px`,
    lineHeight: 0,
    margin: 0,
  };

  function handleRating(value) {
    setRating(value);
    defaultStar(value)
  }
  return (
    <div className={className} style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={hoverRating ? hoverRating >= i + 1 : rating >= i + 1}
            onHoverRating={() => setHoverRating(i + 1)}
            onLeaveRating={() => setHoverRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <div>
        <p style={textStyle}>
          {" "}
          {messages.length === maxRating
            ? messages[hoverRating ? hoverRating - 1 : rating - 1]
            : hoverRating || rating || ""}
        </p>
      </div>
    </div>
  );
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
};

export default StarRating;

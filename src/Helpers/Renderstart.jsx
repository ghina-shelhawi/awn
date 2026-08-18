import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const renderStars = (rating) => {
  const count = parseInt(rating) || 0;

  return Array.from({ length: count }, (_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      color="orange"
      className="me-1"
    />
  ));
};

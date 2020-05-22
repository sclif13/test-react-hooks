import * as React from "react";

const Button = ({ name, handleClick }) => {
  return (
    <button onClick={handleClick} name={name}>
      {name}
    </button>
  );
};

export default React.memo(Button);

import React, { useTransition } from "react";
import Spinner from "./Spinner";

const ButtonPending = ({ children, onClick, ...props }) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(onClick);
  };

  return (
    <button {...props} onClick={handleClick}>
      {isPending && <Spinner />}
      {children}
      {isPending && <Spinner />}
    </button>
  );
};

export default ButtonPending;

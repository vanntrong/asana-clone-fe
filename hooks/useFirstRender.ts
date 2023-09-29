import React from "react";

const useFirstRender = () => {
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
};

export default useFirstRender;

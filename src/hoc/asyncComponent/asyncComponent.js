import React, { useState, useEffect } from "react";

const AsyncComponent = importComponent => {
  return props => {
    const [component, setComponent] = useState(null);

    useEffect(() => {
      //Component did mount lifecycle hook
      importComponent().then(cmp => {
        setComponent(cmp.default);
      });
    }, []);

    const C = component;

    return C ? <C {...props} /> : null;
  };
};

export default AsyncComponent;

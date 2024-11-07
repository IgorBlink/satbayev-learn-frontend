import React, { useEffect } from "react";

const Back = ({callback}) => {
  const goBack = () => {
    if (callback) {
      return callback();
    }
    window.history.back();
  };
  useEffect(() => {
    if(window.history.length > 0) {
      window.Telegram.WebApp.BackButton.onClick(goBack);
      window.Telegram.WebApp.BackButton.show();
  
      return () => {
        window.Telegram.WebApp.BackButton.hide();
        window.Telegram.WebApp.BackButton.offClick(goBack);
      };
    }
  }, [callback]);
  return <></>;
};

export default Back;

// @ts-ignore
import React, { useEffect, useRef, useCallback } from "react";

const TelegramLoginButton = ({
  // @ts-ignore
  botName,
  // @ts-ignore
  dataOnauth,
  buttonSize = "large",
  requestAccess = "write",
}) => {
  const containerRef = useRef(null);

  const handleAuth = useCallback(
    // @ts-ignore
    (user) => {
      console.log("Telegram user:", user);
      dataOnauth(user);
    },
    [dataOnauth]
  );

  useEffect(() => {
    // @ts-ignore
    window.TelegramLoginCallback = handleAuth;

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize);
    script.setAttribute("data-request-access", requestAccess);
    script.setAttribute("data-onauth", "TelegramLoginCallback(user)");

    // @ts-ignore
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        // @ts-ignore
        containerRef.current.removeChild(script);
      }
      // @ts-ignore
      delete window.TelegramLoginCallback;
    };
  }, [botName, handleAuth, buttonSize, requestAccess]);

  return <div ref={containerRef}></div>;
};

export default TelegramLoginButton;

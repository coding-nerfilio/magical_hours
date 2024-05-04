import { useState, useEffect } from "preact/hooks";
import { ApiCD } from "../services/ApiCD";

const useCooldown = () => {
  const [cooldown, setCooldown] = useState(ApiCD.isOnCD());
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (ApiCD.isOnCD() || (enabled && cooldown && cooldown > 0)) {
      intervalId = setInterval(() => {
        setCooldown(ApiCD.isOnCD());
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [enabled, cooldown]);

  const enableCooldown = () => {
    ApiCD.set();
    setCooldown(ApiCD.isOnCD());
    setEnabled(true);
  };

  return { cooldown, enableCooldown };
};

export default useCooldown;

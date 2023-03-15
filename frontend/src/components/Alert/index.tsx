import React from "react";
import { AlertState } from "../../slices/alertSlice";
import { useAppSelector } from "../../store/configureStore";

const Alert = () => {
  const { alerts } = useAppSelector((state) => state.alertState);
  return (
    <div className="container">
      {alerts?.length > 0 &&
        alerts?.map((alert: AlertState) => (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        ))}
    </div>
  );
};

export default Alert;

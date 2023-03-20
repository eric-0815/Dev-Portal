import React from "react";
import { AlertState } from "../../slices/alertSlice";
import { useAppSelector } from "../../store/configureStore";

const Alert = () => {

  const removeDuplicateAlerts = (alerts: AlertState[]): AlertState[] => {
    const uniqueAlerts: AlertState[] = [];
    const messages: string[] = [];

    for (const alert of alerts) {
      if (!messages.includes(alert.msg)) {
        uniqueAlerts.push(alert);
        messages.push(alert.msg);
      }
    }

    return uniqueAlerts;
  }

  const { alerts } = useAppSelector((state) => state.alertState);
  const uniqueAlerts = removeDuplicateAlerts(alerts)

  return (
    <div className="container">
      {uniqueAlerts?.length > 0 &&
        uniqueAlerts?.map((alert: AlertState) => (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        ))}
    </div>
  );
};

export default Alert;

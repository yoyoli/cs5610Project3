import React, { createContext, useState, useContext } from "react";

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [statuses, setStatuses] = useState([]);

  // add status
  const addStatus = (newStatus) => {
    setStatuses((prevStatuses) => [newStatus, ...prevStatuses]);
  };

  // delete status
  const deleteStatus = (id) => {
    setStatuses((prevStatuses) => prevStatuses.filter((status) => status.id !== id));
  };

  // update status
  const updateStatus = (id, updatedStatus) => {
    setStatuses((prevStatuses) =>
      prevStatuses.map((status) =>
        status.id === id ? { ...status, ...updatedStatus } : status
      )
    );
  };

  return (
    <StatusContext.Provider value={{ statuses, addStatus, deleteStatus, updateStatus }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => {
  return useContext(StatusContext);
};

export default StatusContext;

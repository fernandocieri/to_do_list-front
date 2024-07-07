import { useState, useEffect } from "react";
// SERVICES
import { getDuties, patchDuty, postDuty, deleteDuty } from "../../services/API";
// TYPES
import { DutyProps } from "./types";
// COMPONENTS
import DutiesListItem from "./DutiesListItem";
import DutiesListFooter from "./DutiesListFooter";
import DutiesListHeader from "./DutiesListHeader";
// THIRD PARTY COMPONENTS
import { List } from "antd";

export default function DutiesList() {
  const [duties, setDuties] = useState<DutyProps[]>([]);
  const [pendingDuties, setPendingDuties] = useState<DutyProps[]>([]);
  const [hideDoneDuties, setHideDoneDuties] = useState(false);

  const fetchDuties = async () => {
    try {
      const duties = await getDuties();
      setDuties(duties);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error has occured");
      }
    }
  };

  useEffect(() => {
    fetchDuties();
  }, []);

  useEffect(() => {
    if (hideDoneDuties) {
      const filteredDuties = duties.filter((duty: DutyProps) => {
        return duty.done === false;
      });
      setPendingDuties(filteredDuties);
    }
  }, [hideDoneDuties, duties]);

  const updateDutyCompletion = async (id: string, done: boolean) => {
    try {
      await patchDuty(id, undefined, done);
      // find duty-to-update in duties and modify it
      setDuties((prevDuties) =>
        prevDuties.map((duty) => (duty.id === id ? { ...duty, done } : duty))
      );
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error has occured");
      }
    }
  };

  const updateDutyName = async (id: string, name: string) => {
    try {
      await patchDuty(id, name);
      // find duty-to-update in duties and modify it
      setDuties((prevDuties) =>
        prevDuties.map((duty) => (duty.id === id ? { ...duty, name } : duty))
      );
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error has occured");
      }
    }
  };

  const addDuty = async (name: string) => {
    try {
      const newDutyId = await postDuty(name);
      setDuties((prevDuties) => [
        ...prevDuties,
        { id: newDutyId, name: name, done: false },
      ]);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error has occured");
      }
    }
  };

  const removeDuty = async (id: string) => {
    try {
      await deleteDuty(id);
      setDuties((prevDuties) =>
        prevDuties.filter((duty) => {
          return duty.id !== id;
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error has occured");
      }
    }
  };

  return (
    <List
      bordered
      dataSource={hideDoneDuties ? pendingDuties : duties}
      header={
        <DutiesListHeader
          toggleHideDoneDuties={(value) => setHideDoneDuties(value)}
        />
      }
      footer={<DutiesListFooter addDuty={addDuty} />}
      renderItem={(item: DutyProps) => (
        <DutiesListItem
          key={item.id}
          id={item.id}
          name={item.name}
          done={item.done}
          updateDutyCompletion={updateDutyCompletion}
          updateDutyName={updateDutyName}
          removeDuty={removeDuty}
        />
      )}
    />
  );
}

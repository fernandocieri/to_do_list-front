import { useState, useEffect } from "react";
import { getDuties, patchDuty, deleteDuty } from "../../services/API";
import { DutyProps } from "./types";
import { List } from "antd";
import DutiesListItem from "./DutiesListItem";

export default function DutiesList() {
  const [duties, setDuties] = useState<DutyProps[]>([]);
  const [pendingDuties, setPendingDuties] = useState<DutyProps[]>([]);
  const [hideDone, setHideDone] = useState(false);

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
    if (hideDone) {
      const filteredDuties = duties.filter((duty: DutyProps) => {
        return duty.done === false;
      });
      setPendingDuties(filteredDuties);
    }
  }, [hideDone, duties]);

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
      dataSource={hideDone ? pendingDuties : duties}
      renderItem={(item: DutyProps) => (
        <DutiesListItem
          id={item.id}
          name={item.name}
          done={item.done}
          updateDutyCompletion={updateDutyCompletion}
          removeDuty={removeDuty}
        />
      )}
    />
  );
}

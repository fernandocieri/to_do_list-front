import { useState, useEffect } from "react";
import { getDuties, patchDuty } from "../../services/API";
import { DutyProps } from "./types";
import Duty from "./Duty";

import { List, Checkbox } from "antd";

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
        alert("An unknwon error has occured");
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
    await patchDuty(id, undefined, done);
    // find this duty in duties state and update
    try {
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknwon error has occured");
      }
    }
  };

  return (
    <List
      bordered
      dataSource={hideDone ? pendingDuties : duties}
      renderItem={(item: DutyProps) => (
        <List.Item
          actions={[
            <Checkbox
              defaultChecked={item.done}
              onChange={(event) =>
                updateDutyCompletion(item.id, event.target.value)
              }
            />,
          ]}
        >
          {item.name}
        </List.Item>
      )}
    />
  );
}

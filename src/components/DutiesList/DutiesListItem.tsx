// HOOKS
import useModal from "../../hooks/useModal";
// TYPES
import { DutiesListItemProps } from "./types";
// COMPONENTS
import ModalForm from "../ModalForm/ModalForm";
// THIRD PARTY COMPONENTS
import { List, Checkbox, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function DutiesListItem({
  id,
  name,
  done,
  updateDutyCompletion,
  updateDutyName,
  removeDuty,
}: DutiesListItemProps) {
  const { isModalOpen, toggleModal } = useModal();
  return (
    <>
      <List.Item
        actions={[
          <Checkbox
            defaultChecked={done}
            onChange={(event) => updateDutyCompletion(id, event.target.checked)}
          />,
          <Button
            type="default"
            shape="circle"
            onClick={() => toggleModal(true)}
            icon={<EditOutlined />}
          />,
          <Button
            type="default"
            shape="circle"
            danger
            onClick={() => removeDuty(id)}
            icon={<DeleteOutlined />}
          />,
        ]}
      >
        {name}
      </List.Item>
      <ModalForm
        title="Edit duty"
        defaultValue={name}
        onSubmit={(value) => {
          updateDutyName(id, value);
        }}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </>
  );
}

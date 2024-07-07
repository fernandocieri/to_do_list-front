import { DutiesListItemProps } from "./types";
import { List, Checkbox, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function DutiesListItem({
  id,
  name,
  done,
  updateDutyCompletion,
}: DutiesListItemProps) {
  return (
    <List.Item
      actions={[
        <Checkbox
          defaultChecked={done}
          onChange={(event) => updateDutyCompletion(id, event.target.checked)}
        />,
        <Button type="default" shape="circle" icon={<EditOutlined />} />,
        <Button
          type="default"
          shape="circle"
          danger
          icon={<DeleteOutlined />}
        />,
      ]}
    >
      {name}
    </List.Item>
  );
}

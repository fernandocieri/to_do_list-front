import { Flex, Switch } from "antd";

interface DutiesListHeaderProps {
  toggleHideDoneDuties: (value: boolean) => void;
}

export default function DutiesListHeader({
  toggleHideDoneDuties,
}: DutiesListHeaderProps) {
  return (
    <Flex justify="flex-end" align="center" gap="small">
      Hide completed duties
      <Switch onChange={toggleHideDoneDuties} />
    </Flex>
  );
}

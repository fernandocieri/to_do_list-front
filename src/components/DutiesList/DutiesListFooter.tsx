// HOOKS
import useModal from "../../hooks/useModal";
// COMPONENTS
import ModalForm from "../ModalForm/ModalForm";
// THIRD PARTY COMPONENTS
import { Flex, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface DutiesListFooterProps {
  addDuty: (name: string) => void;
}

export default function DutiesListFooter({ addDuty }: DutiesListFooterProps) {
  const { isModalOpen, toggleModal } = useModal();
  return (
    <>
      <Flex justify="center" align="center">
        <Button
          type="primary"
          shape="round"
          onClick={() => toggleModal()}
          icon={<PlusOutlined />}
        >
          Add new duty
        </Button>
      </Flex>
      <ModalForm
        title="Add a new duty"
        placeholder="Buy milk before finishing the test"
        onSubmit={addDuty}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </>
  );
}

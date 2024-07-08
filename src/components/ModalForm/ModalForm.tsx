import { useState, useEffect } from "react";
import { Modal, Input, Typography } from "antd";
const { Text } = Typography;

interface ModalFormProps {
  title: string;
  placeholder?: string;
  defaultValue?: string;
  onSubmit: (value: string) => void;
  isModalOpen: boolean;
  toggleModal: (value?: boolean) => void;
}

export default function ModalForm({
  title,
  placeholder,
  defaultValue,
  onSubmit,
  isModalOpen,
  toggleModal,
}: ModalFormProps) {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState<undefined | string>();

  const handleOk = () => {
    if (inputValue.length === 0) {
      setInputError("This field is required");
      return;
    } else if (inputError) {
      setInputError(undefined);
    }

    if (defaultValue === inputValue) {
      toggleModal(false);
      return;
    }

    onSubmit(inputValue);
    setInputValue("");
    toggleModal(false);
  };

  const handleCancel = () => {
    if (
      defaultValue &&
      defaultValue.length > 0 &&
      defaultValue !== inputValue
    ) {
      setInputValue(defaultValue);
    } else {
      setInputValue("");
    }
    setInputError(undefined);
    toggleModal(false);
  };

  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    isModalOpen && (
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder={placeholder || ""}
          defaultValue={defaultValue}
          onChange={(event) => setInputValue(event.target.value)}
          autoFocus
        />
        {inputError && <Text type="danger">{inputError}</Text>}
      </Modal>
    )
  );
}

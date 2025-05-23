import RNDateTimePicker from "@react-native-community/datetimepicker";
import React from "react";

interface ModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  selectedDate: Date;
  onDateChange: (event: any, date?: Date) => void;
}

export default function QuitModal({
  visible,
  setVisible,
  selectedDate,
  onDateChange,
}: ModalProps) {
  const handleDateChange = (event: any, date?: Date) => {
    setVisible(false);

    onDateChange(event, date);
  };

  if (!visible) {
    return null;
  }

  return (
    <RNDateTimePicker
      mode="date"
      locale="en-GB"
      value={selectedDate}
      display="spinner"
      maximumDate={new Date()}
      onChange={handleDateChange}
    />
  );
}

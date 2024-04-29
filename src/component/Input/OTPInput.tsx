import React, { useState, useRef } from "react";
import { View, TextInput, TextInputKeyPressEventData } from "react-native";

const OTPInput = () => {
  const maxLength = 1;
  const inputsRef = useRef<TextInput[]>([]);
  const [inputValues, setInputValues] = useState<string[]>(new Array(6).fill(""));

  const handleOnChangeText = (text: string, index: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);

    // Move to next input
    if (text && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleOnKeyPress = ({ nativeEvent: { key } }: { nativeEvent: TextInputKeyPressEventData }, index: number) => {
    if (key === "Backspace" && !inputValues[index] && index > 0) {
      // Focus previous input
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
      {inputValues.map((value, index) => (
        <TextInput
          key={index}
          style={{ flex: 1, textAlign: "center", fontSize: 16, marginRight: 4 }}
          value={value}
          onChangeText={(text) => handleOnChangeText(text, index)}
          onKeyPress={(event) => handleOnKeyPress(event, index)}
          maxLength={maxLength}
          ref={(el) => (inputsRef.current[index] = el as TextInput)}
          keyboardType="number-pad"
          className=" bg-white/10 rounded-lg text-white/60"
        />
      ))}
    </View>
  );
};

export default OTPInput;


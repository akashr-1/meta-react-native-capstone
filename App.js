import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const buttons = ['C', 'DEL', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='];

  function calculator() {
    const lastChar = currentNumber[currentNumber.length - 1];

    if ('/*-+'.includes(lastChar) || lastChar === '.') {
      setCurrentNumber(currentNumber);
    } else {
      const result = eval(currentNumber).toString();
      setCurrentNumber(result);
    }
  }

  function handleInput(buttonPressed) {
    if ('/*-+'.includes(buttonPressed)) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
    } else if (/^[0-9.]+$/.test(buttonPressed)) {
      Vibration.vibrate(35);
    }

    switch (buttonPressed) {
      case 'DEL':
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber.slice(0, -1));
        break;
      case 'C':
        Vibration.vibrate(35);
        setLastNumber('');
        setCurrentNumber('');
        break;
      case '=':
        Vibration.vibrate(35);
        setLastNumber(currentNumber + '=');
        calculator();
        break;
      default:
        setCurrentNumber(currentNumber + buttonPressed);
    }
  }

  const styles = StyleSheet.create({
    // Your existing styles here
  });

  return (
    <View>
      {/* Rest of the JSX remains the same */}
    </View>
  );
}

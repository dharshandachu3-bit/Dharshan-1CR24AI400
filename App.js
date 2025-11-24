import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const resultAnim = useRef(new Animated.Value(0)).current;

  const handleOp = (op) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    let res;
    if (isNaN(a) || isNaN(b)) {
      res = 'Enter numbers!';
    } else if (op === '/' && b === 0) {
      res = 'Div by zero';
    } else {
      switch (op) {
        case '+': res = a + b; break;
        case '-': res = a - b; break;
        case '*': res = a * b; break;
        case '/': res = a / b; break;
      }
    }
    setResult(res);
    resultAnim.setValue(0);
    Animated.timing(resultAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const getButtonStyle = (op) => {
    switch (op) {
      case '+':
        return { backgroundColor: '#f9a1bc' };
      case '-':
        return { backgroundColor: '#fbc687' };
      case '*':
        return { backgroundColor: '#b5ead7' };
      case '/':
        return { backgroundColor: '#c5c6fa' };
      default:
        return {};
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.heading}>✨ Dharshan Calculator ✨</Text>
        <TextInput
          style={styles.input}
          value={num1}
          onChangeText={setNum1}
          placeholder="First number"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={num2}
          onChangeText={setNum2}
          placeholder="Second number"
          keyboardType="numeric"
        />
        <View style={styles.buttonRow}>
          {['+', '-', '*', '/'].map((op) => (
            <TouchableOpacity key={op} style={[styles.button, getButtonStyle(op)]} onPress={() => handleOp(op)}>
              <Text style={styles.buttonText}>{op}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Animated.View style={{
          opacity: resultAnim,
          transform: [{ scale: resultAnim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }],
        }}>
          <Text style={styles.result}>{result !== '' ? `Result: ${result}` : ''}</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0a34efff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(94, 171, 116, 0.87)',
    padding: 24,
    borderRadius: 24,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowColor: '#96a7cf',
    elevation: 10,
    alignItems: 'center',
    minWidth: 310,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#046db6',
    marginBottom: 24,
    letterSpacing: 2,
  },
  input: {
    width: '90%',
    marginBottom: 12,
    padding: 10,
    fontSize: 18,
    borderRadius: 8,
    borderColor: '#6fe7dd',
    borderWidth: 1,
    backgroundColor: '#edffec',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 18,
    justifyContent: 'center',
    width: '88%',
  },
  button: {
    padding: 12,
    marginHorizontal: 7,
    borderRadius: 24,
    width: 54,
    alignItems: 'center',
    backgroundColor: '#6fe7dd',
    shadowColor: '#bbb',
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#046db6',
  },
  result: {
    marginTop: 24,
    fontSize: 22,
    color: '#046db6',
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
});

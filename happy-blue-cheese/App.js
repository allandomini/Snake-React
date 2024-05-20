import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';

const window = Dimensions.get('window');
const cellSize = Math.floor(window.width * 0.2);
const BoardWidth = cellSize * 5;
const randomCoordinate = () => Math.floor((Math.random() * 5));

const SnakeGame = () => {
  const [snake, setSnake] = useState([{x: 2, y: 2}]);
  const [direction, setDirection] = useState('right');
  const [food, setFood] = useState({x: randomCoordinate(), y: randomCoordinate()});

  const moveSnake = () => {
    let newSnake = [...snake];
    let head = {...newSnake[0]};

    if (direction === 'left') head.x = head.x <= 0 ? 4 : head.x - 1;
    else if (direction === 'right') head.x = head.x >= 4 ? 0 : head.x + 1;
    else if (direction === 'up') head.y = head.y <= 0 ? 4 : head.y - 1;
    else if (direction === 'down') head.y = head.y >= 4 ? 0 : head.y + 1;

    newSnake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      setFood({x: randomCoordinate(), y: randomCoordinate()});
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  useEffect(() => {
    const timer = setInterval(moveSnake, 200);
    return () => clearInterval(timer);
  });

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {Array(5).fill().map((_, i) => (
          Array(5).fill().map((_, j) => (
            <View key={`${i}-${j}`} style={styles.cell}>
              {snake.map((cell, index) => (
                <View key={index} style={cell.x === j && cell.y === i ? [styles.snake, index === 0 ? styles.head : null] : null} />
              ))}
              {food.x === j && food.y === i && <View style={styles.food} />}
            </View>
          ))
        ))}
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => setDirection('up')}><Text>Up</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setDirection('down')}><Text>Down</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setDirection('left')}><Text>Left</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setDirection('right')}><Text>Right</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  board: { width: BoardWidth, height: BoardWidth, flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: cellSize, height: cellSize, borderWidth: 1 },
  snake: { flex: 1, backgroundColor: 'green' },
  head: { borderRadius: 50, backgroundColor: 'yellow' },
  food: { flex: 1, backgroundColor: 'red' },
  controls: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 30 }
});

export default SnakeGame;

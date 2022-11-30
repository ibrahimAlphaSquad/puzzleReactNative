/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Button,
  Image,
  PanResponder,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [canvasD, setCanvas] = useState(false);
  const [shufflePzl, setShuffle] = useState(false);
  const ref = useRef(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // Modal
  const [puzzleDifficulty, setPuzzleDifficulty] = useState(null);
  const [puzzleSource, setpuzzleSource] = useState('');

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log('first');
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  const imgArray = [
    {
      id: 1,
      img: require('./assets/4pc/min-sq-1.jpg'),
    },
    {
      id: 2,
      img: require('./assets/4pc/min-sq-2.jpg'),
    },
    {
      id: 3,
      img: require('./assets/4pc/min-sq-3.jpg'),
    },
    {
      id: 4,
      img: require('./assets/4pc/min-sq-1.jpg'),
    },
  ];

  const [gridArray, setGridArray] = useState(imgArray);

  return (
    <ScrollView style={backgroundStyle}>
      <SafeAreaView>
        <View>
          <Text style={styles.title}>Puzzle App</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={{
              fontSize: 12,
              color: 'black',
              marginLeft: 5,
            }}>
            Puzzle Size
          </Text>
          <TextInput
            style={styles.inputContainer}
            placeholder="Enter Puzzle Size"
            keyboardType="numeric"
            onChangeText={text => {
              setPuzzleDifficulty(text);
              setpuzzleSource(setRandomImage());
              setRunning(false);
            }}
            defaultValue={puzzleDifficulty}
          />
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            if (running !== true) {
              setRunning(true);
              setShuffle(true);
            }
          }}>
          <Text style={styles.button}>Create Puzzle</Text>
        </TouchableWithoutFeedback>
        <View style={[{marginLeft: 20, marginTop: 20}]}>
          {gridArray.map((item, idx) => {
            return (
              // <View key={idx * 1000 * Math.random()}>
              //   <Image source={item.img} style={{width: 80, height: 80}} />
              // </View>
              <View key={idx * 1000 * Math.random()}>
                <Animated.View
                  style={[
                    styles.alignCenter,
                    styles.borderStyles,
                    {marginLeft: 20, marginTop: 20},
                    // {
                    //   transform: [{translateX: pan.x}, {translateY: pan.y}],
                    // },
                    pan.getLayout()
                  ]}
                  {...panResponder.panHandlers}>
                  <Image source={item.img} style={{width: 100, height: 100}} />
                </Animated.View>
              </View>
            );
          })}
        </View>
        {/* <Animated.View
          key={idx * 1000 * Math.random()}
          {...panResponder.panHandlers}>
          <Image source={item.img} style={{width: 80, height: 80}} />
        </Animated.View> */}
        {/* <Animated.View
          style={[
            styles.alignCenter,
            {marginLeft: 20, marginTop: 20},
            {
              transform: [{translateX: pan.x}, {translateY: pan.y}],
            },
          ]}
          {...panResponder.panHandlers}>
          {gridArray.map((item, idx) => {
            return (
              <View key={idx * 1000 * Math.random()}>
                <Image source={item.img} style={{width: 80, height: 80}} />
              </View>
            );
          })}
        </Animated.View> */}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  alignCenter: {
    flex: 1,
    flexWrap: 'wrap',
    maxHeight: 160,
    // maxHeight: 400,
    justifyContent: 'center',
    alignContent: 'center',
  },
  canvasView: {
    marginLeft: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: 6,
    padding: 5,
    marginTop: 8,
    marginLeft: 4,
    marginRight: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  button: {
    fontSize: 12,
    color: 'white',
    fontWeight: '400',
    textAlign: 'center',
    backgroundColor: 'red',
    height: 30,
    width: 100,
    backgroundColor: '#1e293b',
    textAlignVertical: 'center',
    paddingHorizontal: 'auto',
    borderWidth: 1,
    borderRadius: 4,
    marginLeft: 6,
    marginTop: 10,
  },
  borderStyles: {
    borderWidth: 1,
    borderColor: 'thistle',
    // borderRadius: 50,
  },
});

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  Alert,
  Button,
  Image,
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

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // Modal
  const [welcomeModal, setWelcomeModal] = useState(false)
  const [welcomeConfitte, setWelcomeConfitte] = useState(false)
  const [puzzleDifficulty, setPuzzleDifficulty] = useState(null)
  const [puzzleSource, setpuzzleSource] = useState("")

  // Timer
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    // console.log(Math.floor((time / 60000) % 60))
    return () => clearInterval(interval);
  }, [running]);


  function setRandomImage() {
    // 800 x 533
    // let dup = [
    //   "https://tuk-cdn.s3.amazonaws.com/can-uploader/1903-Panhard-et-Levassor_2-800x533.jpg",
    //   "https://tuk-cdn.s3.amazonaws.com/can-uploader/1957-Ferrari-500-TRC_1-800x533.jpg",
    //   "https://tuk-cdn.s3.amazonaws.com/can-uploader/arcane.jpg",
    //   "https://tuk-cdn.s3.amazonaws.com/can-uploader/image1.jpg",
    //   "https://tuk-cdn.s3.amazonaws.com/can-uploader/arcane.jpg"
    // ]

    // 600 x 400
    let dup = [
      "https://tuk-cdn.s3.amazonaws.com/can-uploader/avatar.jpg",
      "https://tuk-cdn.s3.amazonaws.com/can-uploader/eagle.jpg",
      "https://tuk-cdn.s3.amazonaws.com/can-uploader/lilly.jpg",
      "https://tuk-cdn.s3.amazonaws.com/can-uploader/lion-king.jpg",
      "https://tuk-cdn.s3.amazonaws.com/can-uploader/Rango-riding.jpg",
      "https://tuk-cdn.s3.amazonaws.com/can-uploader/Timon-And-Pumbaa.png"
    ]

    return dup[parseInt(Math.random() * 5)]
  }

  const handleInput = (value) => {
    setPuzzleDifficulty(value);
    setpuzzleSource(setRandomImage());
    setRunning(false);
  }

  const handleCreatePuzzle = () => {
    console.log("puzzleDifficulty",puzzleDifficulty)
    if (running !== true) {
      setRunning(true);
    }4
  }

  return (
    <ScrollView style={backgroundStyle}>
      <SafeAreaView>
        <View>
          <Text style={styles.title}>Puzzle App</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={{
            fontSize: 12,
            color: 'black',
            marginLeft: 5,
          }}>Puzzle Size</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder="Enter Puzzle Size"
            onChangeText={(text) => {
              setPuzzleDifficulty(text);
              setpuzzleSource(setRandomImage());
              setRunning(false);
            }}
            defaultValue={puzzleDifficulty}
          />
        </View>
        <TouchableWithoutFeedback
          onPress={() => { handleCreatePuzzle() }}>
          <Text style={styles.button}>Create Puzzle</Text>
        </TouchableWithoutFeedback>
        {/* <Canvas */}
      </SafeAreaView>
    </ScrollView >
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
    justifyContent: 'center',
    alignContent: 'center',

  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: '700',
    textAlign: "center",
    marginTop: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#e4e4e7",
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
    backgroundColor: "white",
    padding: 10
  },
  button: {
    fontSize: 12,
    color: 'white',
    fontWeight: '400',
    textAlign: "center",
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
  }
});

export default App;

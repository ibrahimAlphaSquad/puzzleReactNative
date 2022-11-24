/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
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

  return (
    <ScrollView style={backgroundStyle}>
      <SafeAreaView>
        <View>
          <Text style={{
            fontSize: 25,
            color: 'black',
            fontWeight: '700',
            textAlign: "center",
          }}>Puzzle App</Text>
        </View>
        <View style={[styles.inputContainer]}>
          <Text onPress={() => console.log("Image Tapped")} style={{
            fontSize: 12,
            color: 'black',
            marginLeft: 5,
          }}>Puzzle Size</Text>
          <TextInput
            style={[styles.inputContainer]}
            // defaultValue="Enter Puzzle Size"
            placeholder="Enter Puzzle Size"
          />
        </View>
        {/* Local Image */}
        {/* <Image source={require('./assets/starCircleBrown.png')}/> */}
        {/* <TouchableOpacity onPress={() => console.log("Image Tapped")}> */}
          {/* Network Image */}
          {/* <Image
            blurRadius={5}
            fadeDuration={1000}
            source={{
              width: 200,
              height: 200,
              uri: 'https://picsum.photos/200/300'
            }} /> */}
        {/* </TouchableOpacity> */}
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
  }
});

export default App;

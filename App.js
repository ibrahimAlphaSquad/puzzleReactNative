/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef, useState } from 'react';
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

import Canvas, { Image as CanvasImage } from 'react-native-canvas';

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
  const [canvasD, setCanvas] = useState(false);
  const [shufflePzl, setShuffle] = useState(false);
  const ref = useRef(false);

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
    console.log("puzzleDifficulty", puzzleDifficulty)
    if (running !== true) {
      setRunning(true);
      setShuffle(true);
    }
  }

  const handleCanvas = canvas => {
    const PUZZLE_HOVER_TINT = "#6ec5eb";
    const img = new CanvasImage(canvas);
    const stage = canvas.getContext("2d");
    let difficulty = puzzleDifficulty;
    let pieces;
    let puzzleWidth;
    let puzzleHeight;
    let pieceWidth;
    let pieceHeight;
    let currentPiece;
    let currentDropPiece;
    let mouse;
    img.addEventListener("load", onImage, false);

    canvas.width = 300;
    canvas.height = 300;
    const context = canvas.getContext('2d');

    img.addEventListener('load', () => {
      context.drawImage(img, 0, 0, 100, 100);
    });

    img.addEventListener('load', onImage, true);
    img.src = puzzleSource;

    function initPuzzle() {
      pieces = [];
      mouse = {
        x: 0,
        y: 0,
      };
      currentPiece = null;
      currentDropPiece = null;
      stage.drawImage(
        img,
        0,
        0,
        puzzleWidth,
        puzzleHeight,
        0,
        0,
        puzzleWidth,
        puzzleHeight,
      );
      // createTitle("Click to Start Puzzle");

      buildPieces();
    }
    //canvas initial rebder
    // function setCanvas() {
    // canvas.width = puzzleWidth;
    // canvas.height = puzzleHeight;
    // canvas.style.border = '1px solid black';
    // stage.drawImage(
    //     img,
    //     0,
    //     0,
    //     puzzleWidth,
    //     puzzleHeight,
    //     0,
    //     0,
    //     puzzleWidth,
    //     puzzleHeight
    // );
    // }
    //image load handler based on grid size
    function onImage() {
      pieceWidth = Math.floor(canvas.width / difficulty);
      pieceHeight = Math.floor(canvas.height / difficulty);
      puzzleWidth = pieceWidth * difficulty;
      puzzleHeight = pieceHeight * difficulty;
      // setCanvas();
      initPuzzle();
    }
    //create pieces of tiles
    function buildPieces() {
      let i;
      let piece;
      let xPos = 0;
      let yPos = 0;
      for (i = 0; i < difficulty * difficulty; i++) {
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        pieces.push(piece);
        xPos += pieceWidth;
        if (xPos >= puzzleWidth) {
          xPos = 0;
          yPos += pieceHeight;
        }
      }

      shufflePzl && shufflePuzzle();
    }
    //shuffle Grid pieces
    function shufflePuzzle() {
      pieces = shuffleArray(pieces);
      stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
      let xPos = 0;
      let yPos = 0;
      for (const piece of pieces) {
        piece.xPos = xPos;
        piece.yPos = yPos;
        stage.drawImage(
          img,
          piece.sx,
          piece.sy,
          pieceWidth,
          pieceHeight,
          xPos,
          yPos,
          pieceWidth,
          pieceHeight,
        );
        stage.strokeRect(xPos, yPos, pieceWidth, pieceHeight);
        xPos += pieceWidth;
        if (xPos >= puzzleWidth) {
          xPos = 0;
          yPos += pieceHeight;
        }
      }
      onPuzzleClick();
    }
    //check the piece is draged or not
    function checkPieceClicked() {
      for (const piece of pieces) {
        if (
          mouse.x < piece.xPos ||
          mouse.x > piece.xPos + pieceWidth ||
          mouse.y < piece.yPos ||
          mouse.y > piece.yPos + pieceHeight
        ) {
          //PIECE NOT HIT
        } else {
          return piece;
        }
      }
      return null;
    }
    //on refresh update puzzle
    function updatePuzzle(e) {
      console.log("first")
      currentDropPiece = null;
      if (e?.clientX || e?.clientX == 0) {
        mouse.x = e?.clientX - canvas.offsetLeft;
        mouse.y = e?.clientY - canvas.offsetTop;
      } else if (e?.offsetX || e?.offsetX == 0) {
        mouse.x = e?.offsetX - canvas.offsetLeft;
        mouse.y = e?.offsetY - canvas.offsetTop;
      }
      stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
      for (const piece of pieces) {
        if (piece == currentPiece) {
          continue;
        }
        stage.drawImage(
          img,
          piece.sx,
          piece.sy,
          pieceWidth,
          pieceHeight,
          piece.xPos,
          piece.yPos,
          pieceWidth,
          pieceHeight,
        );
        stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        if (currentDropPiece == null) {
          if (
            mouse.x < piece.xPos ||
            mouse.x > piece.xPos + pieceWidth ||
            mouse.y < piece.yPos ||
            mouse.y > piece.yPos + pieceHeight
          ) {
            //NOT OVER
          } else {
            currentDropPiece = piece;
            stage.save();
            stage.globalAlpha = 0.4;
            stage.fillStyle = PUZZLE_HOVER_TINT;
            stage.fillRect(
              currentDropPiece.xPos,
              currentDropPiece.yPos,
              pieceWidth,
              pieceHeight,
            );
            stage.restore();
          }
        }
      }
      stage.save();
      stage.globalAlpha = 0.6;
      stage.drawImage(
        img,
        currentPiece.sx,
        currentPiece.sy,
        pieceWidth,
        pieceHeight,
        mouse.x - pieceWidth / 2,
        mouse.y - pieceHeight / 2,
        pieceWidth,
        pieceHeight,
      );
      stage.restore();
      stage.strokeRect(
        mouse.x - pieceWidth / 2,
        mouse.y - pieceHeight / 2,
        pieceWidth,
        pieceHeight,
      );
    }
    //Drag puzzle
    function onPuzzleClick(e) {
      if (e?.clientX || e?.clientX === 0) {
        mouse.x = e?.clientX - canvas.offsetLeft;
        mouse.y = e?.clientY - canvas.offsetTop;
      }
      // else if (e.offsetX || e.offsetX === 0) {
      //     mouse.x = e.offsetX - canvas.offsetLeft;
      //     mouse.y = e.offsetY - canvas.offsetTop;
      // }
      currentPiece = checkPieceClicked();
      if (currentPiece !== null) {
        stage.clearRect(
          currentPiece.xPos,
          currentPiece.yPos,
          pieceWidth,
          pieceHeight,
        );
        stage.save();
        stage.globalAlpha = 0.9;
        stage.drawImage(
          img,
          currentPiece.sx,
          currentPiece.sy,
          pieceWidth,
          pieceHeight,
          mouse.x - pieceWidth / 2,
          mouse.y - pieceHeight / 2,
          pieceWidth,
          pieceHeight,
        );
        stage.restore();
        // document.onpointermove = updatePuzzle;
        // document.onpointerup = pieceDropped;
        updatePuzzle();
        pieceDropped();
      }
    }
    //game over
    function gameOver() {
      // document.onpointerdown = null;
      // document.onpointermove = null;
      // document.onpointerup = null;

      initPuzzle();
    }
    //drop puzzle
    function pieceDropped(e) {
      // document.onpointermove = null;
      // document.onpointerup = null;

      if (currentDropPiece !== null) {
        let tmp = {
          xPos: currentPiece.xPos,
          yPos: currentPiece.yPos,
        };
        currentPiece.xPos = currentDropPiece.xPos;
        currentPiece.yPos = currentDropPiece.yPos;
        currentDropPiece.xPos = tmp.xPos;
        currentDropPiece.yPos = tmp.yPos;
      }
      resetPuzzleAndCheckWin();
    }
    //Reset when done
    function resetPuzzleAndCheckWin() {
      stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
      let gameWin = true;
      for (let piece of pieces) {
        stage.drawImage(
          img,
          piece.sx,
          piece.sy,
          pieceWidth,
          pieceHeight,
          piece.xPos,
          piece.yPos,
          pieceWidth,
          pieceHeight,
        );
        stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        if (piece.xPos != piece.sx || piece.yPos != piece.sy) {
          gameWin = false;
        }
      }
      if (gameWin) {
        // setToaster(true);
        // console.log("Welcome to the AK's Team --->");
        // createTitle("Welcome to the AK's Team");
        // setModalState(true);
        // setWelcomeConfitte(true);
        // setIsActive(false);
        setTimeout(gameOver, 200);
        // setSeconds(pre => localStorage.setItem('seconds', JSON.stringify(pre)));
      }
    }

    function shuffleArray(o) {
      for (
        var j, x, i = o.length;
        i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
      );
      return o;
    }
    // Grid size
    function updateDifficulty(e) {
      difficulty = e;
      pieceWidth = window.matchMedia('(max-width: 768px)').matches
        ? Math.floor(370 / difficulty)
        : Math.floor(img.width / difficulty);
      pieceHeight = window.matchMedia('(max-width: 768px)').matches
        ? Math.floor(300 / difficulty)
        : Math.floor(img.width / difficulty);
      puzzleWidth = pieceWidth * difficulty;
      puzzleHeight = pieceHeight * difficulty;
      gameOver();
    }
    // document.querySelector('#GridSize').oninput = updateDifficulty;
  };


  useEffect(() => {
    if (puzzleDifficulty >= 2 || puzzleDifficulty !== '') {
      setCanvas(false);
      handleCanvas(ref.current);
    } else {
      setShuffle(false);
      setCanvas(true);
      console.log("first")
    }
  }, [ref, puzzleDifficulty, shufflePzl]);

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
            keyboardType='numeric'
            onChangeText={(text) => {
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
        <View style={styles.canvasView}>
          <Canvas
            ref={ref}
            style={[styles.Canvas, canvasD && { display: 'none' }]}
          />
        </View>
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
  canvasView: {
    marginLeft: 40,
    marginTop: 20
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

import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from '../style/style';

const START = 'plus';
const CROSS = 'cross';
const CIRCLE = 'circle';
const NBR_OF_COLS = 5;
const NBR_OF_ROWS = 5;
const NBR_OF_SHOTS = 30;
let initialBoard = new Array(NBR_OF_COLS * NBR_OF_ROWS).fill(START);

export default function Gameboard() {

    const [isCross, setCross] = useState(true);
    const [winner, setWinner] = useState("");
    const [nbrOfShotsLeft, setNbrOfShotsLeft] = useState(NBR_OF_SHOTS);
    const [board, setBoard] = useState(initialBoard);
    const [nbrOfWins, setNbrOfWins] = useState(0);
    const [status, setStatus] = useState('');

    const items = [];
    for (let x = 0; x < NBR_OF_ROWS; x++) {
        const cols = [];
        for (let y = 0; y < NBR_OF_COLS; y++) {
            cols.push(
                <Pressable
                    key={x * NBR_OF_COLS + y}
                    style={styles.item}
                    onPress={() => drawItem(x * NBR_OF_COLS + y)}>
                    <Entypo
                        key={x * NBR_OF_COLS + y}
                        name={board[x * NBR_OF_COLS + y]}
                        size={32}
                        color={chooseItemColor(x * NBR_OF_COLS + y)} />
                </Pressable>
            );
        }
        let row =
            <View key={"row" + x}>
                {cols.map((item) => item)}
            </View>
        items.push(row);
    }

    useEffect(() => {
        winGame();
        if (nbrOfShotsLeft === NBR_OF_SHOTS) {
            setStatus('Game has not started');
        }
        if (nbrOfShotsLeft < 0) {
            setNbrOfShotsLeft(NBR_OF_SHOTS - 1);
            setNbrOfWins(0);
        }
    }, [nbrOfShotsLeft]);

    function drawItem(number) {
        if (board[number] === START && winGame() === "") {
            board[number] = isCross ? CROSS : CIRCLE;
            setCross(!isCross);
            if (winGame() !== "") {
                setWinner(winGame());
            }
            else if (board.indexOf(START) === -1) {
                setWinner('No winner'); 
            }
        } 
    }

    function resetGame() {
        setCross(true);
        setWinner('');
        initialBoard = [...board];
        initialBoard = new Array(NBR_OF_COLS * NBR_OF_ROWS).fill(START);
        setBoard(initialBoard);
    }

    // function takeShots() {
    //     for (let i = 0; i < )
    // }

    function chooseItemColor(number) {
        if(board[number] === CROSS) {
            return "#FF3031"
        }
        else if (board[number] === CIRCLE) {
            return "#45CE30"
        }
        else {
            return "#74B9FF"
        }
    }

    function winGame() {
        if(board[0] != "plus" && board[0] == board[1] && board[1] == board[2]){
          return board[0]
        }else if(board[3] != "plus" && board[3] == board[4] && board[4] == board[5]){
          return board[3]
        }else if(board[6] != "plus" && board[6] == board[7] && board[7] == board[8]){
          return board[6]
        }else if(board[0] != "plus" && board[0] == board[3] && board[3] == board[6]){
          return board[0]
        }else if(board[1] != "plus" && board[1] == board[4] && board[4] == board[7]){
          return board[1]
        }else if(board[2] != "plus" && board[2] == board[5] && board[5] == board[8]){
          return board[2]
        }else if(board[0] != "plus" && board[0] == board[4] && board[4] == board[8]){
          return board[0]
        }else if(board[2] != "plus" && board[2] == board[4] && board[4] == board[6]){
          return board[2]
        }else{
          return ""
        }
      }


    return (
        <View style={styles.gameboard}>
            <View style={styles.flex}>{items}</View>
            <Text style={styles.gameinfo}>Shots left: {nbrOfShotsLeft}</Text>
            <Text style={styles.gameinfo}>Winner: {winner}</Text>
            <Pressable style={styles.button} onPress={() => resetGame()}>
                <Text style={styles.buttonText}>Restart Game</Text>
            </Pressable>
        </View>
    );
}

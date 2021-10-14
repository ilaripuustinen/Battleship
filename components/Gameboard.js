import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from '../style/style';

const START = 'plus';
const CROSS = 'cross';
const CIRCLE = 'circle';
const NBR_OF_COLS = 5;
const NBR_OF_ROWS = 5;
const NBR_OF_SHIPS = 3;
const NBR_OF_SHOTS = 15;
let initialBoard = new Array(NBR_OF_COLS * NBR_OF_ROWS).fill(START);

export default function Gameboard() {

    const [NoShip, setNoShip] = useState(true);
    const [nbrOfShotsLeft, setNbrOfShotsLeft] = useState(NBR_OF_SHOTS);
    const [hits, setHits] = useState(0);
    const [ships, setShips] = useState([]);
    const [position, setPosition] = useState([]);
    const [board, setBoard] = useState(initialBoard);
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

    const initializeShips = () => {
        const futureShips = []
        const getRandomNumber = () => Math.floor(Math.random() * board.length + 1)

        while(futureShips.length < 3) {
            const randomnumber = getRandomNumber()
            // onko samassa kohtaa 2 laivaa
            if(!futureShips.includes(randomnumber) ) futureShips.push(randomnumber)
        }
        console.log(futureShips)
        setShips(futureShips)
    }
    
    useEffect(() => {
        initializeShips();
        // if (nbrOfShotsLeft === NBR_OF_SHOTS) {
        //     setStatus('Game has not started');
        // }
        // else if (nbrOfShotsLeft < 0) {
        //     setNbrOfShotsLeft(NBR_OF_SHOTS - 1);
        // }
    }, []);

    function drawItem(number) {
        if (board[number] === START && winGame() === "") {
            board[number] = NoShip ? CROSS : CIRCLE;
            setNoShip(!NoShip);
            if (winGame() !== "") {
            }
            else if (board.indexOf(START) === -1) {
            }
        }
    }

    function resetGame() {
        setNoShip(true);
        initialBoard = [...board];
        initialBoard = new Array(NBR_OF_COLS * NBR_OF_ROWS).fill(START);
        setBoard(initialBoard);
    }

    function chooseItemColor(number) {
        if (board[number] === CROSS) {
            return "#FF3031"
        }
        else if (board[number] === CIRCLE) {
            return "#45CE30"
        }
        else {
            return "#74B9FF"
        }
    }

    // function winGame() {
    //     if (hits = 3) {
    //         setStatus('You won');
    //     }
    //     else if (nbrOfShotsLeft = 0) {
    //         setStatus('Pommit loppu, luuseri');
    //     }
    // }

    function winGame() {
        if (board[0] != "plus" && board[0] == board[1] && board[1] == board[2]) {
            return board[0]
        } else if (board[3] != "plus" && board[3] == board[4] && board[4] == board[5]) {
            return board[3]
        } else if (board[6] != "plus" && board[6] == board[7] && board[7] == board[8]) {
            return board[6]
        } else if (board[0] != "plus" && board[0] == board[3] && board[3] == board[6]) {
            return board[0]
        } else if (board[1] != "plus" && board[1] == board[4] && board[4] == board[7]) {
            return board[1]
        } else if (board[2] != "plus" && board[2] == board[5] && board[5] == board[8]) {
            return board[2]
        } else if (board[0] != "plus" && board[0] == board[4] && board[4] == board[8]) {
            return board[0]
        } else if (board[2] != "plus" && board[2] == board[4] && board[4] == board[6]) {
            return board[2]
        } else {
            return ""
        }
    }

    return (
        <View style={styles.gameboard}>
            <View style={styles.flex}>{items}</View>
            <Text style={styles.gameinfo}>Shots left: {nbrOfShotsLeft}</Text>
            <Text style={styles.gameinfo}>Hits: {hits}</Text>
            <Text style={styles.gameinfo}>Ships: {ships.length}</Text>
            <Text style={styles.gameinfo}>Status: {status}</Text>
            <Pressable style={styles.button} onPress={() => resetGame()}>
                <Text style={styles.buttonText}>New Game</Text>
            </Pressable>
        </View>
    );
}

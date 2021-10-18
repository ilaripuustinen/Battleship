
import React, { useState, useEffect, useRef } from 'react';
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

    const [noShip, setNoShip] = useState(true);
    const [time, setTime] = useState(30);
    const [hits, setHits] = useState(0);
    const [ships, setShips] = useState([]);
    const [board, setBoard] = useState(initialBoard);
    const [nbrOfShots, setNbrOfShots] = useState(NBR_OF_SHOTS);
    const [status, setStatus] = useState('');
    const timerInterval = useRef()

    const items = [];
    for (let x = 0; x < NBR_OF_ROWS; x++) {
        const cols = [];
        for (let y = 0; y < NBR_OF_COLS; y++) {
            cols.push(
                <Pressable
                    key={x * NBR_OF_COLS + y}
                    style={styles.item}
                    onPress={() => clickHandler(x * NBR_OF_COLS + y)}>
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

    const clickHandler = (clickedPoint) => {
        if (!timerInterval.current) {
            setStatus("Press New game button to start the game")
            return;
        }
        drawItem(clickedPoint)
        setNbrOfShots(state => state -1)
    }

    const initializeShips = () => {
        const futureShips = []
        const getRandomNumber = () => Math.floor(Math.random() * board.length + 1)

        while(futureShips.length < NBR_OF_SHIPS) {
            const randomnumber = getRandomNumber()
            // onko samassa kohtaa 2 laivaa
            if(!futureShips.includes(randomnumber) ) futureShips.push(randomnumber)
        }
        setShips(futureShips)
    }
    
    useEffect(() => {
        initializeShips();
    }, []);

    useEffect(() => {
        if (hits === NBR_OF_SHIPS) {
            setStatus("You won");
            clearInterval(timerInterval.current);
        }
        if (nbrOfShots === 0) {
            setStatus("All shots used.")
            clearInterval(timerInterval.current);
        }
    },[hits, nbrOfShots]);

    useEffect(() => {
        if (time === 0) {
            setStatus("Time ran out");
            clearInterval(timerInterval.current);
        }
    },[time]);

    const tickTock = () => {
        clearInterval(timerInterval.current)
        setTime(30)

        const newInterval = setInterval(() => {
        setTime(state => state -1);
        }, 1000);

        timerInterval.current = newInterval
    }

    function drawItem(number) {
        setBoard(state => state.map((element, index) => 
        {
            if(index === number) {
                if(ships.includes(number)) {
                    setHits(hits + 1);
                    return CIRCLE;
                }
                else return CROSS
            }
            else return element
        }
        ))
    }

    function resetGame() {
        setNoShip(true);
        tickTock();
        setNbrOfShots(NBR_OF_SHOTS);
        setHits(0);
        setStatus('Sink the ships');
        initialBoard = [...board];
        initialBoard = new Array(NBR_OF_COLS * NBR_OF_ROWS).fill(START);
        setBoard(initialBoard);
    }

    function chooseItemColor(number) {
        if (board[number] === CROSS) return "#FF3031"
        else if (board[number] === CIRCLE) return "#45CE30"
        else return "#74B9FF"    
    }

    return (
        <View style={styles.gameboard}>
            <View style={styles.flex}>{items}</View>
            <Text style={styles.gameinfo}>Shots left: {nbrOfShots}</Text>
            <Text style={styles.gameinfo}>Hits: {hits}</Text>
            <Text style={styles.gameinfo}>Ships: {ships.length}</Text>
            <Text style={styles.gameinfo}>Time: {time}</Text>
            <Text style={styles.gameinfo}>Status: {status}</Text>
            <Pressable style={styles.button} onPress={() => resetGame()}>
                <Text style={styles.buttonText}>New Game</Text>
            </Pressable>
        </View>
    );
}

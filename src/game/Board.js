import React, { useState, useEffect } from "react";
import data from "./data";
import Card from "./Card";

const Board = () => {
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [cardsArr, setCardsArr] = useState([]);
    const[stopFlip, setStopFlip] = useState(false);
    const [moves, setMoves] = useState(0);
    const [won, setWon] = useState(0);

    const newGame = () => { 
        setTimeout(() => { 
            const randomOrder = data.sort(() => 0.5 - Math.random()); 
            setCardsArr(randomOrder); 
            setMoves(0); 
            setFirstCard(null); 
            setSecondCard(null); 
            setWon(0); 
        }, 1000); 
    } 

    const handleCards = (card) => {
        if (firstCard !== null && firstCard.id !== card.id) {
            setSecondCard(card);
            console.log(`second card is ${card.name}`);
        } else {
            setFirstCard(card);
            console.log(`first card is ${card.name}`);
        }
    }


    useEffect(()=>{
        if (firstCard && secondCard) {
            setStopFlip(true);
            if (firstCard.name === secondCard.name) {
                setCardsArr((prevArray) => {
                    return prevArray.map((selectedCard) => {
                        if (selectedCard.name === firstCard.name) {
                            console.log("matched! status updated");
                            return {...selectedCard, matched: true}
                        } else {
                            return selectedCard;
                        }
                    });
                });
                setWon((prevValue) => prevValue + 1);
                removeSelection();
            } else {
                setTimeout(() => {
                    removeSelection();
                }, 1000);
            }
        }
    }, [firstCard, secondCard]);

    const removeSelection = () => {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setMoves((prevValue) => prevValue + 1);
        // setMatchedMessage(false);
    }

    useEffect(() => { 
        newGame(); 
    }, []); 

    return ( 
        <div className="container"> 
            <div className="header"> 
                <h1>Animal Matching Game</h1> 
            </div> 
            <div className="board"> 
                { 
                    cardsArr.map((card) => ( 
                        <Card 
                            name={card} 
                            key={card.id} 
                            image={card.img}
                            handleCards={handleCards} 
                            toggled={ 
                                card === firstCard || 
                                card === secondCard || 
                                card.matched === true
                            }   
                            stopflip={stopFlip} 
                        /> 
                    )) 
                } 
            </div> 

            {won !== 12 ? ( 
                <div className="comments">Moves : {moves}</div> 
            ) : ( 
                <div className="comments"> 
                    <p>You win!</p>
                      Moves:{moves}
                </div> 
            )} 
    
            <button className="button" onClick={newGame}> 
                New Game 
            </button> 
        </div> 
    ); 
}


export default Board;




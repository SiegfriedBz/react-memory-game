import { useState, useEffect } from "react";
import Cards from './components/Cards'
import helmet from './assets/img/cards/helmet.png'
import potion from './assets/img/cards/potion.png'
import ring from './assets/img/cards/ring.png'
import scroll from './assets/img/cards/scroll.png'
import shield from './assets/img/cards/shield.png'
import sword from './assets/img/cards/sword.png'
import { useWindowSize } from '@react-hook/window-size'
import Confetti from 'react-confetti'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const cardImages = [
    { src: helmet },
    { src: potion },
    { src: ring },
    { src: scroll},
    { src: shield },
    { src: sword }
]

function App() {

    const [cards, setCards] = useState([])
    const [counter, setCounter] = useState(0)
    const [choiceOne, setChoiceOne] = useState(undefined)
    const [gameIsWon, setGameIsWon] = useState(false)

    const [width, height] = useWindowSize()

    useEffect(() =>{
        const allCardsFound = cards.reduce((acc, curr) => {
            return { found: acc.found && curr.found }
        }, { found: true }).found

        setGameIsWon(allCardsFound)
    }, [counter])

    const startGame = () => {
        setGameIsWon(false)
        const startGamedCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, id: index, found: false }))

        setCards(startGamedCards)
        setCounter(0)
    }

    const playCard = (_id) => {
        setCounter(prev => prev + 1)
        const playedCard = cards.find(card => card.id === _id)
        if (!choiceOne) {
            setChoiceOne(playedCard)
        }
       else {
            if(choiceOne.src === playedCard.src) {
                setCards(cards.map(card => {
                    return (
                        card.src !== playedCard.src ? card : {...card, found: true }
                    )
                }))
            }
            setChoiceOne(undefined)
        }
    }

     return (
        <div className="app">
            {gameIsWon &&
                <Confetti
                    width={width}
                    height={height}
                />
            }
            <div className="d-flex justify-content-center align-items-center mt-3">
                <FontAwesomeIcon icon={faStar} />
                <h1 className='mx-2 my-0'>Magic Match</h1>
                <FontAwesomeIcon icon={faStar} />
            </div>
            <button
                className="btn btn-outline-primary my-3"
                onClick={() => startGame()}
            >Play Game</button>
            <Cards cards={cards} playCard={playCard} />
        </div>
      );
    }

export default App;

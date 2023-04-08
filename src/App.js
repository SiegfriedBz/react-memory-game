import { useState } from "react";
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
    const [gameWon, setGameWon] = useState(false)

    console.log('gameWon', gameWon)

    const [width, height] = useWindowSize()

    const shuffle = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, id: index, found: false }))

        setCards(shuffledCards)
        setCounter(0)
    }

    const gameIsWon = () => {
        const allCardsFound = cards.reduce((acc, curr) => {
            return { found: acc.found && curr.found }
        }, { found: true }).found

        console.log('allCardsFound', allCardsFound)
        setGameWon(allCardsFound)
    }

    const playCard = (_id) => {
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
            gameIsWon()
            setChoiceOne(undefined)
        }
    }

     return (
        <div className="app">
            {gameWon &&
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
                onClick={() => shuffle()}
            >Play Game</button>
            <Cards cards={cards} playCard={playCard} />
        </div>
      );
    }

export default App;

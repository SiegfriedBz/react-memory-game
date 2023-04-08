import clsx from 'clsx'
import cover from '../assets/img/cover.png'

const Card = ({ card, playCard }) => {

    const frontClass = clsx("front", {
        'cardIsFound': card.found
    })

    return (
        <div
            className="card-wrapper"
            onClick={() => playCard(card.id)}
        >
            <div className={frontClass}>
                <img src={card.src}/>
            </div>
            <div className="back">
                <img src={cover}/>
            </div>
        </div>
    )
}

export default Card

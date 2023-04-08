import Card from './Card'

const Cards = ({ cards, playCard }) => {
    return (
        <div className="cards-wrapper">
            {cards && cards.map(card => {
                return <Card key={card.id} card={card} playCard={playCard} />
            })}
        </div>
    )
}

export default Cards

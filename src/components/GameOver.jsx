export default function GameOver({ winner, onReset }) {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            <p>{winner ? `Winner: ${winner}` : "It's a tie!"}</p>
            <button onClick={onReset}>Play Again</button>
        </div>
    );
}

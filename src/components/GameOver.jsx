export default function GameOver({ winner, onReset })
{
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p>Winner: {winner}</p>}
            {!winner && <p>It&apos;s a tie!</p>}
            <p>
                <button onClick={onReset}>Play Again</button>
            </p>
        </div>
    );
}
import { useState } from "react";

type Choice = 'Grammar' | 'Words' | 'Adjectives';
type Result = 'Past Perfect' | 'Abandoned' | 'Vast';

const choices: Choice[] = ['Grammar', 'Words', 'Adjectives'];

const getComputerChoice = (): Choice => choices[Math.floor(Math.random() * choices.length)];

const determineWinner = (playerChoice: Choice, computerChoice: Choice): Result => {
    if (playerChoice === computerChoice) return 'Vast';
    if (
        (playerChoice === 'Grammar' && computerChoice === 'Adjectives') ||
        (playerChoice === 'Words' && computerChoice === 'Grammar') ||
        (playerChoice === 'Adjectives' && computerChoice === 'Words')
    ) {
        return 'Past Perfect';
    }
    return 'Abandoned';
};


interface GameResult {
    playerChoice: Choice;
    computerChoice: Choice;
    gameResult: Result;
}

export default function RockPaperScissors() {

    const [result, setResult] = useState<GameResult | null>(null);
    const [showPrize, setShowPrize] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [prizeClaimed, setPrizeClaimed] = useState<boolean>(false);

    const handleChoice = (playerChoice: Choice) => {
        const computerChoice = getComputerChoice();
        const gameResult = determineWinner(playerChoice, computerChoice);
        setResult({ playerChoice, computerChoice, gameResult });
        setShowPrize(gameResult === 'Vast');
    };

    function resetGame() {
        setResult(null);
        setShowPrize(false);
        setPrizeClaimed(false);
    }

    const claimPrize = () => {
        setShowModal(true);
    };

    return (
        <div style = {{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#f0f0f0',
            color: '#333',
        }}>
            <div style={{
                padding: '2rem',
                margin: '0 0.5rem',
                width: '400px',
                maxWidth: '98%',
                height: '400px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                position: 'relative'
            }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>LinguaToken</h1>
            </div>
        </div>
    )
}

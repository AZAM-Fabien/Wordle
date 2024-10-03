import { useCallback, useEffect, useRef, useState } from "react";
import VirtualKeyboard from "./keyboard";

interface GameProps {
  wordToGuess: string;
  normalizedWords: string[];
  setWordToGuess: (word: string) => void;
}

function Game({ wordToGuess, normalizedWords, setWordToGuess }: GameProps) {
  const [letters, setLetters] = useState([
    ["", "", "", "", "", ""], // Line 1
    ["", "", "", "", "", ""], // Line 2
    ["", "", "", "", "", ""], // Line 3
    ["", "", "", "", "", ""], // Line 4
    ["", "", "", "", "", ""], // Line 5
    ["", "", "", "", "", ""], // Line 6
  ]);

  const [currentLine, setCurrentLine] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentLineRef = useRef(currentLine);
  const currentIndexRef = useRef(currentIndex);
  const lettersRef = useRef(letters);

  useEffect(() => {
    currentLineRef.current = currentLine;
    currentIndexRef.current = currentIndex;
    lettersRef.current = letters;
  }, [currentLine, currentIndex, letters]);

  const resetGame = useCallback(() => {
    const randomWord =
      normalizedWords[Math.floor(Math.random() * normalizedWords.length)];
    setWordToGuess(randomWord);
  
    setLetters([
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
    ]);
    setCurrentLine(0);
    setCurrentIndex(0);
  }, [normalizedWords, setWordToGuess, setLetters, setCurrentLine, setCurrentIndex]);

  const processInput = useCallback((key: string) => {
    const currentLine = currentLineRef.current;
    const currentIndex = currentIndexRef.current;
    const letters = lettersRef.current;

    if (key === "Backspace") {
      if (currentIndex > 0) {
        const newLetters = [...letters];
        newLetters[currentLine][currentIndex - 1] = "";
        setLetters(newLetters);
        setCurrentIndex(currentIndex - 1);
      }
    } else if (key === "Enter") {
      if (currentIndex === 6) {
        const enteredWord = letters[currentLine].join("");
        if (!normalizedWords.includes(enteredWord)) {
          alert("Le mot entré n'est pas dans la liste des mots valides.");
          const newLetters = [...letters];
          newLetters[currentLine] = ["", "", "", "", "", ""];
          setLetters(newLetters);
          setCurrentIndex(0);
          return;
        }
        if (enteredWord === wordToGuess) {
          alert("Félicitations ! Vous avez trouvé le mot.");
          resetGame();
        } else {
          if (currentLine < 5) {
            setCurrentLine(currentLine + 1);
            setCurrentIndex(0);
          } else {
            alert(`Dommage ! Le mot était : ${wordToGuess}`);
            resetGame();
          }
        }
      }
    } else if (/^[a-zA-Z]$/.test(key)) {
      if (currentIndex < 6) {
        const newLetters = [...letters];
        newLetters[currentLine][currentIndex] = key.toUpperCase();
        setLetters(newLetters);
        setCurrentIndex(currentIndex + 1);
      }
    }
  }, [normalizedWords, wordToGuess, resetGame]);

  const handleKeyPress = (key: string) => {
    console.log(key);
    processInput(key);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        processInput(event.key);
      };
  
      window.addEventListener("keydown", handleKeyDown);
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
  }, [processInput]);

  return (
    <>
      <div className="board">
        {letters.map((line, lineIndex) => {
          const isLineSubmitted = currentLine > lineIndex;
          const letterStates = Array(6).fill("absent");

          if (isLineSubmitted) {
            const guess: (string | null)[] = line.slice();
            const solution: (string | null)[] = wordToGuess.split("");

            for (let i = 0; i < 6; i++) {
              if (guess[i] === solution[i]) {
                letterStates[i] = "correct";
                guess[i] = null;
                solution[i] = null;
              }
            }

            for (let i = 0; i < 6; i++) {
              if (guess[i] && solution.includes(guess[i])) {
                letterStates[i] = "present";
                solution[solution.indexOf(guess[i])] = null;
              }
            }
          }

          return (
            <div key={lineIndex} className="container">
              {line.map((letter, index) => {
                let className = `cube cube-${index + 1}`;

                if (isLineSubmitted) {
                  className += ` ${letterStates[index]}`;
                }

                return (
                  <div key={index} className={className}>
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <VirtualKeyboard onKeyPress={handleKeyPress} />
    </>
  );
}

export default Game;

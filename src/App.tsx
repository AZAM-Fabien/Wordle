import { useState, useEffect, useRef } from "react";
import "./App.css";
import words from "./words.json";
import Modal from "react-modal";

function LetterBoxes() {
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
  const [wordToGuess, setWordToGuess] = useState("");
  const divRef = useRef<HTMLDivElement>(null);

  const currentLineRef = useRef(currentLine);
  const currentIndexRef = useRef(currentIndex);
  const lettersRef = useRef(letters);
  const wordToGuessRef = useRef(wordToGuess);

  useEffect(() => {
    currentLineRef.current = currentLine;
    currentIndexRef.current = currentIndex;
    lettersRef.current = letters;
    wordToGuessRef.current = wordToGuess;
  }, [currentLine, currentIndex, letters, wordToGuess]);

  useEffect(() => {
    const randomWord =
      words[Math.floor(Math.random() * words.length)].toUpperCase();
    setWordToGuess(randomWord);
    
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      const currentLine = currentLineRef.current;
      const currentIndex = currentIndexRef.current;
      const letters = lettersRef.current;
      const wordToGuess = wordToGuessRef.current;

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
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const resetGame = () => {
    const randomWord =
      words[Math.floor(Math.random() * words.length)].toUpperCase();
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
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="title">Wordle Remake</div>

      <button className="open-button" onClick={openModal}>
        ?
      </button>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="My Modal"
      >
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        <h2 className="modal-title">tutoriel</h2>
        <p>Vous avez 6 chances de deviner le mot <br/>
          si une lettre est en gris, elle n'est pas dans le mot.<br/>
          si une lettre est en orange, elle est dans le mot mais mal placée.<br/>
          si une lettre est en vert, elle est bien positionnée.
        </p>
      </Modal>
      <div
        className="background"
        tabIndex={0}
        style={{ outline: "none" }}
        ref={divRef}
      >
        <div className="message">Tapez le mot sur votre clavier</div>
        <div className="message">Appuyez sur entrée pour valider votre mot</div>
        {/* <div className='message'> mot à trouver: {wordToGuess} </div> */}
        <div className="board">
          {letters.map((line, lineIndex) => {
            const isLineSubmitted = currentLine > lineIndex;
            const letterStates = Array(6).fill('absent');
  
            if (isLineSubmitted) {
              const guess: (string | null)[] = line.slice(); 
              const solution: (string | null)[] = wordToGuess.split('');
  
              for (let i = 0; i < 6; i++) {
                if (guess[i] === solution[i]) {
                  letterStates[i] = 'correct';
                  guess[i] = null;
                  solution[i] = null;
                }
              }
  
              for (let i = 0; i < 6; i++) {
                if (guess[i] && solution.includes(guess[i])) {
                  letterStates[i] = 'present';
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
      </div>
    </>
  );
}

export default LetterBoxes;

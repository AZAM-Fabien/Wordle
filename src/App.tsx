import { useState, useEffect, useRef } from "react";
import "./App.css";
import words from "./words.json";
import Modal from "react-modal";
import Game from "./Components/game";

function LetterBoxes() {
  const [wordToGuess, setWordToGuess] = useState("");
  const [normalizedWords, setNormalizedWords] = useState<string[]>([]);
  const [reveler, setReveler] = useState(false);

  const handleClick = () => {
    setReveler(!reveler);
  };

  useEffect(() => {
    const normalized = words.map((word) =>
      word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
    );
    setNormalizedWords(normalized);
  }, []);

  const wordToGuessRef = useRef(wordToGuess);
  useEffect(() => {
    wordToGuessRef.current = wordToGuess;
  }, [wordToGuess]);

  useEffect(() => {
    const randomWord =
      normalizedWords[Math.floor(Math.random() * words.length)];
    setWordToGuess(randomWord);

    if (divRef.current) {
      divRef.current.focus();
    }
  }, [normalizedWords]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const divRef = useRef<HTMLDivElement>(null);
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
        <p>
          Vous avez 6 chances de deviner le mot <br />
          si une lettre est en gris, elle n'est pas dans le mot.
          <br />
          si une lettre est en orange, elle est dans le mot mais mal placée.
          <br />
          si une lettre est en vert, elle est bien positionnée.
        </p>
      </Modal>
      <div className="background" tabIndex={0} ref={divRef}>
        <div className="message">Tapez le mot sur votre clavier</div>
        <div className="message">Appuyez sur entrée pour valider votre mot</div>
        {reveler ? (
          <div className="message buttonMots" onClick={handleClick}>
            {" "}
            mot à trouver: {wordToGuess}{" "}
          </div>
        ) : (
          <div className="message buttonMots" onClick={handleClick}>
            {" "}
            révéler le mot ? clickez ici{" "}
          </div>
        )}
        <Game
          wordToGuess={wordToGuess}
          setWordToGuess={setWordToGuess}
          normalizedWords={normalizedWords}
        />
      </div>
    </>
  );
}

export default LetterBoxes;

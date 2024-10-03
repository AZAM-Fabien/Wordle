interface VirtualKeyboardProps {
    onKeyPress: (key: string) => void;
  }
  
  const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
    // ...
    const handleKeyPress = (key: string) => {
      onKeyPress(key);
    };

  return (
    <>
      <div className="keyboard">
        <div className="row">
          <div className="key" onClick={() => handleKeyPress('A')}>A</div>
          <div className="key" onClick={() => handleKeyPress('Z')}>Z</div>
          <div className="key" onClick={() => handleKeyPress('E')}>E</div>
          <div className="key" onClick={() => handleKeyPress('R')}>R</div>
          <div className="key" onClick={() => handleKeyPress('T')}>T</div>
          <div className="key" onClick={() => handleKeyPress('Y')}>Y</div>
          <div className="key" onClick={() => handleKeyPress('U')}>U</div>
          <div className="key" onClick={() => handleKeyPress('I')}>I</div>
          <div className="key" onClick={() => handleKeyPress('O')}>O</div>
          <div className="key" onClick={() => handleKeyPress('P')}>P</div>
        </div>
        <div className="row">
          <div className="key" onClick={() => handleKeyPress('Q')}>Q</div>
          <div className="key" onClick={() => handleKeyPress('S')}>S</div>
          <div className="key" onClick={() => handleKeyPress('D')}>D</div>
          <div className="key" onClick={() => handleKeyPress('F')}>F</div>
          <div className="key" onClick={() => handleKeyPress('G')}>G</div>
          <div className="key" onClick={() => handleKeyPress('H')}>H</div>
          <div className="key" onClick={() => handleKeyPress('J')}>J</div>
          <div className="key" onClick={() => handleKeyPress('K')}>K</div>
          <div className="key" onClick={() => handleKeyPress('L')}>L</div>
          <div className="key" onClick={() => handleKeyPress('M')}>M</div>
          
        </div>
        <div className="row">
          <div className="key" onClick={() => handleKeyPress('W')}>W</div>
          <div className="key" onClick={() => handleKeyPress('X')}>X</div>
          <div className="key" onClick={() => handleKeyPress('C')}>C</div>
          <div className="key" onClick={() => handleKeyPress('V')}>V</div>
          <div className="key" onClick={() => handleKeyPress('B')}>B</div>
          <div className="key" onClick={() => handleKeyPress('N')}>N</div>
          <div className="key enter" onClick={() => handleKeyPress('Enter')}>Enter</div>
          <div className="key backspace" onClick={() => handleKeyPress('Backspace')}>Backspace</div>

        </div>
      </div>
    </>
  );
}

export default VirtualKeyboard;

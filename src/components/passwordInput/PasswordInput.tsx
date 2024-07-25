import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface PasswordInputProps {
    password?: string;
    label: string;
    value: string;
    type?: string;
    name: string;
    style?: object;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

function PasswrodInput({password, label, name, style, onChange}: PasswordInputProps) {

    const [showInputPsswordText, setShowInputPsswordText] = useState(false);

    const handleShowInputPsswordText = () => {
        setShowInputPsswordText(!showInputPsswordText);
      };

    return (
      <div style={{ position: 'relative' }}>
        <label>
            {label}
            <input type={showInputPsswordText ? 'text' : 'password'} name={name} value={password} onChange={onChange} style={style}/>
            <span
                  onClick={handleShowInputPsswordText}
                  style={{
                    position: 'relative',
                    right: '1.5rem',
                    top: '0.1rem',
                  }}
                >
                  <FontAwesomeIcon
                    icon={showInputPsswordText ? faEyeSlash : faEye}
                  />
                </span>
               
        </label>
      </div>
    );
  }
  
  export default PasswrodInput;
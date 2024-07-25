import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface PasswordInputProps {
  password?: string;
  label: string;
  value: string;
  name: string;
  style?: object;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PasswordInput({ password, label, name, style, onChange }: PasswordInputProps) {
  const [showInputPasswordText, setShowInputPasswordText] = useState(false);

  const handleShowInputPasswordText = () => {
    setShowInputPasswordText(!showInputPasswordText);
  };

  return (
    <div className="mb-3" style={{ position: 'relative' }}>
      <label className="form-label">
        {label}
        <input type={showInputPasswordText ? 'text' : 'password'} name={name} value={password} onChange={onChange} style={style} className="form-control" />
        <span
          onClick={handleShowInputPasswordText}
          style={{
            position: 'absolute',
            right: '10px',
            top: '36px',
            cursor: 'pointer'
          }}
        >
          <FontAwesomeIcon icon={showInputPasswordText ? faEyeSlash : faEye} />
        </span>
      </label>
    </div>
  );
}

export default PasswordInput;

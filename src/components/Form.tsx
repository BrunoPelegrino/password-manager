import { useState } from "react";

function Form() {
  const [showForm, setShowForm] = useState(false);
  const [service, setService] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isMinLength, setIsMinLength] = useState(false);
  const [isMaxLength, setIsMaxLength] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [hasLettersAndNumbers, setHasLettersAndNumbers] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const minLength = 8;
  const maxLength = 16;

  const handleShowBtn = () => {
    if(showForm === false){
      setShowForm(true)
    }
    else setShowForm(false)
  }

  const handleSerivceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setService(inputValue);
  }

  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setLogin(inputValue);
  }
  const verifyPassword = (password: string) => {
    const hasLettersAndNumbers = /(?=.*[a-zA-Z])(?=.*\d)/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setIsMinLength(password.length >= minLength);
    setIsMaxLength(password.length <= maxLength);
    setHasLettersAndNumbers(hasLettersAndNumbers);
    setHasSpecialChar(hasSpecialChar);

    if (isMinLength && password.length <= maxLength &&
      hasLettersAndNumbers && hasSpecialChar 
    ){
      setIsPasswordValid(true)
    }
  }

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setPassword(inputValue);
    verifyPassword(inputValue);
  }

  const isFormValid = () => {
    if(service !== '' && login !== '' && password !== '' && isPasswordValid){
      return true
  }
  else false
  }

  return (
    <div>
      {showForm === false ? (<button onClick={handleShowBtn}>
        Cadastrar nova senha
        </button>) :
     (<form>
      <fieldset>
        <div>
        <label>Nome do Serviço
        <input type="text"
        value={service} 
        onChange={handleSerivceInput}
        />
        </label>
        </div>
        <div>
        <label>Login
        <input 
        value={login}
        onChange={handleLoginInput}
        type="text" />
        </label>
        </div>
        <div>
        <label>Senha
        <input
        value={password}
        onChange={handlePasswordInput} 
        type="password" />
        </label>
        <ul>
        <li className={isMinLength ? "valid-password-check" : "invalid-password-check"}>
          Possuir 8 ou mais caracteres
        </li>
        <li className={isMaxLength ? "valid-password-check" : "invalid-password-check"}>
          Possuir até 16 caracteres
        </li>
        <li className={hasLettersAndNumbers ? "valid-password-check" : "invalid-password-check"}>
          Possuir letras e números
          </li>
        <li className={hasSpecialChar ? "valid-password-check" : "invalid-password-check"}>
          Possuir algum caractere especial
          </li>
        </ul>
        </div>
        <label>URL
        <input type="text" />
        </label>
        <button
        disabled={!isFormValid()}
        >Cadastrar</button>
        <button onClick={handleShowBtn} >Cancelar</button>
      </fieldset>
    </form>)}
    </div>
  );
}
export default Form;

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ServiceInput from './serviceInput/ServiceInput';
import PasswrodInput from './passwordInput/PasswordInput';

interface Service {
  name: string;
  login: string;
  password: string;
  url: string;
}

function Form() {
  const [showForm, setShowForm] = useState(false);
  const [service, setService] = useState('');
  const [serviceObj, setServiceObj] = useState<Service[]>([]);
  const [login, setLogin] = useState('');
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState('');
  const [isMinLength, setIsMinLength] = useState(false);
  const [isMaxLength, setIsMaxLength] = useState(true);
  const [hasLettersAndNumbers, setHasLettersAndNumbers] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const minLength = 8;
  const maxLength = 16;

  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      setServiceObj(JSON.parse(storedServices));
    }
  }, []);

  const handleShowBtn = () => {
    if (showForm === false) {
      setShowForm(true);
    } else setShowForm(false);
  };

  const handleSerivceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setService(inputValue);
  };

  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLogin(inputValue);
  };

  const handleUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setUrl(inputValue);
  };

  const verifyPassword = (password: string) => {
    const hasLettersAndNumbers = /(?=.*[a-zA-Z])(?=.*\d)/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setIsMinLength(password.length >= minLength);
    setIsMaxLength(password.length <= maxLength);
    setHasLettersAndNumbers(hasLettersAndNumbers);
    setHasSpecialChar(hasSpecialChar);

    if (
      isMinLength &&
      password.length <= maxLength &&
      hasLettersAndNumbers &&
      hasSpecialChar
    ) {
      setIsPasswordValid(true);
    }
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    verifyPassword(inputValue);
  };

  const isFormValid = () => {
    if (service !== '' && login !== '' && password !== '' && isPasswordValid) {
      return true;
    } else false;
  };

  const handleRegisterBtn = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      const newService: Service = { name: service, login, password, url };
      setServiceObj([...serviceObj, newService]);
      localStorage.setItem(
        'services',
        JSON.stringify([...serviceObj, newService]),
      );
      setService('');
      setLogin('');
      setPassword('');
      setUrl('');
      setIsMinLength(false);
      setIsMaxLength(true);
      setHasLettersAndNumbers(false);
      setHasSpecialChar(false);
      setShowForm(false);

      Swal.fire({
        title: 'Sucesso',
        text: 'Serviço cadastrado com sucesso',
        timer: 1500,
        showConfirmButton: false,
        icon: 'success',
      });
    }
  };

  const handleDeleteBtn = (index: number) => {
    const removeByKey = serviceObj.filter((_, i) => i !== index);
    setServiceObj(removeByKey);
    localStorage.setItem('services', JSON.stringify(removeByKey));
  };

  const handleHidePasswordCheckBox = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <div>
      {showForm === false ? (
        <button onClick={handleShowBtn}>Cadastrar nova senha</button>
      ) : (
        <form>
          <fieldset>
            <ServiceInput name='service' label='Nome do Serviço' type='text' value={service} onChange={handleSerivceInput} />
            <ServiceInput name='login' label='Login' type='text' value={login} onChange={handleLoginInput} />
            <div>
            <PasswrodInput name='password' label='Senha' value={password} onChange={handlePasswordInput} />
              <ul>
                <li
                  className={
                    isMinLength
                      ? 'valid-password-check'
                      : 'invalid-password-check'
                  }
                >
                  Possuir 8 ou mais caracteres
                </li>
                <li
                  className={
                    isMaxLength
                      ? 'valid-password-check'
                      : 'invalid-password-check'
                  }
                >
                  Possuir até 16 caracteres
                </li>
                <li
                  className={
                    hasLettersAndNumbers
                      ? 'valid-password-check'
                      : 'invalid-password-check'
                  }
                >
                  Possuir letras e números
                </li>
                <li
                  className={
                    hasSpecialChar
                      ? 'valid-password-check'
                      : 'invalid-password-check'
                  }
                >
                  Possuir algum caractere especial
                </li>
              </ul>
            </div>
            <ServiceInput name='url' label='URL' type='text' value={url} onChange={handleUrlInput} />
            <button onClick={handleRegisterBtn} disabled={!isFormValid()}>
              Cadastrar
            </button>
            <button onClick={handleShowBtn}>Cancelar</button>
          </fieldset>
        </form>
      )}

      <div>
        {serviceObj.length === 0 ? (
          <p>Nenhuma senha cadastrada</p>
        ) : (
          <div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={hidePassword}
                  onChange={handleHidePasswordCheckBox}
                />
                Esconder senhas
              </label>
            </div>
            {serviceObj.map((service, index) => (
              <ul className={`${index}`} key={index}>
                <li>
                  <a href={service.url}>{service.name}</a>
                </li>
                <li>{service.login}</li>
                <li>{hidePassword ? '******' : service.password}</li>
                <button onClick={() => handleDeleteBtn(index)}>Apagar</button>
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Form;

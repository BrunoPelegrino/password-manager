import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ServiceInput from '../serviceInput/ServiceInput';
import PasswrodInput from '../passwordInput/PasswordInput';

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
    setShowForm(!showForm);
  };

  const handleSerivceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setService(e.target.value);
  };

  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handleUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const verifyPassword = (password: string) => {
    const hasLettersAndNumbers = /(?=.*[a-zA-Z])(?=.*\d)/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setIsMinLength(password.length >= minLength);
    setIsMaxLength(password.length <= maxLength);
    setHasLettersAndNumbers(hasLettersAndNumbers);
    setHasSpecialChar(hasSpecialChar);

    setIsPasswordValid(
      password.length >= minLength &&
      password.length <= maxLength &&
      hasLettersAndNumbers &&
      hasSpecialChar
    );
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    verifyPassword(inputValue);
  };

  const isFormValid = () => {
    return service !== '' && login !== '' && password !== '' && isPasswordValid;
  };

  const handleRegisterBtn = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      const newService: Service = { name: service, login, password, url };
      const updatedServices = [...serviceObj, newService];
      setServiceObj(updatedServices);
      localStorage.setItem('services', JSON.stringify(updatedServices));
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
    const updatedServices = serviceObj.filter((_, i) => i !== index);
    setServiceObj(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  const handleHidePasswordCheckBox = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <>
      {showForm === false ? (
        <div className="button-new-pass">
          <button onClick={handleShowBtn} className="btn btn-primary">Cadastrar nova senha</button>
          <label className="hide-password-checkbox">
            <input
              type="checkbox"
              checked={hidePassword}
              onChange={handleHidePasswordCheckBox}
            />
            Esconder Senhas
          </label>
        </div>
      ) : (
<div className="form-container">
  <form>
    <fieldset>
        <ServiceInput
          name='service'
          label='Nome do Serviço'
          type='text'
          value={service}
          onChange={handleSerivceInput}
          
        />
      <div className="input-container">
      <ServiceInput
          name='login'
          label='Login'
          type='text'
          value={login}
          onChange={handleLoginInput}
        />
          <PasswrodInput
            name='password'
            label='Senha'
            value={password}
            onChange={handlePasswordInput}
          />
          <div className="password-validations">
          <ul>
            <li className={isMinLength ? 'valid-password-check' : 'invalid-password-check'}>
              Possuir 8 ou mais caracteres
            </li>
            <li className={isMaxLength ? 'valid-password-check' : 'invalid-password-check'}>
              Possuir até 16 caracteres
            </li>
            <li className={hasLettersAndNumbers ? 'valid-password-check' : 'invalid-password-check'}>
              Possuir letras e números
            </li>
            <li className={hasSpecialChar ? 'valid-password-check' : 'invalid-password-check'}>
              Possuir algum caractere especial
            </li>
          </ul>
        </div>
      </div>
      <div className="input-group">
        <ServiceInput
          name='url'
          label='URL'
          type='text'
          value={url}
          onChange={handleUrlInput}
          className="url-input"
        />
      </div>
      <div className="button-container">
        <button className="btn btn-primary" onClick={handleRegisterBtn} disabled={!isFormValid()}>
          Cadastrar
        </button>
        <button className="btn btn-secondary" onClick={handleShowBtn}>Cancelar</button>
      </div>
    </fieldset>
  </form>
</div>

      )}

      <div className="cards-container">
        {serviceObj.length === 0 ? (
          <h5 className="no-cards-message">Nenhuma senha cadastrada</h5>
        ) : (
          serviceObj.map((service, index) => (
            <div className="card" key={index}>
              <div className="card-body">
                <p className="card-text">Serviço: <a href={service.url} className="card-link">{service.name}</a></p>
                <p className="card-text">Login: {service.login}</p>
                <p className="card-text">Senha: {hidePassword ? '******' : service.password}</p>
                <button className="btn btn-danger" onClick={() => handleDeleteBtn(index)}>Apagar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Form;

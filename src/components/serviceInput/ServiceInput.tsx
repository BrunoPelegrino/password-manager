type ServiceInputProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  style?: object
  // onClick: React.MouseEventHandler<HTMLSpanElement>;
};

function ServiceInput({
  label,
  type,
  name,
  value,
  onChange,
  style
  // onClick,
}: ServiceInputProps) {
  return (
    <div>
      <label>
        {label}
        <input type={type} name={name} value={value} onChange={onChange} style={style} />
      </label>
    </div>
  );
}

export default ServiceInput;

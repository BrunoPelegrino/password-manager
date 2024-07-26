type ServiceInputProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  style?: object;
  className?: string;
};

function ServiceInput({
  label,
  type,
  name,
  value,
  onChange,
  style,
  className,
}: ServiceInputProps) {
  return (
    <div className={`mb-3 ${className}`}>
      <label className="form-label">
        {label}
        <input type={type} name={name} value={value} onChange={onChange} style={style} className={`${className} form-control`} />
      </label>
    </div>
  );
}

export default ServiceInput;

import { RadioGroupProps } from '../../types';
import './radio-group.styles.scss';

function RadioGroupComponent<T extends string>({
  options,
  value,
  onChange,
  name,
  errorMessage
}: RadioGroupProps<T>) {
  return (
    <div className='radio-group'>
      {options.map(option => (
        <label
          key={option.value}
          className={`radio-option ${value === option.value ? 'selected' : ''}`}
        >
          <span
            className={`radio-circle ${value === option.value ? 'selected' : ''}`}
          />
          <input
            type='radio'
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
          />
          {option.team ? (
            <div className='team'>
              <img
                className='team__athleteProfile'
                src={option.team.image}
                alt={option.team.username}
              />
              <div>
                <h4 className='team__athleteName'>{option.team.name}</h4>
                <span className='team__athleteId'>{option.team.username}</span>
              </div>
            </div>
          ) : (
            option.label
          )}
        </label>
      ))}

      {errorMessage && <p className='radio-group__error'>{errorMessage}</p>}
    </div>
  );
}

export default RadioGroupComponent;

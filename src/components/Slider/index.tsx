export interface SliderProps {
  label: string;
  id: string;
  min: string;
  max: string;
  step: string;
  value: number;
  onChange: (value: number) => void;
}

const Slider = ({
  label,
  id,
  min,
  max,
  step,
  value,
  onChange,
}: SliderProps) => (
  <div className='rounded bg-slate-600 h-16 p-2 m-2'>
    <div>{label}</div>
    <input
      id={id}
      type='range'
      min={min}
      max={max}
      value={value}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
        onChange(parseFloat(ev.target.value))
      }
      step={step}
    />
  </div>
);

export default Slider;

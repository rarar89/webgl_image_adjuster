type DefaultButtonProps = {
  children: JSX.Element | string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const DefaultButton = ({
  children,
  onClick,
  disabled,
  type,
}: DefaultButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type ?? 'button'}
      className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50'
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default DefaultButton;

import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({ children, disabled, onClick = () => {} }: ButtonProps) => {
  return (
    <button
      className="px-6 py-2 bg-blue-900 uppercase whitespace-nowrap text-sm font-semibold text-white rounded"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

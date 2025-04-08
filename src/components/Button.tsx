import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, onClick = () => {} }: ButtonProps) => {
  return (
    <button
      className="px-6 py-2 bg-blue-900 uppercase whitespace-nowrap text-sm font-semibold text-white rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

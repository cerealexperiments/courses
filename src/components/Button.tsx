import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, onClick = () => {} }: ButtonProps) => {
  return (
    <button
      className={`px-6 py-2 bg-blue-900 uppercase cursor-pointer whitespace-nowrap text-sm font-semibold text-white rounded ${className ? className : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

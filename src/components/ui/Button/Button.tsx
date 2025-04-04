// index.tsx
import "./Button.css";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({ variant = "primary", children, onClick, className }: ButtonProps) => {
  return (
    <button className={`button ${variant} ${className || ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

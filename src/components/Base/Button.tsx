interface ButtonProps {
  /**
   * Background color in tailwindcss format
   */
  bgColor: string;
  /**
   * Outline border color in tailwindcss format
   */
  outlineBorderColor: string;
  children?: React.ReactNode;
  /**
   * Button type
   * @default button
   */
  type?: "button" | "submit" | "reset";
  /**
   * onClick event handler
   */
  onClick?: () => void; // Add onClick prop
}

/**
 * Button component
 * @param {string} bgColorHex - background color in hex format
 * @param {React.ReactNode} children - children
 * @param {() => void} onClick - onClick event handler
 * @returns {React.FC<ButtonProps>}
 * @example
 * <Button bgColorHex="#dfa5af" onClick={() => console.log('Button clicked!')}>Buy Now!</Button>
 */
const Button: React.FC<ButtonProps> = ({
  bgColor,
  children,
  onClick,
  outlineBorderColor,
  type,
}) => {
  return (
    <button
      type={type || "button"}
      className={`border rounded-full overflow-hidden p-0.5 active:scale-95 duration-300 select-none ${outlineBorderColor}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        onClick?.();
      }}
    >
      <div
        id="component_div_button"
        className={`rounded-full w-full h-full text-sm px-5 py-1 text-white ${bgColor}`}
      >
        {children}
      </div>
    </button>
  );
};

export default Button;

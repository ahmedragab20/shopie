interface DialogProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (!onClose || e.target !== e.currentTarget) return;

        onClose();
      }}
      className="fixed z-50 inset-0 w-full h-full backdrop-blur-sm bg-[#ffffff25] flex justify-center items-center overflow-hidden duration-300"
    >
      {children}
    </div>,
    document.body
  );
};

export default Dialog;

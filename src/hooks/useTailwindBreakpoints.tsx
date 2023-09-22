export const useTailwindBreakpoints = () => {
  const [breakpoint, setBreakpoint] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1536) {
        setBreakpoint("xl");
      } else if (width >= 1280) {
        setBreakpoint("lg");
      } else if (width >= 1024) {
        setBreakpoint("md");
      } else if (width >= 768) {
        setBreakpoint("sm");
      } else {
        setBreakpoint("xs");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
};

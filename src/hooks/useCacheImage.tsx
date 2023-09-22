// TODO: refactor this later
export default function useCacheImage(src: string) {
  const [cachedImg, setCachedImg] = useState();

  useEffect(() => {
    try {
      (async () => {
        const img = await $catch({
          fullPath: src,
          cache: "RELOAD",
        });
        console.log(img);

        setCachedImg(img);
      })();
    } catch (error) {
      console.error(error);
    }
  }, [src]);

  return cachedImg;
}

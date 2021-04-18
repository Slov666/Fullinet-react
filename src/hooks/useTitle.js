import { useEffect } from "react";

const useTitle = (title = "") => {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "Fullinet";
    };
  }, [title]);
};

export default useTitle;

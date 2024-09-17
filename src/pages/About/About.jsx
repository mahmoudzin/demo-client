import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "About";
    return () => {
      document.title = "Default Title";
    };
  }, []);
  return <div>About</div>;
}

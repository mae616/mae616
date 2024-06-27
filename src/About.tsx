import { useEffect } from "react";
import AOS from "aos";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <main
      className="h-screen w-screen bg-slate-200"
      data-aos="fade-in"
      data-aos-anchor-placement="top-bottom"
    >
      <img
        src="https://avatars.githubusercontent.com/mae616"
        alt="mae616"
        className="rounded-full"
      />
      <div>
        <h2 className="text-3xl font-bold underline">mae616</h2>
        <p className="text-lg">This is the about page.</p>
      </div>
    </main>
  );
}

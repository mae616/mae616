import { useEffect } from "react";
import AOS from "aos";

export default function Values() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <section
      className="flex"
      data-aos="fade-in"
      data-aos-anchor-placement="top-bottom"
    >
      <h2 className="text-3xl font-bold underline">大事にしている価値観</h2>
    </section>
  );
}

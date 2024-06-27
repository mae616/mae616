import About from "./About";
import Top from "./Top";
import Values from "./Values";
import "aos/dist/aos.css";

export default function App() {
  return (
    <>
      <div className="h-screen w-screen">
        <header className="w-screen fixed flex justify-between p-5 text-zinc-400">
          <h1 className="text-3xl grow hover:text-zinc-800">
            <a href=".">mae616</a>
          </h1>
          <div className="flex justify-between gap-10">
            <div className="menu">
              <a className="menu_item after:bg-blue-500 hover:after:bg-yellow-500 hover:text-zinc-800">
                価値観
              </a>
            </div>
            <div className="menu">
              <a className="menu_item after:bg-black hover:after:bg-emerald-500 hover:text-zinc-800">
                プロフィール
              </a>
            </div>
            <div className="menu">
              <a className="menu_item after:bg-black hover:after:bg-cyan-500 hover:text-zinc-800">
                開発・制作例
              </a>
            </div>
            {/* <div>
            <a>実績</a>
          </div> */}
          </div>
        </header>
        <Top />
      </div>

      <Values />
      <About data-aos="fade-up" data-aos-anchor-placement="top-center" />
    </>
  );
}

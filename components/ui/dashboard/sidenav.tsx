import { nav } from "constants/nav";
import { useLocation, useNavigate } from "react-router";

const SideNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside className="w-72 overflow-x-hidden hidden lg:flex flex-col h-screen shadow-md border-r border-black/10 text-black font-sans">
      <div className="flex flex-col h-full">
        <div className=" p-2 px-7  my-2 flex justify-start">
          <img
            src="/icons/flowva_loader.png"
            alt="flowva logo"
            className="h-16"
          />
        </div>

        <nav className="grow px-4 ">
          <ul>
            {nav.map((nv, i) => {
              const ICON = nv.icon;

              return (
                <li
                  className={` flex items-center gap-3 px-4 p-3 mb-2 rounded-lg cursor-pointer  duration-200 transition-all
                 hover:bg-[rgba(144,19,254,0.1)] hover:text-primary-500 ${pathname === nv.route ? "bg-[rgba(144,19,254,0.1)] text-primary-500" : "text-black"}`}
                  key={i}
                  onClick={nv.route ? () => navigate(nv.route) : () => {}}
                >
                  <ICON />
                  <span className="tracking-wide truncate">{nv.name}</span>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto py-3 relative flex justify-center">
          <div className="absolute top-0 left-4 right-4 border-t border-[#64748B]" />
          <div className="w-full flex items-center justify-between px-4">
            <button className="flex items-center border-none">
              <div className="w-10 h-10 relative overflow-hidden rounded-full font-semibold mr-3 flex items-center justify-center  text-primary-500 bg-primary-200">
                <img
                  src="https://lh3.googleusercontent.com/a/ACg8ocK7O8RQXE_MasqtCbb8gjfp6EsWKUsFDuLIpXoJ-Uxo3YNkk1yq=s96-c"
                  alt="User avatar"
                />
              </div>

              <div className="text-start">
                <span className="text-[0.9rem] font-semibold">Lucky</span>
                <p className="text-[0.8rem] text-[#718096] truncate overflow-x-hidden max-w-38.25">
                  cluckyugo@gmail.com
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;

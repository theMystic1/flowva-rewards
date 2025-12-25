import { nav } from "constants/nav";
import { useNavContext } from "contexts/nav-contsxt";
import { handleLogout } from "lib/auth";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import type { UserType } from "types/type";

const SideNav = ({ user }: { user?: UserType }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <aside
      className="w-72 overflow-x-hidden hidden lg:flex flex-col h-screen shadow-md border-r border-black/10 text-black font-sans"
      onClick={() => setOpen(false)}
    >
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
        {open ? <ProfileModal onClose={() => setOpen(false)} /> : false}
        <div className="mt-auto py-3 relative flex justify-center">
          <div className="absolute top-0 left-4 right-4 border-t border-[#64748B]" />
          <div className="w-full flex items-center justify-between px-4">
            <button
              className="flex items-center border-none"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              <div className="w-10 h-10 relative overflow-hidden rounded-full font-semibold mr-3 flex items-center justify-center  text-primary-500 bg-primary-200">
                <img
                  src={
                    user?.avatar_url ??
                    "https://lh3.googleusercontent.com/a/ACg8ocK7O8RQXE_MasqtCbb8gjfp6EsWKUsFDuLIpXoJ-Uxo3YNkk1yq=s96-c"
                  }
                  alt="User avatar"
                />
              </div>

              <div className="text-start">
                <span className="text-[0.9rem] font-semibold">
                  {user?.name.split(" ")[0]}
                </span>
                <p className="text-[0.8rem] text-[#718096] truncate overflow-x-hidden max-w-38.25">
                  {user?.email}
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

export const MobileNav = ({ user }: { user?: UserType }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openNav, setOpenNav] = useState(false);

  const { open, setOpen } = useNavContext();

  return (
    <div className="flex flex-col md:flex-row min-h-dvh lg:hidden  lg:md:overflow-hidden w-full z-1000">
      <div
        className="fixed inset-0 bg-black backdrop-blur-2xl opacity-50 z-30"
        // onClick={() => setTimeout(() => setOpen(false), 320)}
      ></div>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-white text-black font-sans transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-100 z-1000"}`}
      >
        <button
          onClick={() => setOpen(false)}
          // onClick={() => setTimeout(() => setOpen(false), 320)}
          className="absolute top-4 right-6"
        >
          <CgClose />
        </button>
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
          {openNav ? <ProfileModal onClose={() => setOpenNav(false)} /> : false}

          <div className="mt-auto py-3 relative flex justify-center">
            <div className="absolute top-0 left-4 right-4 border-t border-[#64748B]" />
            <div className="w-full flex items-center justify-between px-4">
              <button className="flex items-center border-none">
                <div className="w-10 h-10 relative overflow-hidden rounded-full font-semibold mr-3 flex items-center justify-center  text-primary-500 bg-primary-200">
                  <img
                    src={
                      user?.avatar_url ??
                      "https://lh3.googleusercontent.com/a/ACg8ocK7O8RQXE_MasqtCbb8gjfp6EsWKUsFDuLIpXoJ-Uxo3YNkk1yq=s96-c"
                    }
                    alt="User avatar"
                  />
                </div>

                <div className="text-start">
                  <span className="text-[0.9rem] font-semibold">
                    {user?.name.split(" ")[0]}
                  </span>
                  <p className="text-[0.8rem] text-[#718096] truncate overflow-x-hidden max-w-38.25">
                    {user?.email}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

const ProfileModal = ({ onClose }: { onClose: () => void }) => {
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const handleClientLogout = async () => {
    setLoggingOut(false);
    try {
      await handleLogout();
      toast.success("Logout successful");
      navigate("/login");
      onClose();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || error || "Logout Failed");
    } finally {
      setLoggingOut(true);
    }
  };
  return (
    <div className="absolute bottom-16 left-6 w-56 bg-white border-primary-500 border text-black rounded-lg shadow-lg z-1000">
      <ul className="px-4 py-2">
        <li className="px-4 py-2 cursor-pointer hover:bg-[rgba(144,19,254,0.1)] rounded-lg">
          Feedback
        </li>
        <button className=" border-none w-full text-start px-4 py-2 cursor-pointer hover:bg-[rgba(144,19,254,0.1)] rounded-lg">
          Support
        </button>
        <li
          className="px-4 py-2 cursor-pointer hover:bg-[rgba(255,107,107,0.1)] hover:text-[#FF6B6B] rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            handleClientLogout();
          }}
        >
          {loggingOut ? "Logging out..." : "Log Out"}
        </li>
      </ul>
    </div>
  );
};

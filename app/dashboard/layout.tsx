import SideNav, { MobileNav } from "components/ui/dashboard/sidenav";
import { LoadingUi } from "components/ui/loading";
import { useNavContext } from "contexts/nav-contsxt";
import { useUser } from "hooks/useUser";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const { isLoading, data } = useUser();
  const { open } = useNavContext();

  if (isLoading) return <LoadingUi />;

  return (
    <div className="flex flex-col md:flex-row min-h-dvh lg:h-screen  lg:md:overflow-hidden w-full  ">
      <SideNav user={data} />
      {open && <MobileNav user={data} />}

      <main className="w-full bg-gray-50 px-4 lg:px-8 lg:pt-8 min-h-screen grow md:overflow-y-auto box-border lg:min-h-0 scrollbar-hidden ">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

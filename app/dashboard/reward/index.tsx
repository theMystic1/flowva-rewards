import Reward from "components/rewards/rewards";
import { LoadingUi } from "components/ui/loading";
import { handleLogout } from "lib/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import supabase from "supabase/supabase";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          navigate("/login");

          console.log(session);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  if (isLoading) return <LoadingUi />;

  return <Reward />;
};

export default Dashboard;

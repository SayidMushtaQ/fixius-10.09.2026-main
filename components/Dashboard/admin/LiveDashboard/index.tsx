"use client";
import clientError from "@/helper/clientError";
import useApiCaller from "@/hooks/useApiCaller";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const LiveDashboard = () => {
  const [search, setSearch] = useState("");

  const handleError = clientError();
  function logIframeNavigation(event: any) {
    console.log("Iframe navegó a:", event.target.contentWindow.location.href);
  }

  const apiCaller = useApiCaller();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("userId_for_admin_req");
        window.localStorage.removeItem("email_for_admin_req");
      }
    };
  }, []);

  const handleSearch = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await apiCaller.get(`/user?email=${search}`);

      setUser(response?.data);

      if (typeof window !== "undefined") {
        window.localStorage.setItem("userId_for_admin_req", response.data?._id);
        window.localStorage.setItem(
          "email_for_admin_req",
          response.data?.email || response?.data?._id
        );
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {!user ? (
        <div className="lg:w-3/4 lg:mx-auto">
          <section className="my-8">
            <h1 className="font-bold text-2xl lg:text-3xl text-slate-950 text-center font-outfit">
              Live-Ansicht des Dashboards für Administratoren:{" "}
              <span className="text-primary italic">
                Zusammenfassung des Kundenprojekts
              </span>
            </h1>
          </section>

          <form
            className="flex w-full max-w-2xl mx-auto mt-10 relative items-stretch"
            onSubmit={handleSearch}
          >
            <div className="relative flex-grow">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-slate-400" />
              </span>
              <input
                type="email"
                required
                placeholder="E-Mail-Adresse des Benutzers eingeben"
                className="h-12 pl-12 w-full border border-slate-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50 font-inter font-medium"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="px-8 h-12 bg-primary text-white rounded-r-lg font-bold font-montserrat transition-all hover:bg-black disabled:opacity-50 shadow-soft"
            >
              {isLoading ? "Suchen..." : "Suchen"}
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full h-full">
          <iframe
            onLoad={logIframeNavigation}
            src={`/dashboard/${user?.role}`}
            className="w-full h-[calc(100vh-100px)]"
          />
        </div>
      )}
      {/* <ModalStruc
				isOpen={user ? true : false}
				closeModal={() => {
					setUser(null);
				}}>
		
			</ModalStruc> */}
    </div>
  );
};
export default LiveDashboard;

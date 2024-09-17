import { Link, useNavigate } from "react-router-dom";
import profile from "./images/profile.jpg";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalPrvider/GlobalProvider";
export default function NavBar(props) {
  const { user, logOut } = useContext(GlobalContext);

  const navigate = useNavigate();
  return (
    <nav className="bg-slate-900 text-white py-[1rem]">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <ul className="flex gap-3">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          {/* user action */}
          <div>
            {user ? (
              <img
                class="w-10 h-10 rounded-full"
                onClick={() => logOut(navigate)}
                src={profile}
                alt="Rounded avatar"
              />
            ) : (
              <Link to={"/auth"}>Sign In</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

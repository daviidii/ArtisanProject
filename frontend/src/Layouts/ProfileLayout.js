import ProfileNav from "../Components/ProfileNav";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <section className="profile container-fluid mt-5">
      <div className="row profile__body">
        <div className="col-lg-2 col-md-12">
          <ProfileNav />
        </div>
        <div className="col-lg-10 col-md-12 min-h-100">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

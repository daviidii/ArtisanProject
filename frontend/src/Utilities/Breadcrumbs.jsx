import { useLocation, Link } from "react-router-dom";

export default function Breadcrumbs() {
  const loc = useLocation();

  let currLink = "";

  const crumbs = loc.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currLink += `/${crumb}`;

      return (
        <div key={crumb} className="crumb">
          <Link to={currLink} className="crumb__link">
            {crumb}
          </Link>
        </div>
      );
    });

  return (
    <div className="container-fluid mw-1440">
      <div className="row">
        <div className="col breadcrumb ml-4">{crumbs}</div>
      </div>
    </div>
  );
}

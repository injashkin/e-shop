import "./breadcrumb.css"
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs();
  console.log(breadcrumbs);
  return (
    <div className="breadcrumb container">
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <NavLink key={match.pathname} to={match.pathname}>
          {breadcrumb}
          <div className="separator"></div>
        </NavLink>
      ))}
    </div>
  );
};

export default Breadcrumb;

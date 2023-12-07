import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import icons from "../utils/icons";

const { FaHandPointRight } = icons;

const Breadcrumbs = ({ category, title }) => {
  const routes = [
    { path: "/products", breadcrumb: "Product" },
    { path: "/", breadcrumb: "Home" },
    { path: "/products/:category", breadcrumb: category },
    { path: "/products/:category/:pid/:title", breadcrumb: title },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <div className="text-sm flex gap-2">
      {breadcrumbs
        ?.filter((item) => !item.match.route === false)
        .map(({ match, breadcrumb }, index, origin) => (
          <Link
            key={match.pathname}
            to={match.pathname}
            className="hover:text-main"
          >
            <div className="flex items-center gap-2">
              <span>{breadcrumb}</span>
              {index !== origin.length - 1 && (
                <span>
                  <FaHandPointRight />
                </span>
              )}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Breadcrumbs;

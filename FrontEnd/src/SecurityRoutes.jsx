import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";
/* importation du store */
import { useSelector } from "react-redux";

/* Redirection en cas forcing dans l'url du navigateur dans le app.jsx */
const SecurityRoutes = ({ children }) => {
    const token = useSelector((state) => state.login.userToken);
    return token ? children : <Navigate to="/sign-in" />;
  };
  SecurityRoutes.propTypes = {
    children: PropTypes.node,
  };
export default SecurityRoutes;
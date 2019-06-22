import ReactDOM from "react-dom";
import * as PropTypes from "prop-types";

const TitleMenu = (props) => {
    const {action} = props;
    const container = document.getElementById('react-admin-options');
    if (!container) return null;
    return ReactDOM.createPortal(action, container);
};

TitleMenu.propTypes = {
    action: PropTypes.element
};

export default TitleMenu;
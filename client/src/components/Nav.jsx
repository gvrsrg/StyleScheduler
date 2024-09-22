import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/user'>Make appointment</Link>
            </li>
            <li>
              <Link to='/admin'>Admin panel</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
export default Nav;

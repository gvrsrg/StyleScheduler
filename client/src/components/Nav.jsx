import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <>
      <header>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/user'>Make appointment</Link> 
          <Link to='/admin'>Admin panel</Link>
        </nav>
      </header>
    </>
  );
};
export default Nav;

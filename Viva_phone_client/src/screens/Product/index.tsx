import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Actions } from "../../store/actions";

const Product = () => {
  const navigate = useNavigate();
  const authData = useSelector(state => (state as any).auth)
  const dispath = useDispatch()

  const handleBackToHome = () => {
    navigate("/student");
  };
  const handleLogin = () => {
    dispath({ type: Actions.LOGIN_USER })
  }
  const handleLogout = () => {
    dispath({ type: Actions.LOGOUT_USER })
  }
  const handleUpdateUser = () => {
    dispath({ type: Actions.UPDATE_USER, payload: "Bùi Tiến Đạt" })
  }

  return (
    <div>
      <h1>Products page</h1>
      <h2>Welcome {authData?.currentUser?.name} to see this product</h2>
      <button className="btn btn-primary" onClick={handleBackToHome}>
        Back to Student Page
      </button>
      <div>
        <button className="btn btn-primary mt-3" onClick={handleLogin}>Login</button>
      </div>
      <div>
        <button className="btn btn-primary mt-3" onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <button className="btn btn-primary mt-3" onClick={handleUpdateUser}>Update user</button>
      </div>
    </div>
  );
};

export default Product;

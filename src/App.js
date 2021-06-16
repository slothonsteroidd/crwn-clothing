import "./App.css";
import Home from "./pages/homepage/homepage.component";
import { Route, Switch, Redirect } from "react-router-dom";
import Shop from "./pages/shop-page/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { auth } from "./firebase/firebase.utils";
import React from "react";
import { createUserProfileDocument } from "./firebase/firebase.utils";
// const HomePage = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <h1>HomePage</h1>
//       <button onClick={() => props.history.push("/about")}>
//         Click Me Senpai
//       </button>
//     </div>
//   );
// };

// const AboutPage = (props) => {
//   return (
//     <div>
//       <h1>AboutPage</h1>
//       <Link to={`${props.match.url}/13`}>Click here to go somewhere</Link>
//     </div>
//   );
// };

// const AboutPage69 = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <h1>{`About Page ${props.match.params.id}`}</h1>
//       <p>{props.match.url}</p>
//       <p>{props.match.path}</p>
//       <p></p>

//       <p>Sid is GOD</p>
//     </div>
//   );
// };

class App extends React.Component {
  handleCloseSubscription = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.handleCloseSubscription = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(user);
      }
    });
  }
  componentWillUnmount() {
    this.handleCloseSubscription();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop" component={Shop} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProp = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProp = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProp, mapDispatchToProp)(App);

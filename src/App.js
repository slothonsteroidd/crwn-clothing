import "./App.css";
import Home from "./pages/homepage/homepage.component";
import { Route, Switch, Link } from "react-router-dom";
import Shop from "./pages/shop-page/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
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
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  handleCloseSubscription = null;
  componentDidMount() {
    this.handleCloseSubscription = auth.onAuthStateChanged(async (user) => {
      console.log("auth user: ", user);
      if (user) {
        const userRef = await createUserProfileDocument(user);
        console.log("userref: ", userRef);
        userRef.onSnapshot((snapshot) => {
          console.log("snapshot: ", snapshot);
          console.log("snapshot data: ", snapshot.data());
          this.setState(
            {
              currentUser: {
                id: snapshot.id,
                ...snapshot.data(),
              },
            },
            () => console.log(this.state)
          );
        });
      } else {
        this.setState({ currentUser: user });
      }
    });
  }
  componentWillUnmount() {
    this.handleCloseSubscription();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/signin" component={SignInAndSignUp} />
        </Switch>
        <h1>{this.state?.currentUser?.uid}</h1>
      </div>
    );
  }
}

export default App;

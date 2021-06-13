import "./App.css";
import Home from "./pages/homepage/homepage.component";
import { Route, Switch, Link } from "react-router-dom";
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
const HatsPage = () => {
  return <h1>Hats Page</h1>;
};

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop/hats" component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;

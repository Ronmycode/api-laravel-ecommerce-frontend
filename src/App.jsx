import "./App.css";
import NavBar from "./components/Nav-Bar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./components/ProductList";

function App() {
  return (
    <>
      <NavBar />
      <ProductList />
      <Footer />
    </>
  );
}

export default App;

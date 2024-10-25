import { useState } from "react";
import { ListItems } from "./components/listItems";
import "./assets/style.css"

export function App(){


  const[search,setSearch]=useState("")
  const[filteredItems,setFilteredItems]=useState([]);
  const[cartItems, setCartItems]=useState([])
  
  function handlechange(e){
    setSearch(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()

    const results = ListItems.filter(item => item.type.toLowerCase().includes(search.toLowerCase()));

    setFilteredItems(results)
  }

  function addToCart(item) {
    setCartItems((previousItems) => [...previousItems, item]); // Add the clicked item to the cart

    setFilteredItems((prevItems) =>
      prevItems.filter((filteredItem) => filteredItem !== item)
    );
  }

  function removeFromCart(item) {
    setCartItems((prevCart) => prevCart.filter((cartItem) => cartItem !== item));
    // Add item back to filtered items
    setFilteredItems((prevItems) => [...prevItems, item]);
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  return(
    <>
      <header>
        <h1>MAGASIN</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={search} onChange={handlechange} />
            <input type="submit" value={"Search"}/>
        </form>
      </header>
      <div className="container">
          {filteredItems.length > 0? (
            filteredItems.map((item, index) => (
              <div key={index} className="product">
                <img src={item.image}/>
                <strong>{item.title}</strong> ${item.price}
                <button onClick={() => addToCart(item)}>Buy now</button>
              </div>
            ))
          ) : (
            <p>No results found, Try to type (book or tech)</p>
          )}
      </div>
      <div>
        {cartItems.length > 0 ? (
          <div className="myCart">
            <h2>Your cart({cartItems.length})</h2>
            <div className="containerCart">
            {cartItems.map((item, index) => (
              <div key={index} className="product">
                <img src={item.image}/>
                <strong>{item.title}</strong> ${item.price}
                <button onClick={()=>removeFromCart(item)}>Delete now</button>
              </div>
            ))}
          </div>
            <h3>Total to pay: {totalPrice}</h3>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

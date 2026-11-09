 import { useState } from "react";
import { Link } from "react-router-dom";

function Catalog({ cart, setCart }) {

  const [activeCategory, setActiveCategory] = useState("Cakes");


  const products = [

    {
      id: 1,
      name: "Luxury Chocolate Cake",
      category: "Cakes",
      price: 125,
      image: "/Image/Cake1.jpeg"
    },

    {
      id: 2,
      name: "Chocolate Celebration Cake",
      category: "Cakes",
      price: 145,
      image: "/Image/Cake2.jpeg"
    },

    {
      id: 3,
      name: "Premium Black Forest Cake",
      category: "Cakes",
      price: 135,
      image: "/Image/Cake3.jpeg"
    },

    {
      id: 4,
      name: "Chocolate Cupcake",
      category: "Cupcakes",
      price: 45,
      image: "/Image/Cup1.jpeg"
    },

    {
      id: 5,
      name: "Vanilla Cupcake",
      category: "Cupcakes",
      price: 40,
      image: "/Image/Cup2.jpeg"
    },

    {
      id: 6,
      name: "Premium Cupcake",
      category: "Cupcakes",
      price: 50,
      image: "/Image/Cup3.jpeg"
    },

    {
      id: 7,
      name: "Fresh Bread",
      category: "Bread",
      price: 35,
      image: "/Image/Bread1.jpeg"
    },

    {
      id: 8,
      name: "Chocolate Bread",
      category: "Bread",
      price: 50,
      image: "/Image/Bread2.jpeg"
    },

    {
      id: 9,
      name: "Milk Bread",
      category: "Bread",
      price: 40,
      image: "/Image/Bread3.jpeg"
    },

    {
      id: 10,
      name: "Fresh Bakery Cake",
      category: "Bakery",
      price: 110,
      image: "/Image/Bakery1.jpeg"
    },

    {
      id: 11,
      name: "Cream Pastry",
      category: "Bakery",
      price: 55,
      image: "/Image/Bakery2.jpeg"
    },

    {
      id: 12,
      name: "Chocolate Pastry",
      category: "Bakery",
      price: 65,
      image: "/Image/Bakery3.jpeg"
    },

    {
      id: 13,
      name: "Premium Candies",
      category: "Candies",
      price: 40,
      image: "/Image/Candy1.jpeg"
    },

    {
      id: 14,
      name: "Caramel Candies",
      category: "Candies",
      price: 35,
      image: "/Image/Candy 2.jpeg"
    },

    {
      id: 15,
      name: "Chocolate Candies",
      category: "Candies",
      price: 30,
      image: "/Image/Candy3.jpeg"
    } ,

     {
      id: 16,
      name: "Tropical Pineapple Cream Cake",
      category: "Cakes",
      price: 145,
      image: "/Image/Pinecake3.png"
    } ,

     {
      id: 17,
      name: "Pineapple Crunch Delight",
      category: "Cakes",
      price: 120,
      image: "/Image/Pinecake2.webp"
    } ,

    {
      id: 18,
      name: "Classic Crème Brûlée Cheesecake",
      category: "Cakes",
      price: 160,
      image: "/Image/Cheesecake1.jpeg"
    } ,

    {
      id: 19,
      name: "Midnight Cherry Truffle",
      category: "Cupcakes",
      price: 55,
      image: "/Image/cup4.jpeg"
    } ,
    {
      id: 20,
      name: "Choco Vanilla Cloud",
      category: "Cupcakes",
      price: 100,
      image: "/Image/Cup5.jpeg"
    } ,

     {
      id: 21,
      name: "Vanilla Sprinkle Dream",
      category: "Cupcakes",
      price: 65,
      image: "/Image/Cup6.jpeg"
    } ,

    {
      id: 22,
      name: "Baguette",
      category: "Bread",
      price: 55,
      image: "/Image/Bread4.jpeg"
    },

     {
      id: 23,
      name: "Croissant",
      category: "Bread",
      price: 65,
      image: "/Image/Bread5.jpeg"
    },

     {
      id: 24,
      name: "Bagel",
      category: "Bread",
      price: 45,
      image: "/Image/Bread6.jpeg"
    },

   {
      id: 25,
      name: "Pineapple Pastry",
      category: "Bakery",
      price: 58,
      image: "/Image/Bakery4.jpeg"
    },

    {
      id: 26,
      name: "Red Velvet Pastry",
      category: "Bakery",
      price: 60,
      image: "/Image/Bakery6.jpg"
    },

    
    {
      id: 27,
      name: "Strawberry Pastry",
      category: "Bakery",
      price: 55,
      image: "/Image/Bakery5.jpeg"
    },
     

  ];


  const filteredProducts = products.filter(
    (product) =>
      product.category === activeCategory
  );


  // Add product to cart
  const addToCart = (product) => {

    setCart((previousCart) => {

      const existingProduct =
        previousCart.find(
          (item) => item.id === product.id
        );


      if (existingProduct) {

        return previousCart.map((item) =>

          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item

        );

      }


      return [
        ...previousCart,
        {
          ...product,
          quantity: 1
        }
      ];

    });


    alert(
      `${product.name} added to cart!`
    );

  };


  return (

    <div className="catalog-page">

      <div className="container py-5">


        {/* Heading */}

        <div className="text-center mb-5">

          <p className="category-text">
            OUR COLLECTION
          </p>

          <h1 className="catalog-title">
            Cake Catalog
          </h1>

          <p className="catalog-description">
            Explore our delicious collection of premium
            cakes and bakery products made for every
            special occasion.
          </p>

        </div>


        {/* Categories */}

        <div className="catalog-categories">

          {[
            "Cakes",
            "Cupcakes",
            "Bread",
            "Bakery",
            "Candies"
          ].map((category) => (

            <button
              key={category}
              className={
                activeCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>


        {/* Products */}

        <div className="row g-4 mt-4">

          {filteredProducts.map((product) => (

            <div
              className="col-md-4"
              key={product.id}
            >

              <div className="catalog-card">


                <div className="catalog-image">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                </div>


                <div className="catalog-details">

                  <p className="catalog-category">
                    {product.category.toUpperCase()}
                  </p>


                  <h3>
                    {product.name}
                  </h3>


                  <div className="catalog-rating">
                    ★★★★★
                  </div>


                  <div className="catalog-bottom">

                    <strong>
                      ${product.price}
                    </strong>


                    <button
                      className="view-product-btn"
                      onClick={() =>
                        addToCart(product)
                      }
                    >
                      Add to Cart
                    </button>

                  </div>


                  <div className="mt-3">

<Link
  to="/product"
  state={{ product: product }}
  className="view-details-link"
>
  View Product →
</Link>


                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Catalog;
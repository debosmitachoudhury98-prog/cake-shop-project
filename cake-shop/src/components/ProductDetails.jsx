
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// ==========================================
// PRODUCT INFORMATION FOR ALL 27 PRODUCTS
// ==========================================

const productInformation = {

  // ========== CAKES ==========

  1: {
    description: "An indulgent luxury chocolate cake topped with rich chocolate frosting, elegant chocolate swirls and premium chocolate pieces. Perfect for birthdays and special celebrations.",
    flavour: "Rich Chocolate",
    weight: "1 Kg",
    highlights: [
      "Premium chocolate",
      "Rich chocolate frosting",
      "Perfect for celebrations"
    ]
  },

  2: {
    description: "A beautiful chocolate celebration cake decorated with chocolate balls and smooth chocolate cream. A delicious centrepiece for every special occasion.",
    flavour: "Chocolate",
    weight: "1 Kg",
    highlights: [
      "Chocolate ball decoration",
      "Creamy chocolate layers",
      "Perfect for celebrations"
    ]
  },

  3: {
    description: "A classic Black Forest cake featuring soft chocolate sponge, fresh cream, chocolate shavings and delicious cherries.",
    flavour: "Black Forest",
    weight: "1 Kg",
    highlights: [
      "Soft chocolate sponge",
      "Fresh cream",
      "Cherry topping"
    ]
  },

  16: {
    description: "A tropical pineapple cream cake with soft sponge layers, smooth whipped cream and delicious pineapple toppings. A refreshing dessert for every occasion.",
    flavour: "Pineapple",
    weight: "1 Kg",
    highlights: [
      "Fresh pineapple flavour",
      "Soft sponge layers",
      "Delicious cream topping"
    ]
  },

  17: {
    description: "A delightful pineapple cake layered with fluffy cream and crunchy toppings. Every bite offers a refreshing combination of sweetness and texture.",
    flavour: "Pineapple Crunch",
    weight: "1 Kg",
    highlights: [
      "Pineapple cream",
      "Crunchy toppings",
      "Soft cake layers"
    ]
  },

  18: {
    description: "A rich and creamy crème brûlée cheesecake featuring a beautifully caramelized top and a smooth, velvety cheesecake centre.",
    flavour: "Crème Brûlée",
    weight: "1 Kg",
    highlights: [
      "Creamy cheesecake",
      "Caramelized topping",
      "Smooth velvety texture"
    ]
  },


  // ========== CUPCAKES ==========

  4: {
    description: "A delicious chocolate cupcake topped with rich chocolate frosting and chocolate pieces. A perfect little treat for chocolate lovers.",
    flavour: "Chocolate",
    weight: "1 Piece",
    highlights: [
      "Chocolate sponge",
      "Chocolate frosting",
      "Soft and moist"
    ]
  },

  5: {
    description: "A soft vanilla cupcake topped with smooth vanilla buttercream and colourful sprinkles. Light, sweet and delightful.",
    flavour: "Vanilla",
    weight: "1 Piece",
    highlights: [
      "Vanilla sponge",
      "Creamy frosting",
      "Colourful sprinkles"
    ]
  },

  6: {
    description: "A premium cupcake decorated with beautiful swirls of chocolate and creamy frosting. An irresistible bakery treat for dessert lovers.",
    flavour: "Chocolate Cream",
    weight: "1 Piece",
    highlights: [
      "Premium chocolate",
      "Creamy topping",
      "Rich flavour"
    ]
  },

  19: {
    description: "A midnight-inspired chocolate cupcake topped with rich chocolate truffle frosting and a beautiful cherry decoration. Perfect for chocolate lovers.",
    flavour: "Chocolate Cherry",
    weight: "1 Piece",
    highlights: [
      "Chocolate truffle frosting",
      "Cherry decoration",
      "Rich chocolate taste"
    ]
  },

  20: {
    description: "A delightful combination of chocolate and vanilla flavours topped with creamy frosting. A perfect balance of sweetness in every bite.",
    flavour: "Choco Vanilla",
    weight: "1 Piece",
    highlights: [
      "Chocolate and vanilla",
      "Creamy frosting",
      "Soft sponge"
    ]
  },

  21: {
    description: "A light and fluffy vanilla cupcake decorated with smooth white frosting and colourful sprinkles. A delightful treat for all ages.",
    flavour: "Vanilla Sprinkle",
    weight: "1 Piece",
    highlights: [
      "Vanilla sponge",
      "Smooth frosting",
      "Colourful sprinkles"
    ]
  },


  // ========== BREAD ==========

  7: {
    description: "Freshly baked bread with a soft, fluffy interior and a beautifully golden crust. Ideal for breakfast, sandwiches and everyday meals.",
    flavour: "Classic Bread",
    weight: "1 Loaf",
    highlights: [
      "Soft texture",
      "Golden crust",
      "Freshly baked"
    ]
  },

  8: {
    description: "A delicious chocolate bread loaf filled with chocolate flavour. Perfect for breakfast, tea-time snacks or satisfying sweet cravings.",
    flavour: "Chocolate",
    weight: "1 Loaf",
    highlights: [
      "Chocolate flavour",
      "Soft texture",
      "Delicious sweet treat"
    ]
  },

  9: {
    description: "Soft and delicious milk bread with a delicate milky flavour and fluffy texture. Perfect for sandwiches and breakfast.",
    flavour: "Milk Bread",
    weight: "1 Loaf",
    highlights: [
      "Milky flavour",
      "Soft and fluffy",
      "Perfect for sandwiches"
    ]
  },

  22: {
    description: "A traditional French baguette featuring a crisp golden crust and a soft, airy interior. Perfect for sandwiches and delicious snacks.",
    flavour: "Classic French",
    weight: "1 Piece",
    highlights: [
      "Crispy golden crust",
      "Soft centre",
      "Traditional French style"
    ]
  },

  23: {
    description: "A buttery and flaky croissant with delicate golden layers. Enjoy it as a breakfast favourite or a delicious afternoon snack.",
    flavour: "Buttery",
    weight: "1 Piece",
    highlights: [
      "Flaky golden layers",
      "Rich buttery taste",
      "Perfect breakfast treat"
    ]
  },

  24: {
    description: "A freshly baked bagel with a golden crust and a soft, chewy centre. A wonderful choice for breakfast and sandwiches.",
    flavour: "Classic Bagel",
    weight: "1 Piece",
    highlights: [
      "Soft and chewy",
      "Golden crust",
      "Perfect for sandwiches"
    ]
  },


  // ========== BAKERY ==========

  10: {
    description: "A beautiful fresh bakery cake decorated with smooth cream and colourful fresh fruits. A lovely dessert for birthdays and special occasions.",
    flavour: "Fresh Fruit Cream",
    weight: "1 Kg",
    highlights: [
      "Fresh fruit topping",
      "Creamy frosting",
      "Soft sponge"
    ]
  },

  11: {
    description: "A delicious cream pastry featuring delicate golden layers of pastry and a smooth, creamy filling. A classic bakery favourite.",
    flavour: "Cream",
    weight: "1 Piece",
    highlights: [
      "Flaky pastry layers",
      "Smooth cream filling",
      "Delicate texture"
    ]
  },

  12: {
    description: "A tempting chocolate pastry topped with glossy chocolate glaze and delicious chocolate cream. A perfect treat for chocolate lovers.",
    flavour: "Chocolate",
    weight: "1 Piece",
    highlights: [
      "Chocolate glaze",
      "Creamy filling",
      "Rich chocolate taste"
    ]
  },

  25: {
    description: "A refreshing pineapple pastry with soft cake layers, delicious pineapple cream and a sweet fruity topping. A delightful tropical dessert.",
    flavour: "Pineapple",
    weight: "1 Piece",
    highlights: [
      "Pineapple cream",
      "Soft sponge",
      "Refreshing fruity flavour"
    ]
  },

  26: {
    description: "A beautiful red velvet pastry with soft red velvet sponge, smooth cream frosting and a rich, delightful taste.",
    flavour: "Red Velvet",
    weight: "1 Piece",
    highlights: [
      "Red velvet sponge",
      "Cream frosting",
      "Soft texture"
    ]
  },

  27: {
    description: "A delightful strawberry pastry with soft pink sponge, creamy filling and delicious strawberry flavour. A sweet and fruity bakery treat.",
    flavour: "Strawberry",
    weight: "1 Piece",
    highlights: [
      "Strawberry sponge",
      "Creamy filling",
      "Delicious fruity flavour"
    ]
  },


  // ========== CANDIES ==========

  13: {
    description: "An assorted collection of colourful premium candies offering a delightful variety of sweet flavours. Perfect for sharing and gifting.",
    flavour: "Assorted",
    weight: "As packed",
    highlights: [
      "Colourful candy selection",
      "Variety of sweet flavours",
      "Perfect for sharing"
    ]
  },

  14: {
    description: "Soft and chewy caramel candies with a rich buttery sweetness. A delightful treat for anyone who loves smooth caramel flavour.",
    flavour: "Caramel",
    weight: "As packed",
    highlights: [
      "Rich caramel taste",
      "Soft texture",
      "Buttery sweetness"
    ]
  },

  15: {
    description: "Delicious chocolate candies with a rich chocolate coating and a smooth, satisfying centre. A perfect sweet treat for chocolate lovers.",
    flavour: "Chocolate",
    weight: "As packed",
    highlights: [
      "Chocolate coating",
      "Smooth centre",
      "Delicious chocolate taste"
    ]
  }

};


// ==========================================
// PRODUCT DETAILS COMPONENT
// ==========================================

function ProductDetails({ cart, setCart }) {

  const location = useLocation();

  // Get selected product from Catalog.jsx

  const product = location.state?.product;

  // Quantity state

  const [quantity, setQuantity] = useState(1);

  // Reset quantity when product changes

  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);


  // Handle missing product

  if (!product) {

    return (

      <div className="product-page">

        <div className="container py-5 text-center">

          <h2>No Product Selected</h2>

          <p>
            Please select a product from our catalog.
          </p>

          <Link
            to="/catalog"
            className="cart-btn"
          >
            Back to Catalog
          </Link>

        </div>

      </div>

    );

  }


  // Get individual product information

  const details = productInformation[product.id];


  // Increase quantity

  const increaseQuantity = () => {

    setQuantity((previousQuantity) =>
      previousQuantity + 1
    );

  };


  // Decrease quantity

  const decreaseQuantity = () => {

    setQuantity((previousQuantity) =>
      previousQuantity > 1
        ? previousQuantity - 1
        : 1
    );

  };


  // Add product to cart

  const addToCart = () => {

    setCart((previousCart) => {

      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );


      if (existingProduct) {

        return previousCart.map((item) =>

          item.id === product.id

            ? {
                ...item,
                quantity: item.quantity + quantity
              }

            : item

        );

      }


      return [

        ...previousCart,

        {
          ...product,
          quantity: quantity
        }

      ];

    });


    alert(`${product.name} added to cart!`);

  };


  // Calculate total price

  const totalPrice = product.price * quantity;


  // ==========================================
  // PRODUCT DETAILS PAGE DESIGN
  // ==========================================

  return (

    <div className="product-page">

      <div className="container py-5">


        {/* Back to Catalog */}

        <div className="mb-4">

          <Link
            to="/catalog"
            className="view-details-link"
          >
            ← Back to Catalog
          </Link>

        </div>


        <div className="row align-items-center">


          {/* PRODUCT IMAGE */}

          <div className="col-md-6 text-center mb-4 mb-md-0">

            <div className="product-image-box">

              <img
                className="product-main-image"
                src={product.image}
                alt={product.name}
              />

            </div>

          </div>


          {/* PRODUCT INFORMATION */}

          <div className="col-md-6">


            {/* Category */}

            <p className="category-text">

              {product.category.toUpperCase()}

            </p>


            {/* Product Name */}

            <h1 className="product-title">

              {product.name}

            </h1>


            {/* Rating */}

            <div className="rating">

              ★★★★★

              <span> (5.0)</span>

            </div>


            {/* Product Price */}

            <h2 className="product-price">

              ${product.price}

            </h2>


            {/* Product Description */}

            <p className="product-description">

              {details?.description ||
                "A delicious bakery product made with quality ingredients."}

            </p>


            <hr />


            {/* Product Information */}

            <div className="product-info">


              <p>

                <strong>Product ID:</strong>{" "}

                {product.id}

              </p>


              <p>

                <strong>Category:</strong>{" "}

                {product.category}

              </p>


              <p>

                <strong>Weight / Size:</strong>{" "}

                {details?.weight || "As packed"}

              </p>


              <p>

                <strong>Flavour:</strong>{" "}

                {details?.flavour || "Special"}

              </p>


              <p>

                <strong>Availability:</strong>{" "}

                <span className="available">

                  In Stock

                </span>

              </p>


            </div>


            <hr />


            {/* PRODUCT HIGHLIGHTS */}

            <div className="product-highlights">

              <h4>
                Product Highlights
              </h4>


              <ul>

                {(details?.highlights || [
                  "Quality ingredients",
                  "Delicious taste"
                ]).map((highlight, index) => (

                  <li key={index}>

                    {highlight}

                  </li>

                ))}

              </ul>

            </div>


            <hr />


            {/* QUANTITY SECTION */}

            <div className="quantity-section">

              <strong>
                Quantity:
              </strong>


              <button
                className="quantity-btn"
                onClick={decreaseQuantity}
              >

                −

              </button>


              <span className="quantity-number">

                {quantity}

              </span>


              <button
                className="quantity-btn"
                onClick={increaseQuantity}
              >

                +

              </button>

            </div>


            {/* TOTAL PRICE */}

            <h4 className="mt-3">

              Total Price: ${totalPrice}

            </h4>


            {/* ACTION BUTTONS */}

            <div className="mt-4">


              <button
                className="cart-btn"
                onClick={addToCart}
              >

                Add to Cart

              </button>


              <Link
                to="/cart"
                className="wishlist-btn"
              >

                View Cart

              </Link>


            </div>


          </div>


        </div>


      </div>

    </div>

  );

}

export default ProductDetails;

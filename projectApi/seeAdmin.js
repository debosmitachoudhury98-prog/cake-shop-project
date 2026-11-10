require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/productModel");

const products = [
  // CAKES
  {
    id: 1,
    name: "Luxury Chocolate Cake",
    category: "Cakes",
    price: 125,
    image: "/Image/Cake1.jpeg",
    //description: "An indulgent luxury chocolate cake topped with rich chocolate frosting, elegant chocolate swirls and premium chocolate pieces. Perfect for birthdays and special celebrations."
  },
  {
    id: 2,
    name: "Chocolate Celebration Cake",
    category: "Cakes",
    price: 145,
    image: "/Image/Cake2.jpeg",
    //description: "A beautiful chocolate celebration cake decorated with chocolate balls and smooth chocolate cream. A delicious centrepiece for every special occasion."
  },
  {
    id: 3,
    name: "Premium Black Forest Cake",
    category: "Cakes",
    price: 135,
    image: "/Image/Cake3.jpeg",
    //description: "A classic Black Forest cake featuring soft chocolate sponge, fresh cream, chocolate shavings and delicious cherries."
  },
  {
    id: 16,
    name: "Tropical Pineapple Cream Cake",
    category: "Cakes",
    price: 145,
    image: "/Image/Pinecake3.png",
    //description: "A soft and fluffy pineapple cake layered with rich cream and generously topped with fresh pineapple chunks, offering a burst of tropical sweetness in every bite."
  },
  {
    id: 17,
    name: "Pineapple Crunch Delight",
    category: "Cakes",
    price: 120,
    image: "/Image/Pinecake2.webp",
    //description: "A delicious combination of soft sponge, fluffy whipped cream, juicy pineapple pieces, and crunchy golden crumbs for a perfect tropical indulgence."
  },
  {
    id: 18,
    name: "Classic Crème Brûlée Cheesecake",
    category: "Cakes",
    price: 160,
    image: "/Image/Cheesecake1.jpeg",
    //description: "A rich and creamy cheesecake topped with a perfectly caramelized golden sugar crust and garnished with fresh berries. A delightful blend of smooth, velvety texture and irresistible caramel sweetness!"
  },
  // CUPCAKES
  {
    id: 4,
    name: "Chocolate Cupcake",
    category: "Cupcakes",
    price: 45,
    image: "/Image/Cup1.jpeg",
    //description: "A delicious chocolate cupcake topped with rich chocolate frosting and chocolate pieces. A perfect little treat for chocolate lovers."
  },
  {
    id: 5,
    name: "Vanilla Cupcake",
    category: "Cupcakes",
    price: 40,
    image: "/Image/Cup2.jpeg",
    //description: "A soft vanilla cupcake topped with smooth vanilla buttercream and colourful sprinkles. Light, sweet and delightful."
  },
  {
    id: 6,
    name: "Premium Cupcake",
    category: "Cupcakes",
    price: 50,
    image: "/Image/Cup3.jpeg",
   // description: "A premium cupcake decorated with beautiful swirls of chocolate and creamy frosting. An irresistible bakery treat for dessert lovers."
  },
  {
    id: 19,
    name: "Midnight Cherry Truffle",
    category: "Cupcakes",
    price: 55,
    image: "/Image/cup4.jpeg",
   // description: "A rich chocolate cupcake topped with smooth chocolate truffle frosting and a delicious cherry. A delightful treat for chocolate lovers."
  },
  {
    id: 20,
    name: "Choco Vanilla Cloud",
    category: "Cupcakes",
    price: 100,
    image: "/Image/Cup5.jpeg",
   // description: "A delightful cupcake combining soft chocolate and vanilla flavours with creamy frosting. Every bite is light, fluffy and delicious."
  },
  {
    id: 21,
    name: "Vanilla Sprinkle Dream",
    category: "Cupcakes",
    price: 65,
    image: "/Image/Cup6.jpeg",
    //description: "A fluffy vanilla cupcake topped with creamy frosting and colourful sprinkles. A sweet and cheerful treat for every occasion."
  },

  // BREAD
  {
    id: 7,
    name: "Fresh Bread",
    category: "Bread",
    price: 35,
    image: "/Image/Bread1.jpeg",
   // description: "Freshly baked bread with a soft, fluffy interior and a beautifully golden crust. Ideal for breakfast, sandwiches and everyday meals."
  },
  {
    id: 8,
    name: "Chocolate Bread",
    category: "Bread",
    price: 50,
    image: "/Image/Bread2.jpeg",
   // description: "A delicious chocolate bread loaf filled with chocolate flavour. Perfect for breakfast, tea-time snacks or satisfying sweet cravings."
  },
  {
    id: 9,
    name: "Milk Bread",
    category: "Bread",
    price: 40,
    image: "/Image/Bread3.jpeg",
   // description: "Soft and delicious milk bread with a delicate milky flavour and fluffy texture. Perfect for sandwiches and breakfast."
  },
  {
    id: 22,
    name: "Baguette",
    category: "Bread",
    price: 55,
    image: "/Image/Bread4.jpeg",
    //description: "A classic French baguette with a crisp golden crust and a soft, airy centre. Perfect for sandwiches or serving alongside your favourite meals."
  },
  {
    id: 23,
    name: "Croissant",
    category: "Bread",
    price: 65,
    image: "/Image/Bread5.jpeg",
   // description: "A buttery, flaky croissant with delicate golden layers and a soft, airy centre. A perfect companion for your morning coffee."
  },
  {
    id: 24,
    name: "Bagel",
    category: "Bread",
    price: 45,
    image: "/Image/Bread6.jpeg",
   // description: "A freshly baked bagel with a lightly crisp exterior and a soft, chewy centre. Delicious for breakfast or a satisfying sandwich."
  },

  // BAKERY
  {
    id: 10,
    name: "Fresh Bakery Cake",
    category: "Bakery",
    price: 110,
    image: "/Image/Bakery1.jpeg",
   // description: "A beautiful fresh bakery cake decorated with smooth cream and colourful fresh fruits. A lovely dessert for birthdays and special occasions."
  },
  {
    id: 11,
    name: "Cream Pastry",
    category: "Bakery",
    price: 55,
    image: "/Image/Bakery2.jpeg",
   // description: "A delicious cream pastry featuring delicate golden layers of pastry and a smooth, creamy filling. A classic bakery favourite."
  },
  {
    id: 12,
    name: "Chocolate Pastry",
    category: "Bakery",
    price: 65,
    image: "/Image/Bakery3.jpeg",
   // description: "A tempting chocolate pastry topped with glossy chocolate glaze and delicious chocolate cream. A perfect treat for chocolate lovers."
  },
  {
    id: 25,
    name: "Pineapple Pastry",
    category: "Bakery",
    price: 58,
    image: "/Image/Bakery4.jpeg",
   // description: "A soft and fluffy pastry layered with fresh pineapple flavour and smooth cream. A refreshing tropical treat for dessert lovers."
  },
  {
    id: 27,
    name: "Strawberry Pastry",
    category: "Bakery",
    price: 55,
    image: "/Image/Bakery5.jpeg",
  //  description: "A light and fluffy pastry filled with delicious strawberry flavour and creamy layers. A lovely sweet treat for every occasion."
  },
  {
    id: 26,
    name: "Red Velvet Pastry",
    category: "Bakery",
    price: 60,
    image: "/Image/Bakery6.jpg",
    //description: "A soft red velvet pastry layered with smooth cream cheese-style frosting. A beautiful and delicious treat with a rich flavour."
  },

  // CANDIES
  {
    id: 13,
    name: "Premium Candies",
    category: "Candies",
    price: 40,
    image: "/Image/Candy1.jpeg",
   // description: "A delightful selection of premium sweet candies, offering delicious flavours and a satisfying little treat for every sweet lover."
  },
  {
    id: 14,
    name: "Caramel Candies",
    category: "Candies",
    price: 35,
    image: "/Image/Candy 2.jpeg",
   // description: "Smooth and delicious caramel candies with a rich buttery sweetness. Perfect for enjoying anytime you crave something sweet."
  },
  {
    id: 15,
    name: "Chocolate Candies",
    category: "Candies",
    price: 30,
    image: "/Image/Candy3.jpeg",
  //  description: "Delicious chocolate candies packed with rich chocolate flavour. A small and sweet treat for chocolate lovers of all ages."
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.mongodb+srv://debosmitachoudhury98_db_user:JHRG3aMVbLkQMZhC@cluster0.2elheeb.mongodb.net/cake-shop 
      );
    console.log("MongoDB connected!");

    for (const product of products) {
      await Product.updateOne(
        { name: product.name },
        {
          $set: {
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            description: product.description
          }
        },
        { upsert: true }
      );
    }

    console.log("All 27 products seeded successfully!");
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();

import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="home-page">


      {/* Hero Section */}

      <section className="home-hero">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-md-6">

              <p className="hero-small-title">
                WELCOME TO BCA CAKE WALA
              </p>


              <h1 className="hero-title">
                Crafted With
                <br />
                Passion & Sweetness
              </h1>


              <p className="hero-description">
                Discover premium cakes, cupcakes,
                pastries and bakery delights made
                specially for your memorable moments.
              </p>


              <div className="hero-buttons">

                <Link
                  to="/catalog"
                  className="hero-btn"
                >
                  Explore Catalog
                </Link>


                <Link
                  to="/about"
                  className="hero-outline-btn"
                >
                  About Us
                </Link>

              </div>

            </div>


            <div className="col-md-6">

              <div className="home-cake-image">

                <img
                  src="/Image/Cake1.jpeg"
                  alt="Luxury Chocolate Cake"
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Features */}

      <section className="home-features">

        <div className="container">

          <div className="row g-4">


            <div className="col-md-4">

              <div className="feature-card">

                <div className="feature-icon">
                  ♡
                </div>

                <h3>
                  Premium Quality
                </h3>

                <p>
                  We use quality ingredients to
                  create delicious products.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="feature-card">

                <div className="feature-icon">
                  ★
                </div>

                <h3>
                  Freshly Made
                </h3>

                <p>
                  Every product is prepared with
                  freshness and care.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="feature-card">

                <div className="feature-icon">
                  ✓
                </div>

                <h3>
                  Special Moments
                </h3>

                <p>
                  Perfect treats for birthdays,
                  celebrations and special occasions.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Collection */}

      <section className="home-collection">

        <div className="container text-center">

          <p className="category-text">
            OUR SPECIAL COLLECTION
          </p>


          <h2 className="home-section-title">
            Something Sweet For Everyone
          </h2>


          <p className="home-section-description">
            From rich chocolate cakes to delicious
            cupcakes and pastries, explore our
            collection.
          </p>


          <Link
            to="/catalog"
            className="cart-btn"
          >
            View All Products
          </Link>

        </div>

      </section>


    </div>

  );
}

export default Home;
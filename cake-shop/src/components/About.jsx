
import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {

  return (

    <div className="about-page">

      {/* HERO SECTION */}

      <section className="about-hero">

        <div className="about-image">

          <img
            src="/Image/AboutMac.jpeg"
            alt="Beautiful pink macarons"
          />

        </div>

        <div className="about-intro">

          <span className="about-label">
            Our Journey
          </span>

          <h1>
            WHERE TRADITION MEETS
            <br />
            EXTRAORDINARY
          </h1>

          <p>
            Discover our passion for creating beautiful
            and delicious confectionery for every
            special moment.
          </p>

          <Link to="/catalog" className="about-button">
            DISCOVER THE CRAFT →
          </Link>

        </div>

      </section>


      {/* CONFECTIONS SECTION */}

      <section className="about-section">

        <div className="about-photo">

          <img
            src="/Image/AboutCake.jpeg"
            alt="Delicious chocolate cake"
          />

        </div>

        <div className="about-text">

          <span className="about-label">
            Made With Love
          </span>

          <h2>
            The Confections We Perfect
          </h2>

          <p>
            At BCA Cake Wala, we believe every celebration
            deserves something special. Our cakes and desserts
            are carefully prepared using quality ingredients,
            creative designs and lots of love.
          </p>

          <p>
            From elegant celebration cakes to delicious
            cupcakes and macarons, we create sweet moments
            that are made to be remembered.
          </p>

          <Link to="/catalog" className="about-text-link">
            EXPLORE OUR COLLECTION →
          </Link>

        </div>

      </section>


      {/* CURATION SECTION */}

      <section className="curation-section">

        <div className="curation-text">

          <span className="about-label">
            Our Craftsmanship
          </span>

          <h2>
            Curation & Celebration
          </h2>

          <p>
            Our focus is on high-quality ingredients,
            beautiful presentation and creating memorable
            confectionery for every occasion.
          </p>

          <h3>
            Our Specialties
          </h3>

          <ul>

            <li>Signature Dripping Cakes</li>

            <li>Macaron Duos</li>

            <li>Custom-Tiered Cakes</li>

            <li>Exquisite Berry-Topped Confections</li>

          </ul>

        </div>

        <div className="curation-image">

          <img
            src="/Image/AboutCup.jpeg"
            alt="Beautiful strawberry cupcake"
          />

        </div>

      </section>


      {/* VISION SECTION */}

      <section className="vision-section">

        <span className="about-label">
          Our Philosophy
        </span>

        <h2>
          The Vision
        </h2>

        <p>
          Our vision is to combine creativity, quality and
          craftsmanship to create beautiful cakes and
          desserts for birthdays, weddings, anniversaries
          and every milestone celebration.
        </p>

        <div className="vision-divider"></div>

        <h3>
          Every Creation Tells A Sweet Story.
        </h3>

      </section>


      {/* FOOTER */}

      <footer className="about-footer">

        <div className="about-social">

          <span>◎</span>

          <span>♥</span>

          <span>Ⓟ</span>

        </div>

        <p>
          Join our mailing list to experience the
          BCA Cake Wala artistry.
        </p>

      </footer>

    </div>

  );

}

export default About;

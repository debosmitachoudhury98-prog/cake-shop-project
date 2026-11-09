import React from 'react'
import './Menu.css'

function Menu() {

  const cakes = [
    { name: 'Black Forest Cake', price: '15.00' },
    { name: 'Cheese Cake', price: '17.00' },
    { name: 'Rainbow Cake', price: '16.00' },
    { name: 'Red Velvet Cake', price: '15.00' }
  ]

  const cupcakes = [
    { name: 'Chocolate Lava', price: '4.00' },
    { name: 'Strawberry Cupcake', price: '5.00' },
    { name: 'Vanilla Cupcake', price: '4.50' },
    { name: 'Matcha Cupcake', price: '4.00' }
  ]

  const donuts = [
    { name: 'Chocolate Sprinkle', price: '6.00' },
    { name: 'Glazed Donut', price: '4.00' },
    { name: 'Strawberry Jelly Donut', price: '5.00' },
    { name: 'Tiramisu Donut', price: '4.50' }
  ]

  const MenuSection = ({ title, items }) => (
    <div className="menu-section">
      <h2>{title} :</h2>

      {items.map((item, index) => (
        <div className="menu-item" key={index}>

          <div className="item-name">
            <span>•</span>
            {item.name}
          </div>

          <div className="dots"></div>

          <div className="price">
            $ {item.price}
          </div>

        </div>
      ))}
    </div>
  )

  return (
    <div className="menu-page">

      <div className="menu-card">

        {/* LEFT SIDE */}
        <div className="left-side">

          <div className="quality quality-top">
            <div className="star">★</div>
            <div>PREMIUM</div>
            <div className="fruit">🍓</div>
            <div>QUALITY</div>
            <div className="star">★</div>
          </div>

          <div className="vertical-line"></div>

          <div className="food-images">

            <div className="food-box">
              <div className="food-image cake">
                🎂
              </div>
            </div>

            <div className="food-box">
              <div className="food-image cupcake">
                🧁
              </div>
            </div>

            <div className="food-box">
              <div className="food-image donut">
                🍩
              </div>
            </div>

          </div>

          <div className="vertical-line bottom-line"></div>

          <div className="quality quality-bottom">
            <div className="star">★</div>
            <div>PREMIUM</div>
            <div className="fruit">🍓</div>
            <div>QUALITY</div>
            <div className="star">★</div>
          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="right-side">

          {/* TOP DECORATION */}
          <div className="macarons">
            <span className="macaron purple">●</span>
            <span className="macaron brown">●</span>
          </div>


          {/* HEADER */}
          <div className="heading">

            <h1>MENU</h1>

            <h3>Bakery and Cake</h3>

          </div>


          {/* MENU LIST */}
          <MenuSection
            title="Cakes"
            items={cakes}
          />

          <MenuSection
            title="Cupcakes"
            items={cupcakes}
          />

          <MenuSection
            title="Donuts"
            items={donuts}
          />

          <div className="bottom-decoration"></div>

        </div>

      </div>

    </div>
  )
}

export default Menu
import React, { useState } from 'react'


function Account() {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="account-page">

      <div className="account-container">

        {/* ACCOUNT HEADING */}

        <div className="account-heading">

          <div className="user-icon">
            👤
          </div>

          <div>
            <h1>Your Account</h1>

            <p>
              Manage your account details and get in touch with us.
            </p>
          </div>

        </div>


        {/* FORM */}

        <form>

          <div className="row">

            {/* USER NAME */}

            <div className="col-md-6 form-group">

              <label>User Name</label>

              <div className="input-box">

                <span>👤</span>

                <input
                  type="text"
                  placeholder="Enter your user name"
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="col-md-6 form-group">

              <label>Email Address</label>

              <div className="input-box">

                <span>✉</span>

                <input
                  type="email"
                  placeholder="Enter your email address"
                />

              </div>

            </div>


            {/* FULL NAME */}

            <div className="col-md-6 form-group">

              <label>Full Name</label>

              <div className="input-box">

                <span>👤</span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                />

              </div>

            </div>


            {/* DATE OF BIRTH */}

            <div className="col-md-6 form-group">

              <label>Date of Birth (DOB)</label>

              <div className="input-box">

                <span>📅</span>

                <input
                  type="date"
                />

              </div>

            </div>


            {/* PHONE */}

            <div className="col-12 form-group">

              <label>Phone number</label>

              <div className="input-box">

                <span>📞</span>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="col-12 form-group">

              <label>Password</label>

              <div className="input-box">

                <span>🔒</span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  👁
                </button>

              </div>

            </div>

          </div>


          {/* BUTTONS */}

          <div className="account-buttons">

            <button
              type="button"
              className="delete-btn"
            >
              🗑 Delete Account
            </button>


            <button
              type="button"
              className="update-btn"
            >
              ⟳ Update Account
            </button>


            <button
              type="submit"
              className="submit-btn"
            >
              ➤ Submit
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default Account
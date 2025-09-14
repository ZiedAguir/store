function Messages() {
    return (
        
       <div>
        <h4 className="mb-3 mt-4 pt-2 font-weight-semibold text-dark">
                Messages
              </h4>
              <ul className="simple-user-list mb-3">
                <li>
                  <figure className="image rounded">
                    <img
                      src="img/landing/ahmed.jpeg"
                      width={40}
                      height={40}
                      alt="ahmed"
                      className="rounded-circle"
                    />
                  </figure>
                  <span className="title">ahmed</span>
                  <span className="message">
                    I have a gift for you kimo..!!
                  </span>
                </li>
                <li>
                  <figure className="image rounded">
                    <img
                      src="img/landing/amal.jpeg"
                      width={40}
                      height={40}
                      alt="amal"
                      className="rounded-circle"
                    />
                  </figure>
                  <span className="title">amal</span>
                  <span className="message">
                    I will be happy whene I sell with your Store..!
                  </span>
                </li>
                <li>
                  <figure className="image rounded">
                    <img
                      src="img/landing/amira.jpeg"
                      width={40}
                      height={40}
                      alt="amira"
                      className="rounded-circle"
                    />
                  </figure>
                  <span className="title">amira </span>
                  <span className="message">
                    kenan I have probleme whene I sell product..!!
                  </span>
                </li>
                <li>
                  <figure className="image rounded">
                    <img
                      src="img/landing/omar.jpeg"
                      width={40}
                      height={40}
                      alt="omar"
                      className="rounded-circle"
                    />
                  </figure>
                  <span className="title">Omar</span>
                  <span className="message">
                    kimo do you have a coupons for your products
                  </span>
                </li>
              </ul>
       </div>
    );
  }
  
  export default Messages;
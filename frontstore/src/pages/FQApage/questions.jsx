import { useState } from "react";

function Questions() {
  const [SelectedAnswer, SetSelectedAnswer] = useState("");
  const handleSelectChange = (e) => {
    SetSelectedAnswer(e.target.value);
  };

  return (
    <div className="container-fluid about bg-light py-5">
      <div className="container py-5">
        <div>
          <p>
            You want to <span className="text-primary">Outsource</span> and
            collaborate with <span className="text-primary">Astra_Store</span>.
            If you have any questions, you can already find answers on this{" "}
            <span className="text-primary">FAQ page</span> . We answer
            frequently asked questions by our customers and partners. If you
            have more specific questions,{" "}
            <a
              href="/contactPage"
              className=" btn text-primary  text-white ml-2 "
            >
              Contact Us
            </a>{" "}
            .
          </p>
        </div>
        <div className="row g-5 align-items-center">
          <div className="col-lg-5 wow ">
            <div className="about-img pb-5 ps-5">
              <img
                src="img/fqa2.png"
                className="img-fluid rounded w-100"
                style={{ objectFit: "cover" }}
                alt="Image"
              />
              <div className="about-img-inner">
                <img
                  src="img/fqa.png"
                  className="img-fluid rounded-circle w-100 h-100"
                  alt="Image"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-7 wow fadeInRight" data-wow-delay="0.4s">
            <div className="section-title text-start mb-5">
              <h4 className="sub-title pe-3 mb-0">Question</h4>
              <h1 className="display-3 mb-4">Content Writing</h1>
              <p className="mb-4"></p>
              <div>
                <div className="mb-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                  >
                    <option selected>
                      What is this Astra store platform, and who is it for?
                    </option>
                    <option value="Our e-commerce platform allows entrepreneurs, SMEs, and creators to easily build showcase sites to sell their products online. It’s designed for those who want an intuitive and flexible solution without needing advanced technical skills.">
                      What is this Astra store platform, and who is it for?
                    </option>
                  </select>

                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                  >
                    <option selected>
                      How can I create my showcase site on the platform?
                    </option>
                    <option value="Simply create an account and follow the easy steps to choose a template, customize the look, and add your products. Creating a site takes just a few minutes.">
                      How can I create my showcase site on the platform?
                    </option>
                  </select>

                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                  >
                    <option selected>
                      Can I manage multiple showcase sites with one account?
                    </option>
                    <option value="Yes, our platform allows you to create and manage multiple showcase sites under one account. This lets you diversify your activities and sell different products on separate sites if needed.">
                      Can I manage multiple showcase sites with one account?
                    </option>
                  </select>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                  >
                    <option selected>
                      What customization options are available?
                    </option>
                    <option value="You can personalize your site's appearance by choosing from different templates, adjusting colors, fonts, and page layouts. You can also upload your own images, logos, and banners.">
                      What customization options are available?
                    </option>
                  </select>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                  >
                    <option selected>
                      What types of products can I sell on the platform?
                    </option>
                    <option value="You can sell a wide variety of products, including physical goods, digital products, or services. The platform also supports stock management and product variations.">
                      What types of products can I sell on the platform?
                    </option>
                  </select>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                  >
                    <option selected>How are payments handled?</option>
                    <option value="We offer integration with several secure payment gateways, allowing you to accept credit card payments, PayPal, and other popular payment methods. Payments are deposited directly into your bank account.">
                      How are payments handled?{" "}
                    </option>
                  </select>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                  >
                    <option selected>
                      Can I track orders and manage deliveries?
                    </option>
                    <option value="Yes, a dedicated dashboard allows you to track orders in real time, manage shipments, and provide delivery updates to your customers.">
                      Can I track orders and manage deliveries?
                    </option>
                  </select>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                  >
                    <option selected>Is the platform mobile-friendly?</option>
                    <option value="Absolutely. All showcase sites created on our platform are fully responsive and adapt to all devices, whether desktops, tablets, or smartphones.">
                      Is the platform mobile-friendly?
                    </option>
                  </select>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                  >
                    <option selected>
                      Can I try the platform before committing?
                    </option>
                    <option value="Yes, we offer a free trial period so you can test all the features before subscribing.">
                      Can I try the platform before committing?
                    </option>
                  </select>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                  >
                    <option selected>
                      Do you offer technical support if I have questions or
                      issues?
                    </option>
                    <option value="Yes, we offer technical support available via chat, email, and phone to help you solve any issues or answer your questions.">
                      Do you offer technical support if I have questions or
                      issues?
                    </option>
                  </select>
                </div>

                {/* Affichage de la réponse sélectionnée */}
                {SelectedAnswer && (
                  <div
                    className="answer-box"
                    style={{
                      border: "3px solid #2397ec",
                      padding: "1rem",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {SelectedAnswer}
                  </div>
                )}
              </div>

              <a
                href="#"
                className="btn btn-primary rounded-pill text-white py-3 px-5"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;

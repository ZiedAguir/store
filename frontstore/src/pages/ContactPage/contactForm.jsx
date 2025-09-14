
function ContactForm() {
  return (
    <form>
            <div className="row g-3">
              <div className="col-lg-12 col-xl-6">
                <div className="form-floating">
                  <input type="text" className="form-control bg-transparent border border-white" id="name" placeholder="Your Name" />
                  <label htmlFor="name">Your Name</label>
                </div>
              </div>
              <div className="col-lg-12 col-xl-6">
                <div className="form-floating">
                  <input type="email" className="form-control bg-transparent border border-white" id="email" placeholder="Your Email" />
                  <label htmlFor="email">Your Email</label>
                </div>
              </div>
              <div className="col-lg-12 col-xl-6">
                <div className="form-floating">
                  <input type="phone" className="form-control bg-transparent border border-white" id="phone" placeholder="Phone" />
                  <label htmlFor="phone">Your Phone</label>
                </div>
              </div>
              <div className="col-lg-12 col-xl-6">
                <div className="form-floating">
                  <input type="text" className="form-control bg-transparent border border-white" id="project" placeholder="Project" />
                  <label htmlFor="project">Your Project</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <input type="text" className="form-control bg-transparent border border-white" id="subject" placeholder="Subject" />
                  <label htmlFor="subject">Subject</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <textarea className="form-control bg-transparent border border-white" placeholder="Leave a message here" id="message" style={{height: 160}} defaultValue={""} />
                  <label htmlFor="message">Message</label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-light text-primary w-100 py-3">Send Message</button>
              </div>
            </div>
          </form>
  )
}

export default ContactForm;
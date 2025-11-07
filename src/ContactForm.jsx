import React, { useState } from "react"

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const { name, email, phone, message } = formData

    if (!name || !email || !phone || !message) {
      setError("All fields are required")
      return
    }

    if (!validateEmail(email)) {
      setError("Invalid email address")
      return
    }

    try {
      const res = await fetch("https://vernanbackend.ezlab.in/api/contact-us/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.status === 200) {
        setSuccess("Form Submitted")
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        setError("Submission failed, please try again.")
      }
    } catch (err) {
      setError("Error connecting to server.")
    }
  }

  return (
    <div className="form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  )
}

export default ContactForm

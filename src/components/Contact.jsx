import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import imghero from "/imghero.png"

const SERVICE_ID  = "service_t0rp79o"
const TEMPLATE_ID = "template_lx5c7hj"
const PUBLIC_KEY  = "NhPyLYFQHgAS6IR6o"

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState("idle") // idle | sending | success | error

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus("sending")

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus("success")
        formRef.current.reset()
      })
      .catch(() => setStatus("error"))
  }

  return (
    <section
      id="contact"
      data-aos="fade-up"
      data-aos-delay="300"
      className="min-h-screen overflow-hidden justify-center flex items-center p-6 mt-10 relative"
    >
      <article className="shadow-lg rounded-lg flex flex-col md:flex-row max-w-4xl w-full relative">
        <aside className="w-full md:w-1/2 flex items-center justify-center py-4 md:py-0">
          <div className="relative w-[300px] sm:w-[480px] h-[250px] sm:h-[400px] md:h-[485px]">
            <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px]
                sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-gradient-to-r from-[#6d2897] via-[#8e6cf5]
                to-[#bb61c5] shadow-[0_0_70px_rgba(182,0,182,0.7)]" />
            <img
              src={imghero}
              alt="Contact illustration"
              className="w-full h-full object-cover rounded-t-lg md:rounded-r-lg relative z-10"
            />
          </div>
        </aside>

        <section className="p-8 w-full md:w-1/2">
          <header className="mb-6">
            <h2 className="text-4xl font-bold text-center text-white">Contact Me</h2>
          </header>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="from_name" className="block text-gray-300 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="from_name"
                id="from_name"
                placeholder="Your name"
                required
                className="w-full px-4 py-2 text-white bg-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-700"
              />
            </div>

            <div>
              <label htmlFor="from_email" className="block text-gray-300 font-medium mb-2">
                Email
              </label>
              <input
                type="from_email"
                name="from_email"
                id="from_email"
                placeholder="Your email"
                required
                className="w-full px-4 py-2 text-white bg-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-700"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-300 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                placeholder="Your message"
                required
                className="w-full px-4 py-2 text-white bg-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-700 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full text-white border-2 border-purple-700 py-2 px-6 hover:bg-purple-800
                hover:shadow-[0_0_40px_rgba(128,0,128,0.7)] rounded-full text-lg transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-center font-mono text-sm text-green-400">
                ✓ Message sent — I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-center font-mono text-sm text-red-400">
                Something went wrong. Try again or email me directly.
              </p>
            )}
          </form>
        </section>
      </article>
    </section>
  )
}

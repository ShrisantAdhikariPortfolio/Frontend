
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section className="min-h-screen py-20 px-6 md:px-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Let's <span className="text-purple-600 dark:text-purple-400">Create</span> Something Together
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Got an idea? A project? Or just want to say hi?  
            I'm listening — drop me a message ✨
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2 space-y-10">
            <div className="space-y-8">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  text: "hello@yourname.dev",
                  href: "mailto:hello@yourname.dev",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  text: "+977 98X-XXX-XXXX",
                  href: "tel:+97798XXXXXXX",
                },
                {
                  icon: MapPin,
                  title: "Location",
                  text: "Kathmandu, Nepal",
                  href: "#",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="group flex items-center gap-5 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  <div className="
                    w-14 h-14 rounded-2xl 
                    bg-gray-100 dark:bg-gray-900 
                    border border-gray-200 dark:border-gray-800 
                    flex items-center justify-center 
                    group-hover:border-purple-400 dark:group-hover:border-purple-500/50 
                    transition-all duration-300
                  ">
                    <item.icon size={24} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-0.5">{item.title}</p>
                    <p className="font-medium">{item.text}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
              <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed">
                Currently open for freelance work and interesting full-time opportunities<br />
                (React • Next.js • TypeScript • UI/UX)
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <form className="
              space-y-6 
              bg-white dark:bg-gray-900/60 
              backdrop-blur-sm 
              p-8 md:p-10 
              border border-gray-200 dark:border-gray-800 
              shadow-xl dark:shadow-2xl 
              shadow-gray-100/70 dark:shadow-purple-950/30
            ">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-gray-600 dark:text-gray-400 block font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="
                      w-full px-5 py-3.5 
                      bg-gray-50 dark:bg-gray-950 
                      border border-gray-300 dark:border-gray-800 
                      rounded-xl 
                      text-gray-900 dark:text-gray-100 
                      placeholder-gray-500 dark:placeholder-gray-600 
                      focus:outline-none 
                      focus:border-purple-500 
                      focus:ring-2 focus:ring-purple-500/20 
                      transition-all duration-300
                    "
                    placeholder="Alex Rivera"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-gray-600 dark:text-gray-400 block font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="
                      w-full px-5 py-3.5 
                      bg-gray-50 dark:bg-gray-950 
                      border border-gray-300 dark:border-gray-800 
                      rounded-xl 
                      text-gray-900 dark:text-gray-100 
                      placeholder-gray-500 dark:placeholder-gray-600 
                      focus:outline-none 
                      focus:border-purple-500 
                      focus:ring-2 focus:ring-purple-500/20 
                      transition-all duration-300
                    "
                    placeholder="alex@portfolio.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm text-gray-600 dark:text-gray-400 block font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="
                    w-full px-5 py-3.5 
                    bg-gray-50 dark:bg-gray-950 
                    border border-gray-300 dark:border-gray-800 
                    rounded-xl 
                    text-gray-900 dark:text-gray-100 
                    placeholder-gray-500 dark:placeholder-gray-600 
                    focus:outline-none 
                    focus:border-purple-500 
                    focus:ring-2 focus:ring-purple-500/20 
                    transition-all duration-300
                  "
                  placeholder="Collaboration / Job / Just saying hi"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-gray-600 dark:text-gray-400 block font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  className="
                    w-full px-5 py-3.5 
                    bg-gray-50 dark:bg-gray-950 
                    border border-gray-300 dark:border-gray-800 
                    rounded-xl 
                    text-gray-900 dark:text-gray-100 
                    placeholder-gray-500 dark:placeholder-gray-600 
                    resize-none
                    focus:outline-none 
                    focus:border-purple-500 
                    focus:ring-2 focus:ring-purple-500/20 
                    transition-all duration-300
                  "
                  placeholder="Hey! I really liked your last project..."
                />
              </div>

              <button
                type="submit"
                className="
                  w-full md:w-auto px-10 py-4 
                  bg-purple-600 hover:bg-purple-700 
                  dark:bg-purple-600 dark:hover:bg-purple-500 
                  text-white font-medium 
                  rounded-xl flex items-center justify-center gap-3 
                  transition-all duration-300 
                  shadow-lg shadow-purple-200/30 dark:shadow-purple-900/30
                  hover:shadow-purple-300/50 dark:hover:shadow-purple-700/40 
                  hover:-translate-y-0.5 active:translate-y-0
                  focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 
                  focus:ring-offset-white dark:focus:ring-offset-gray-950
                "
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
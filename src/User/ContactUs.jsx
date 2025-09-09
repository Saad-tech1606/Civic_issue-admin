import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Clock, ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-green-900 text-white px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 drop-shadow-lg">
          📞 Contact Us
        </h1>
        <p className="mt-3 text-gray-300 text-lg">
          Government of Jharkhand – Civic Engagement & Public Grievances
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Contact Info */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-2xl p-8 space-y-6 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all"
        >
          <h2 className="text-2xl font-bold text-green-400 mb-4">Official Information</h2>

          <div className="flex items-start gap-4">
            <MapPin className="text-green-400 w-6 h-6" />
            <p>
              <span className="font-semibold">Department of Urban Development & Housing</span> <br />
              Government of Jharkhand <br />
              Project Building, Dhurwa, Ranchi, Jharkhand – 834004
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-green-400 w-6 h-6" />
            <p>
              Helpline: <span className="font-semibold">1800-123-4567</span> <br />
              Office: +91-651-244-1234 <br />
              CM Helpline (Toll-Free): <span className="font-semibold">181</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="text-green-400 w-6 h-6" />
            <p>
              Email:{" "}
              <a href="mailto:udhd.jharkhand@gov.in" className="text-green-300 hover:underline">
                udhd.jharkhand@gov.in
              </a>{" "}
              <br />
              Grievances:{" "}
              <a href="mailto:grievance@jharkhand.gov.in" className="text-green-300 hover:underline">
                grievance@jharkhand.gov.in
              </a>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Clock className="text-green-400 w-6 h-6" />
            <p>
              Office Hours: <br />
              <span className="font-semibold">Mon – Fri: 10:00 AM – 5:00 PM</span> <br />
              Closed on Govt. Holidays
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Globe className="text-green-400 w-6 h-6" />
            <p>
              Website:{" "}
              <a
                href="https://www.jharkhand.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-300 hover:underline"
              >
                www.jharkhand.gov.in
              </a>
            </p>
          </div>

          {/* Important Links */}
          <div className="mt-6 space-y-2">
            <h3 className="font-bold text-green-400 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Important Links
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1 ml-3">
              <li>
                <a
                  href="https://jharkhand.gov.in/CM-Grievance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  Chief Minister’s Grievance Cell
                </a>
              </li>
              <li>
                <a
                  href="https://rti.jharkhand.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  Right to Information (RTI) – Jharkhand
                </a>
              </li>
              <li>
                <a
                  href="https://udhd.jharkhand.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  Urban Development & Housing Dept.
                </a>
              </li>
            </ul>
          </div>

          {/* Google Map Embed */}
          <div className="rounded-xl overflow-hidden shadow-lg mt-6 border border-green-700/30">
            <iframe
              title="Jharkhand Secretariat Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.7724457159633!2d85.2977!3d23.3441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1b9a2cf8e87%3A0x93e9f1f8c17fbe2c!2sProject%20Building%2C%20Dhurwa%2C%20Ranchi!5e0!3m2!1sen!2sin!4v1709376000000!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-2xl p-8 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all"
        >
          <h2 className="text-2xl font-bold text-green-400 mb-6">Send us a Message</h2>

          <form className="space-y-5">
            <div>
              <label className="block text-gray-300 font-medium">Full Name *</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-2 p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition-all hover:border-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium">Email *</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition-all hover:border-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium">Message *</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full mt-2 p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none resize-none transition-all hover:border-green-400"
                required
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.8)] transition-all"
            >
              📩 Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Back to Landing Page */}
      <div className="flex justify-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-500 to-green-500 shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.9)] transition-all"
        >
          <ArrowLeft size={20} /> Back to Home Page
        </motion.button>
      </div>
    </div>
  );
}

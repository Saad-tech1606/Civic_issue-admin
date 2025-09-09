import { useState } from "react";
import { motion } from "framer-motion";
import { MdReportProblem, MdLocationOn, MdCategory, MdImage, MdMyLocation } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // ✅ Import

export default function ReportIssue() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigate

  const categories = ["Pothole", "Garbage", "Streetlight", "Water Supply", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("❌ Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("📍 Latitude:", latitude, "Longitude:", longitude);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          setForm((prev) => ({
            ...prev,
            location: data.display_name || `${latitude}, ${longitude}`,
          }));
        } catch (err) {
          console.error("Error fetching address:", err);
          setForm((prev) => ({
            ...prev,
            location: `${latitude}, ${longitude}`,
          }));
        }

        setLoadingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("⚠️ Unable to fetch location");
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // ✅ Better accuracy
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.location || !form.description) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    console.log("✅ Issue Submitted:", form);
    alert("✅ Your issue has been reported!");

    // Reset form
    setForm({ title: "", category: "", location: "", description: "", image: null });
    setPreview(null);

    // ✅ Redirect to Landing Page
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4 py-10">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl p-8 space-y-6"
      >
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <MdReportProblem className="text-red-500" /> Report an Issue
        </h2>
        <p className="text-gray-400">
          Help us improve the community by reporting civic issues. Fill out the form below.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="text-gray-300 font-semibold">Issue Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="E.g. Broken streetlight near park"
              className="w-full mt-2 p-3 rounded-xl bg-gray-800 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-gray-300 font-semibold flex items-center gap-2">
              <MdCategory /> Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-xl bg-gray-800 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Location with Fetch Button */}
          <div>
            <label className="text-gray-300 font-semibold flex items-center gap-2">
              <MdLocationOn /> Location *
            </label>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="E.g. MG Road, Ranchi"
                className="flex-1 p-3 rounded-xl bg-gray-800 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold flex items-center gap-2"
                disabled={loadingLocation}
              >
                <MdMyLocation />
                {loadingLocation ? "Fetching..." : "Use Current"}
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-300 font-semibold">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Provide more details about the issue..."
              className="w-full mt-2 p-3 rounded-xl bg-gray-800 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-gray-300 font-semibold flex items-center gap-2">
              <MdImage /> Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full mt-2 p-2 rounded-xl bg-gray-800 text-gray-200"
            />
            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl border border-gray-700 shadow-md"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition shadow-lg"
          >
            🚀 Submit Issue
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

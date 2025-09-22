import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdReportProblem,
  MdLocationOn,
  MdCategory,
  MdImage,
  MdMyLocation,
  MdAudiotrack,
  MdVideocam,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ReportIssue() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    image: null,
    audio: null,
    video: null,
  });

  const [preview, setPreview] = useState({ image: null, audio: null, video: null });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const categories = ["Pothole", "Garbage", "Streetlight", "Water Supply", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, [type]: file }));
      setPreview((prev) => ({ ...prev, [type]: URL.createObjectURL(file) }));
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
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          setForm((prev) => ({
            ...prev,
            location: data.display_name || `Longitude:${longitude}, Latitude:${latitude}`,
          }));
        } catch (err) {
          console.error("Error fetching address:", err);
          setForm((prev) => ({
            ...prev,
            location: `Longitude:${longitude}, Latitude:${latitude}`,
          }));
        }
        setLoadingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("⚠️ Unable to fetch location");
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.location || !form.description) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("location", form.location);
      formData.append("description", form.description);

      if (form.image) formData.append("image", form.image, form.image.name);
      if (form.audio) formData.append("audio", form.audio, form.audio.name);
      if (form.video) formData.append("video", form.video, form.video.name);

      const res = await axios.post(
        "https://backend-civic.onrender.com/issue/insert_issue",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ Issue Submitted:", res.data);
      alert("✅ Your issue has been reported!");

      // Reset form
      setForm({
        title: "",
        category: "",
        location: "",
        description: "",
        image: null,
        audio: null,
        video: null,
      });
      setPreview({ image: null, audio: null, video: null });

      navigate("/");
    } catch (error) {
      console.error("❌ Error submitting issue:", {
        message: error.message,
        responseData: error.response?.data,
        status: error.response?.status,
      });
      alert(
        "❌ Failed to submit issue. " +
          (error.response?.data?.message
            ? "Server says: " + error.response.data.message
            : "Please try again.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4 py-10">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <MdReportProblem className="text-red-500" /> Report an Issue
        </h2>
        <p className="text-gray-400">Help us improve the community by reporting civic issues. Fill out the form below.</p>

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

          {/* Location */}
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

          {/* File uploads */}
          <div>
            <label className="text-gray-300 font-semibold flex items-center gap-2">
              <MdImage /> Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "image")}
              className="w-full mt-2 p-2 rounded-xl bg-gray-800 text-gray-200"
            />
            {preview.image && (
              <div className="mt-3">
                <img
                  src={preview.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl border border-gray-700 shadow-md"
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-gray-300 font-semibold flex items-center gap-2">
              <MdAudiotrack /> Upload Audio
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleFileUpload(e, "audio")}
              className="w-full mt-2 p-2 rounded-xl bg-gray-800 text-gray-200"
            />
            {preview.audio && (
              <div className="mt-3">
                <audio controls className="w-full">
                  <source src={preview.audio} type="audio/*" />
                  Your browser does not support audio playback.
                </audio>
              </div>
            )}
          </div>

          <div>
            <label className="text-gray-300 font-semibold flex items-center gap-2">
              <MdVideocam /> Upload Video
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, "video")}
              className="w-full mt-2 p-2 rounded-xl bg-gray-800 text-gray-200"
            />
            {preview.video && (
              <div className="mt-3">
                <video
                  src={preview.video}
                  controls
                  className="w-full h-48 rounded-xl border border-gray-700 shadow-md"
                />
              </div>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition shadow-lg"
          >
            {submitting ? "Submitting..." : "🚀 Submit Issue"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

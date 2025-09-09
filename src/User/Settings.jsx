import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Bell, Globe, Lock, X, Shield, KeyRound } from "lucide-react";

const DICT = {
  en: {
    settings: "Settings",
    userAccount: "User Account",
    editProfile: "Edit Profile",
    language: "Language",
    notifications: "Notifications",
    changePassword: "Change Password",
    privacySettings: "Privacy Settings",
    manage: "Manage",
    update: "Update",
    save: "Save",
    cancel: "Cancel",
    name: "Name",
    email: "Email",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    passwordUpdated: "Password updated successfully",
    mismatch: "New passwords do not match",
    profileUpdated: "Profile updated",
    privacySaved: "Privacy preferences saved",
    twoFactor: "Two-Factor Authentication",
    enable2FA: "Enable 2FA",
    disable2FA: "Disable 2FA",
    twoFactorOn: "Two-Factor Authentication enabled",
    twoFactorOff: "Two-Factor Authentication disabled",
    logout: "Logout",
  },
  hi: {
    settings: "सेटिंग्स",
    userAccount: "यूज़र खाता",
    editProfile: "प्रोफ़ाइल संपादित करें",
    language: "भाषा",
    notifications: "सूचनाएं",
    changePassword: "पासवर्ड बदलें",
    privacySettings: "गोपनीयता सेटिंग्स",
    manage: "प्रबंधित करें",
    update: "अपडेट करें",
    save: "सहेजें",
    cancel: "रद्द करें",
    name: "नाम",
    email: "ईमेल",
    currentPassword: "वर्तमान पासवर्ड",
    newPassword: "नया पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    passwordUpdated: "पासवर्ड सफलतापूर्वक अपडेट किया गया",
    mismatch: "नया पासवर्ड मेल नहीं खाता",
    profileUpdated: "प्रोफ़ाइल अपडेट की गई",
    privacySaved: "गोपनीयता प्राथमिकताएँ सहेजी गईं",
    twoFactor: "दो-कारक प्रमाणीकरण",
    enable2FA: "2FA सक्षम करें",
    disable2FA: "2FA अक्षम करें",
    twoFactorOn: "दो-कारक प्रमाणीकरण सक्षम किया गया",
    twoFactorOff: "दो-कारक प्रमाणीकरण अक्षम किया गया",
    logout: "लॉगआउट",
  }
};
const languageLabels = { en: "English", hi: "Hindi" };

const Toast = ({ show, message, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed right-6 bottom-6 z-[9999]">
      <div className="max-w-sm px-4 py-3 rounded-xl shadow-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 transform transition-all duration-250 ease-out" role="status" aria-live="polite">
        <div className="flex items-center justify-between gap-3">
          <div className="truncate font-medium">{message}</div>
          <button type="button" onClick={onClose} className="ml-2 rounded-full bg-white/20 hover:bg-white/30 px-2 py-1 text-sm" aria-label="Close toast">×</button>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-2xl bg-gray-900 border border-white/10 text-white shadow-2xl overflow-hidden transform transition-transform duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-white/2 via-transparent to-transparent">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button type="button" onClick={onClose} className="p-2 rounded-md hover:bg-white/10 transition" aria-label="Close modal"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@email.com");
  const [notif, setNotif] = useState(true);
  const [lang, setLang] = useState("en");
  const t = useMemo(() => (key) => DICT[lang][key] || key, [lang]);
  const [openProfile, setOpenProfile] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [allowDataSharing, setAllowDataSharing] = useState(true);
  const [showOnline, setShowOnline] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState({ show: false, msg: "" });
  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2400);
  };

  const handleLangChange = (value) => {
    setLang(value);
    showToast(`${languageLabels[value] || value} selected`);
  };
  const handleSaveProfile = () => {
    setOpenProfile(false);
    showToast(t("profileUpdated"));
  };
  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      showToast(t("mismatch"));
      return;
    }
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    setOpenPassword(false); showToast(t("passwordUpdated"));
  };
  const handleSavePrivacy = () => {
    setOpenPrivacy(false);
    showToast(t("privacySaved"));
  };
  const handleToggle2FA = () => {
    setTwoFA((prev) => {
      const next = !prev;
      showToast(next ? t("twoFactorOn") : t("twoFactorOff"));
      return next;
    });
  };

  // ===== Logout with redirect
  const navigate = useNavigate();
  const handleLogout = () => {
    // Insert any cleanup/session clear logic here if needed
    navigate("/"); // Or use '/landing' if that's your route
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-violet-400">
              {t("settings")}
            </h1>
            <p className="mt-1 text-sm text-gray-400">{t("userAccount")}</p>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <section className="lg:col-span-1">
            <div className="bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/60 rounded-2xl p-6 shadow-xl border border-white/6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold shadow-inner">
                  {name?.[0] || "U"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-lg">{name}</p>
                      <p className="text-gray-400 text-sm">{email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenProfile(true)}
                      className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 transition text-sm font-medium"
                    >
                      {t("editProfile")}
                    </button>
                  </div>
                  <div className="mt-4 text-xs text-gray-400">
                    Keep your profile up-to-date for a better experience.
                  </div>
                </div>
              </div>
              {/* Quick settings */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between bg-gray-800/40 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-cyan-300" />
                    <div>
                      <div className="text-sm font-medium">{t("language")}</div>
                      <div className="text-xs text-gray-400">{languageLabels[lang]}</div>
                    </div>
                  </div>
                  <select
                    aria-label="Select language"
                    value={lang}
                    onChange={(e) => handleLangChange(e.target.value)}
                    className="bg-gray-800 px-3 py-2 rounded-md border border-gray-700 outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>
                <div className="flex items-center justify-between bg-gray-800/40 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-yellow-300" />
                    <div>
                      <div className="text-sm font-medium">{t("notifications")}</div>
                      <div className="text-xs text-gray-400">Enable or disable notifications</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notif}
                    onChange={(e) => setNotif(e.target.checked)}
                    className="w-5 h-5 accent-cyan-500"
                    aria-label="Enable notifications"
                  />
                </div>
              </div>
            </div>
          </section>
          {/* Settings options */}
          <section className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Two-Factor */}
              <div className="bg-gradient-to-b from-gray-900/70 to-gray-900/50 rounded-2xl p-6 shadow-lg border border-white/6">
                <div className="flex items-start gap-4">
                  <div>
                    <KeyRound className="w-6 h-6 text-green-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{t("twoFactor")}</h3>
                        <p className="text-sm text-gray-400">Add extra security for your account.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleToggle2FA}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          twoFA
                            ? "bg-gradient-to-r from-red-500 to-pink-500"
                            : "bg-gradient-to-r from-green-500 to-emerald-500"
                        }`}
                      >
                        {twoFA ? t("disable2FA") : t("enable2FA")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Change Password */}
              <div className="bg-gradient-to-b from-gray-900/70 to-gray-900/50 rounded-2xl p-6 shadow-lg border border-white/6">
                <div className="flex items-start gap-4">
                  <div>
                    <Lock className="w-6 h-6 text-purple-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{t("changePassword")}</h3>
                        <p className="text-sm text-gray-400">Update your password regularly.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpenPassword(true)}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-medium"
                      >
                        {t("update")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Privacy Settings */}
              <div className="md:col-span-2 bg-gradient-to-b from-gray-900/70 to-gray-900/50 rounded-2xl p-6 shadow-lg border border-white/6">
                <div className="flex items-start gap-4">
                  <div>
                    <Shield className="w-6 h-6 text-pink-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{t("privacySettings")}</h3>
                        <p className="text-sm text-gray-400">Control your privacy preferences.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpenPrivacy(true)}
                        className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm font-medium"
                      >
                        {t("manage")}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="text-xs px-3 py-1 bg-gray-800/30 rounded-full text-gray-300">Data Sharing: {allowDataSharing ? "On" : "Off"}</span>
                  <span className="text-xs px-3 py-1 bg-gray-800/30 rounded-full text-gray-300">Online Status: {showOnline ? "Visible" : "Hidden"}</span>
                  <span className="text-xs px-3 py-1 bg-gray-800/30 rounded-full text-gray-300">Ads: {personalizedAds ? "Personalized" : "Generic"}</span>
                </div>
              </div>
            </div>
            {/* Logout */}
            <div className="bg-gray-900/60 p-6 rounded-2xl flex items-center justify-center border border-white/6 shadow-md">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-500 text-white font-semibold flex items-center gap-3 justify-center"
              >
                <LogOut className="w-5 h-5" />
                {t("logout")}
              </button>
            </div>
          </section>
        </div>
      </div>
      {/* Edit Profile Modal */}
      <Modal open={openProfile} title={t("editProfile")} onClose={() => setOpenProfile(false)}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">{t("name")}</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-gray-800 rounded-lg px-3 py-2 border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">{t("email")}</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-gray-800 rounded-lg px-3 py-2 border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setOpenProfile(false)} className="px-4 py-2 rounded-lg bg-gray-700">
              {t("cancel")}
            </button>
            <button type="button" onClick={handleSaveProfile} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600">
              {t("save")}
            </button>
          </div>
        </div>
      </Modal>
      {/* Password Modal */}
      <Modal open={openPassword} title={t("changePassword")} onClose={() => setOpenPassword(false)}>
        <div className="space-y-4">
          <input
            placeholder={t("currentPassword")}
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className="w-full bg-gray-800 rounded-lg px-3 py-2 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
          />
          <input
            placeholder={t("newPassword")}
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full bg-gray-800 rounded-lg px-3 py-2 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
          />
          <input
            placeholder={t("confirmPassword")}
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-800 rounded-lg px-3 py-2 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setOpenPassword(false)} className="px-4 py-2 rounded-lg bg-gray-700">
              {t("cancel")}
            </button>
            <button type="button" onClick={handleSavePassword} className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600">
              {t("save")}
            </button>
          </div>
        </div>
      </Modal>
      {/* Privacy Modal */}
      <Modal open={openPrivacy} title={t("privacySettings")} onClose={() => setOpenPrivacy(false)}>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={allowDataSharing} onChange={e => setAllowDataSharing(e.target.checked)} className="w-5 h-5 accent-cyan-500" />
            <span>Allow Data Sharing</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={showOnline} onChange={e => setShowOnline(e.target.checked)} className="w-5 h-5 accent-cyan-500" />
            <span>Show Online Status</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={personalizedAds} onChange={e => setPersonalizedAds(e.target.checked)} className="w-5 h-5 accent-cyan-500" />
            <span>Personalized Ads</span>
          </label>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setOpenPrivacy(false)} className="px-4 py-2 rounded-lg bg-gray-700">
              {t("cancel")}
            </button>
            <button type="button" onClick={handleSavePrivacy} className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500">
              {t("save")}
            </button>
          </div>
        </div>
      </Modal>
      <Toast show={toast.show} message={toast.msg} onClose={() => setToast({ show: false, msg: "" })} />
    </div>
  );
};

export default SettingsPage;
  
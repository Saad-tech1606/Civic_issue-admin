import React, { useMemo, useState } from "react";
import {
  LogOut,
  Bell,
  Globe,
  Lock,
  Shield,
  X,
  KeyRound,
} from "lucide-react";

const DICT = {
  en: {
    settings: "Settings",
    officialAccount: "Official Account",
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
    officialAccount: "आधिकारिक खाता",
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
  },
};

const Toast = ({ show, message, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 pointer-events-none">
      <div className="mt-4 pointer-events-auto rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <span>{message}</span>
          <button
            onClick={onClose}
            className="ml-2 rounded-md bg-black/30 hover:bg-black/40 px-2 py-1 text-xs"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-gray-900 border border-white/10 text-white shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const SettingsPage = ({ onLogout }) => {
  const [name, setName] = useState("Official Account");
  const [email, setEmail] = useState("official@gov.in");

  const [notif, setNotif] = useState(true);
  const [lang, setLang] = useState("en");
  const t = useMemo(() => (key) => DICT[lang][key] || key, [lang]);

  const [openProfile, setOpenProfile] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [twoFA, setTwoFA] = useState(false);

  const [toast, setToast] = useState({ show: false, msg: "" });
  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2200);
  };

  const handleLangChange = (value) => {
    setLang(value);
    showToast(`Language set to ${value}`);
  };

  return (
    <div className="p-6 space-y-6 text-white">
      <h1 className="text-3xl font-bold">{t("settings")}</h1>

      {/* Profile */}
      <div className="bg-gray-900 rounded-2xl p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">
          {name?.[0] || "O"}
        </div>
        <div>
          <p className="font-semibold text-lg">{name}</p>
          <p className="text-gray-400">{email}</p>
        </div>
        <button
          className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
          onClick={() => setOpenProfile(true)}
        >
          {t("editProfile")}
        </button>
      </div>

      {/* Language */}
      <div className="bg-gray-900 rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-gray-400" />
          <p className="font-medium">{t("language")}</p>
        </div>
        <select
          value={lang}
          onChange={(e) => handleLangChange(e.target.value)}
          className="bg-gray-800 px-3 py-2 rounded-md"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      {/* Notifications */}
      <div className="bg-gray-900 rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-gray-400" />
          <p className="font-medium">{t("notifications")}</p>
        </div>
        <input
          type="checkbox"
          checked={notif}
          onChange={(e) => setNotif(e.target.checked)}
          className="w-5 h-5 accent-blue-500"
        />
      </div>

      {/* Two-Factor */}
      <div className="bg-gray-900 rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-gray-400" />
          <p className="font-medium">{t("twoFactor")}</p>
        </div>
        <button
          className={`px-4 py-2 rounded-lg text-sm ${
            twoFA ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          }`}
          onClick={() => {
            setTwoFA(!twoFA);
            showToast(!twoFA ? t("twoFactorOn") : t("twoFactorOff"));
          }}
        >
          {twoFA ? t("disable2FA") : t("enable2FA")}
        </button>
      </div>

      {/* Change Password */}
      <div className="bg-gray-900 rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-gray-400" />
          <p className="font-medium">{t("changePassword")}</p>
        </div>
        <button
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm"
          onClick={() => setOpenPassword(true)}
        >
          {t("update")}
        </button>
      </div>

      {/* Privacy */}
      <div className="bg-gray-900 rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-gray-400" />
          <p className="font-medium">{t("privacySettings")}</p>
        </div>
        <button
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
          onClick={() => setOpenPrivacy(true)}
        >
          {t("manage")}
        </button>
      </div>

      {/* Logout */}
      <div className="bg-gray-900 rounded-2xl p-6 text-center">
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 mx-auto"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
          {t("logout")}
        </button>
      </div>

      {/* Profile Modal */}
      <Modal open={openProfile} title={t("editProfile")} onClose={() => setOpenProfile(false)}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">{t("name")}</label>
            <input
              className="w-full bg-gray-800 rounded-lg px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">{t("email")}</label>
            <input
              className="w-full bg-gray-800 rounded-lg px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 bg-gray-600 rounded-lg" onClick={() => setOpenProfile(false)}>
              {t("cancel")}
            </button>
            <button
              className="px-4 py-2 bg-blue-600 rounded-lg"
              onClick={() => {
                setOpenProfile(false);
                showToast(t("profileUpdated"));
              }}
            >
              {t("save")}
            </button>
          </div>
        </div>
      </Modal>

      {/* Password Modal */}
      <Modal open={openPassword} title={t("changePassword")} onClose={() => setOpenPassword(false)}>
        <div className="space-y-4">
          <input placeholder={t("currentPassword")} className="w-full bg-gray-800 rounded-lg px-3 py-2" type="password" />
          <input placeholder={t("newPassword")} className="w-full bg-gray-800 rounded-lg px-3 py-2" type="password" />
          <input placeholder={t("confirmPassword")} className="w-full bg-gray-800 rounded-lg px-3 py-2" type="password" />
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 bg-gray-600 rounded-lg" onClick={() => setOpenPassword(false)}>
              {t("cancel")}
            </button>
            <button
              className="px-4 py-2 bg-purple-600 rounded-lg"
              onClick={() => {
                setOpenPassword(false);
                showToast(t("passwordUpdated"));
              }}
            >
              {t("save")}
            </button>
          </div>
        </div>
      </Modal>

      {/* Privacy Modal */}
      <Modal open={openPrivacy} title={t("privacySettings")} onClose={() => setOpenPrivacy(false)}>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="accent-blue-500" /> Allow Data Sharing
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="accent-blue-500" /> Show Online Status
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-500" /> Personalized Ads
          </label>
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 bg-gray-600 rounded-lg" onClick={() => setOpenPrivacy(false)}>
              {t("cancel")}
            </button>
            <button
              className="px-4 py-2 bg-green-600 rounded-lg"
              onClick={() => {
                setOpenPrivacy(false);
                showToast(t("privacySaved"));
              }}
            >
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

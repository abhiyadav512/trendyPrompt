import { X, Save, Image, Upload } from "lucide-react";
import { TextareaField } from "./TextareaField";
import { InputField } from "./InputField";
import axios from "axios";
import { useState } from "react";

const PromptModal = ({
  showModal,
  closeModal,
  modalMode = "view",
  formData,
  currentPrompt,
  categories = [],
  handleInputChange,
  handleSubmit,
  setFormData,
}) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append("file", file);
    formDataImg.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );
    formDataImg.append(
      "cloud_name",
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    );

    setUploading(true); // Start loading
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formDataImg,
      );
      const url = res.data.secure_url;
      setFormData((prev) => ({ ...prev, imgUrl: url }));
    } catch (err) {
      // console.error("Upload failed:", err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false); // Stop loading
    }
  };

  if (!showModal) return null;

  const isView = modalMode === "view";
  const isEdit = modalMode === "edit";
  const isCreate = modalMode === "create";

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-black backdrop-blur-xl border border-gray-300 dark:border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide transition-colors">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-black dark:text-white capitalize">
              {isCreate && "Add New Prompt"}
              {isEdit && "Edit Prompt"}
              {isView && "View Prompt"}
            </h3>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Body */}
        {isView ? (
          <div className="p-6 space-y-4 scrollbar-hide">
            <InfoField label="Title" value={currentPrompt?.title} />
            <InfoField label="Description" value={currentPrompt?.description} />
            <InfoField label="Category" value={currentPrompt?.category} />
            <InfoField
              label="Prompt Text"
              value={currentPrompt?.promptText}
              isBoxed
            />
            {currentPrompt?.imgUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image
                </label>
                <img
                  src={currentPrompt.imgUrl}
                  alt="Prompt"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 scrollbar-hide"
          >
            <InputField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter prompt title"
            />

            <TextareaField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter prompt description"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-white/20"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <TextareaField
              label="Prompt Text"
              name="promptText"
              value={formData.promptText}
              onChange={handleInputChange}
              placeholder="Enter the AI prompt text"
              rows={4}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Image
              </label>
              {uploading && (
                <div className="text-sm text-blue-600 mt-2 animate-pulse">
                  Uploading image...
                </div>
              )}

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 pl-10 bg-white/10 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-white/20"
                />
                <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>

              {formData.imgUrl && (
                <img
                  src={formData.imgUrl}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg mt-2"
                />
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={uploading}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  uploading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-gray-800 to-gray-700 dark:from-white dark:to-gray-300 text-white dark:text-black hover:scale-105"
                }`}
              >
                <Save className="w-5 h-5" />
                {isCreate ? "Create Prompt" : "Update Prompt"}
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-3 border border-gray-300 dark:border-white/20 text-black dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const InfoField = ({ label, value, isBoxed = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <p
      className={`${isBoxed ? "bg-gray-100 dark:bg-white/5 p-4 rounded-lg" : ""} text-black dark:text-white`}
    >
      {value}
    </p>
  </div>
);

export default PromptModal;

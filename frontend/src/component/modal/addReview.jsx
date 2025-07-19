import React, { useState } from "react";
import { X, Star } from "lucide-react";
import ErrorText from "../errorText";
import toast from "react-hot-toast";
import { ASSIGNMENT_API } from "../../service/apiConstant";
import api from "../../service";
//
export const AddReviewsModal = ({ isOpen, onClose, id, getCompanyDetail }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    review: "",
    rating: 3,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      [`${field}Err`]: "",
    }));
  };

  const handleStarClick = (index) => {
    handleChange("rating", index + 1);
  };

  const handleSave = async () => {
    let isValid = true;

    if (!formData.fullName) {
      isValid = false;
      setFormData((prev) => ({
        ...prev,
        fullNameErr: "full name is required",
      }));
    }

    if (!formData.subject.trim()) {
      isValid = false;
      setFormData((prev) => ({
        ...prev,
        subjectErr: "Subject is required",
      }));
    }

    if (!formData.review.trim()) {
      isValid = false;
      setFormData((prev) => ({ ...prev, reviewErr: "review is required" }));
    }

    if (!isValid) return;

    let request = {
      language: "en",
      companyId: id,
      rating: formData?.rating,
      fullName: formData?.fullName,
      subject: formData?.subject,
      feedback: formData?.review,
    };
    try {
      const response = await api.post(ASSIGNMENT_API.addReview, request);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        getCompanyDetail();
        onClose();
        setFormData({});
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-xs sm:max-w-sm md:max-w-md relative overflow-y-auto max-h-[95vh] min-h-[500px] shadow-2xl mx-auto my-8">

        {/* Purple decorative circles */}
        <div className="absolute top-0 left-0 w-full h-20">
          <div
            className="absolute w-20 h-20 rounded-full z-10"
            style={{
              top: "-1rem",
              left: "-1.5rem",
              background: "linear-gradient(172deg, rgba(166, 8, 233, 1) 16%, rgba(50, 32, 208, 0.88) 100%)",
            }}
          ></div>
          <div
            className="absolute w-20 h-20 bg-purple-400 rounded-full opacity-70"
            style={{
              left: "1rem",
              top: "-1.5rem",
            }}
          ></div>
        </div>

        {/* Modal Content */}
        <div className="relative p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <h2 className="text-center text-lg font-semibold text-gray-900 mb-4">
            Add Review
          </h2>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData?.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-700 text-sm"
              />
              <ErrorText error={formData?.fullNameErr} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Subject</label>
              <input
                type="text"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-700 text-sm"
              />
              <ErrorText error={formData?.subjectErr} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Your Review</label>
              <textarea
                rows={3}
                placeholder="Write your review here"
                value={formData.review}
                onChange={(e) => handleChange("review", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-700 text-sm"
              />
              <ErrorText error={formData?.reviewErr} />
            </div>

            {/* Rating */}
            <div>
              <p className="text-sm font-medium mb-1">Rating</p>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    onClick={() => handleStarClick(index)}
                    className={`w-5 h-5 cursor-pointer ${index < formData.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                      }`}
                  />
                ))}
                <span className="ml-2 text-xs text-gray-600">
                  {formData.rating >= 4 ? "Satisfied" : "Not Satisfied"}
                </span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSave}
              className="px-10 py-2 rounded-lg text-white font-medium text-sm"
              style={{
                background: "linear-gradient(90deg, #A608E9 0%, #3220D0 100%)",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

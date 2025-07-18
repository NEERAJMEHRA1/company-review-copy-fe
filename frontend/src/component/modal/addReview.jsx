import React, { useState } from "react";
import { X, Star } from "lucide-react";
import ErrorText from "../errorText";
import toast from "react-hot-toast";
import { ASSIGNMENT_API } from "../../service/apiConstant";
import api from "../../service";

export const AddReviewsModal = ({ isOpen, onClose, id,getCompanyDetail }) => {
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
        subjectErr: "Subject  is required",
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
      console.log(response?.data?.message);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        getCompanyDetail()
        onClose()
        setFormData({})
        
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-lg relative overflow-hidden shadow-2xl">
        {/* Purple decorative circles */}
        <div className="absolute top-0 left-0 w-full h-28">
          <div
            className="absolute w-24 h-24 rounded-full z-10"
            style={{
              top: "0rem",
              left: "-20px",
              background:
                "linear-gradient(172deg, rgba(166, 8, 233, 1) 16%, rgba(50, 32, 208, 0.88) 100%)",
            }}
          ></div>
          <div
            className="absolute w-24 h-24 bg-purple-400 rounded-full opacity-70"
            style={{
              left: "21px",
              top: "-29px",
            }}
          ></div>
        </div>

        {/* Modal Content */}
        <div className="relative p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <h2 className="text-center text-xl font-semibold text-gray-900 mb-6 mt-2">
            Add Review
          </h2>

          {/* Form Fields */}
          <div className="space-y-5">
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Enter"
                value={formData?.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-700"
              />
              <ErrorText error={formData?.fullNameErr} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Subject</label>
              <input
                type="text"
                placeholder="Enter"
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-700"
              />
              <ErrorText error={formData?.subjectErr} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Enter your Review</label>
              <textarea
                rows={4}
                placeholder="Description"
                value={formData.review}
                onChange={(e) => handleChange("review", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-700"
              />
              <ErrorText error={formData?.reviewErr} />
            </div>

            {/* Rating */}
            <div>
              <p className="text-lg font-semibold mb-2">Rating</p>
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    onClick={() => handleStarClick(index)}
                    className={`w-6 h-6 cursor-pointer ${
                      index < formData.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {formData.rating >= 4 ? "Satisfied" : "Not Satisfied"}
                </span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSave}
              className="px-12 py-3 rounded-lg text-white font-medium text-lg"
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

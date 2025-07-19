import React, { useState } from "react";
import { X, MapPin, Calendar } from "lucide-react";
import { useRef } from "react";
import api from "../../service";
import { ASSIGNMENT_API } from "../../service/apiConstant";
import toast from "react-hot-toast";
import ErrorText from "../errorText";

export const AddCompanyModal = ({ isOpen, onClose, fetchCompanyList }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    foundedOn: "",
    city: "",
  });
  const logoRef = useRef();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      [`${field}Err`]: "",
    }));
  };

  const handleSave = () => {
    let isValid = true;

    if (!formData.companyLogo) {
      isValid = false;
      setFormData((prev) => ({
        ...prev,
        companyLogoErr: "Company logo is required",
      }));
    }

    if (!formData.companyName.trim()) {
      isValid = false;
      setFormData((prev) => ({
        ...prev,
        companyNameErr: "Company name is required",
      }));
    }

    if (!formData.location.trim()) {
      isValid = false;
      setFormData((prev) => ({ ...prev, locationErr: "Location is required" }));
    }

    if (!formData.foundedOn.trim()) {
      isValid = false;
      setFormData((prev) => ({
        ...prev,
        foundedOnErr: "Founded date is required",
      }));
    }

    if (!formData.city.trim()) {
      isValid = false;
      setFormData((prev) => ({ ...prev, cityErr: "City is required" }));
    }

    if (!isValid) return;

    handleAdd();
  };

  async function handleAdd() {
    let request = {
      language: "en",
      name: formData?.companyName,
      location: formData?.location,
      city: formData?.city,
      foundedOn: formData?.foundedOn,
      companyLogo: formData?.companyLogo,
    };
    try {
      const response = await api.post(ASSIGNMENT_API.addCompany, request);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        fetchCompanyList();
        onClose();
        setFormData({});
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  async function handleUploadImage(event) {
    const file = event.target.files[0];

    if (!file) {
      toast.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("companyLogo", file);

    try {
      const response = await api.post(ASSIGNMENT_API.uploadImage, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response?.data?.status) {
        setFormData((formData) => ({
          ...formData,
          companyLogo: response?.data?.url,
          companyLogoImage: response?.data?.fullUrl,
          companyLogoErr: "",
        }));
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-xs sm:max-w-sm md:max-w-md relative overflow-y-auto max-h-[90vh] shadow-2xl mx-auto my-8">
        {/* Purple decorative background */}
        <div className="absolute top-0 left-0 w-full h-0">
          <div
            className="absolute w-22 h-22  rounded-full z-10  "
            style={{
              top: "0rem",
              left: "-20px",
              background:
                "linear-gradient(172deg,rgba(166, 8, 233, 1) 16%, rgba(50, 32, 208, 0.88) 100%)",
            }}
          ></div>
          <div
            className="absolute w-22 h-22 bg-purple-400 rounded-full opacity-70"
            style={{
              left: "21px",
              top: "-29px",
            }}
          ></div>
        </div>

        {/* Modal Content */}
        <div className="relative p-4 sm:p-5">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Add Company
          </h2>

          {/* Form */}
          <div className="space-y-3">
            {/* Logo Upload */}
            <div className="flex flex-col items-center mb-2">
              <div
                onClick={() => logoRef.current.click()}
                className="border border-dashed border-purple-600 h-22 w-20 flex justify-center items-center cursor-pointer rounded-lg overflow-hidden"
              >
                {formData?.companyLogoImage ? (
                  <img
                    src={formData?.companyLogoImage}
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <input
                      ref={logoRef}
                      type="file"
                      onChange={handleUploadImage}
                      accept="image/*"
                      className="hidden"
                    />
                    <p className="text-purple-600 text-xs text-center">Add Logo</p>
                  </>
                )}
              </div>
              <ErrorText error={formData?.companyLogoErr} />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Company name
              </label>
              <input
                type="text"
                placeholder="Enter..."
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-700 text-sm"
              />
              <ErrorText error={formData?.companyNameErr} />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select Location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-700 text-sm"
                />
                <MapPin className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
              </div>
              <ErrorText error={formData?.locationErr} />
            </div>

            {/* Founded On */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Founded on
              </label>
              <div className="relative">
                <input
                  type="date"
                  placeholder="DD/MM/YYYY"
                  value={formData.foundedOn}
                  onChange={(e) =>
                    handleInputChange("foundedOn", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-700 text-sm"
                />
              </div>
              <ErrorText error={formData?.foundedOnErr} />
            </div>

            {/* City */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-700 text-sm"
              />
              <ErrorText error={formData?.cityErr} />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-5 pb-4">
            <button
              onClick={handleSave}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

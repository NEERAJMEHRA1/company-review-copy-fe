import React, { useState } from "react";
import { X, MapPin, Calendar } from "lucide-react";
import { useRef } from "react";
import api from "../../service";
import { ASSIGNMENT_API } from "../../service/apiConstant";
import toast from "react-hot-toast";
import ErrorText from "../errorText";

// Modal Component
export const AddCompanyModal = ({ isOpen, onClose,fetchCompanyList }) => {
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
  // handle add new company
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
      console.log(response?.data?.message);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        fetchCompanyList()
        onClose()
        setFormData({})
        
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  if (!isOpen) return null;
  // handle uplodad image "
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
      console.log("Upload successful:", response.data);
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
  return (
    <div className="fixed inset-0 bg-black/30  flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-lg relative overflow-hidden shadow-2xl">
        {/* Purple decorative background */}
        <div className="absolute top-0 left-0 w-full h-28">
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
        <div className="relative p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-8 mt-2 text-center">
            Add Company
          </h2>

          {/* Form */}
          <div className="space-y-5">
            <div
              onClick={() => logoRef.current.click()}
              style={{
                border: "1px dashed #a608e9ff",
                height: 100,
                width: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {formData?.companyLogoImage ? (
                <img src={formData?.companyLogoImage} alt="" />
              ) : (
                <>
                  <input
                    ref={logoRef}
                    type="file"
                    onChange={handleUploadImage}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  <p style={{ color: "#a608e9ff" }}>Add Logo</p>
                </>
              )}
            </div>
            <ErrorText error={formData?.companyLogoErr} />

            {/* Company Name */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Company name
              </label>
              <input
                type="text"
                placeholder="Enter..."
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-700"
              />
              <ErrorText error={formData?.companyNameErr} />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
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
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-700"
                />
                <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <ErrorText error={formData?.locationErr} />
            </div>

            {/* Founded On */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
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
                  className="w-full px-4 py-3  border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-700"
                />
                {/* <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /> */}
              </div>
              <ErrorText error={formData?.foundedOnErr} />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-700"
              />
              <ErrorText error={formData?.cityErr} />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSave}
              className="bg-purple-600 text-white px-12 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium text-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

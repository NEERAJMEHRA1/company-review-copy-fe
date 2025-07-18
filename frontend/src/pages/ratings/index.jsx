import React, { useEffect, useState } from "react";
import { Search, Star, MapPin } from "lucide-react";
import { AddReviewsModal } from "../../component/modal/addReview";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../service";
import { ASSIGNMENT_API } from "../../service/apiConstant";
import moment from "moment";
import { ResultsHeader } from "../home/filters";

// Company Info Component
const Ratings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [companyData, setCompanyData] = useState("");
  const Navigation = useNavigate();

  useEffect(() => {
    getCompanyDetail();
  }, []);
  const { id } = useParams();
  const getCompanyDetail = async () => {
    try {
      const response = await api.get(
        `${ASSIGNMENT_API.getCompanyDeatil}?language=en&companyId=${id}`
      );
      console.log(response?.data);
      if (response?.data?.status) {
        setCompanyData(response?.data?.data);
      } else {
        // toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div
      onClick={()=>Navigation('/')}
        style={{ textDecoration: "underline", color: "#a608e9ff",cursor:'pointer' }}
        className="text-md pb-4"
      >
        Back
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 ">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div
              className={`w-20 h-20`}
              style={{ border: "0.5px solid black" }}
            >
              <img src={companyData?.logo} alt=" " />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {companyData?.name}
              </h1>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">
                  {companyData?.location}, {companyData?.city}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <StarRating rating={companyData?.avgRating ?? 0} />
                <span className="text-sm text-gray-600">
                  {companyData?.reviewCount} Reviews
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-3">
            <div className="text-sm text-gray-500">
              Founded on {moment(companyData?.foundedOn).format("DD-MM-YYYY")}
            </div>
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className=" text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              style={{
                background:
                  "linear-gradient(172deg, rgba(166, 8, 233, 1) 16%, rgba(50, 32, 208, 0.88) 100%)",
              }}
            >
              + Add Review
            </button>
          </div>
        </div>

        <hr className="text-gray-200 my-5"></hr>
        <ResultsHeader resultCount={companyData?.reviews?.length} />
        <div className="space-y-4">
          {companyData?.reviews?.map((review) => (
            <ReviewCard key={review?.id} review={review} />
          ))}
        </div>

        {isOpen && (
          <AddReviewsModal
            isOpen={isOpen}
            getCompanyDetail={getCompanyDetail}
            id={id}
            onClose={() => {
              setIsOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Ratings;

// Star Rating Component
const StarRating = ({ rating, showNumber = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-2">
      {showNumber && (
        <span className="text-lg font-semibold text-gray-800">{rating}</span>
      )}
      <div className="flex items-center">
        {[...Array(fullStars)]?.map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
        {hasHalfStar && (
          <Star className="w-4 h-4 text-yellow-400 fill-current opacity-50" />
        )}
        {[...Array(emptyStars)]?.map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    </div>
  );
};

// Review Component
const ReviewCard = ({ review }) => {
  return (
    <div className=" rounded-lg p-6 mb-4">
      <div className="flex items-start space-x-4">
        <div
          style={{ borderRadius: "50%" }}
          className={`w-20 h-20  flex items-center justify-center text-white font-bold text-2xl bg-black`}
        >
          {review?.fullName?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900">{review?.fullName}</h3>
            <StarRating rating={review?.rating ?? 0} showNumber={false} />
          </div>
          <p className="text-sm text-gray-500 mb-3">
            {moment(review?.createdAt).format("DD-MM-YYYY hh:mm A")}
          </p>
          <p className="font-medium text-gray-700">{review?.subject}</p>
          <p className="text-gray-700 leading-relaxed">{review?.feedback}</p>
        </div>
      </div>
    </div>
  );
};

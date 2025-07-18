import React, { useState } from "react";
import Header from "../../component/header";
import CompanyCard from "./company";
import SearchFilter, { ResultsHeader } from "./filters";
import { AddCompanyModal } from "../../component/modal/addCompany";
import { useEffect } from "react";
import api from "../../service";
import toast from "react-hot-toast";
import { ASSIGNMENT_API } from "../../service/apiConstant";

export default function Home() {
  const [sortBy, setSortBy] = useState("name");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchCompanyList();
  }, []);

  useEffect(() => {
    fetchCompanyList();
  }, [sortBy]);

  const [companies, seCompanies] = useState([]);
  const fetchCompanyList = async (search) => {
    console.log("search", search)
    let request = {
      language: "en",
      search: search ?? "",
      page: 1,
      perPage: 100,
      city: "",
      sort: sortBy,
    };
    try {
      const response = await api.post(ASSIGNMENT_API.getCompanyList, request);
      console.log(response?.data);
      if (response?.data?.status) {
        seCompanies(response?.data?.data);
      } else {
        // toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const handleSearch = (event) => {
    fetchCompanyList(event?.target.value);
  };

  const handleAddCompany = () => {
    setIsOpen(true);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  return (
    <div className="">
      <div class="max-w-screen-xl mx-auto my-10 px-4 sm:px-6 lg:px-8 ">
        <SearchFilter
          onSearch={handleSearch}
          onAddCompany={handleAddCompany}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />

        <ResultsHeader resultCount={companies?.length} />
        <div className="space-y-4">
          {companies?.map((company) => (
            <CompanyCard key={company?.id} company={company} />
          ))}
        </div>
      </div>

      {isOpen && (
        <AddCompanyModal
          fetchCompanyList={fetchCompanyList}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}

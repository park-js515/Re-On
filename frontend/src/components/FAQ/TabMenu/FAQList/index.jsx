import React, { useState, useEffect } from "react";
import FAQItem from "./FAQItem";
import FAQPage from "./FAQPage";

const FAQList = ({ selectedTab, faqData }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  const filteredData = faqData.filter(
    (faqData) => faqData.category === selectedTab || selectedTab === "전체",
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleClick = (event, page) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  return (
    <div>
      {filteredData
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((faqData) => (
          <FAQItem
            key={faqData.title}
            title={faqData.title}
            content={faqData.content}
          />
        ))}
      <FAQPage
        totalPages={totalPages}
        handleClick={handleClick}
        currentPage={currentPage}
      />
    </div>
  );
};

export default FAQList;

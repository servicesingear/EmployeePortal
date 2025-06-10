import React from "react";

const SalarySlips = () => {
  const salarySlips = [
    { month: "January", year: 2025, link: "#" },
    { month: "February", year: 2025, link: "#" },
    { month: "March", year: 2025, link: "#" },
  ];

  return (
    <section className="portal-section" id="salary">
      <h2>Salary Slips</h2>
      {salarySlips.length > 0 ? (
        <ul className="salary-slip-list">
          {salarySlips.map((slip, idx) => {
            const isLinkAvailable = slip.link && slip.link !== "#";
            const fileName = `salary-slip-${slip.month.toLowerCase()}-${slip.year}.pdf`;

            return (
              <li key={idx}>
                {slip.month} {slip.year} -{" "}
                {isLinkAvailable ? (
                  <a
                    href={slip.link}
                    download={fileName}
                    aria-label={`Download salary slip for ${slip.month} ${slip.year}`}
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                ) : (
                  <span className="disabled-link" aria-disabled="true" style={{ color: "gray" }}>
                    Not available
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No salary slips available.</p>
      )}
    </section>
  );
};

export default SalarySlips;

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./App.css";
import { MdKeyboardArrowDown } from "react-icons/md";

const apiURL = "https://joblisting.cleverse.workers.dev";

function Header() {
  return (
    <div className="w-layout-blockcontainer container w-container">
      <div className="jobheaderfilterdiv">
        <div className="jobheaderdiv">
          <div className="jobheadertext">Job</div>
          <div className="jobheadertext red">Openings</div>
        </div>
        {/* <div className="dropdowndiv">
          <div
            data-hover="false"
            data-delay="0"
            className="teamdropdown w-dropdown"
          >
            <div
              className="dropdown-toggle w-dropdown-toggle"
              id="w-dropdown-toggle-0"
              ariaControls="w-dropdown-list-0"
              ariaHaspopup="menu"
              ariaExpanded="false"
              role="button"
            >
              <div
                className="icon w-icon-dropdown-toggle"
                ariaHidden="true"
              ></div>
              <div className="text-block-2">Select Team</div>
            </div>
            <nav
              className="dropdownlist w-dropdown-list"
              id="w-dropdown-list-0"
              ariaLabelledby="w-dropdown-toggle-0"
            >
              <a href="#" className="dropdownlink w-dropdown-link">
                Development
              </a>
              <a href="#" className="dropdownlink w-dropdown-link">
                Design
              </a>
              <a href="#" className="dropdownlink w-dropdown-link">
                Business
              </a>
              <a href="#" className="dropdownlink w-dropdown-link">
                Operation
              </a>
            </nav>
          </div>
          <div
            data-hover="false"
            data-delay="0"
            className="employmentdropdown w-dropdown"
          >
            <div
              className="dropdown-toggle w-dropdown-toggle"
              id="w-dropdown-toggle-1"
              ariaControls="w-dropdown-list-1"
              ariaHaspopup="menu"
              ariaExpanded="false"
              role="button"
            >
              <div
                className="icon-2 w-icon-dropdown-toggle"
                ariaHidden="true"
              ></div>
              <div className="text-block-2">Select Employment type</div>
            </div>
            <nav
              className="dropdownlist w-dropdown-list"
              id="w-dropdown-list-1"
              ariaLabelledby="w-dropdown-toggle-1"
            >
              <a href="#" className="dropdownlink w-dropdown-link">
                Full - Time
              </a>
              <a href="#" className="dropdownlink w-dropdown-link">
                Part - Time
              </a>
              <a href="#" className="dropdownlink w-dropdown-link">
                Internship
              </a>
            </nav>
          </div>
        </div> */}
      </div>
    </div>
  );
}

const addLinkStyleSheetToHTML = () => {
  const link = document.createElement("link");
  link.href =
    "https://raw.githack.com/Cleverse/careers-job-openings/main/build/static/css/main.css?t=1";
  link.rel = "stylesheet";
  document.head.appendChild(link);
};

function CareerList() {
  const [careerList, setCareerList] = useState([]);
  const [expandedIds, setExpandedIds] = useState({});
  const toggleExpanded = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  useEffect(() => {
    fetch(apiURL).then(async (resp) => {
      const result = (await resp.json()).records;
      result.sort((a, b) => {
        return ("" + a.fields["Job Title"]).localeCompare(
          b.fields["Job Title"]
        );
      });

      setCareerList(result);
    });
  }, []);

  if (!careerList?.length) {
    return (
      <div className="openinglistbgdiv">
        <div className="container">
          <div className="openinglistbuttondiv"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="openinglistbgdiv">
      <div className="container">
        <div className="openinglistbuttondiv">
          <div className="openinglistdiv">
            {careerList.map((item) => {
              const encodeId = btoa(
                JSON.stringify({
                  pageId: "pagTgxt8p4TnsVNyA",
                  rowId: item.id,
                  showComments: false,
                  queryOriginHint: {
                    type: "pageElement",
                    elementId: "pelp28rGmCehnLr5z",
                    queryContainerId: "pelkxpDwTJHHCYiKL",
                  },
                })
              );

              const jobOpeningName = item.fields["Job Title"];
              const jobType = item.fields["Job Type"];
              const jobDescription = item.fields["Job Description"];
              const department = item.fields["Department"];
              const applyLink = `https://airtable.com/appuZxizGN2iGkbtA/paguDX8Ee4lgBWSbz/form?prefill_Applied+Position=${item.id}`;
              const isExpanded = !!expandedIds[item.id];
              return (
                <div
                  className="jobopeningdiv"
                  key={encodeId}
                  onClick={() => jobDescription && toggleExpanded(item.id)}
                >
                  <button
                    type="button"
                    className="accordion-header titlestatusdiv"
                    aria-expanded={isExpanded}
                    aria-controls={`desc-${item.id}`}
                  >
                    <span className="jobtitlewrap">
                      <a
                        // href={`https://airtable.com/appuZxizGN2iGkbtA/shr3kXZqLaz3XVt9O?detail=${encodeId}`}
                        // onClick={(e) => e.stopPropagation()}
                        id="JobTitle"
                        target="_blank"
                        rel="noreferrer"
                        className="jobtitletext"
                      >
                        {jobOpeningName}
                      </a>
                    </span>
                    {jobDescription ? (
                      <span
                        className={`chevron ${isExpanded ? "open" : ""}`}
                        aria-hidden="true"
                      >
                        <MdKeyboardArrowDown size={24} />
                      </span>
                    ) : null}
                  </button>
                  <div className="buttontagdiv">
                    <div className="jobtagdiv">
                      <div className="employmenttypetagdiv">
                        <div id="EmploymentType" className="employmenttext">
                          {jobType}
                        </div>
                      </div>
                      <div className="teamtagdiv">
                        <div id="Team" className="teamtext">
                          {department}
                        </div>
                      </div>
                    </div>
                    <a
                      href={applyLink}
                      target="_blank"
                      rel="noreferrer"
                      className="primarybutton w-button desktop-only"
                    >
                      Apply
                    </a>
                  </div>
                  {isExpanded && jobDescription ? (
                    <div
                      id={`desc-${item.id}`}
                      className="jobdescription accordion-panel"
                      style={{ marginTop: "12px" }}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {jobDescription}
                      </ReactMarkdown>
                      <div className="mobile-only">
                        <a
                          href={applyLink}
                          target="_blank"
                          rel="noreferrer"
                          className="primarybutton w-button"
                          style={{ margin: "20px auto 0" }}
                        >
                          Apply
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <a
            className="primarybutton outline w-button"
            target="_blank"
            rel="noreferrer"
            href="https://airtable.com/appuZxizGN2iGkbtA/shr3kXZqLaz3XVt9O"
          >
            View All
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    addLinkStyleSheetToHTML();
  }, []);
  return (
    <div className="jobopeningsection">
      <Header />
      <CareerList />
    </div>
  );
}

export default App;

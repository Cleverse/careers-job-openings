import { useEffect, useState } from "react";
import "./App.css";

const apiURL =
  "https://cors-proxy.cleverse.workers.dev/https://cleverse.bamboohr.com/careers/list";

function Header() {
  return (
    <div className="w-layout-blockcontainer container w-container">
      <div className="jobheaderfilterdiv">
        <div className="jobheaderdiv">
          <div className="jobheadertext">Job</div>
          <div className="jobheadertext red">Openings</div>
        </div>
        <div className="dropdowndiv">
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
        </div>
      </div>
    </div>
  );
}

function CareerList() {
  const [careerList, setCareerList] = useState([]);
  useEffect(() => {
    fetch(apiURL).then(async (resp) => {
      const result = (await resp.json()).result;
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
              return (
                <div className="jobopeningdiv" key={item.id}>
                  <div className="titlestatusdiv">
                    <div id="JobTitle" className="jobtitletext">
                      {item.jobOpeningName}
                    </div>
                    <div id="Status" className="jobstatustext">
                      OPENED
                    </div>
                  </div>
                  <div className="buttontagdiv">
                    <div className="jobtagdiv">
                      <div className="employmenttypetagdiv">
                        <div id="EmploymentType" className="employmenttext">
                          {item.employmentStatusLabel}
                        </div>
                      </div>
                      <div className="teamtagdiv">
                        <div id="Team" className="teamtext">
                          {item.departmentLabel}
                        </div>
                      </div>
                    </div>
                    <a
                      href={`https://cleverse.bamboohr.com/careers/${item.id}`}
                      className="primarybutton w-button"
                    >
                      Apply
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <a
            className="primarybutton outline w-button"
            href="https://cleverse.bamboohr.com/careers/"
          >
            View All
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="jobopeningsection">
      <Header />
      <CareerList />
    </div>
  );
}

export default App;

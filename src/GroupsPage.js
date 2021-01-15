import React, { useState, useEffect, useRef } from "react";
import { Chart } from "react-charts";
import useDebounce from "./useDebounce";
import { searchGroups, getGroups } from "./request";
import GroupCard from "./GroupCard";
import "./GroupsPage.css";

function GroupsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [chartData, setChartData] = useState([]);
  const searchRef = useRef(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchGroups(debouncedSearchTerm)
        // .then(r => r.json())
        .then((r) => r.data.groups.group)
        .then((results) => {
          // setIsSearching(false);
          setSuggestion(results);
        }, err => {
          console.log(err);
        })
    } else {
      setSuggestion([]);
    }
  }, [debouncedSearchTerm]);

  const handleClick = (e) => {
    let groupName = e.currentTarget.innerText;
    searchRef.current.value = groupName;
    getGroups(groupName)
      .then((r) => r.data.groups.group)
      .then((results) => {
        let chartDataTmp = [];
        setIsSearching(false);
        setGroups(results);
        setSuggestion([]);
        [...results].forEach((e) => {
          chartDataTmp.push([e.name, e.pool_count]);
        });
        setChartData(chartDataTmp);
      });
  };

  const data = React.useMemo(
    () => [
      {
        label: "Group vs Photo Count",
        data: chartData,
      },
    ],
    [chartData]
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom", show: false },
      { position: "left", type: "linear", stacked: false, show: false },
    ],
    []
  );

  const series = React.useMemo(
    () => ({
      type: "bar",
    }),
    []
  );

  return (
    <React.Fragment>
      <div className="search-box" onMouseLeave={() => setIsSearching(false)}>
        <input
          className="search-box__input"
          ref={searchRef}
          placeholder="Search For Groups"
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearching(true)}
        />
        {isSearching && (
          <div className="search-box__suggestions">
            {suggestion.map((result) => (
              <div
                key={result.nsid}
                className="suggestion"
                onClick={handleClick}
              >
                {result.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row justify-content-between cards-wrapper">
        {groups.map((group, i) => {
          return (
            <React.Fragment key={i}>
              <GroupCard data={group}></GroupCard>
            </React.Fragment>
          );
        })}
      </div>
      <div className="chart-wrapper">
        <Chart data={data} series={series} axes={axes} tooltip />
      </div>
      <div className="breaker"></div>
    </React.Fragment>
  );
}

export default GroupsPage;

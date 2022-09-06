import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  Legend,
  Tooltip,
  Bar,
} from "recharts";
import { useState, useEffect } from "react";

import "./DashBoard.scss";
import { getOverview } from "../../../services/apiService";

const Dashboard = () => {
  // state
  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverView();
  }, []);

  const fetchDataOverView = async () => {
    let res = await getOverview();

    if (res && +res.EC === 0) {
      setDataOverView(res.DT);

      // process chart data
      let Qz,
        Qs,
        As = 0;
      Qz = res?.DT?.others?.countQuiz;
      Qs = res?.DT?.others?.countQuestions;
      As = res?.DT?.others?.countAnswers;

      const data = [
        {
          name: "Quizzes",
          Qz,
        },
        {
          name: "Questions",
          Qs,
        },
        {
          name: "Answers",
          As,
        },
      ];

      setDataChart(data);
    }
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="title">Analytics Dashboard</div>
        <div className="content">
          <div className="c-left">
            <div className="child">
              <span className="text-1"> Total users</span>
              {dataOverView &&
              dataOverView.users &&
              dataOverView.users.total ? (
                <>
                  <span className="text-2">{dataOverView.users.total}</span>
                </>
              ) : (
                <>0</>
              )}
            </div>
            <div className="child">
              <span className="text-1"> Total quizzes</span>
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuiz ? (
                <>
                  <span className="text-2">
                    {dataOverView.others.countQuiz}
                  </span>
                </>
              ) : (
                <>0</>
              )}
            </div>
            <div className="child">
              <span className="text-1"> Total questions</span>
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuestions ? (
                <>
                  <span className="text-2">
                    {dataOverView.others.countQuestions}
                  </span>
                </>
              ) : (
                <>0</>
              )}
            </div>
            <div className="child">
              <span className="text-1"> Total answers</span>
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countAnswers ? (
                <>
                  <span className="text-2">
                    {dataOverView.others.countAnswers}
                  </span>
                </>
              ) : (
                <>0</>
              )}
            </div>
          </div>
          <div className="c-right">
            <ResponsiveContainer width="95%" height={"100%"}>
              <BarChart data={dataChart}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                {/* <YAxis />s */}
                <Tooltip />
                <Legend />
                <Bar dataKey="Qz" fill="#8884d8" />
                <Bar dataKey="Qs" fill="#82ca9d" />
                <Bar dataKey="As" fill="#1231cf" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

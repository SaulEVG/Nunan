import React, { useEffect, useState } from "react";
import dataForLineChart from "../lib/dataForLineChart";
import dataForPieChart from "../lib/dataForPieChart";

import PieChartComponentOut from "./PieChartComponentOut";
import LineChartComponentOut from "./LineChartComponentOut";
import PieChartComponentIn from "./PieChartComponentIn";
import LineChartComponentIn from "./LineChartComponentIn";
import totalIO from "../lib/totalIO";

interface Transaction {
  Data: string;
  Valor: string;
  Identificador: string;
  Descrição: string;
}

export default function UploadCsvForm() {
  const [file, setFile] = useState<File | null>(null);
  const [fileTitle, setFileTitle] = useState<string | null>(null);

  const [error, setError] = useState<Error | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [data, setData] = useState<Transaction[] | null>(null);
  const [totalIn, setTotalIn] = useState(0);
  const [totalOut, setTotalOut] = useState(0);
  const [lineChartDataIn, setlineChartDataIn] = useState<
    Record<string, number>
  >({ "": 0 });
  const [lineChartDataOut, setlineChartDataOut] = useState<
    Record<string, number>
  >({ "": 0 });
  const [pieChartDataIn, setPieChartDataIn] = useState<Record<string, number>>({
    "": 0,
  });
  const [pieChartDataOut, setPieChartDataOut] = useState<
    Record<string, number>
  >({ "": 0 });

  useEffect(() => {
    if (data) {
      const { lineChartIncome, lineChartOutcome } = dataForLineChart(data);
      const { pieChartIncome, pieChartOutcome } = dataForPieChart(data);
      const { totalIn, totalOut } = totalIO(data);
      if (lineChartIncome && lineChartOutcome) {
        setlineChartDataIn(lineChartIncome);
        setlineChartDataOut(lineChartOutcome);
      }
      if (pieChartIncome && pieChartOutcome) {
        setPieChartDataIn(pieChartIncome);
        setPieChartDataOut(pieChartOutcome);
      }
      if (totalIn && totalOut) {
        setTotalIn(totalIn);
        setTotalOut(totalOut);
      }
    }
  }, [data]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectFile = e.target.files;
    if (selectFile) {
      if (selectFile[0].type === "text/csv") {
        setFileTitle(selectFile[0].name);
        setFile(selectFile[0]);
        setMessage("File uploaded sucessfully.");
      } else {
        setMessage("This File is not a csv");
        setError(new Error("Invalid file type. Please upload a CSV file."));
      }
    } else {
      setMessage("You must choice a csv file");
      setError(new Error("Invalid file type. Please upload a CSV file."));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage("You must choice a csv file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/upload-csv", {
        body: formData,
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setData(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "row-reverse",
          alignItems: "stretch",
          gap: "12px",
        }}
      >
        <div>
          <PieChartComponentIn pieChartoutIncome={pieChartDataIn} />
          <LineChartComponentIn lineChartIncome={lineChartDataIn} />
          <span>Total Ganancias: {totalIn}</span>
        </div>
        <div>
          <PieChartComponentOut pieChartOutcome={pieChartDataOut} />
          <LineChartComponentOut lineChartIncome={lineChartDataOut} />
          <span>Total Gastos: {totalOut}</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
          action=""
          method="post"
        >
          <input
            style={{
              height: "0.1px",
              width: "0.1px",
              position: "absolute",
              zIndex: "-1",
            }}
            onChange={handleFileChange}
            type="file"
            name="file"
            id="file"
            accept=".csv"
          />
          <label className="labeFile" htmlFor="file">
            <svg
              className="labelFile-svg"
              data-slot="icon"
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              ></path>
            </svg>
            Choose a file
          </label>
          <span>{fileTitle}</span>
          {error ? <span>{message}</span> : null}
          <button type="submit">Upload File</button>
        </form>
      </div>
    </>
  );
}

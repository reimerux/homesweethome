'use client'
import React from 'react';
import Papa from 'papaparse';

type params =
{
    data: any,
    fileName: string,
    type: string
}

const DownloadFile = ({ data, fileName, type }: params) => {


  const downloadCSV = () => {
    console.log(data)
    const csvData = new Blob([Papa.unparse(data)], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadJSON = () => {
    console.log(data)
    const JSONData = new Blob([JSON.stringify(data)], { type: 'text/JSON' });
    const JSONURL = URL.createObjectURL(JSONData);
    const link = document.createElement('a');
    link.href = JSONURL;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <><button className="btn btn-primary" onClick={(type==="CSV") ? downloadCSV: downloadJSON}>Download table {fileName} to {type}</button>
{/* {JSON.stringify(data)} */}
</>
  );
}

export default DownloadFile;
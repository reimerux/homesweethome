'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Papa from 'papaparse'



const UploadFile = () => {
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();


  const onSubmit = async (event: any) => {
    event.preventDefault()
    if (!file) return
    setIsLoading(true);

    //identify file content (count rows and validate data)

    if (file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        complete: async function (results) {
          if (file.name.startsWith("room")) loadRooms(results)
          if (file.name.startsWith("issue")) loadIssues(results)
          if (file.name.startsWith("maintenanceTask")) loadTasks(results)
        }
      })



    } else {

      console.log('JSON parsing not yet implemented');

    }
  }

  const loadRooms = async (results: any) => {
    let loadData = [] as any;
    results.data.map((item: any) => {
      loadData.push({ "name": item.name, "shortName": item.shortName, "houseId": parseInt(item.houseId) })
    }
    );

    try {
      const res = await axios.post('../../api/rooms/mass', loadData)
      toast.success(loadData.length + " Rooms loaded")
      setIsLoading(false);
    } catch (error) {
      toast.error("Room loading failed " + error);
      console.error(error);
      setIsLoading(false);
    }
  }
  const loadIssues = async (results: any) => {
    let loadData = [] as any;
    results.data.map((item: any) => {
      loadData.push({ "title": item.title, "description": item.description, "status": item.status, "priority": item.priority, "notes": item.notes, "createdAt": item.createdAt, "updatedAt": item.updatedAt })
    }
    );
    try {
      const res = await axios.post('../../api/issues/mass', loadData)
      toast.success(loadData.length + " Issues loaded")
      setIsLoading(false);
    } catch (error) {
      toast.error("Issue loading failed " + error);
      console.error(error);
      setIsLoading(false);
    }
  }
  const loadTasks = async (results: any) => {
    let loadData = [] as any;
    results.data.map((item: any) => {
      loadData.push({ "taskName": item.taskName, "description": item.description, "timeEstimate": parseInt(item.timeEstimate), "frequency": item.frequency, "importance": item.importance, "season": item.season })
    }
    );

    try {
      const res = await axios.post('../../api/tasks/mass', loadData)
      toast.success(loadData.length + " Tasks loaded")
      setIsLoading(false);
    } catch (error) {
      toast.error("Task loading failed " + error);
      console.error(error);
      setIsLoading(false);
    }
  }


  return (
    <form onSubmit={onSubmit}>
      <input type="file" name="file" accept=".csv,.json"
        onChange={(e) => setFile(e.target.files?.[0])} />
      {(file) ? <span className='text-xs mr-4'> {file.size} bytes</span> : <></>}
      <button className="btn btn-primary" disabled={isLoading} type="submit">Upload file</button>
    </form>
  );
}

export default UploadFile;
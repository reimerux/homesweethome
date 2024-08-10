import AllTaskGrid from "./AllTaskGrid";

export const dynamic = 'force-dynamic';
const allTasks = ({ searchParams}: {searchParams: {page: string, pagesize: string}}) => {
  return (
    <div className='p-3'>
      <h1>All Tasks</h1>
      <AllTaskGrid page={parseInt(searchParams.page)} pagesize={parseInt(searchParams.pagesize)}/>
    </div>
  )
}

export default allTasks
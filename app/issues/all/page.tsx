import Link from "next/link";
import IssueSelector from "../../components/AllPendingSelector";
import IssueGrid from "../IssueGrid";

export const dynamic = 'force-dynamic';
const allIssues = ({ searchParams}: {searchParams: {page: string, pagesize: string}}) => {
  return (
    <div className='p-3'>
      <h1>Issues <IssueSelector selection="all"/></h1>
      <div className="mb-5"><Link href="/issues/new" className='btn btn-sm mr-4'>New Issue</Link></div>
      <IssueGrid selection="all" page={parseInt(searchParams.page)} pagesize={parseInt(searchParams.pagesize)}/>
    </div>
  )
}

export default allIssues
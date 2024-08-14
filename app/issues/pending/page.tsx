import Link from "next/link";
import IssueSelector from "../../components/AllPendingSelector";
import IssueGrid from "../IssueGrid";

export const dynamic = 'force-dynamic';
const pendingIssues = ({ searchParams}: {searchParams: {page: string, pagesize: string}}) => {
  return (
    <div className='p-3'>
      <h1>Issues <IssueSelector selection="pending"/></h1>
      <div className="mb-5"><Link href="/issues/new" className='btn btn-sm mr-4'>New Issue</Link></div>
      <IssueGrid selection="pending" page={parseInt(searchParams.page)} pagesize={parseInt(searchParams.pagesize)}/>
    </div>
  )
}

export default pendingIssues
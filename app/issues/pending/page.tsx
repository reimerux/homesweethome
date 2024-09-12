import Link from "next/link";
import IssueSelector from "../../components/AllPendingSelector";
import IssueGrid from "../IssueGrid";
import { MdAdd } from "react-icons/md";

export const dynamic = 'force-dynamic';
const pendingIssues = () => {
  return (
    <div className='p-3'>
      <h1>Issues
        <a href="/issues/new" aria-label="NewIssue"
          className="ml-5 inline-flex items-center shrink-0 justify-center w-6 h-6 rounded-full text-white bg-gray-900 focus:outline-none"    >
          <MdAdd />
        </a>
      </h1>
      <IssueSelector selection="pending" />
      <IssueGrid selection="pending" />
    </div>
  )
}

export default pendingIssues
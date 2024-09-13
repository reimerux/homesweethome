import { MdAdd } from "react-icons/md";
import IssueSelector from "../../components/AllPendingSelector";
import IssueGrid from "../IssueGrid";

export const dynamic = 'force-dynamic';
const allIssues = () => {
  return (
    <div className='p-3'>
      <h1>Issues
        <a href="/issues/new"
          className="ml-5 inline-flex items-center shrink-0 justify-center w-6 h-6 rounded-full text-white bg-gray-900 focus:outline-none"    >
          <MdAdd />
        </a>
      </h1>
      <IssueSelector selection="all" />
      <IssueGrid selection="all"/>
    </div>
  )
}

export default allIssues
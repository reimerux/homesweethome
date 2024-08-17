import prisma from '@/prisma/client';
import { MdAdd, MdArrowOutward, MdBrokenImage } from 'react-icons/md';
import IssueCard from '../components/IssueCard';



const IssueCards = async () => {
    const issues = await prisma.issue.findMany({
        // include: { task: {include:{rooms: {include: {room: true}}}}},
        orderBy: { created_at: 'desc' },
        where: {status: "PENDING"}
    });

    return (

        <div aria-label="card" className="mt-6 p-8 rounded-2xl bg-white max-w-4xl shadow-md w-full">
            <div aria-label="header" className="flex items-center space-x-2">
                <MdBrokenImage size={48}/>
                <div className="space-y-0.5 flex-1">
                    <h3 className="font-medium text-lg tracking-tight text-gray-900 leading-tight"          >
                        Issues
                    </h3>
                    <p className="text-sm font-normal text-gray-400 leading-none">
                        5 most recent
                    </p>
                </div>
                <a href="/issues/new"
                    className="inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none"    >
                    <MdAdd />
                </a>
                <a href="/issues/pending"
                    className="inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none"    >
                    <MdArrowOutward />
                </a>
            </div>
            <div aria-label="content" className="mt-9 grid gap-2.5">
                {issues.map(issue =>
                    <div key={issue.issueId}>
                        <IssueCard issue={issue} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default IssueCards



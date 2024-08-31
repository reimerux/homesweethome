import prisma from '@/prisma/client'
import { format } from 'date-fns'
import React from 'react'
import { MdStar } from 'react-icons/md'

type Props = {
    userId: string | undefined
}

const AchievementsBadges = async ({ userId }: Props) => {
    if (!userId) return null

    const achievements = await prisma.achievementOnUsers.findMany({
        where: { userId: parseInt(userId) },
        include: { achievement: true }
    })
    return (
        <>
            <div className="font-semibold">Achievements</div>
            <div className="flex items-start space-x-2">
                {(achievements.length > 0) ?
                    achievements.map((badge, i: number) => {
                        return (
                            <div key={i} className="flex rounded-full py-1 px-1 font-medium border bg-slate-600 border-gray-300 gap-2 items-center">
                                <div className="w-10 rounded-full bg-slate-900 text-white content-center">
                                    <MdStar size={40} color='gold' />
                                </div>
                                <div className="flex-col">
                                    <span className="text-sm text-white mr-2">{badge.achievement.name}</span>
                                    <span className="text-xs text-gray-400 mr-2">{format(badge.unlockedAt, "MM/dd/yyyy")}</span>
                                </div>
                            </div>
                        )
                    }) :
                    <div>None earned so far</div>
                }

            </div>
        </>
    )
}

export default AchievementsBadges
import prisma from "@/prisma/client";

export async function metricCalc(metrics: any) {
  let results: any = []
    await Promise.all(metrics.map(async (metric: any, index: number) => {
        const tableName = metric.tablename
        const data = await (prisma[tableName] as any).findMany(metric.query)
        results.push({ id: index, title: metric.title, subtitle:metric.subtitle, name: metric.name, result: metric.postprocess(data) })
    }))

    return results
}

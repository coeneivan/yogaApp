import { PrismaClient, Prisma } from '@prisma/client'
import posesSeed from '../../data/Poses.json'
const prisma = new PrismaClient()

const poseData: Prisma.PoseCreateInput[] = posesSeed.Poses.map((pose) => {
  return {
    name: pose.sanskrit_name,
    englishName: pose.english_name,
    imageUrl: pose.img_url,
  }
})

async function main() {
  console.log(`Start seeding ...`)
  for (const u of poseData) {
    const pose = await prisma.pose.create({
      data: u,
    })
    console.log(`Created pose with id: ${pose.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

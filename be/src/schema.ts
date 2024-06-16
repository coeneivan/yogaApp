import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('allPoses', {
      type: 'Pose',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.pose.findMany()
      },
    })
    t.list.field('allSequences', {
      type: 'Sequence',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.sequence.findMany()
      },
    })
    t.nullable.field('oneSequence', {
      type: 'Sequence',
      args: {
        id: intArg(),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.sequence.findUnique({
          where: { id: args.id || 0 },
        })
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('CreateSequence', {
      type: 'Sequence',
      args: {
        data: nonNull(
          arg({
            type: 'CreateSequenceInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.sequence.create({
          data: {
            name: args.data.name,
            description: args.data.description || '',
          },
        })
      },
    })

    t.nonNull.field('AddPoseToSequence', {
      type: 'PosesInSequences',
      args: {
        data: nonNull(
          arg({
            type: 'AddPoseToSequenceInput',
          }),
        ),
      },
      resolve: async (_, args, context: Context) => {
        // Add the pose to the sequence
        const newPoseInSequence = await context.prisma.posesInSequences.create({
          data: {
            poseId: args.data.poseId,
            sequenceId: args.data.sequenceId,
            order: args.data.order,
          },
          include: {
            pose: true,
            sequence: true,
          },
        })
        return {
          pose: newPoseInSequence.pose,
          sequence: newPoseInSequence.sequence,
          order: newPoseInSequence.order,
        }
      },
    })
  },
})

const Pose = objectType({
  name: 'Pose',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('englishName')
    t.string('imageUrl')
    t.list.field('foundInSequences', {
      type: 'PosesInSequences',
    })
  },
})

const Sequence = objectType({
  name: 'Sequence',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.string('description')
    t.list.field('poses', {
      type: 'PosesInSequences',
      resolve: async (parent, _args, context: Context) => {
        const posesInSequence = await context.prisma.posesInSequences.findMany({
          where: {
            sequenceId: parent.id,
          },
          include: {
            pose: true,
            sequence: true,
          },
          orderBy: {
            order: 'asc',
          },
        })
        return posesInSequence.map(pis => ({
          order: pis.order,
          pose: pis.pose,
          sequence: {
            id: pis.sequenceId,
            name: pis.sequence.name,
            description: pis.sequence.description,
          },
        }))
      },
    })
  },
})

const PosesInSequences = objectType({
  name: 'PosesInSequences',
  definition(t) {
    t.nonNull.field('pose', {
      type: 'Pose',
    })
    t.nonNull.field('sequence', {
      type: 'Sequence',
    })
    t.nonNull.int('order')
  },
})

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

const PoseCreateInput = inputObjectType({
  name: 'PoseCreateInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('englishName')
    t.nonNull.string('imageUrl')
  },
})

const CreateSequenceInput = inputObjectType({
  name: 'CreateSequenceInput',
  definition(t) {
    t.nonNull.string("name")
    t.nonNull.string("description")
  }
})

const AddPoseToSequenceInput = inputObjectType({
  name: 'AddPoseToSequenceInput',
  definition(t) {
    t.nonNull.int('poseId')
    t.nonNull.int('sequenceId')
    t.nonNull.int('order')
  },
})

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Pose,
    Sequence,
    PosesInSequences,
    SortOrder,
    PoseCreateInput,
    DateTime,
    CreateSequenceInput,
    AddPoseToSequenceInput
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

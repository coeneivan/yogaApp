import { ALL_POSES } from "@/api/allPoses";
import PoseCard from "@/components/poseCard";
import { Pose, Sequence } from "@/gql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import MiniPoseCard from "./miniPoseCard";
import { ADD_POSE_TO_SEQUENCE } from "@/api/mutation/addPoseToSequence";

export default function PoseSelector({ onSelect, currentSequence }: { onSelect: () => void, currentSequence: Sequence }) {
  const { data, loading, error } = useQuery(ALL_POSES);
  const [addThisPose, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_POSE_TO_SEQUENCE)

  if (loading || mutationLoading) return <p>Loading...</p>;
  if (error || mutationError) return <p>Error: {(error || mutationError || { message: 'Something wrong' }).message}</p>;
  const poses = data.allPoses as Pose[];

  const addThisPoseToThisSequence = async (pose: Pose) => {
    console.log(pose);
    const response = await addThisPose({ variables: { data: { poseId: pose.id, sequenceId: currentSequence.id, order: (currentSequence.poses || []).length } } });
    console.log({ response })
    onSelect()
  }

  return (
    <div role="list" className="flex flex-col gap-x-4 gap-y-8">
      {poses.map((pose) => (
        <MiniPoseCard key={pose.id} pose={pose} onSelect={addThisPoseToThisSequence} />
      ))}
    </div>
  );
}

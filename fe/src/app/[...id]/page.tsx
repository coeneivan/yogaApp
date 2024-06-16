'use client'
import { ONE_SEQUENCE } from "@/api/oneSequence";
import SideBar from "@/components/sideBar";
import { Pose, Sequence } from "@/gql/graphql";
import { useQuery } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import PoseSelector from "./components/poseSelector";
import MiniPoseCard from "./components/miniPoseCard";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";

export default function SequencesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathName = usePathname()
  const router = useRouter()
  const currentSequenceId = parseInt(pathName.split('/').pop() || '')

  const { data, loading, error, refetch } = useQuery(ONE_SEQUENCE, {
    variables: {
      id: currentSequenceId
    }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const sequence = data.oneSequence as Sequence;

  return (
    <main className="flex flex-col min-h-screen p-24">
      <SideBar title="Select pose" show={isDialogOpen} hide={() => setIsDialogOpen(false)}>
        <PoseSelector currentSequence={sequence} onSelect={() => {
          refetch()
        }} />
      </SideBar>
      <div className="">
        <div className="flex gap-4 items-center">

          <button onClick={() => {
            router.back()
          }}>
            <ArrowLeftCircleIcon className="h-8 w-8 text-gray-500" />
          </button>
          <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {sequence.name}
          </p>
        </div>
        <p className="my-6 text-lg leading-8 text-gray-600 ">
          {sequence.description}
        </p>
      </div>
      <div className="flex gap-4 items-center mt-4  mb-2 ">
        <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Poses
        </p>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add a pose
        </button>
      </div>
      <ul>
        {sequence.poses?.map((step) => (
          <li key={step?.order}>
            {step?.pose && (
              <MiniPoseCard pose={step?.pose} onSelect={() => { }} />
            )}
          </li>
        ))}
      </ul>
    </main >
  );
}
'use client'
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_SEQUENCES } from "@/api/allSequences";
import { Sequence } from "@/gql/graphql";
import { PlusIcon } from '@heroicons/react/20/solid'
import SideBar from "../components/sideBar";
import CreateSequenceForm from "../components/sequence/createSequenceForm";
import { CREATE_SEQUENCE } from "@/api/mutation/crateSequence";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SequencesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, loading, error, refetch } = useQuery(ALL_SEQUENCES);
  const [submitSequence, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(CREATE_SEQUENCE)
  const router = useRouter()

  useEffect(() => {
    console.log(mutationError)
    console.log(mutationData)
  }, [mutationError, mutationData])

  if (loading) return <p>Loading...</p>;
  if (error || mutationError) return <p>Error: {(error || mutationError || { message: 'something wrong' }).message}</p>;
  const sequences = data.allSequences as Sequence[];

  const createSequence = async (sequence: Sequence) => {
    console.log(sequence);
    const response = await submitSequence({ variables: { data: { name: sequence.name, description: sequence.description } } });
    await refetch()
    setIsDialogOpen(false);
    console.log({ response })
  }

  return (
    <main className="flex flex-col min-h-screen justify-around p-24">
      <div className="">
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Yoga Sequences
        </p>
        <p className="my-6 text-lg leading-8 text-gray-600 ">
          A yoga sequence is a thoughtfully arranged series of poses designed to flow together, promoting balance, strength, and flexibility.
        </p>
      </div>
      <SideBar title="Create sequence" show={isDialogOpen} hide={() => setIsDialogOpen(false)}>
        <CreateSequenceForm onSubmit={createSequence} />
      </SideBar>
      {sequences && sequences.length ? (
        <>
          <div role="list" className=" gap-x-4 gap-y-8 flex flex-col">
            {sequences.map((sequences) => (
              <Link className="hover:bg-slate-100 hover:cursor-pointer p-2 max-w-lg" key={sequences.id} href={`${sequences.id}`}>
                <div className="flex flex-col gap-2">
                  <p className="truncate text-sm font-medium text-gray-900">{sequences.name} ({sequences.poses?.length})</p>
                  <p className="truncate text-sm text-gray-500">{sequences.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex">
            <button
              onClick={() => setIsDialogOpen(true)}
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Add a new Sequence
            </button>
          </div>
        </>
      ) : (
        <div className="text-center mb-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No sequences</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new sequence.</p>
          <div className="mt-6">
            <button
              onClick={() => setIsDialogOpen(true)}
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              New Sequence
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
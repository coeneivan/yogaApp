import { Pose } from "@/gql/graphql";
import Image from "next/image";
import React from "react";

export default function PoseCard({ pose }: { pose: Pose }) {
  return (
    <li className="relative hover:cursor-pointer hover:bg-slate-300 rounded-lg">
      <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100" >
        <Image height={228} width={228} src={pose.imageUrl || ''} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
      </div >
      <p className="pointer-events-none my-2 block truncate text-sm font-medium text-gray-900 px-2">{pose.name}</p>
    </li >
  )
}

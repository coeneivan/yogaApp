import React from "react";
import { Pose } from "@/gql/graphql";

export default function MiniPoseCard({ pose, onSelect }: { pose: Pose, onSelect: (pose: Pose) => void }) {
  return (
    <div className="group relative flex items-center px-5 py-6 cursor-pointer" onClick={() => onSelect(pose)}>
      <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true" />
      <div className="relative flex min-w-0 flex-1 items-center">
        <span className="relative inline-block flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src={pose.imageUrl || ''} alt="" />
          <span
            className={classNames(
              'absolute right-0 top-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white'
            )}
            aria-hidden="true"
          />
        </span>
        <div className="ml-4 truncate">
          <p className="truncate text-sm font-medium text-gray-900">{pose.name}</p>
          <p className="truncate text-sm text-gray-500">{pose.englishName}</p>
        </div>
      </div>
    </div>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
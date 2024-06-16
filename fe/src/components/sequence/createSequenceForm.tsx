import { Sequence } from "@/gql/graphql";
import React from "react";

export default function CreateSequenceForm({ onSubmit }: { onSubmit: (sequence: Sequence) => void }) {
  const [newSequence, setNewSequence] = React.useState({
    id: 0,
    name: "",
    description: "",
  });

  const preSubmit = () => {
    console.log({ newSequence });
    onSubmit(newSequence);
    setNewSequence({
      id: 0,
      name: "",
      description: "",
    })
  }

  return (
    <form className="flex flex-col gap-2 space-y-8 divide-y divide-gray-200" onSubmit={(e) => {
      e.preventDefault();
      preSubmit()
    }}>
      <div className="w-full">
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 w-full">
          Name
        </label>
        <div className="mt-2">
          <input
            name="name"
            id="name"
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Sunday Morning Flow"
            onChange={(e) => {
              setNewSequence({
                ...newSequence,
                name: e.target.value,
              });
            }
            }
          />
        </div>
        <div className="mt-2">
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 w-full">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Easy flow for a Sunday morning."
            onChange={(e) => {
              setNewSequence({
                ...newSequence,
                description: e.target.value,
              });
            }
            }
          />
        </div>
      </div>

      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Submit
      </button>
    </form>
  );
}

import type { JobProps } from "@/types/jobType";

const Card = ({ job }: JobProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border p-4 shadow-sm">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIC25nqru3yN9lhtoTwdBWt_u0QlOcPzw3Bw&s"
        alt="Avatar"
        className="h-40 w-full rounded-lg object-cover"
      />

      <div>
        <h2 className="text-lg font-bold">{job.title}</h2>

        <p className="text-sm text-gray-500">
          {job.smallCompany?.companyName}
        </p>

        <p className="text-xs text-gray-400">
          {job.formattedPlaces?.[0]}
        </p>
      </div>

      <p className="text-sm text-gray-700 line-clamp-3">
        {job.descriptionPreview}
      </p>

      <div className="flex flex-wrap gap-2">
        {job.skillsList?.map((skill, index) => (
          <span
            key={index}
            className="rounded bg-black px-2 py-1 text-xs text-white"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
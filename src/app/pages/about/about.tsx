import { useAboutBio } from "@/hooks/useAboutBio";
import { useExperience } from "@/hooks/useExperience";
import { Database } from "@/lib/database.interface";

function Experience({ experience }: { experience: Database["experience"] }) {
  function formatDate(dateString: string): string {
    if (!dateString) {
      return "Xxx YY";
    }
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      year: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <div className="flex justify-between experience py-6 border-b group experience">
      <p className="text-xl group-hover:hidden">{experience.company}</p>
      <p className="text-xl hidden group-hover:block">{experience.title}</p>
      <p className="text-xl mr-[0.1px] whitespace-nowrap">
        {formatDate(experience.start_date)} — {formatDate(experience.end_date)}
      </p>
    </div>
  );
}

export function About() {
  const { data: bio } = useAboutBio();
  const { data: experiences } = useExperience(3);

  return (
    <div className="flex-row mb-64">
      <div className="m-24">
        <h1 className="uppercase text-left flex justify-start reveal relative 2xl:text-[11rem] xl:text-[7rem] leading-[1] md:text-[5rem] sm:text-[4rem] text-[2.8rem] show-reveal">
          the Man
        </h1>
        <h1 className="uppercase flex justify-center reveal relative 2xl:text-[11rem] xl:text-[7rem] leading-[1] md:text-[5rem] sm:text-[4rem] text-[2.8rem] show-reveal">
          Behind the
        </h1>
        <h1 className="uppercase flex justify-end reveal relative 2xl:text-[11rem] xl:text-[7rem] leading-[1] md:text-[5rem] sm:text-[4rem] text-[2.8rem] show-reveal">
          Screen
        </h1>
      </div>
      <div id="content" className="grid grid-cols-10 w-100 gap-y-16">
        <div
          className="col-span-2 uppercase tablet:col-span-10 tablet:mb-10"
          id="bio"
        >
          <div className="flex items-center mt-1 hidden md:flex">
            <p className="font-bold">&#9312;&emsp;</p>
            Bio
          </div>
        </div>
        <p className="col-span-6 md:col-span-5 text-xl">{bio}</p>
        <div className="col-span-2"></div>
        <div
          className="col-span-2 uppercase tablet:col-span-10 tablet:mb-10"
          id="experience"
        >
          <div className="flex items-center mt-1 hidden md:flex">
            <p className="font-bold">&#9313;&emsp;</p>
            Experience
          </div>
        </div>
        <div className="col-span-6 md:col-span-5 text-xl">
          {experiences &&
            experiences.map((experience, idx) => (
              <Experience key={idx} experience={experience} />
            ))}
        </div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
}

import NewJobs from "./components/NewJobs";

export default function NewListedOrder() {
  return (
    <div className="w-full Container">
      <div className="my-10">
        <section className="text-center flex justify-center items-center">
          <h1 className="font-bold text-3xl sm:text-4xl text-Heading">
            Neue <span className='text-orange'>Aufträge</span>
          </h1>
        </section>
        <NewJobs />
      </div>
    </div>
  );
}

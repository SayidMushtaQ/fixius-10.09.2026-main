import { CraftManData } from '@/constants/landingPage';
import { CraftsmanCards } from './components';

export default function Craftsman() {
  return (
    <div className='w-full'>
      <div>
        <section className='text-center flex justify-center items-center'>
          <h1 className='font-bold text-3xl sm:text-4xl text-Heading'>Unsere bestbewerteten <span className='text-orange'>Handwerker</span></h1>
        </section>
        <div className='mt-10 bg-opacity-60 bg-orange sm:p-10 p-3 flex justify-center items-center flex-wrap gap-5 sm:gap-10 md:gap-36'>
          {CraftManData.map(({ id, name, job, img }) => (
            <CraftsmanCards key={id} name={name} job={job} img={img} />
          ))}
        </div>
      </div>
    </div>
  );
}

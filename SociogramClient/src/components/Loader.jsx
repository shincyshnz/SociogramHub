import { Spinner } from 'flowbite-react';

const Loader = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
    <Spinner size="sm" /> Loading...
    </div>

  )
}

export default Loader
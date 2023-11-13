import { Spinner } from 'flowbite-react';

const Loader = ({text = "Loading..."}) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
    <Spinner size="sm" /> {text}
    </div>

  )
}

export default Loader
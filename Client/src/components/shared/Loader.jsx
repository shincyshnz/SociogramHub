import { Spinner } from 'flowbite-react';

const Loader = ({text = "Loading...", size="sm"}) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
    <Spinner size={size} /> {text}
    </div>

  )
}

export default Loader
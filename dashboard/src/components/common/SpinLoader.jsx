import { staticImages } from '../../images'

const SpinLoader = () => {
  return (
    <div className='flex items-center justify-center my-3'>
      <img src={staticImages.spin} alt="" className='mx-auto max-w-[60px]' />
    </div>
  )
}

export default SpinLoader

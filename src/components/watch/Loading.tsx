import loadingImg from '../../images/loading.svg';


export default function Loading({ loading, msg }) {
  return (
    <div className={loading ? 'mt-10 mb-14 flex flex-col items-center text-center' : 'hidden'}>
      <img src={loadingImg} className="w-14" alt="loading" />
      <div>{msg}</div>
    </div>
  )
}

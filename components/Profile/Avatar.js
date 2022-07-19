export function Avatar({ src, scale }) {
  return (
    <img
      className={`flex flex-grow rounded-full grayscale aspect-1`}
      src={
        src ||
        'https://i.etsystatic.com/21689229/r/il/bce321/2406492170/il_570xN.2406492170_dgxu.jpg'
      }
      alt="avatar"
    />
  )
}

import Image from "next/image"

const Header = () => {
  return (
    <header>
      <div>
        <Image src="/assets/images/logo-large.svg" width={100} height={100} alt="Logo" />
      </div>
    </header>
  )
}

export default Header
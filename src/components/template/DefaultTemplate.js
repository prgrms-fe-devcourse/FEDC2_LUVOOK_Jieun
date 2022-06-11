// TODO
// Header 모든 페이지에서 사용하기 때문에 여기에 선언

const DefaultTemplate = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}

export default DefaultTemplate

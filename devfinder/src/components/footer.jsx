import './footer.css'

// Worked out ONCE when the file loads. (Calling new Date() inside the component
const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        
        <p>© {currentYear} DevFinder by Ishmael SY, Sybercodes . Data from the GitHub API.</p>
      </div>
    </footer>
  )
}

export default Footer

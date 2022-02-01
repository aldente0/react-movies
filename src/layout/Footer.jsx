export function Footer() {
    return (
        <footer className="page-footer #1a237e indigo darken-4">
        <div className="container">
          <div className="footer-copyright">
            <div className="container">
            © {new Date().getFullYear()} Copyright Text
            <a className="grey-text text-lighten-4 right" href="https://github.com/aldente0/react-movies">Repo</a>
            </div>
            </div>
        </div>
        </footer>
    )
}
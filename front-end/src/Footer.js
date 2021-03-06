
/** @jsxImportSource @emotion/react */

const styles = {
  footer: {
    justifyContent: "center",
    alignItems: "center",
    height: '40px',
    backgroundColor: 'white',
    fontSize: "14px",
    color: "black",
    display: "flex",
    borderTop: "1px solid #c1bdbd"
  },
  logo: {
    width: 30,
    height: 30,
    padding: 7
  }
}

export default function Footer() {
  return (
    <footer style={styles.footer}>
    <img css={styles.logo} src="/logo_color.png" alt="LogoColor"/>
    <span> Made by Laure Audouy and Thomas Poulain, webtech, 2021 </span>
    </footer>
  )
}

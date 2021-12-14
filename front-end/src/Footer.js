
/** @jsxImportSource @emotion/react */

const styles = {
  footer: {
    justifyContent: "center",
    alignItems: "center",
    height: '40px',
    backgroundColor: '#DDDBDB',
    fontSize: "14px",
    color: "black",
    display: "flex"
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
      <f4> Made by Laure Audouy and Thomas Poulain, webtech, 2021 </f4>
    </footer>
  );
}

import React from "react";
import banco from "../../banco.jpg";
import { tss } from "tss-react/mui";
import { Header } from "../components/header";

const useStyles = tss.withName("Login").create({
  app: {},
  appHeader: {
    position: "fixed",
    top: "0",
    width: "100%",
    zIndex: "100",
  },
  appLogo: {
    pointerEvents: "none",
  },
  appBody: {
    marginLeft: "20%",
    marginRight: "20%",
    position: "relative",
    textAlign: "center",
    padding: "20px",
    marginTop: "100px",
    display: "flex",
    justifyContent: "space-between",
  },
  introduction: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  button: {
    fontSize: "1rem",
  },
});

function Login() {
  const { classes } = useStyles();

  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <Header />
      </header>
      <body className={classes.appBody}>
        <section className={classes.introduction}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Bem-vindo ao iBank!</h1>
          <div style={{width: '500px'}}>
            <p>Estamos animados em apresentar a você uma nova forma para administrar suas finanças, que é conveniente, segura e adaptada às suas necessidades.</p>
            <p>No nosso banco digital, priorizamos simplicidade, transparência e inovação. Com nossa plataforma fácil de usar, você pode gerenciar suas finanças a qualquer hora, em qualquer lugar.</p>
          </div>
        </section>
        <section>
          <img src={banco} className={classes.appLogo} alt="logo" />
        </section>
      </body>
    </div>
  );
}

export default Login;

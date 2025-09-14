const parseEnv = () => {
    const envVars = process.env;
  
    const mitsoVars = Object.entries(envVars)
      .filter(([key]) => key.startsWith("MITSO_"))
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");
  
    console.log(mitsoVars);
  };
  
  parseEnv();
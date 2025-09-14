const parseArgs = () => {
    const args = process.argv.slice(2);
    const result = {};
  
    for (let i = 0; i < args.length; i += 2) {
      const propName = args[i].substring(2);
      const value = args[i + 1];
      result[propName] = value;
    }
  
    for (const [propName, value] of Object.entries(result)) {
      console.log(`${propName} is ${value}`);
    }
  };
  
  parseArgs();
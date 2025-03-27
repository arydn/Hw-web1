function evaluateAllFormulas() {
    document.querySelectorAll(".formula").forEach(formulaBox => {
      const expr = formulaBox.getAttribute("evaluator");
  
      try {
        const allWords = expr.match(/\b[a-zA-Z_]\w*\b/g) || [];
        const matchDotProps = expr.matchAll(/\b\w+\.(\w+)\b/g);
        const dotProps = Array.from(matchDotProps, m => m[1]);
        
        const variables = [];
  
        for (const name of allWords) {
          if (name === "Math" || dotProps.includes(name)) continue;
          variables.push(name);
        }
        
  
        let scope = {};
        let hasEmpty = false;
  
        for (const variable of variables) {
          const input = document.getElementById(variable);
          const value = input.value.trim();
  
          if (value === "") {
            hasEmpty = true;
            continue;
          }
  
          if (!/^[-+]?\d*(\.\d+)?$/.test(value)) {
            alert(`Invalid input for '${variable}': "${value}" (must be a number)`);
            formulaBox.textContent = "Invalid Input";
            return;
          }
  
          scope[variable] = parseFloat(value);
        }
  
        if (hasEmpty) {
          formulaBox.textContent = "Please fill all inputs";
          return;
        }
  
        const func = new Function(...variables, `return ${expr};`);
        const result = func(...variables.map(v => scope[v]), Math);
  
        formulaBox.textContent = result;
  
      } catch (err) {
        formulaBox.textContent = "Invalid Formula";
      }
    });
  }
  
  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", evaluateAllFormulas);
  });
  
  evaluateAllFormulas();
  
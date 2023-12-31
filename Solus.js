class $_$ {
  static importedFunctions = {};
  static loadedModules = new Set();

  static async fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
  }

  static WAIT = ms => new Promise(res => setTimeout(res, ms));

  static async LOAD(contentFileName, createFresh = false) {
    if (this.loadedModules.has(contentFileName)) {
      await this.LOAD_FUNC('onloadstale.' + contentFileName);
    }
    if (!createFresh && this.loadedModules.has(contentFileName)) {
      return;
    }

    let contentElement = document.getElementById(contentFileName);

    if (contentElement == undefined) {
      let onFlyElement = document.createElement('div');
      onFlyElement.id = contentFileName;
      onFlyElement.setAttribute('data-onfly', 'true');
      document.body.appendChild(onFlyElement);
      contentElement = document.getElementById(contentFileName);
    }

    let path = 'modules/' + contentFileName + '/' + contentFileName + '.html';

    contentElement.innerHTML = await this.fetchHtmlAsText(path);

    let importElements = contentElement.getElementsByTagName('import');

    let imports = new Set();
    if (importElements && importElements[0]) {
      imports = new Set(importElements[0].innerText.trim().replaceAll(/<\!--.*?-->/g, '').split(' '));
      importElements[0].remove();
    }
    
    imports.add('onload.' + contentFileName);
    imports.add('onloadstale.' + contentFileName);
    imports.add('ondestroy.' + contentFileName);
    
    for (let i of imports) {
        i = i.split('.');
        
        let func = i[0].trim();
        let module = i[1].trim();
        
        await this.IMPORT_FUNC(func, module);
    }
    
    await this.LOAD_FUNC('onload.' + contentFileName);
    await this.LOAD_FUNC('onloadstale.' + contentFileName);
    
    this.loadedModules.add(contentFileName);
  }
  static async IMPORT_FUNC(funcName, module) {
      if (this.importedFunctions[module] == undefined) {
          this.importedFunctions[module] = {};
      }
      this.importedFunctions[module][funcName] = (await import(window.location.origin + `/modules/${module}/${module}.js`))[funcName]
  }
  static async DESTROY(contentFileName, ...parameters) {
      await this.LOAD_FUNC('ondestroy.' + contentFileName, ...parameters);
      
      let module = document.getElementById(contentFileName);
      if (module.hasAttribute('data-onfly')) {
          module.remove();
          this.loadedModules.delete(contentFileName);
      } else {
          module.innerHTML = '';
      }
  }
  static async LOAD_FUNC(functionAddress, ...parameters) {
      let funcAddr = functionAddress.split('.');
      let functionName = funcAddr[0];
      let fileName = funcAddr[1];
      if (this.importedFunctions[fileName] != undefined && this.importedFunctions[fileName][functionName] != undefined) {
          return await this.importedFunctions[fileName][functionName](...parameters);
      } else if (functionName != 'onload' && functionName != 'ondestroy' && functionName != 'onloadstale') {
          console.warn(functionName + ' from ' + fileName + ' is not registered.');
      }
  }
  static ELEMENT(elementAddress) {
      let elemAddr = elementAddress.split('.');
      let elementName = elemAddr[0];
      let parentElementId = elemAddr[1];
      return document.getElementById(parentElementId).querySelector(`[name='${elementName}']`);
  }
  static ENABLE_ELEM(elementAddress) {
      this.ELEMENT(elementAddress).removeAttribute('disabled');
  }
}

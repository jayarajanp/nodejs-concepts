export class Invariables { // 'abstract' class only possible for TS
    static PORT_NUMBER = 5000 // 'public', 'readonly' and 'const' (for class members) only possible for TS
    static HOST_NAME = 'localhost'
}

// export default invariables ---> Another way to export in ES6 JS ('module' type); 
// export { invariables } ---> Another way to export in ES6 JS ('module' type); 
// if CommonJS, use module.exports = invariables
// 'namespace' only possible in TS
// There is a concept called 'Aggregate modules' ---> A module (say, utils.js) just exports all the underlying modules (say, like invariables.js) and nothing else, and importing takes place only from 'utils'.js.
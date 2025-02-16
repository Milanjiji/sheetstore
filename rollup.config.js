import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/cjs/index.js', format: 'cjs' }, // CommonJS for Node.js
    { file: 'dist/esm/index.js', format: 'esm' }  // ES Modules for browsers
  ],
  plugins: [
    resolve(),
    babel({ exclude: 'node_modules/**' })
  ],
  external: [] // Add external deps if needed (e.g., 'axios')
};
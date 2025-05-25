import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/cjs/index.js', format: 'cjs' }, 
    { file: 'dist/esm/index.js', format: 'esm' } 
  ],
  plugins: [
    resolve(),
    babel({ exclude: 'node_modules/**' }),
    copy({
      targets: [{ src: 'types/**/*', dest: 'dist/types' }]
    })
  ],
  external: []
};
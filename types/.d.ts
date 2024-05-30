// styles.d.ts or typings.d.ts
declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// styles.d.ts or typings.d.ts
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}
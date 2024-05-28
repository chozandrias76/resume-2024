export function createOnError() {
  const error = new Error();
  const stackLines = error?.stack?.split('\n');
  const callerLine = stackLines?.at(2); // The line where the function is called from

  const functionNameMatch = callerLine?.match(/at (.+?) \(/);
  const functionName = functionNameMatch ? functionNameMatch[1] : 'anonymous function';

  return (error: any) => console.error(`Error in ${functionName}:`, error);
}
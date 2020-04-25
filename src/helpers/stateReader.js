export default function stateReader(stateConfiguration) {
  return (stateObject) => {
    return (checkForStatus) => {
      const statuses = checkForStatus.split(/ or /i);
      for (const s of statuses) {
        if (stateObject === stateConfiguration[s]) {
          return true;
        }
      }
      return false;
    };
  };
}

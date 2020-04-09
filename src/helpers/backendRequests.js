const backendUrl = "http://localhost";

export const updateCamera = async (data) => {
  const init = {
    method: "PUT",
    body: JSON.stringify(data),
  };
  return fetch(backendUrl + "/camera", init);
};

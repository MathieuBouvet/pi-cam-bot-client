export const backendUrl = "http://localhost";
export const cameraStreamUrl = "http://localhost:8080/?action=stream";
export const updateCamera = async (data) => {
  const init = {
    method: "PUT",
    body: JSON.stringify(data),
  };
  return fetch(backendUrl + "/camera", init);
};

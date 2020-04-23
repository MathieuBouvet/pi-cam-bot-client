export const backendUrl = "http://localhost:3001";
export const cameraStreamUrl = "http://localhost:8080/?action=stream";

const getInitObject = (data) => ({
  method: "PUT",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
  body: JSON.stringify(data),
});
export const updateCamera = async (data) => {
  const init = getInitObject(data);
  const res = await fetch(backendUrl + "/robot/camera", init);
  return res.json();
};

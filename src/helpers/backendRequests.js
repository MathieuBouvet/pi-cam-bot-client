export const backendUrl = "http://192.168.1.77:3000";
export const cameraStreamUrl = "http://localhost:8080/?action=stream";
export const cameraSnapshotUrl = "http://localhost:8080/?action=snapshot";

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

export const updateRobot = async (data) => {
  const init = getInitObject(data);
  await fetch(backendUrl + "/robot/movement", init);
};

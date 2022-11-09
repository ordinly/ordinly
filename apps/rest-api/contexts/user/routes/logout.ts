import express from "express";

const router = express.Router({ mergeParams: true });

//@ts-ignore
router.route("/").post(async (req, res) => {
  try {
    res.clearCookie("auth");

    res.status(200).send({ message: "You've been logged out" });
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error logging you out",
    } = caught;

    throw { status, error };
  }
});

export { router };

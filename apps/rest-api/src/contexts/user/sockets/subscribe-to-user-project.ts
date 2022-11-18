export default async ({ args, socket }: { socket?: any; args?: any }) => {
  try {
    const { projectId, userId } = args;

    socket.join(projectId);

    console.log(`${userId} subscribed to ${projectId}`);
  } catch (error) {
    console.error(error);
  }
};

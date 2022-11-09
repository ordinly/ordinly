const downloadBlob = ({ href, name }) => {
  const link = document.createElement("a");

  link.href = href;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  link.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );

  document.body.removeChild(link);
};

export default downloadBlob;

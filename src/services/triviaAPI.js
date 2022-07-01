const getUserToken = () => (
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((res) => (res.json()))
    .catch((error) => (error))
);

export default getUserToken;

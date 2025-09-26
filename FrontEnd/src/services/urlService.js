
export const generate_Short_URL = async (URL) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: URL,
      }),
    };
    const response = await fetch("http://localhost:8000/api/url", requestOptions);
    
    const data=  await response.json();
    if(!response.ok) throw data;
    return data;
  } catch (error) {
    return error;
  }
};

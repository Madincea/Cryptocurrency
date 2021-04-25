let options = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "accept-language": "en-US,en;q=0.9",
  },
  method: "",
  body: null,
};

const checkResponseStatus = async (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    throw error;
  }
};

const fetchWrapper = async (...args: any) => {
  try {
    const response = await fetch(args);
    if (response.status === 204) return {};
    const checkedResponse = await checkResponseStatus(response);
    return await checkedResponse.json();
  } catch (error) {
    throw error;
  }
};

export async function get(url: string, params?: any) {
  options.method = "GET";
  const searchParams = new URLSearchParams(params);
  return fetchWrapper(`${url}?${searchParams.toString()}`);
}

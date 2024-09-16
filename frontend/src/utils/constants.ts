const BASE_URL = '/api';
export const APIS = {
  API_WHITEBOARD_LIST: `${BASE_URL}/whiteboards`,
  API_WHITEBOARD_UPDATE: `${BASE_URL}/whiteboards`,
  API_WHITEBOARD_GET_DELETE_ONE: (id: string) =>
    `${BASE_URL}/whiteboards/${id}`,
};

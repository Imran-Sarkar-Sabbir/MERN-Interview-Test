import axios from 'axios';
import { APIS } from '../utils/constants';
import { useAxiosSwr } from '.';

export async function submitCanvasData(data: any) {
  await axios.post(APIS.API_WHITEBOARD_UPDATE, data);
}

export function useCanvasDataById(id: string) {
  return useAxiosSwr(APIS.API_WHITEBOARD_GET_DELETE_ONE(id));
}

export function useFetchAllCanvasData(pageNo: number) {
  return useAxiosSwr(`${APIS.API_WHITEBOARD_LIST}?pageNo=${pageNo}`);
}

export async function deleteWhiteboard(id: string) {
  await axios.delete(APIS.API_WHITEBOARD_GET_DELETE_ONE(id));
}

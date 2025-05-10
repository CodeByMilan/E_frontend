import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

//as when we fetch the data from the store the data will not be same always so we have to use the below convention for useselector hook
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector